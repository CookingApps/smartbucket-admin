"use client";

import { useState } from "react";
import { formatNaira } from "@/lib/format";

export interface RankedBarDatum {
  label: string;
  valueKobo: number;
}

// Single measure ranked across categories -> one hue throughout (sequential
// job, not categorical identity) per the dataviz method: bar length alone
// carries the comparison, color doesn't need to re-encode it. Shared by
// Transactions ("volume by type") and Insights ("what customers save for").
export default function RankedBarChart({
  data,
  emptyLabel = "Nothing to show yet",
}: {
  data: RankedBarDatum[];
  emptyLabel?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.valueKobo), 1);

  if (data.length === 0) {
    return <p className="py-6 text-center text-sm text-text-light">{emptyLabel}</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((d, i) => {
        const pct = Math.max(4, (d.valueKobo / max) * 100);
        const isHover = hover === i;
        return (
          <div
            key={d.label}
            className="flex items-center gap-3"
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover((h) => (h === i ? null : h))}
            onFocus={() => setHover(i)}
            onBlur={() => setHover((h) => (h === i ? null : h))}
            tabIndex={0}
          >
            <span className="w-40 flex-shrink-0 truncate text-xs text-text-secondary">{d.label}</span>
            <div className="relative h-6 flex-1 rounded-full bg-bg">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-primary-bright transition-opacity"
                style={{ width: `${pct}%`, opacity: hover === null || isHover ? 1 : 0.5 }}
              />
            </div>
            <span className="w-24 flex-shrink-0 text-right text-xs font-medium text-text">
              {formatNaira(d.valueKobo)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
