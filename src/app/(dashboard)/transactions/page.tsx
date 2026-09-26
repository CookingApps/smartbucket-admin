"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Sheet from "@/components/ui/Sheet";
import VolumeByTypeChart from "@/components/charts/VolumeByTypeChart";
import CustomerDetail from "@/components/customers/CustomerDetail";
import { LEDGER_TYPE_LABEL } from "@/lib/ledgerLabels";
import { formatNaira, formatDateTime } from "@/lib/format";
import { getAllMockLedgerEntries, getMockCustomer, getMockVolumeByType } from "@/lib/mockData";
import type { LedgerTransactionType } from "@/types/admin";

const TYPE_FILTERS: { label: string; value: LedgerTransactionType | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Deposits", value: "DEPOSIT" },
  { label: "Moved to buckets", value: "ALLOCATION" },
  { label: "Sent to bank", value: "EXTERNAL_TRANSFER" },
];

export default function TransactionsPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<LedgerTransactionType | "ALL">("ALL");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const entries = useMemo(() => getAllMockLedgerEntries(), []);
  const volumeByType = useMemo(() => getMockVolumeByType(), []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries
      .map((entry) => ({ entry, customer: getMockCustomer(entry.customerId) }))
      .filter(({ entry, customer }) => {
        if (typeFilter !== "ALL" && entry.type !== typeFilter) return false;
        if (!q) return true;
        const name = customer ? `${customer.firstName} ${customer.lastName} ${customer.email}`.toLowerCase() : "";
        return name.includes(q);
      });
  }, [entries, query, typeFilter]);

  const totalVolumeKobo = rows.reduce((sum, r) => sum + Math.abs(r.entry.amount), 0);

  return (
    <div>
      <PageHeader
        title="Transactions"
        subtitle="Every deposit, allocation, and withdrawal across every customer, in one place."
      />

      <Card className="p-5">
        <h2 className="mb-4 text-sm font-medium text-text">Volume by transaction type</h2>
        <VolumeByTypeChart data={volumeByType} />
      </Card>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-light" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by customer name or email…"
            className="h-11 w-full rounded-2xl border border-border bg-surface pl-11 pr-4 text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setTypeFilter(f.value)}
              className={`rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                typeFilter === f.value ? "bg-primary text-white" : "bg-bg text-text-secondary hover:bg-border/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs text-text-light">
        {rows.length} transaction{rows.length === 1 ? "" : "s"} · {formatNaira(totalVolumeKobo)} total volume
      </p>

      <div className="mt-2">
        {rows.length === 0 ? (
          <p className="py-8 text-center text-sm text-text-light">No transactions match that search.</p>
        ) : (
          <Card className="divide-y divide-border p-0">
            {rows.map(({ entry, customer }) => {
              const isCredit = entry.amount >= 0;
              return (
                <button
                  key={entry.id}
                  onClick={() => customer && setSelectedId(customer.id)}
                  className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-bg"
                >
                  <Avatar name={customer?.firstName ?? "?"} size={36} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text">
                      {customer ? `${customer.firstName} ${customer.lastName}` : "Unknown customer"}
                    </p>
                    <p className="truncate text-xs text-text-secondary">
                      {LEDGER_TYPE_LABEL[entry.type]} · {formatDateTime(entry.createdAt)}
                    </p>
                  </div>
                  <span className={`flex-shrink-0 text-sm font-medium ${isCredit ? "text-primary" : "text-text"}`}>
                    {isCredit ? "+" : "−"}
                    {formatNaira(Math.abs(entry.amount))}
                  </span>
                </button>
              );
            })}
          </Card>
        )}
      </div>

      <Sheet open={selectedId !== null} onClose={() => setSelectedId(null)} title="Customer">
        {selectedId && <CustomerDetail userId={selectedId} onStatusChanged={() => {}} />}
      </Sheet>
    </div>
  );
}
