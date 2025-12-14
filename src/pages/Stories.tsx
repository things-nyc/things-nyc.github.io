import StoryCard from "../components/StoryCard";
import { stories } from "../data/stories";

export default function Stories() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex items-end justify-between gap-6 mb-6">
        <h1 className="text-3xl font-semibold">Success Stories</h1>
        {/* (optional future) tag filter/search goes here */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((s) => (
          <StoryCard key={s.slug} story={s} />
        ))}
      </div>
    </section>
  );
}
