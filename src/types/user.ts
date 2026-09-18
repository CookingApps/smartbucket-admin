// Mirrors prisma/schema.prisma in smartbucket-backend exactly.
export type UserStatus = "ACTIVE" | "REVIEW" | "RESTRICTED" | "SUSPENDED";
export type IdentityStatus = "PENDING" | "VERIFIED" | "FAILED";

export interface AdminUserSummary {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
  createdAt: string;
}

export interface AdminUserProfile extends AdminUserSummary {
  emailVerified: boolean;
  identityStatus: IdentityStatus;
  identityMethod: string | null;
  walletActive: boolean;
}
