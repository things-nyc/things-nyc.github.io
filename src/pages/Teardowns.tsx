import { Link } from "react-router-dom";
import { teardowns, teardownImage, latestDate } from "../data/teardowns";

function monthYear(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

export default function Teardowns() {
  const sorted = [...teardowns].sort((a, b) =>
    latestDate(b).localeCompare(latestDate(a))
  );

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Teardowns</h1>
        <p className="mt-2 text-slate-600">
          Inside the LoRaWAN hardware we work with: teardown photos by
          Elliott Highfill. Click a device to browse, and open any photo at
          full resolution to read chip markings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((t) => {
          const cover = t.photos[0];
          return (
            <Link
              key={t.slug}
              to={`/teardowns/${t.slug}`}
              className="group block rounded-xl border border-slate-200 hover:shadow-sm transition overflow-hidden"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                {cover && (
                  <img
                    src={teardownImage(t.slug, "thumb", cover.file)}
                    alt={t.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform motion-safe:duration-300 group-hover:scale-[1.02] motion-reduce:transform-none"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{t.title}</h3>
                <div className="mt-1 text-xs text-slate-500">
                  {t.photos.length} photo{t.photos.length === 1 ? "" : "s"}
                  {latestDate(t) ? ` · ${monthYear(latestDate(t))}` : ""}
                </div>
                {t.description && (
                  <p className="mt-2 text-sm text-slate-700 line-clamp-3">
                    {t.description}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
