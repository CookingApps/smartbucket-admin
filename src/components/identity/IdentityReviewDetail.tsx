"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import CustomerIdentityAudit from "@/components/customers/CustomerIdentityAudit";
import { IdentityStatusBadge } from "@/components/customers/StatusBadge";
import { formatDate } from "@/lib/format";
import { getMockCustomer, getMockIdentityAudit, resolveMockIdentity } from "@/lib/mockData";

export default function IdentityReviewDetail({
  customerId,
  onResolved,
}: {
  customerId: string;
  onResolved: () => void;
}) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  const customer = getMockCustomer(customerId);
  const audit = getMockIdentityAudit(customerId);
  void refreshTick; // forces this component to re-read the mock store after an action

  if (!customer) return <p className="text-sm text-accent-red">Couldn&rsquo;t load this customer.</p>;

  const resolved = customer.identityStatus !== "PENDING" && customer.identityStatus !== "FAILED";

  const decide = (outcome: "SUCCESS" | "CROSS_CHECK_FAILED") => {
    if (reason.trim().length < 3) {
      setError("Add a short reason (at least 3 characters) before saving.");
      return;
    }
    setError(null);
    resolveMockIdentity(customerId, outcome, reason);
    setReason("");
    setRefreshTick((t) => t + 1);
    onResolved();
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-lg font-medium text-text">
          {customer.firstName} {customer.lastName}
        </p>
        <p className="text-sm text-text-secondary">Joined {formatDate(customer.createdAt)}</p>
        <div className="mt-2">
          <IdentityStatusBadge status={customer.identityStatus} />
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border p-4">
        <div className="flex items-center gap-3 text-sm">
          <Mail size={16} className="text-text-light" />
          <span className="text-text">{customer.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone size={16} className="text-text-light" />
          <span className="text-text">{customer.phone}</span>
        </div>
      </div>

      <div>
        <p className="mb-2.5 text-sm font-medium text-text">Verification attempts</p>
        <CustomerIdentityAudit entries={audit} />
      </div>

      {resolved ? (
        <div className="rounded-2xl bg-tint-green px-4 py-3 text-sm text-primary">
          Already resolved — {customer.identityStatus === "VERIFIED" ? "verified" : "handled"}.
        </div>
      ) : (
        <div className="rounded-2xl border border-border p-4">
          <p className="mb-2 text-sm font-medium text-text">Resolve this review</p>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason (required — this is a demo-only action, no backend endpoint exists for it yet)"
            rows={2}
            className="w-full resize-none rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-none"
          />
          {error && <p className="mt-2 text-xs text-accent-red">{error}</p>}
          <div className="mt-3 flex flex-col gap-2">
            <Button variant="secondary" onClick={() => decide("SUCCESS")} className="w-full">
              Mark verified
            </Button>
            <Button variant="danger" onClick={() => decide("CROSS_CHECK_FAILED")} className="w-full">
              Reject verification
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
