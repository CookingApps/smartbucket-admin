import { CheckCircle2, XCircle } from "lucide-react";
import { formatDateTime } from "@/lib/format";
import type { IdentityAuditEntry, IdentityAuditOutcome } from "@/types/admin";

const OUTCOME_LABEL: Record<IdentityAuditOutcome, string> = {
  SUCCESS: "Verified",
  PROVIDER_REJECTED: "Rejected by registry",
  CROSS_CHECK_FAILED: "Name mismatch",
  DUPLICATE: "Duplicate ID",
  PROVIDER_SYNC_FAILED: "Sync failed",
};

export default function CustomerIdentityAudit({ entries }: { entries: IdentityAuditEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-4 text-center text-sm text-text-light">
        No verification attempts yet
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {entries.map((entry) => {
        const ok = entry.outcome === "SUCCESS";
        return (
          <div key={entry.id} className="flex items-start gap-3 rounded-2xl border border-border p-3.5">
            {ok ? (
              <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-primary" />
            ) : (
              <XCircle size={16} className="mt-0.5 flex-shrink-0 text-accent-red" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-text">
                {OUTCOME_LABEL[entry.outcome]}
                {entry.submitted && <span className="text-text-secondary"> · {entry.submitted}</span>}
              </p>
              {entry.detail && <p className="mt-0.5 text-xs text-text-secondary">{entry.detail}</p>}
              <p className="mt-1 text-xs text-text-light">{formatDateTime(entry.createdAt)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
