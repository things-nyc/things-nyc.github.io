import { useEffect, useRef } from "react";

export type LightboxItem = {
  src: string; // display-size image
  fullSrc: string; // full-resolution original
  alt: string;
  caption?: string;
  date?: string;
};

export default function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: LightboxItem[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const item = items[index];

  useEffect(() => {
    lastActiveRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      lastActiveRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && index > 0) onIndexChange(index - 1);
      else if (e.key === "ArrowRight" && index < items.length - 1)
        onIndexChange(index + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onIndexChange]);

  if (!item) return null;

  const navButton =
    "absolute top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-30 disabled:cursor-default";

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-50 flex flex-col bg-black/90 focus:outline-none"
    >
      {/* top bar */}
      <div className="flex items-center justify-between px-4 py-3 text-sm text-white/80">
        <span>
          {index + 1} / {items.length}
        </span>
        <div className="flex items-center gap-4">
          <a
            href={item.fullSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white"
          >
            Full resolution ↗
          </a>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* image */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-12">
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-full max-w-full object-contain"
        />
        <button
          onClick={() => onIndexChange(index - 1)}
          disabled={index === 0}
          aria-label="Previous photo"
          className={`${navButton} left-2`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => onIndexChange(index + 1)}
          disabled={index === items.length - 1}
          aria-label="Next photo"
          className={`${navButton} right-2`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* caption bar */}
      <div className="px-4 py-3 text-center text-sm text-white/80 min-h-[2.75rem]">
        {item.caption && <span>{item.caption}</span>}
        {item.caption && item.date && <span> · </span>}
        {item.date && (
          <time className="text-white/50">
            {new Date(item.date).toLocaleDateString()}
          </time>
        )}
      </div>
    </div>
  );
}
