import { Check, X } from "lucide-react";
import { ROLE_ACCESS, type TeamRole } from "@/lib/mockData";

const ALL_PAGES = ROLE_ACCESS.Owner;

export default function RoleAccessMatrix({ role }: { role: TeamRole }) {
  const allowed = new Set(ROLE_ACCESS[role]);

  return (
    <div className="rounded-2xl border border-border divide-y divide-border">
      {ALL_PAGES.map((page) => {
        const has = allowed.has(page);
        return (
          <div key={page} className="flex items-center justify-between px-4 py-2.5">
            <span className={`text-sm ${has ? "text-text" : "text-text-light"}`}>{page}</span>
            {has ? (
              <Check size={16} className="text-primary" />
            ) : (
              <X size={16} className="text-text-light" />
            )}
          </div>
        );
      })}
    </div>
  );
}
