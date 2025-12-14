type Props = {
  videoSrc: string; // e.g. "/videos/nyc-drone.mp4" (put in /public/videos)
  poster?: string; // optional preview image
  quote: string; // the testimonial text
  author: string; // e.g. "Michael R. Bloomberg"
  role?: string; // e.g. "Former Mayor of New York City"
  link?: string;
};

export default function Testimonial({
  videoSrc,
  poster,
  quote,
  author,
  role,
  link,
}: Props) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch">
        {/* Left: Video */}
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <video
            className="h-full w-full object-cover"
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
          />
          {/* optional soft gradient for legibility if text overlaps on small screens */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
        </div>

        {/* Right: Testimonial */}
        <div className="flex flex-col justify-center">
          <div className="relative">
            <div className="text-5xl leading-none text-slate-300 select-none">
              “
            </div>
            <blockquote className="mt-2 text-xl md:text-2xl font-medium text-slate-900">
              {quote}
            </blockquote>
          </div>

          <div className="mt-4 text-slate-600">
            <div className="font-semibold text-slate-900 underline">
              <a className="text-blue-500" href={link}>
                {author}
              </a>
            </div>
            {role && <div className="text-sm">{role}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
