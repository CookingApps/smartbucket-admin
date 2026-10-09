"use client";

import { useState } from "react";
import { UserPlus, Trash2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Sheet from "@/components/ui/Sheet";
import RoleAccessMatrix from "@/components/team/RoleAccessMatrix";
import { formatDate, formatDateTime } from "@/lib/format";
import {
  getMockTeam,
  getMockAuditLog,
  addMockTeamMember,
  removeMockTeamMember,
  type TeamRole,
} from "@/lib/mockData";

const ROLE_TONE: Record<TeamRole, "green" | "purple" | "blue"> = {
  Owner: "green",
  "Compliance Officer": "purple",
  "Support Agent": "blue",
};

export default function TeamPage() {
  const [team, setTeam] = useState(getMockTeam());
  const [auditLog, setAuditLog] = useState(getMockAuditLog());
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamRole>("Support Agent");
  const [error, setError] = useState<string | null>(null);

  const refresh = () => {
    setTeam(getMockTeam());
    setAuditLog(getMockAuditLog());
  };

  const viewing = team.find((m) => m.id === viewingId) ?? null;

  const submitAdd = () => {
    if (!name.trim() || !email.trim()) {
      setError("Name and email are both required.");
      return;
    }
    addMockTeamMember(name.trim(), email.trim(), role);
    setName("");
    setEmail("");
    setRole("Support Agent");
    setError(null);
    setAddOpen(false);
    refresh();
  };

  const remove = (id: string) => {
    removeMockTeamMember(id);
    setViewingId(null);
    refresh();
  };

  return (
    <div>
      <PageHeader
        title="Team & Permissions"
        subtitle="Who on staff can see and do what, and a record of every action taken here."
        action={
          <Button icon={<UserPlus size={16} />} onClick={() => setAddOpen(true)}>
            Add staff
          </Button>
        }
      />

      <Card className="divide-y divide-border p-0">
        {team.map((member) => (
          <button
            key={member.id}
            onClick={() => setViewingId(member.id)}
            className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-bg"
          >
            <Avatar name={member.name} size={40} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text">{member.name}</p>
              <p className="truncate text-xs text-text-secondary">{member.email}</p>
            </div>
            <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
              <Badge tone={ROLE_TONE[member.role]}>{member.role}</Badge>
              <span className="text-xs text-text-light">Added {formatDate(member.addedAt)}</span>
            </div>
          </button>
        ))}
      </Card>

      <div className="mt-6">
        <h2 className="mb-3 text-base font-medium text-text">Audit log</h2>
        <Card className="divide-y divide-border p-0">
          {auditLog.length === 0 ? (
            <p className="py-8 text-center text-sm text-text-light">No actions recorded yet.</p>
          ) : (
            auditLog.map((entry) => (
              <div key={entry.id} className="px-5 py-3.5">
                <p className="text-sm text-text">
                  <span className="font-medium">{entry.actor}</span> — {entry.action}
                </p>
                <p className="mt-0.5 text-xs text-text-secondary">{entry.detail}</p>
                <p className="mt-1 text-xs text-text-light">{formatDateTime(entry.createdAt)}</p>
              </div>
            ))
          )}
        </Card>
      </div>

      <Sheet open={viewing !== null} onClose={() => setViewingId(null)} title="Team member">
        {viewing && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Avatar name={viewing.name} size={48} />
              <div>
                <p className="text-base font-medium text-text">{viewing.name}</p>
                <p className="text-sm text-text-secondary">{viewing.email}</p>
              </div>
            </div>
            <div>
              <Badge tone={ROLE_TONE[viewing.role]}>{viewing.role}</Badge>
            </div>
            <div>
              <p className="mb-2.5 text-sm font-medium text-text">Can access</p>
              <RoleAccessMatrix role={viewing.role} />
            </div>
            {viewing.role !== "Owner" && (
              <Button variant="danger" icon={<Trash2 size={16} />} onClick={() => remove(viewing.id)} className="w-full">
                Remove from team
              </Button>
            )}
          </div>
        )}
      </Sheet>

      <Sheet open={addOpen} onClose={() => setAddOpen(false)} title="Add staff">
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="h-11 w-full rounded-2xl border border-border bg-surface px-4 text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@smartbucket.co"
              className="h-11 w-full rounded-2xl border border-border bg-surface px-4 text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as TeamRole)}
              className="h-11 w-full rounded-2xl border border-border bg-surface px-4 text-sm text-text focus:border-primary focus:outline-none"
            >
              <option value="Support Agent">Support Agent</option>
              <option value="Compliance Officer">Compliance Officer</option>
              <option value="Owner">Owner</option>
            </select>
          </div>
          <div>
            <p className="mb-2.5 text-sm font-medium text-text">This role can access</p>
            <RoleAccessMatrix role={role} />
          </div>
          {error && <p className="text-xs text-accent-red">{error}</p>}
          <Button onClick={submitAdd} className="w-full">
            Add to team
          </Button>
        </div>
      </Sheet>
    </div>
  );
}
