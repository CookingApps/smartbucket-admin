"use client";

interface Props {
  approvedAsIs: number;
  edited: number;
  dismissed: number;
}

const SEGMENTS: { key: keyof Props; label: string; swatch: string }[] = [
  { key: "approvedAsIs", label: "Approved as-is", swatch: "bg-primary-bright" },
  { key: "edited", label: "Approved, edited first", swatch: "bg-accent-blue" },
  { key: "dismissed", label: "Dismissed", swatch: "bg-accent-orange" },
];

// Part-to-whole across three named outcomes -> categorical stacked bar, per
// the dataviz method. 2px surface gaps between segments do the separating,
// not a border.
export default function AllocationOutcomeBar({ approvedAsIs, edited, dismissed }: Props) {
  const total = approvedAsIs + edited + dismissed || 1;
  const values = { approvedAsIs, edited, dismissed };

  return (
    <div>
      <div className="flex h-7 w-full gap-0.5 overflow-hidden rounded-full">
        {SEGMENTS.map((s) => {
          const pct = (values[s.key] / total) * 100;
          if (pct <= 0) return null;
          return <div key={s.key} className={`h-full ${s.swatch}`} style={{ width: `${pct}%` }} />;
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        {SEGMENTS.map((s) => {
          const pct = Math.round((values[s.key] / total) * 100);
          return (
            <span key={s.key} className="flex items-center gap-1.5 text-xs text-text-secondary">
              <span className={`h-2.5 w-2.5 rounded-sm ${s.swatch}`} />
              {s.label} <span className="font-medium text-text">{pct}%</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
