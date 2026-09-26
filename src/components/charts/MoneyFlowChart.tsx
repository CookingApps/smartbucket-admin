"use client";

import { useState } from "react";
import { formatNaira } from "@/lib/format";
import type { DailyFlow } from "@/lib/mockData";

const HEIGHT = 180;
const HALF = HEIGHT / 2;
const BAR_W = 10;
const GAP = 2; // surface gap between the two bars in a day, and between days

export default function MoneyFlowChart({ data }: { data: DailyFlow[] }) {
  const [hover, setHover] = useState<number | null>(null);

  const maxArm = Math.max(...data.map((d) => Math.max(d.depositsKobo, d.withdrawalsKobo)), 1);
  const slot = 100 / data.length;
  const netKobo = data.reduce((sum, d) => sum + d.depositsKobo - d.withdrawalsKobo, 0);

  const barHeight = (v: number) => (v / maxArm) * (HALF - 8);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-text-secondary">
            <span className="h-2.5 w-2.5 rounded-sm bg-primary-bright" /> Deposits
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary">
            <span className="h-2.5 w-2.5 rounded-sm bg-accent-orange" /> Withdrawals
          </span>
        </div>
        <span className="text-xs text-text-secondary">
          Net <span className="font-medium text-text">{netKobo >= 0 ? "+" : "−"}{formatNaira(Math.abs(netKobo))}</span>
        </span>
      </div>

      <div className="relative" style={{ height: HEIGHT }}>
        {/* zero baseline */}
        <div className="absolute inset-x-0 border-t border-border" style={{ top: HALF }} />

        <div className="flex h-full">
          {data.map((d, i) => {
            const depH = barHeight(d.depositsKobo);
            const wdH = barHeight(d.withdrawalsKobo);
            const isHover = hover === i;
            return (
              <div
                key={d.date}
                className="relative flex-1 cursor-pointer"
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover((h) => (h === i ? null : h))}
                onFocus={() => setHover(i)}
                onBlur={() => setHover((h) => (h === i ? null : h))}
                tabIndex={0}
                role="img"
                aria-label={`${d.date}: ${formatNaira(d.depositsKobo)} in, ${formatNaira(d.withdrawalsKobo)} out`}
              >
                {/* crosshair wash on the hovered day */}
                {isHover && <div className="absolute inset-y-0 inset-x-0 bg-bg" />}

                <div
                  className="absolute rounded-t-[4px] bg-primary-bright transition-opacity"
                  style={{
                    height: depH,
                    width: BAR_W,
                    left: `calc(50% - ${BAR_W + GAP / 2}px)`,
                    top: HALF - depH,
                    opacity: hover === null || isHover ? 1 : 0.45,
                  }}
                />
                <div
                  className="absolute rounded-b-[4px] bg-accent-orange transition-opacity"
                  style={{
                    height: wdH,
                    width: BAR_W,
                    left: `calc(50% + ${GAP / 2}px)`,
                    top: HALF,
                    opacity: hover === null || isHover ? 1 : 0.45,
                  }}
                />

                {isHover && (
                  <div
                    className="pointer-events-none absolute z-10 w-max -translate-x-1/2 rounded-xl border border-border bg-surface px-3 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
                    style={{
                      left: "50%",
                      top: d.depositsKobo >= d.withdrawalsKobo ? HALF - depH - 8 : HALF + wdH + 8,
                      transform: d.depositsKobo >= d.withdrawalsKobo
                        ? "translate(-50%, -100%)"
                        : "translate(-50%, 0)",
                    }}
                  >
                    <p className="text-[11px] font-medium text-text-secondary">{formatChartDate(d.date)}</p>
                    <p className="text-xs">
                      <span className="font-semibold text-text">{formatNaira(d.depositsKobo)}</span>{" "}
                      <span className="text-text-light">in</span>
                    </p>
                    <p className="text-xs">
                      <span className="font-semibold text-text">{formatNaira(d.withdrawalsKobo)}</span>{" "}
                      <span className="text-text-light">out</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-1.5 flex text-[10px] text-text-light">
        {data.map((d, i) => (
          <span key={d.date} className="flex-1 text-center" style={{ opacity: i % 2 === 0 ? 1 : 0 }}>
            {formatChartDate(d.date)}
          </span>
        ))}
      </div>
    </div>
  );
}

function formatChartDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short" });
}
