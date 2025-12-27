import { useEffect, useState } from "react"
import { collection, getDocs, orderBy, query, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore"
import ReactMarkdown from "react-markdown"
import MDEditor from '@uiw/react-md-editor'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { db } from "../firebase" // adjust path if needed

type Blog = {
  id: string
  title: string
  content: string
  updatedAt?: any
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const q = query(
        collection(db, "blogs"),
        orderBy("updatedAt", "desc")
      )

      const snapshot = await getDocs(q)

      const data: Blog[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Blog, "id">)
      }))

      setBlogs(data)
      setSelectedBlog(data[0] || null)
    } catch (err) {
      console.error("Error fetching blogs:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = () => {
    setEditingBlog(null)
    setFormData({ title: '', content: '' })
    setShowModal(true)
  }

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog)
    setFormData({ title: blog.title, content: blog.content })
    setShowModal(true)
  }

  const handleDelete = async (blog: Blog) => {
    if (!confirm(`Are you sure you want to delete "${blog.title}"?`)) return

    try {
      await deleteDoc(doc(db, "blogs", blog.id))
      setBlogs(prev => prev.filter(m => m.id !== blog.id))
      if (selectedBlog?.id === blog.id) {
        setSelectedBlog(blogs.find(m => m.id !== blog.id) || null)
      }
    } catch (err) {
      console.error("Error deleting blog:", err)
      alert("Failed to delete blog. Please try again.")
    }
  }

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill in both title and content")
      return
    }

    setSaving(true)
    try {
      if (editingBlog) {
        // Update existing
        await updateDoc(doc(db, "blogs", editingBlog.id), {
          title: formData.title.trim(),
          content: formData.content.trim(),
          updatedAt: serverTimestamp()
        })

        setBlogs(prev => prev.map(m =>
          m.id === editingBlog.id
            ? { ...m, title: formData.title.trim(), content: formData.content.trim() }
            : m
        ))

        if (selectedBlog?.id === editingBlog.id) {
          setSelectedBlog(prev => prev ? { ...prev, title: formData.title.trim(), content: formData.content.trim() } : null)
        }
      } else {
        // Add new
        const docRef = await addDoc(collection(db, "blogs"), {
          title: formData.title.trim(),
          content: formData.content.trim(),
          updatedAt: serverTimestamp()
        })

        const newBlog: Blog = {
          id: docRef.id,
          title: formData.title.trim(),
          content: formData.content.trim()
          // updatedAt will be set by Firestore and available on next fetch
        }

        setBlogs(prev => [newBlog, ...prev])
        setSelectedBlog(newBlog)
      }

      setShowModal(false)
      setFormData({ title: '', content: '' })
    } catch (err) {
      console.error("Error saving blog:", err)
      alert("Failed to save blog. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-slate-600">Loading blogs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">Blog Posts</h1>
            <p className="text-lg text-slate-600 max-w-prose">
              View and manage blog posts. Select a blog from the list to view its details.
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-[600px]">
        {/* List of blogs - Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Blog Posts</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {blogs.length === 0 ? (
                <p className="text-slate-500 text-sm py-4">No blogs available</p>
              ) : (
                blogs.map(blog => (
                  <div
                    key={blog.id}
                    className={`group p-3 rounded-md cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedBlog?.id === blog.id
                        ? 'bg-blue-50 border border-blue-200 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="flex-1"
                        onClick={() => setSelectedBlog(blog)}
                      >
                        <div className="font-medium text-slate-900 text-sm line-clamp-2">
                          {blog.title}
                        </div>
                        {blog.updatedAt && blog.updatedAt.toDate && (
                          <div className="text-xs text-slate-500 mt-1">
                            {new Date(blog.updatedAt.toDate()).toLocaleDateString()}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(blog)
                          }}
                          className="p-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(blog)
                          }}
                          className="p-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Selected note viewer - Main content */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm min-h-[500px]">
            {selectedBlog ? (
              <div className="p-8">
                <div className="mb-6 pb-4 border-b border-slate-200">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                    {selectedBlog.title}
                  </h2>
                  {selectedBlog.updatedAt && selectedBlog.updatedAt.toDate && (
                    <p className="text-slate-600 text-sm">
                      Last updated: {new Date(selectedBlog.updatedAt.toDate()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>

                <div className="prose prose-slate max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-3xl font-bold text-slate-900 mb-4 mt-6 first:mt-0">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-semibold text-slate-900 mb-3 mt-5">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-medium text-slate-900 mb-2 mt-4">{children}</h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-slate-700 mb-4 leading-relaxed">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1 ml-4">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside text-slate-700 mb-4 space-y-1 ml-4">{children}</ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-slate-700">{children}</li>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-slate-900">{children}</strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic text-slate-700">{children}</em>
                      ),
                      code: ({ children }) => (
                        <code className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-sm font-mono">{children}</code>
                      ),
                      pre: ({ children }) => (
                        <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono text-slate-800 mb-4">{children}</pre>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-200 pl-4 italic text-slate-700 mb-4">{children}</blockquote>
                      ),
                    }}
                  >
                    {selectedBlog.content}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center p-12">
                <div>
                  <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No blog selected</h3>
                  <p className="text-slate-600">Choose a blog from the list to view its content</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-semibold">
                {editingBlog ? 'Edit Blog' : 'Add New Blog'}
              </h2>
              <p className="text-slate-600 mt-1">
                {editingBlog ? 'Update the blog details below.' : 'Use the toolbar to format your text. Your content will be saved as markdown.'}
              </p>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Blog Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter blog title..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Blog Content
                </label>
                <div data-color-mode="light">
                  <MDEditor
                    value={formData.content}
                    onChange={(value) => setFormData(prev => ({ ...prev, content: value || '' }))}
                    preview="edit"
                    hideToolbar={false}
                    visibleDragbar={false}
                    height={400}
                    textareaProps={{
                      placeholder: `# Meeting Minutes - [Date]

## Attendees
- Name 1
- Name 2

## Agenda Items

### 1. Item 1
- Discussion point

## Action Items
- [ ] Action item 1

## Next Meeting
[Date and time]`
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {saving && (
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                {saving ? 'Saving...' : (editingBlog ? 'Update Blog' : 'Save Blog')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
