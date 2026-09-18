// Mirrors prisma/schema.prisma in smartbucket-backend exactly, so demo data
// and live API responses share one shape.

export type LedgerTransactionType =
  | "DEPOSIT"
  | "ALLOCATION"
  | "MANUAL_ALLOCATION"
  | "BUCKET_TRANSFER"
  | "EXTERNAL_TRANSFER"
  | "TRANSFER_REVERSAL"
  | "PENALTY"
  | "FEE";

// Shape returned by AnalyticsService.history() / GET /admin/users/:id/ledger.
export interface LedgerEntry {
  id: string;
  type: LedgerTransactionType;
  amount: number; // kobo, signed net-for-this-user
  gross: number; // kobo
  createdAt: string;
}

import type { UserStatus } from "./user";

// Mirrors model UserStatusEvent — GET /admin/users/:id/status-events.
export interface StatusEvent {
  id: string;
  actor: string;
  fromStatus: UserStatus;
  toStatus: UserStatus;
  reason: string;
  createdAt: string;
}

export type IdentityAuditAction = "INITIAL_VERIFY" | "UPGRADE";
export type IdentityAuditOutcome =
  | "SUCCESS"
  | "PROVIDER_REJECTED"
  | "CROSS_CHECK_FAILED"
  | "DUPLICATE"
  | "PROVIDER_SYNC_FAILED";
export type IdentityMethod = "BVN" | "NIN" | "BOTH";

// Mirrors model IdentityAuditLog — GET /admin/users/:id/identity-audit.
export interface IdentityAuditEntry {
  id: string;
  action: IdentityAuditAction;
  outcome: IdentityAuditOutcome;
  previousMethod: IdentityMethod | null;
  newMethod: IdentityMethod | null;
  submitted: string | null;
  detail: string | null;
  createdAt: string;
}
