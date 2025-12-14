import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import fm from "front-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Story } from "../data/stories";

// Glob all .md files under src/content/stories as raw strings
const mdFiles = import.meta.glob("../content/stories/*.md", {
  query: "?raw",
  import: "default",
});

export default function StoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [raw, setRaw] = useState<string>("");

  const key = useMemo(
    () => (slug ? `../content/stories/${slug}.md` : undefined),
    [slug]
  );

  useEffect(() => {
    if (!key) return;
    const loader = (mdFiles as Record<string, () => Promise<string>>)[key];
    if (loader) {
      loader()
        .then(setRaw)
        .catch(() => {
          setRaw(`# Story not found\n\nWe couldn’t load **${slug}**.`);
        });
    } else {
      setRaw(`# Story not found\n\nWe couldn’t load **${slug}**.`);
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [key, slug]);

  // parse using Story type
  const { attributes: data, body: content } = useMemo(() => {
    if (!raw) return { attributes: {} as Partial<Story>, body: "" };
    return fm<Partial<Story>>(raw);
  }, [raw]);

  const displayDate = (data as any)?.date
    ? new Date((data as any).date).toLocaleDateString()
    : undefined;

  const baseUrl = import.meta.env.BASE_URL;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      {/* Back link */}
      <div className="mb-6">
        <Link
          to="/stories"
          className="text-sm text-slate-600 hover:text-slate-800 underline underline-offset-2"
        >
          ← Back to Stories
        </Link>
      </div>

      {/* Title & meta */}
      <header className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          {String(data?.title ?? "")}
        </h1>
        {data?.author && (
          <p className="mt-1 text-slate-600">by {data.author}</p>
        )}
        {displayDate && (
          <time className="block mt-1 text-sm text-slate-500">
            {displayDate}
          </time>
        )}
        {/* Cover image */}
        {data?.cover && (
          <img
            className="mt-6 w-full rounded-lg object-cover"
            src={`${baseUrl}${data.cover.replace(/^\/+/, "")}`}
            alt={data.title ?? "Cover image"}
          />
        )}
      </header>

      {/* Markdown body */}
      <div className="prose prose-slate prose-relaxed max-w-none mt-6">
        {content ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ node, ...props }) => {
                // Prepend BASE_URL to all Markdown image paths
                const src = props.src
                  ? `${baseUrl}${props.src.replace(/^\/+/, "")}`
                  : undefined;
                return <img {...props} src={src} />;
              },
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <p className="text-slate-600">
            This story is being prepared. Please check back soon.
          </p>
        )}
      </div>
    </article>
  );
}
