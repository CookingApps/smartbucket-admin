import type { AdminUserProfile } from "@/types/user";

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

export function setMockCustomerStatus(id: string, status: AdminUserProfile["status"]): void {
  const customer = MOCK_CUSTOMERS.find((c) => c.id === id);
  if (customer) customer.status = status;
}
