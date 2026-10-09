import { Sparkles, TrendingUp } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import StatCard from "@/components/ui/StatCard";
import IconChip from "@/components/ui/IconChip";
import RankedBarChart from "@/components/charts/RankedBarChart";
import AllocationOutcomeBar from "@/components/charts/AllocationOutcomeBar";
import { getMockBucketPopularity, MOCK_ALLOCATION_STATS } from "@/lib/mockData";

export default function InsightsPage() {
  const popularity = getMockBucketPopularity();
  const topGoal = popularity[0];
  const acceptanceRate = Math.round(
    ((MOCK_ALLOCATION_STATS.approvedAsIs + MOCK_ALLOCATION_STATS.edited) / MOCK_ALLOCATION_STATS.shown) * 100,
  );

  const bucketChartData = popularity.map((p) => ({
    label: `${p.emoji} ${p.name}`,
    valueKobo: p.totalKobo,
  }));

  return (
    <div>
      <PageHeader
        title="Insights"
        subtitle="What customers actually save for, and whether Smart Allocation is helping."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Most popular goal"
          value={topGoal ? `${topGoal.emoji} ${topGoal.name}` : "—"}
          hint={topGoal ? `${topGoal.customerCount} customers` : undefined}
          icon={
            <IconChip size={32} className="bg-tint-pink">
              <Sparkles size={16} className="text-accent-pink" />
            </IconChip>
          }
        />
        <StatCard
          label="Allocation acceptance"
          value={`${acceptanceRate}%`}
          hint={`${MOCK_ALLOCATION_STATS.shown} suggestions shown`}
          icon={
            <IconChip size={32} className="bg-tint-green">
              <TrendingUp size={16} className="text-primary" />
            </IconChip>
          }
        />
        <StatCard
          label="Unique goal types"
          value={popularity.length.toLocaleString()}
          hint="Across every customer"
          icon={
            <IconChip size={32} className="bg-tint-blue">
              <Sparkles size={16} className="text-accent-blue" />
            </IconChip>
          }
        />
      </div>

      <Card className="mt-4 p-5">
        <h2 className="mb-1 text-sm font-medium text-text">What customers save for</h2>
        <p className="mb-4 text-xs text-text-secondary">Ranked by total money currently sitting in each goal.</p>
        <RankedBarChart data={bucketChartData} emptyLabel="No buckets created yet" />
      </Card>

      <Card className="mt-4 p-5">
        <h2 className="mb-1 text-sm font-medium text-text">Is Smart Allocation actually helping?</h2>
        <p className="mb-4 text-xs text-text-secondary">
          What customers do when the app suggests how to split their pending money.
        </p>
        <AllocationOutcomeBar
          approvedAsIs={MOCK_ALLOCATION_STATS.approvedAsIs}
          edited={MOCK_ALLOCATION_STATS.edited}
          dismissed={MOCK_ALLOCATION_STATS.dismissed}
        />
      </Card>
    </div>
  );
}
