"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Mail, Phone, Wallet, ShieldOff, ShieldAlert } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { AdminUserProfile } from "@/types/user";
import { UserStatusBadge, IdentityStatusBadge } from "./StatusBadge";
import Button from "@/components/ui/Button";

export default function CustomerDetail({
  userId,
  onStatusChanged,
}: {
  userId: string;
  onStatusChanged: () => void;
}) {
  const [profile, setProfile] = useState<AdminUserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setProfile(null);
    setError(null);
    setReason("");
    api
      .get<AdminUserProfile>(`/admin/users/${userId}`)
      .then(setProfile)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load this customer."));
  }, [userId]);

  const toggleFreeze = async () => {
    if (!profile) return;
    const nextStatus = profile.status === "RESTRICTED" ? "ACTIVE" : "RESTRICTED";
    if (reason.trim().length < 3) {
      setError("Add a short reason (at least 3 characters) before saving.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await api.patch(`/admin/users/${userId}/status`, { status: nextStatus, reason });
      setProfile({ ...profile, status: nextStatus });
      setReason("");
      onStatusChanged();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't update this account.");
    } finally {
      setSaving(false);
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

  const isFrozen = profile.status === "RESTRICTED" || profile.status === "SUSPENDED";

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

      <div className="rounded-2xl border border-border p-4">
        <p className="mb-2 flex items-center gap-2 text-sm font-medium text-text">
          {isFrozen ? <ShieldOff size={16} className="text-accent-red" /> : <ShieldAlert size={16} className="text-accent-orange" />}
          {isFrozen ? "Account is restricted" : "Freeze this account"}
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason (required, saved to the audit log)"
          rows={2}
          className="w-full resize-none rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-none"
        />
        {error && <p className="mt-2 text-xs text-accent-red">{error}</p>}
        <Button
          variant={isFrozen ? "secondary" : "danger"}
          onClick={toggleFreeze}
          loading={saving}
          className="mt-3 w-full"
        >
          {isFrozen ? "Restore account" : "Freeze account"}
        </Button>
      </div>
    </div>
  );
}
