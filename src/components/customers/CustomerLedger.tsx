import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatNaira, formatDateTime } from "@/lib/format";
import { LEDGER_TYPE_LABEL } from "@/lib/ledgerLabels";
import type { LedgerEntry } from "@/types/admin";

export default function CustomerLedger({ entries }: { entries: LedgerEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-4 text-center text-sm text-text-light">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border divide-y divide-border">
      {entries.map((entry) => {
        const isCredit = entry.amount >= 0;
        return (
          <div key={entry.id} className="flex items-center gap-3 px-4 py-3">
            <div
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                isCredit ? "bg-tint-green" : "bg-tint-orange"
              }`}
            >
              {isCredit ? (
                <ArrowDownLeft size={14} className="text-primary" />
              ) : (
                <ArrowUpRight size={14} className="text-accent-orange" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-text">{LEDGER_TYPE_LABEL[entry.type]}</p>
              <p className="text-xs text-text-light">{formatDateTime(entry.createdAt)}</p>
            </div>
            <span className={`flex-shrink-0 text-sm font-medium ${isCredit ? "text-primary" : "text-text"}`}>
              {isCredit ? "+" : "−"}
              {formatNaira(Math.abs(entry.amount))}
            </span>
          </div>
        );
      })}
    </div>
  );
}
