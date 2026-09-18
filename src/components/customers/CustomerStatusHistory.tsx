import { formatDateTime } from "@/lib/format";
import type { StatusEvent } from "@/types/admin";
import type { UserStatus } from "@/types/user";

const STATUS_LABEL: Record<UserStatus, string> = {
  ACTIVE: "Active",
  REVIEW: "In review",
  RESTRICTED: "Restricted",
  SUSPENDED: "Suspended",
};

export default function CustomerStatusHistory({ events }: { events: StatusEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-4 text-center text-sm text-text-light">
        No status changes on record
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {events.map((event) => (
        <div key={event.id} className="rounded-2xl border border-border p-3.5">
          <p className="text-sm text-text">
            <span className="font-medium">{STATUS_LABEL[event.fromStatus]}</span>
            {" → "}
            <span className="font-medium">{STATUS_LABEL[event.toStatus]}</span>
          </p>
          <p className="mt-1 text-xs text-text-secondary">{event.reason}</p>
          <p className="mt-1.5 text-xs text-text-light">
            {event.actor} · {formatDateTime(event.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
}
