import Badge from "@/components/ui/Badge";
import type { UserStatus, IdentityStatus } from "@/types/user";

const USER_STATUS_TONE: Record<UserStatus, "green" | "orange" | "red"> = {
  ACTIVE: "green",
  REVIEW: "orange",
  RESTRICTED: "orange",
  SUSPENDED: "red",
};

const USER_STATUS_LABEL: Record<UserStatus, string> = {
  ACTIVE: "Active",
  REVIEW: "In review",
  RESTRICTED: "Restricted",
  SUSPENDED: "Suspended",
};

export function UserStatusBadge({ status }: { status: UserStatus }) {
  return <Badge tone={USER_STATUS_TONE[status]}>{USER_STATUS_LABEL[status]}</Badge>;
}

const IDENTITY_TONE: Record<IdentityStatus, "green" | "orange" | "red"> = {
  VERIFIED: "green",
  PENDING: "orange",
  FAILED: "red",
};

const IDENTITY_LABEL: Record<IdentityStatus, string> = {
  VERIFIED: "Verified",
  PENDING: "Pending",
  FAILED: "Failed",
};

export function IdentityStatusBadge({ status }: { status: IdentityStatus }) {
  return <Badge tone={IDENTITY_TONE[status]}>{IDENTITY_LABEL[status]}</Badge>;
}
