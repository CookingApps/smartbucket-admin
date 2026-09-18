import { BarChart3 } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export default function InsightsPage() {
  return (
    <ComingSoon
      title="Insights"
      subtitle="A simple picture of how the product itself is being used."
      icon={BarChart3}
      tint="bg-tint-orange"
      iconColor="text-accent-orange"
    />
  );
}
