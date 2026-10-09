"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Toggle from "@/components/ui/Toggle";
import { formatDateTime } from "@/lib/format";
import {
  MOCK_FEATURE_FLAGS,
  MOCK_APP_SETTINGS,
  getMockAnnouncements,
  sendMockAnnouncement,
  setMockFeatureFlag,
  setMockEarlyBreakPenalty,
  type Announcement,
} from "@/lib/mockData";

const AUDIENCES: Announcement["audience"][] = ["All customers", "Verified only", "Restricted / Suspended"];

export default function MessagesPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState<Announcement["audience"]>("All customers");
  const [sent, setSent] = useState(false);
  const [announcements, setAnnouncements] = useState(getMockAnnouncements());

  const [smartAllocation, setSmartAllocation] = useState(MOCK_FEATURE_FLAGS.smartAllocation);
  const [pendingReminders, setPendingReminders] = useState(MOCK_FEATURE_FLAGS.pendingReminders);
  const [penaltyInput, setPenaltyInput] = useState(String(MOCK_APP_SETTINGS.earlyBreakPenaltyPercent));
  const [penaltySaved, setPenaltySaved] = useState(false);

  const send = () => {
    if (!title.trim() || !body.trim()) return;
    sendMockAnnouncement(title.trim(), body.trim(), audience);
    setTitle("");
    setBody("");
    setAnnouncements(getMockAnnouncements());
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  const toggleSmartAllocation = (value: boolean) => {
    setMockFeatureFlag("smartAllocation", value);
    setSmartAllocation(value);
  };

  const togglePendingReminders = (value: boolean) => {
    setMockFeatureFlag("pendingReminders", value);
    setPendingReminders(value);
  };

  const savePenalty = () => {
    const pct = Number(penaltyInput);
    if (!Number.isFinite(pct) || pct < 0) return;
    setMockEarlyBreakPenalty(pct);
    setPenaltySaved(true);
    setTimeout(() => setPenaltySaved(false), 2000);
  };

  return (
    <div>
      <PageHeader
        title="Messages & Settings"
        subtitle="Reach customers directly, and adjust how the app behaves without a new release."
      />

      <div>
        <h2 className="mb-3 text-base font-medium text-text">Send an announcement</h2>
        <Card className="p-5">
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's this about?"
                className="h-11 w-full rounded-2xl border border-border bg-surface px-4 text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text">Message</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={3}
                placeholder="Keep it short — this goes out as a push notification."
                className="w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text">Audience</label>
              <div className="flex flex-wrap gap-2">
                {AUDIENCES.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAudience(a)}
                    className={`rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                      audience === a ? "bg-primary text-white" : "bg-bg text-text-secondary hover:bg-border/40"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button icon={<Send size={16} />} onClick={send}>
                Send announcement
              </Button>
              {sent && <span className="text-xs font-medium text-primary">Sent</span>}
            </div>
          </div>
        </Card>

        {announcements.length > 0 && (
          <Card className="mt-3 divide-y divide-border p-0">
            {announcements.map((a) => (
              <div key={a.id} className="px-5 py-3.5">
                <p className="text-sm font-medium text-text">{a.title}</p>
                <p className="mt-0.5 text-xs text-text-secondary">{a.body}</p>
                <p className="mt-1 text-xs text-text-light">
                  {a.audience} · {formatDateTime(a.sentAt)}
                </p>
              </div>
            ))}
          </Card>
        )}
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-base font-medium text-text">Features</h2>
        <Card className="divide-y divide-border p-0">
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="text-sm font-medium text-text">Smart Allocation suggestions</p>
              <p className="text-xs text-text-secondary">
                Suggest how to split pending money across buckets once it builds up.
              </p>
            </div>
            <Toggle checked={smartAllocation} onChange={toggleSmartAllocation} label="Smart Allocation suggestions" />
          </div>
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="text-sm font-medium text-text">Pending money reminders</p>
              <p className="text-xs text-text-secondary">
                Nudge a customer when money has sat unsorted for a while.
              </p>
            </div>
            <Toggle checked={pendingReminders} onChange={togglePendingReminders} label="Pending money reminders" />
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-base font-medium text-text">Early-break penalty</h2>
        <Card className="p-5">
          <p className="mb-3 text-xs text-text-secondary">
            The fee charged when a customer breaks a locked bucket before its target or date.
          </p>
          <div className="flex items-center gap-3">
            <div className="relative max-w-[140px] flex-1">
              <input
                value={penaltyInput}
                onChange={(e) => setPenaltyInput(e.target.value)}
                inputMode="numeric"
                className="h-11 w-full rounded-2xl border border-border bg-surface pl-4 pr-8 text-sm text-text focus:border-primary focus:outline-none"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-light">
                %
              </span>
            </div>
            <Button onClick={savePenalty}>Save</Button>
            {penaltySaved && <span className="text-xs font-medium text-primary">Saved</span>}
          </div>
        </Card>
      </div>
    </div>
  );
}
