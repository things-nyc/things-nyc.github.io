import { useEffect, useRef } from "react";

export default function Modal({
  open,
  onClose,
  children,
  labelledById,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledById: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      lastActiveRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      dialogRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      lastActiveRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledById}
    >
      {/* overlay */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      {/* panel */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative mx-4 max-h-[85vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white shadow-xl focus:outline-none"
      >
        {children}
      </div>
    </div>
  );
}
