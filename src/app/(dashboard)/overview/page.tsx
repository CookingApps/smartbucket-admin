import { Users, ShieldCheck, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PreviewNote from "@/components/ui/PreviewNote";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import IconChip from "@/components/ui/IconChip";
import { formatNaira } from "@/lib/format";

// Sample data — GET /admin/stats doesn't exist on the backend yet.
// Swap this block for a real fetch once that endpoint lands.
const STATS = {
  totalInBuckets: 284_650_00,
  totalCustomers: 412,
  verifiedCustomers: 356,
  todayDeposits: 12_400_00,
  todayWithdrawals: 6_150_00,
  awaitingReview: 7,
};

const NEEDS_ATTENTION = [
  { name: "Chiamaka Obi", reason: "Name mismatch on NIN check", time: "2h ago" },
  { name: "Tunde Bakare", reason: "3 failed BVN attempts — locked", time: "5h ago" },
  { name: "Fatima Sule", reason: "Duplicate BVN flagged", time: "1d ago" },
];

export default function OverviewPage() {
  return (
    <div>
      <PageHeader title="Overview" subtitle="A snapshot of the whole business at a glance." />
      <PreviewNote>
        Showing sample numbers — this page will switch to live data once the stats endpoint is built.
      </PreviewNote>

      <Card className="bg-primary-dark p-6">
        <p className="text-sm text-tint-green">Total money in customer buckets</p>
        <p className="mt-2 text-3xl font-medium text-white">{formatNaira(STATS.totalInBuckets)}</p>
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
          {STATS.totalCustomers} customers · {STATS.verifiedCustomers} verified
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total customers"
          value={STATS.totalCustomers.toLocaleString()}
          hint={`${STATS.verifiedCustomers} verified`}
          icon={
            <IconChip size={32} className="bg-tint-blue">
              <Users size={16} className="text-accent-blue" />
            </IconChip>
          }
        />
        <StatCard
          label="Awaiting review"
          value={STATS.awaitingReview.toLocaleString()}
          hint="Identity checks stuck"
          icon={
            <IconChip size={32} className="bg-tint-purple">
              <ShieldCheck size={16} className="text-accent-purple" />
            </IconChip>
          }
        />
        <StatCard
          label="Today's deposits"
          value={formatNaira(STATS.todayDeposits)}
          icon={
            <IconChip size={32} className="bg-tint-green">
              <ArrowDownToLine size={16} className="text-primary" />
            </IconChip>
          }
        />
        <StatCard
          label="Today's withdrawals"
          value={formatNaira(STATS.todayWithdrawals)}
          icon={
            <IconChip size={32} className="bg-tint-orange">
              <ArrowUpFromLine size={16} className="text-accent-orange" />
            </IconChip>
          }
        />
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-base font-medium text-text">Needs attention</h2>
        <Card className="divide-y divide-border p-0">
          {NEEDS_ATTENTION.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-text">{item.name}</p>
                <p className="text-sm text-text-secondary">{item.reason}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-light">{item.time}</span>
                <Badge tone="purple">Review</Badge>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
