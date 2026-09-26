"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import IconChip from "@/components/ui/IconChip";
import Sheet from "@/components/ui/Sheet";
import { ShieldAlert, ShieldX } from "lucide-react";
import { IdentityStatusBadge } from "@/components/customers/StatusBadge";
import IdentityReviewDetail from "@/components/identity/IdentityReviewDetail";
import { formatDateTime } from "@/lib/format";
import { getMockIdentityQueue } from "@/lib/mockData";

const OUTCOME_SNIPPET: Record<string, string> = {
  SUCCESS: "Verified",
  PROVIDER_REJECTED: "Rejected by registry",
  CROSS_CHECK_FAILED: "Name mismatch",
  DUPLICATE: "Duplicate ID",
  PROVIDER_SYNC_FAILED: "Sync failed",
};

export default function IdentityPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);
  const queue = getMockIdentityQueue();
  void refreshTick;

  const pendingCount = queue.filter((q) => q.customer.identityStatus === "PENDING").length;
  const failedCount = queue.filter((q) => q.customer.identityStatus === "FAILED").length;

  return (
    <div>
      <PageHeader
        title="Identity Verification"
        subtitle="The review queue for identity checks the system couldn't approve automatically."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          label="Awaiting review"
          value={pendingCount.toLocaleString()}
          hint="Never checked yet"
          icon={
            <IconChip size={32} className="bg-tint-orange">
              <ShieldAlert size={16} className="text-accent-orange" />
            </IconChip>
          }
        />
        <StatCard
          label="Failed"
          value={failedCount.toLocaleString()}
          hint="Rejected or locked"
          icon={
            <IconChip size={32} className="bg-tint-red">
              <ShieldX size={16} className="text-accent-red" />
            </IconChip>
          }
        />
      </div>

      <div className="mt-5">
        {queue.length === 0 ? (
          <Card className="py-10 text-center text-sm text-text-light">Nothing needs review right now.</Card>
        ) : (
          <Card className="divide-y divide-border p-0">
            {queue.map(({ customer, latest }) => (
              <button
                key={customer.id}
                onClick={() => setSelectedId(customer.id)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-bg"
              >
                <Avatar name={customer.firstName} size={40} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text">
                    {customer.firstName} {customer.lastName}
                  </p>
                  <p className="truncate text-xs text-text-secondary">
                    {OUTCOME_SNIPPET[latest.outcome] ?? latest.outcome}
                    {latest.detail ? ` — ${latest.detail}` : ""}
                  </p>
                </div>
                <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
                  <IdentityStatusBadge status={customer.identityStatus} />
                  <span className="text-xs text-text-light">{formatDateTime(latest.createdAt)}</span>
                </div>
              </button>
            ))}
          </Card>
        )}
      </div>

      <Sheet open={selectedId !== null} onClose={() => setSelectedId(null)} title="Identity review">
        {selectedId && (
          <IdentityReviewDetail customerId={selectedId} onResolved={() => setRefreshTick((t) => t + 1)} />
        )}
      </Sheet>
    </div>
  );
}
