import { useRef, useState } from "react";
import type { Project } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectQuickView from "./ProjectQuickView";

export default function ProjectsRail({
  items,
  title = "Active Projects",
}: {
  items: Project[];
  title?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  const scrollByCards = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[role='listitem']");
    const amount = card ? card.offsetWidth + 24 /*gap*/ : 320;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };
  const handleOpen = (p: Project) => {
    setSelected(p);
    setOpen(true);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
          <p className="mt-1 text-slate-600">
            Read about our active projects to see if there is one that interests
            you.
          </p>
        </div>
        {/* Arrows (optional) */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scrollByCards("left")}
            className="rounded-full border border-slate-200 px-3 py-2 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 cursor-pointer"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => scrollByCards("right")}
            className="rounded-full border border-slate-200 px-3 py-2 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 cursor-pointer"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal scroller */}
      <div
        ref={scrollerRef}
        role="list"
        className={[
          "mt-6 flex gap-6",
          "overflow-x-auto overscroll-x-contain",
          "scroll-smooth snap-x snap-mandatory",
          "px-1 -mx-1", // tiny viewport padding so first/last aren’t flush
          "[scrollbar-width:thin] [scrollbar-color:theme(colors.slate.200)_transparent]",
        ].join(" ")}
      >
        {items.map((p) => (
          <ProjectCard key={p.slug} p={p} onOpen={handleOpen} />
        ))}
      </div>

      <ProjectQuickView
        project={selected}
        open={open}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
