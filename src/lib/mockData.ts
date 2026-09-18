import type { AdminUserProfile } from "@/types/user";

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
