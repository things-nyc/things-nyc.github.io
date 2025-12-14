import type { Project } from "../data/projects";

export default function ProjectCard({
  p,
  onOpen,
}: {
  p: Project;
  onOpen: (project: Project) => void;
}) {
  return (
    <div
      onClick={() => {
        onOpen(p);
      }}
      role="listitem"
      className={[
        "snap-start shrink-0 w-[280px] sm:w-[310px]",
        "rounded-xl border border-slate-200 bg-white",
        "overflow-hidden",
        "transition-shadow motion-safe:duration-200 hover:shadow-md",
        "focus:ring-1 focus:ring-slate-100",
        "cursor-pointer",
      ].join(" ")}
      tabIndex={-1}
    >
      {/* Cover */}
      <div className="relative aspect-[16/9] bg-slate-100">
        {p.imageUrl ? (
          <img
            src={p.imageUrl}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-base font-semibold leading-snug">{p.title}</h3>

        <div className="mt-2 grid grid-cols-1 gap-1 text-sm text-slate-700">
          <div>
            <span className="text-slate-500">Lead: </span>
            {p.lead}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500"> Status:</span>
            <span className="rounded-full ">{p.status}</span>
          </div>
        </div>

        {/* optional: small tag for project type */}
        <div className="mt-3">
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-50 text-slate-600">
            {p.projectType}
          </span>
        </div>
      </div>
    </div>
  );
}
