import { Lock } from "lucide-react";
import { formatNaira } from "@/lib/format";
import type { MockBucket } from "@/lib/mockData";

const TONE_BAR: Record<MockBucket["tone"], string> = {
  green: "bg-primary",
  red: "bg-accent-red",
  orange: "bg-accent-orange",
  blue: "bg-accent-blue",
  purple: "bg-accent-purple",
  teal: "bg-accent-teal",
  pink: "bg-accent-pink",
};

const TONE_CHIP: Record<MockBucket["tone"], string> = {
  green: "bg-tint-green",
  red: "bg-tint-red",
  orange: "bg-tint-orange",
  blue: "bg-tint-blue",
  purple: "bg-tint-purple",
  teal: "bg-tint-teal",
  pink: "bg-tint-pink",
};

function BucketRow({ bucket }: { bucket: MockBucket }) {
  const pct = bucket.targetAmountKobo
    ? Math.min(100, Math.round((bucket.currentAmountKobo / bucket.targetAmountKobo) * 100))
    : null;

  return (
    <div className="rounded-2xl border border-border p-3.5">
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-base ${TONE_CHIP[bucket.tone]}`}>
          {bucket.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-medium text-text">{bucket.name}</p>
            {bucket.protection === "LOCKED" && <Lock size={11} className="flex-shrink-0 text-text-light" />}
          </div>
          <p className="text-xs text-text-secondary">
            {pct !== null
              ? `${formatNaira(bucket.currentAmountKobo)} of ${formatNaira(bucket.targetAmountKobo!)}`
              : `${formatNaira(bucket.currentAmountKobo)} saved`}
          </p>
        </div>
        {pct !== null && <span className="flex-shrink-0 text-xs font-medium text-text-secondary">{pct}%</span>}
      </div>
      {pct !== null && (
        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-bg">
          <div className={`h-full rounded-full ${TONE_BAR[bucket.tone]}`} style={{ width: `${pct}%` }} />
        </div>
      )}
    </div>
  );
}

export default function CustomerBuckets({ buckets }: { buckets: MockBucket[] }) {
  if (buckets.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-4 text-center text-sm text-text-light">
        No buckets yet
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {buckets.map((bucket) => (
        <BucketRow key={bucket.id} bucket={bucket} />
      ))}
    </div>
  );
}
