import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { teardowns, teardownImage, latestDate } from "../data/teardowns";
import Lightbox from "../components/Lightbox";

export default function TeardownDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const teardown = teardowns.find((t) => t.slug === slug);

  if (!teardown) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-semibold">Teardown not found</h1>
        <p className="mt-2 text-slate-600">
          We couldn’t find <strong>{slug}</strong>.
        </p>
        <Link
          to="/teardowns"
          className="mt-4 inline-block text-sm text-slate-600 hover:text-slate-800 underline underline-offset-2"
        >
          ← Back to Teardowns
        </Link>
      </section>
    );
  }

  const items = teardown.photos.map((p, i) => ({
    src: teardownImage(teardown.slug, "display", p.file),
    fullSrc: teardownImage(teardown.slug, "full", p.file),
    alt: p.caption || `${teardown.title}, photo ${i + 1}`,
    caption: p.caption,
    date: p.date,
  }));

  const date = latestDate(teardown);

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-6">
        <Link
          to="/teardowns"
          className="text-sm text-slate-600 hover:text-slate-800 underline underline-offset-2"
        >
          ← Back to Teardowns
        </Link>
      </div>

      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          {teardown.title}
        </h1>
        <div className="mt-1 text-sm text-slate-500">
          {teardown.photos.length} photo
          {teardown.photos.length === 1 ? "" : "s"}
          {date ? ` · ${new Date(date).toLocaleDateString()}` : ""}
        </div>
        {teardown.description && (
          <p className="mt-4 text-slate-700">{teardown.description}</p>
        )}
      </header>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {teardown.photos.map((p, i) => (
          <button
            key={p.file}
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
            aria-label={items[i].alt}
          >
            <img
              src={teardownImage(teardown.slug, "thumb", p.file)}
              alt={items[i].alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform motion-safe:duration-300 group-hover:scale-[1.03] motion-reduce:transform-none"
            />
            {p.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-black/50 px-2 py-1 text-left text-xs text-white line-clamp-2">
                {p.caption}
              </div>
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          items={items}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
