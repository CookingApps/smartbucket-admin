import type { AdminUserProfile } from "@/types/user";
import type { LedgerEntry, StatusEvent, IdentityAuditEntry } from "@/types/admin";

export interface MockBucket {
  id: string;
  name: string;
  emoji: string;
  tone: "green" | "red" | "orange" | "blue" | "purple" | "teal" | "pink";
  protection: "FLEXIBLE" | "LOCKED";
  targetAmountKobo: number | null;
  currentAmountKobo: number;
}

// Sample customers for today's demo — deliberately varied so every status
// badge and identity state actually shows up somewhere in the list.
export const MOCK_CUSTOMERS: AdminUserProfile[] = [
  {
    id: "d1a1c2b0-0001-4a11-9d11-000000000001",
    email: "amaka.eze@gmail.com",
    phone: "+2348031234567",
    firstName: "Amaka",
    lastName: "Eze",
    status: "ACTIVE",
    createdAt: "2026-06-12T09:00:00.000Z",
    emailVerified: true,
    identityStatus: "VERIFIED",
    identityMethod: "BVN",
    walletActive: true,
  },
  {
    id: "d1a1c2b0-0002-4a11-9d11-000000000002",
    email: "chiamaka.obi@yahoo.com",
    phone: "+2348052345678",
    firstName: "Chiamaka",
    lastName: "Obi",
    status: "REVIEW",
    createdAt: "2026-08-30T14:20:00.000Z",
    emailVerified: true,
    identityStatus: "PENDING",
    identityMethod: null,
    walletActive: false,
  },
  {
    id: "d1a1c2b0-0003-4a11-9d11-000000000003",
    email: "tunde.bakare@outlook.com",
    phone: "+2347013456789",
    firstName: "Tunde",
    lastName: "Bakare",
    status: "RESTRICTED",
    createdAt: "2026-05-02T11:45:00.000Z",
    emailVerified: true,
    identityStatus: "FAILED",
    identityMethod: null,
    walletActive: true,
  },
  {
    id: "d1a1c2b0-0004-4a11-9d11-000000000004",
    email: "fatima.sule@gmail.com",
    phone: "+2348094567890",
    firstName: "Fatima",
    lastName: "Sule",
    status: "SUSPENDED",
    createdAt: "2026-03-18T08:10:00.000Z",
    emailVerified: false,
    identityStatus: "FAILED",
    identityMethod: null,
    walletActive: false,
  },
  {
    id: "d1a1c2b0-0005-4a11-9d11-000000000005",
    email: "victor.okon@gmail.com",
    phone: "+2348165678901",
    firstName: "Victor",
    lastName: "Okon",
    status: "ACTIVE",
    createdAt: "2026-07-21T16:30:00.000Z",
    emailVerified: true,
    identityStatus: "VERIFIED",
    identityMethod: "NIN",
    walletActive: true,
  },
  {
    id: "d1a1c2b0-0006-4a11-9d11-000000000006",
    email: "blessing.udo@gmail.com",
    phone: "+2348076789012",
    firstName: "Blessing",
    lastName: "Udo",
    status: "ACTIVE",
    createdAt: "2026-09-01T12:00:00.000Z",
    emailVerified: true,
    identityStatus: "VERIFIED",
    identityMethod: "BVN",
    walletActive: true,
  },
];

// Keyed by customer id — mirrors the real Bucket model (name, color, target,
// FLEXIBLE/LOCKED) closely enough to demo the concept. Two customers are
// deliberately left with none: Chiamaka and Fatima both have no active
// wallet yet, so no buckets is the honest state for them.
export const MOCK_BUCKETS: Record<string, MockBucket[]> = {
  "d1a1c2b0-0001-4a11-9d11-000000000001": [
    { id: "b-1", name: "Rent", emoji: "🏠", tone: "orange", protection: "LOCKED", targetAmountKobo: 300_000_00, currentAmountKobo: 180_000_00 },
    { id: "b-2", name: "Japa Fund", emoji: "✈️", tone: "blue", protection: "FLEXIBLE", targetAmountKobo: null, currentAmountKobo: 450_000_00 },
    { id: "b-3", name: "Emergency", emoji: "🚨", tone: "teal", protection: "LOCKED", targetAmountKobo: 200_000_00, currentAmountKobo: 200_000_00 },
  ],
  "d1a1c2b0-0003-4a11-9d11-000000000003": [
    { id: "b-4", name: "School Fees", emoji: "🎓", tone: "purple", protection: "LOCKED", targetAmountKobo: 150_000_00, currentAmountKobo: 90_000_00 },
    { id: "b-5", name: "Data & Airtime", emoji: "📶", tone: "pink", protection: "FLEXIBLE", targetAmountKobo: null, currentAmountKobo: 5_000_00 },
  ],
  "d1a1c2b0-0005-4a11-9d11-000000000005": [
    { id: "b-6", name: "Wedding", emoji: "💍", tone: "red", protection: "LOCKED", targetAmountKobo: 1_000_000_00, currentAmountKobo: 620_000_00 },
    { id: "b-7", name: "New Laptop", emoji: "💻", tone: "orange", protection: "FLEXIBLE", targetAmountKobo: 350_000_00, currentAmountKobo: 350_000_00 },
    { id: "b-8", name: "Business Capital", emoji: "📈", tone: "teal", protection: "FLEXIBLE", targetAmountKobo: null, currentAmountKobo: 275_000_00 },
  ],
  "d1a1c2b0-0006-4a11-9d11-000000000006": [
    { id: "b-9", name: "Christmas", emoji: "🎄", tone: "pink", protection: "LOCKED", targetAmountKobo: 100_000_00, currentAmountKobo: 40_000_00 },
    { id: "b-10", name: "Vacation", emoji: "🏖️", tone: "blue", protection: "FLEXIBLE", targetAmountKobo: 500_000_00, currentAmountKobo: 120_000_00 },
  ],
};

export function getMockBuckets(customerId: string): MockBucket[] {
  return MOCK_BUCKETS[customerId] ?? [];
}

// Real sum of every bucket above — kept computed rather than a separate
// hardcoded number, so Overview's hero figure can never drift out of sync
// with what Customers actually shows for each person.
export function getTotalMockBucketBalance(): number {
  return Object.values(MOCK_BUCKETS)
    .flat()
    .reduce((sum, b) => sum + b.currentAmountKobo, 0);
}

// Mirrors GET /admin/users/:id/ledger — same shape AnalyticsService.history()
// returns (id, type, signed amount, gross, createdAt), no description field
// on the real thing, so the UI derives its label from `type`.
export const MOCK_LEDGER: Record<string, LedgerEntry[]> = {
  "d1a1c2b0-0001-4a11-9d11-000000000001": [
    { id: "l-1", type: "DEPOSIT", amount: 200_000_00, gross: 200_000_00, createdAt: "2026-08-15T10:12:00.000Z" },
    { id: "l-2", type: "ALLOCATION", amount: -30_000_00, gross: 0, createdAt: "2026-09-10T09:00:00.000Z" },
    { id: "l-3", type: "DEPOSIT", amount: 50_000_00, gross: 50_000_00, createdAt: "2026-09-10T09:05:00.000Z" },
  ],
  "d1a1c2b0-0003-4a11-9d11-000000000003": [
    { id: "l-4", type: "DEPOSIT", amount: 100_000_00, gross: 100_000_00, createdAt: "2026-04-28T13:20:00.000Z" },
    { id: "l-5", type: "ALLOCATION", amount: -90_000_00, gross: 0, createdAt: "2026-04-29T08:15:00.000Z" },
    { id: "l-6", type: "EXTERNAL_TRANSFER", amount: -5_000_00, gross: 0, createdAt: "2026-05-01T17:40:00.000Z" },
  ],
  "d1a1c2b0-0005-4a11-9d11-000000000005": [
    { id: "l-7", type: "DEPOSIT", amount: 700_000_00, gross: 700_000_00, createdAt: "2026-07-22T09:00:00.000Z" },
    { id: "l-8", type: "ALLOCATION", amount: -350_000_00, gross: 0, createdAt: "2026-07-23T11:30:00.000Z" },
    { id: "l-9", type: "ALLOCATION", amount: -300_000_00, gross: 0, createdAt: "2026-08-05T14:10:00.000Z" },
    { id: "l-10", type: "EXTERNAL_TRANSFER", amount: -50_000_00, gross: 0, createdAt: "2026-08-20T16:00:00.000Z" },
  ],
  "d1a1c2b0-0006-4a11-9d11-000000000006": [
    { id: "l-11", type: "DEPOSIT", amount: 160_000_00, gross: 160_000_00, createdAt: "2026-09-01T12:30:00.000Z" },
    { id: "l-12", type: "ALLOCATION", amount: -40_000_00, gross: 0, createdAt: "2026-09-02T08:00:00.000Z" },
    { id: "l-13", type: "ALLOCATION", amount: -120_000_00, gross: 0, createdAt: "2026-09-02T08:01:00.000Z" },
  ],
};

export function getMockLedger(customerId: string): LedgerEntry[] {
  return MOCK_LEDGER[customerId] ?? [];
}

// Mirrors model UserStatusEvent / GET /admin/users/:id/status-events —
// append-only, so actions taken during the demo get pushed onto this
// instead of replacing anything.
export const MOCK_STATUS_EVENTS: Record<string, StatusEvent[]> = {
  "d1a1c2b0-0003-4a11-9d11-000000000003": [
    { id: "s-1", fromStatus: "ACTIVE", toStatus: "RESTRICTED", reason: "3 failed BVN verification attempts", actor: "system", createdAt: "2026-09-18T07:15:00.000Z" },
  ],
  "d1a1c2b0-0004-4a11-9d11-000000000004": [
    { id: "s-2", fromStatus: "ACTIVE", toStatus: "SUSPENDED", reason: "Duplicate BVN linked to another verified account", actor: "compliance@smartbucket.co", createdAt: "2026-09-17T12:00:00.000Z" },
  ],
};

export function getMockStatusEvents(customerId: string): StatusEvent[] {
  return MOCK_STATUS_EVENTS[customerId] ?? [];
}

function pushMockStatusEvent(
  customerId: string,
  fromStatus: AdminUserProfile["status"],
  toStatus: AdminUserProfile["status"],
  reason: string,
): void {
  const list = MOCK_STATUS_EVENTS[customerId] ?? (MOCK_STATUS_EVENTS[customerId] = []);
  list.unshift({
    id: `s-${Date.now()}`,
    fromStatus,
    toStatus,
    reason,
    actor: "you (demo)",
    createdAt: new Date().toISOString(),
  });
}

// Mirrors model IdentityAuditLog / GET /admin/users/:id/identity-audit.
export const MOCK_IDENTITY_AUDIT: Record<string, IdentityAuditEntry[]> = {
  "d1a1c2b0-0001-4a11-9d11-000000000001": [
    { id: "i-1", action: "INITIAL_VERIFY", outcome: "SUCCESS", previousMethod: null, newMethod: "BVN", submitted: "BVN", detail: "Matched registry name and DOB", createdAt: "2026-06-12T09:10:00.000Z" },
  ],
  "d1a1c2b0-0002-4a11-9d11-000000000002": [
    { id: "i-2", action: "INITIAL_VERIFY", outcome: "CROSS_CHECK_FAILED", previousMethod: null, newMethod: null, submitted: "NIN", detail: "Name on NIN doesn't closely match registration name", createdAt: "2026-09-18T10:30:00.000Z" },
  ],
  "d1a1c2b0-0003-4a11-9d11-000000000003": [
    { id: "i-3", action: "INITIAL_VERIFY", outcome: "PROVIDER_REJECTED", previousMethod: null, newMethod: null, submitted: "BVN", detail: "Registry lookup failed — no match", createdAt: "2026-09-18T07:00:00.000Z" },
    { id: "i-4", action: "INITIAL_VERIFY", outcome: "PROVIDER_REJECTED", previousMethod: null, newMethod: null, submitted: "BVN", detail: "Registry lookup failed — no match", createdAt: "2026-09-18T07:05:00.000Z" },
    { id: "i-5", action: "INITIAL_VERIFY", outcome: "PROVIDER_REJECTED", previousMethod: null, newMethod: null, submitted: "BVN", detail: "Registry lookup failed — no match, account locked", createdAt: "2026-09-18T07:15:00.000Z" },
  ],
  "d1a1c2b0-0004-4a11-9d11-000000000004": [
    { id: "i-6", action: "INITIAL_VERIFY", outcome: "DUPLICATE", previousMethod: null, newMethod: null, submitted: "BVN", detail: "BVN already linked to another verified account", createdAt: "2026-09-17T11:55:00.000Z" },
  ],
  "d1a1c2b0-0005-4a11-9d11-000000000005": [
    { id: "i-7", action: "INITIAL_VERIFY", outcome: "SUCCESS", previousMethod: null, newMethod: "NIN", submitted: "NIN", detail: "Matched registry name and DOB", createdAt: "2026-07-21T16:40:00.000Z" },
  ],
  "d1a1c2b0-0006-4a11-9d11-000000000006": [
    { id: "i-8", action: "INITIAL_VERIFY", outcome: "SUCCESS", previousMethod: null, newMethod: "BVN", submitted: "BVN", detail: "Matched registry name and DOB", createdAt: "2026-09-01T12:05:00.000Z" },
  ],
};

export function getMockIdentityAudit(customerId: string): IdentityAuditEntry[] {
  return MOCK_IDENTITY_AUDIT[customerId] ?? [];
}

export function searchMockCustomers(query: string): AdminUserProfile[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return MOCK_CUSTOMERS.filter(
    (c) =>
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q),
  );
}

export function getMockCustomer(id: string): AdminUserProfile | undefined {
  return MOCK_CUSTOMERS.find((c) => c.id === id);
}

export function setMockCustomerStatus(id: string, status: AdminUserProfile["status"], reason: string): void {
  const customer = MOCK_CUSTOMERS.find((c) => c.id === id);
  if (!customer) return;
  const fromStatus = customer.status;
  customer.status = status;
  pushMockStatusEvent(id, fromStatus, status, reason);
}

// ---- Transactions (all customers) ----

export interface GlobalLedgerEntry extends LedgerEntry {
  customerId: string;
}

// Flattens MOCK_LEDGER across every customer, newest first — this is the
// "Transactions" page's whole dataset: the same rows already visible one
// customer at a time on Customers, just merged into one feed.
export function getAllMockLedgerEntries(): GlobalLedgerEntry[] {
  const all: GlobalLedgerEntry[] = [];
  for (const [customerId, entries] of Object.entries(MOCK_LEDGER)) {
    for (const entry of entries) all.push({ ...entry, customerId });
  }
  return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export interface DailyFlow {
  date: string; // yyyy-mm-dd
  depositsKobo: number;
  withdrawalsKobo: number;
}

// Independent sample series for the Overview trend chart — the individual
// ledger rows above are deliberately sparse (a handful of illustrative
// transactions spread across months, for the per-customer lists), so they
// don't have the daily density a 14-day chart needs. Same convention
// Overview's STATS block already uses for exactly this reason.
export const MOCK_DAILY_FLOW: DailyFlow[] = [
  { date: "2026-09-13", depositsKobo: 120_000_00, withdrawalsKobo: 40_000_00 },
  { date: "2026-09-14", depositsKobo: 80_000_00, withdrawalsKobo: 30_000_00 },
  { date: "2026-09-15", depositsKobo: 60_000_00, withdrawalsKobo: 90_000_00 },
  { date: "2026-09-16", depositsKobo: 150_000_00, withdrawalsKobo: 50_000_00 },
  { date: "2026-09-17", depositsKobo: 90_000_00, withdrawalsKobo: 20_000_00 },
  { date: "2026-09-18", depositsKobo: 200_000_00, withdrawalsKobo: 60_000_00 },
  { date: "2026-09-19", depositsKobo: 70_000_00, withdrawalsKobo: 45_000_00 },
  { date: "2026-09-20", depositsKobo: 40_000_00, withdrawalsKobo: 25_000_00 },
  { date: "2026-09-21", depositsKobo: 110_000_00, withdrawalsKobo: 35_000_00 },
  { date: "2026-09-22", depositsKobo: 95_000_00, withdrawalsKobo: 70_000_00 },
  { date: "2026-09-23", depositsKobo: 130_000_00, withdrawalsKobo: 40_000_00 },
  { date: "2026-09-24", depositsKobo: 85_000_00, withdrawalsKobo: 55_000_00 },
  { date: "2026-09-25", depositsKobo: 160_000_00, withdrawalsKobo: 30_000_00 },
  { date: "2026-09-26", depositsKobo: 100_000_00, withdrawalsKobo: 20_000_00 },
];

export function getMockDailyFlow(): DailyFlow[] {
  return MOCK_DAILY_FLOW;
}

export interface VolumeByType {
  type: LedgerEntry["type"];
  totalKobo: number;
}

// Real aggregation of the actual ledger rows above (not a separate sample) —
// ranking transaction types by total volume moved, highest first.
export function getMockVolumeByType(): VolumeByType[] {
  const totals = new Map<LedgerEntry["type"], number>();
  for (const entry of getAllMockLedgerEntries()) {
    totals.set(entry.type, (totals.get(entry.type) ?? 0) + Math.abs(entry.amount));
  }
  return Array.from(totals.entries())
    .map(([type, totalKobo]) => ({ type, totalKobo }))
    .sort((a, b) => b.totalKobo - a.totalKobo);
}

// ---- Identity Verification queue ----

export interface IdentityQueueItem {
  customer: AdminUserProfile;
  latest: IdentityAuditEntry;
}

// Anyone not already VERIFIED, paired with their most recent attempt — this
// is exactly Overview's "Needs attention" set, viewed as its own full queue
// instead of a 3-row teaser.
export function getMockIdentityQueue(): IdentityQueueItem[] {
  return MOCK_CUSTOMERS.filter((c) => c.identityStatus !== "VERIFIED")
    .map((customer) => {
      const entries = getMockIdentityAudit(customer.id);
      const latest = entries[entries.length - 1];
      return latest ? { customer, latest } : null;
    })
    .filter((item): item is IdentityQueueItem => item !== null)
    .sort((a, b) => new Date(b.latest.createdAt).getTime() - new Date(a.latest.createdAt).getTime());
}

// Demo-only: there's no backend endpoint yet to resolve a flagged identity
// check by hand, so this only ever mutates the in-memory mock — same
// append-only pattern as pushMockStatusEvent, just on the identity trail.
export function resolveMockIdentity(
  customerId: string,
  outcome: "SUCCESS" | "CROSS_CHECK_FAILED",
  detail: string,
): void {
  const customer = MOCK_CUSTOMERS.find((c) => c.id === customerId);
  if (!customer) return;
  customer.identityStatus = outcome === "SUCCESS" ? "VERIFIED" : "FAILED";
  if (outcome === "SUCCESS" && !customer.identityMethod) customer.identityMethod = "BVN";

  const list = MOCK_IDENTITY_AUDIT[customerId] ?? (MOCK_IDENTITY_AUDIT[customerId] = []);
  list.push({
    id: `i-${Date.now()}`,
    action: "INITIAL_VERIFY",
    outcome,
    previousMethod: null,
    newMethod: outcome === "SUCCESS" ? "BVN" : null,
    submitted: "Manual review",
    detail,
    createdAt: new Date().toISOString(),
  });
}

// ---- Risk & Compliance ----

export interface FlaggedTransaction {
  id: string;
  customerId: string;
  reason: string;
  amountKobo: number;
  severity: "medium" | "high";
  createdAt: string;
}

// Deliberately mirrors the exact pass-through/layering pattern the app's own
// AML-DISCUSSION.md worries about — money in, briefly held, straight back
// out — so this reads as a real risk case, not a random example.
export const MOCK_FLAGGED_TRANSACTIONS: FlaggedTransaction[] = [
  {
    id: "f-1",
    customerId: "d1a1c2b0-0005-4a11-9d11-000000000005",
    reason: "Deposit is 4x this customer's usual amount",
    amountKobo: 700_000_00,
    severity: "medium",
    createdAt: "2026-07-22T09:00:00.000Z",
  },
  {
    id: "f-2",
    customerId: "d1a1c2b0-0006-4a11-9d11-000000000006",
    reason: "Large deposit moved straight back out within 2 minutes",
    amountKobo: 160_000_00,
    severity: "high",
    createdAt: "2026-09-02T08:01:00.000Z",
  },
  {
    id: "f-3",
    customerId: "d1a1c2b0-0003-4a11-9d11-000000000003",
    reason: "Flagged for retroactive review after the account was later restricted for failed identity checks",
    amountKobo: 5_000_00,
    severity: "medium",
    createdAt: "2026-05-01T17:40:00.000Z",
  },
];

export function getMockFlaggedTransactions(): FlaggedTransaction[] {
  return [...MOCK_FLAGGED_TRANSACTIONS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function clearMockFlag(id: string): void {
  const index = MOCK_FLAGGED_TRANSACTIONS.findIndex((f) => f.id === id);
  if (index !== -1) MOCK_FLAGGED_TRANSACTIONS.splice(index, 1);
}

// In-memory only — there's no limits endpoint on the backend yet either.
export const MOCK_LIMITS = {
  dailyTransferLimitKobo: 500_000_00,
};
