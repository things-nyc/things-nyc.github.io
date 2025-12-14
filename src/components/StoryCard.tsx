import type { Story } from "../data/stories";
import { Link } from "react-router-dom";

export default function StoryCard({ story }: { story: Story }) {
  return (
    <Link
      to={`/stories/${story.slug}`}
      className="group block rounded-xl border border-slate-200 hover:shadow-sm transition"
    >
      {story.cover && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-slate-100">
          {/* If you add images later, use <img src=... alt=... className="w-full h-full object-cover" /> */}
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{story.title}</h3>
        {story.author && (
          <div className="mt-1 text-xs text-slate-500">by {story.author}</div>
        )}
        <br />
        {story.imageUrl ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src={story.imageUrl}
              alt={story.title}
              loading="lazy"
              className={[
                "h-full w-full object-cover",
                // image hover zoom (very subtle)
                "transition-transform motion-safe:duration-300",
                "group-hover:scale-[1.02]",
                // respect reduced motion
                "motion-reduce:transform-none",
              ].join(" ")}
            />
            {/* Optional soft overlay on hover for contrast */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-black" />
          </div>
        ) : (
          // graceful placeholder if no cover provided
          <div className="relative aspect-[16/9] w-full bg-slate-100" />
        )}
        <p className="mt-2 text-sm text-slate-700 line-clamp-3">
          {story.summary}
        </p>

        {story.metrics && (story.metrics.sensors || story.metrics.gateways) && (
          <div className="mt-3 text-xs text-slate-600">
            {story.metrics.sensors ? `${story.metrics.sensors} sensors` : ""}
            {story.metrics.sensors && story.metrics.gateways ? " · " : ""}
            {story.metrics.gateways ? `${story.metrics.gateways} gateways` : ""}
          </div>
        )}

        {story.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {story.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded-full bg-slate-100"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
