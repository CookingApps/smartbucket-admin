"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

// Bottom sheet on mobile, right-side panel on desktop — same rounded-3xl /
// no-shadow language as the rest of the panel, just two breakpoints of the
// same idea (this is what the app itself does with its own bottom sheets).
export default function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl bg-surface
                   sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:max-h-none sm:w-full sm:max-w-md sm:rounded-t-none sm:rounded-l-3xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-medium text-text">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-bg text-text-secondary"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 pb-[max(env(safe-area-inset-bottom),16px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
