"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Mail, Phone, Wallet } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { AdminUserProfile, UserStatus } from "@/types/user";
import type { LedgerEntry, StatusEvent, IdentityAuditEntry } from "@/types/admin";
import { UserStatusBadge, IdentityStatusBadge } from "./StatusBadge";
import Button from "@/components/ui/Button";
import { DEMO_MODE } from "@/lib/demo";
import {
  getMockCustomer,
  getMockBuckets,
  getMockLedger,
  getMockStatusEvents,
  getMockIdentityAudit,
  setMockCustomerStatus,
} from "@/lib/mockData";
import CustomerBuckets from "./CustomerBuckets";
import CustomerLedger from "./CustomerLedger";
import CustomerStatusHistory from "./CustomerStatusHistory";
import CustomerIdentityAudit from "./CustomerIdentityAudit";

// Every status an admin can move an account to from wherever it is now —
// mirrors UserStatus in prisma/schema.prisma (ACTIVE/REVIEW/RESTRICTED/
// SUSPENDED). Previously this was a single Freeze/Restore toggle that only
// knew about ACTIVE and RESTRICTED — a SUSPENDED account's "Restore" button
// silently set it to RESTRICTED instead of ACTIVE. This replaces that with
// the actual action set for each state.
const STATUS_ACTIONS: Record<
  UserStatus,
  { label: string; target: UserStatus; variant: "secondary" | "warning" | "danger" }[]
> = {
  ACTIVE: [
    { label: "Restrict account", target: "RESTRICTED", variant: "warning" },
    { label: "Suspend account", target: "SUSPENDED", variant: "danger" },
  ],
  REVIEW: [
    { label: "Approve → Active", target: "ACTIVE", variant: "secondary" },
    { label: "Restrict account", target: "RESTRICTED", variant: "warning" },
    { label: "Suspend account", target: "SUSPENDED", variant: "danger" },
  ],
  RESTRICTED: [
    { label: "Restore to Active", target: "ACTIVE", variant: "secondary" },
    { label: "Suspend account", target: "SUSPENDED", variant: "danger" },
  ],
  SUSPENDED: [{ label: "Restore to Active", target: "ACTIVE", variant: "secondary" }],
};

export default function CustomerDetail({
  userId,
  onStatusChanged,
}: {
  userId: string;
  onStatusChanged: () => void;
}) {
  const [profile, setProfile] = useState<AdminUserProfile | null>(null);
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [statusEvents, setStatusEvents] = useState<StatusEvent[]>([]);
  const [identityAudit, setIdentityAudit] = useState<IdentityAuditEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [savingTarget, setSavingTarget] = useState<UserStatus | null>(null);

  useEffect(() => {
    setProfile(null);
    setError(null);
    setReason("");
    setLedger([]);
    setStatusEvents([]);
    setIdentityAudit([]);

    if (DEMO_MODE) {
      const mock = getMockCustomer(userId);
      if (mock) {
        setProfile(mock);
        setLedger(getMockLedger(userId));
        setStatusEvents(getMockStatusEvents(userId));
        setIdentityAudit(getMockIdentityAudit(userId));
      } else {
        setError("Couldn't load this customer.");
      }
      return;
    }

    api
      .get<AdminUserProfile>(`/admin/users/${userId}`)
      .then(setProfile)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load this customer."));

    api.get<LedgerEntry[]>(`/admin/users/${userId}/ledger?limit=20`).then(setLedger).catch(() => {});
    api.get<StatusEvent[]>(`/admin/users/${userId}/status-events`).then(setStatusEvents).catch(() => {});
    api.get<IdentityAuditEntry[]>(`/admin/users/${userId}/identity-audit`).then(setIdentityAudit).catch(() => {});
  }, [userId]);

  const changeStatus = async (target: UserStatus) => {
    if (!profile) return;
    if (reason.trim().length < 3) {
      setError("Add a short reason (at least 3 characters) before saving.");
      return;
    }
    setError(null);

    if (DEMO_MODE) {
      setMockCustomerStatus(userId, target, reason);
      setProfile({ ...profile, status: target });
      setStatusEvents(getMockStatusEvents(userId));
      setReason("");
      onStatusChanged();
      return;
    }

    setSavingTarget(target);
    try {
      await api.patch(`/admin/users/${userId}/status`, { status: target, reason });
      setProfile({ ...profile, status: target });
      setReason("");
      onStatusChanged();
      api.get<StatusEvent[]>(`/admin/users/${userId}/status-events`).then(setStatusEvents).catch(() => {});
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't update this account.");
    } finally {
      setSavingTarget(null);
    }
  };

  if (error && !profile) {
    return <p className="text-sm text-accent-red">{error}</p>;
  }

  if (!profile) {
    return (
      <div className="flex justify-center py-10">
        <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-lg font-medium text-text">
          {profile.firstName} {profile.lastName}
        </p>
        <p className="text-sm text-text-secondary">Joined {formatDate(profile.createdAt)}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <UserStatusBadge status={profile.status} />
          <IdentityStatusBadge status={profile.identityStatus} />
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border p-4">
        <div className="flex items-center gap-3 text-sm">
          <Mail size={16} className="text-text-light" />
          <span className="text-text">{profile.email}</span>
          {profile.emailVerified && <ShieldCheck size={14} className="text-primary" />}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone size={16} className="text-text-light" />
          <span className="text-text">{profile.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Wallet size={16} className="text-text-light" />
          <span className="text-text">{profile.walletActive ? "Wallet active" : "No wallet yet"}</span>
        </div>
        {profile.identityMethod && (
          <div className="flex items-center gap-3 text-sm">
            <ShieldCheck size={16} className="text-text-light" />
            <span className="text-text">Verified via {profile.identityMethod}</span>
          </div>
        )}
      </div>

      <div>
        <p className="mb-2.5 text-sm font-medium text-text">Buckets</p>
        {DEMO_MODE ? (
          <CustomerBuckets buckets={getMockBuckets(userId)} />
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-4 text-center text-sm text-text-light">
            Not wired up in the admin API yet
          </div>
        )}
      </div>

      <div>
        <p className="mb-2.5 text-sm font-medium text-text">Recent transactions</p>
        <CustomerLedger entries={ledger} />
      </div>

      <div>
        <p className="mb-2.5 text-sm font-medium text-text">Identity verification history</p>
        <CustomerIdentityAudit entries={identityAudit} />
      </div>

      <div>
        <p className="mb-2.5 text-sm font-medium text-text">Account status history</p>
        <CustomerStatusHistory events={statusEvents} />
      </div>

      <div className="rounded-2xl border border-border p-4">
        <p className="mb-2 text-sm font-medium text-text">Change account status</p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason (required, saved to the audit log)"
          rows={2}
          className="w-full resize-none rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-none"
        />
        {error && <p className="mt-2 text-xs text-accent-red">{error}</p>}
        <div className="mt-3 flex flex-col gap-2">
          {STATUS_ACTIONS[profile.status].map((action) => (
            <Button
              key={action.target}
              variant={action.variant}
              onClick={() => changeStatus(action.target)}
              loading={savingTarget === action.target}
              disabled={savingTarget !== null && savingTarget !== action.target}
              className="w-full"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
