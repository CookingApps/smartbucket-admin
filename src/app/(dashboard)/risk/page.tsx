import { ShieldAlert } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export default function RiskPage() {
  return (
    <ComingSoon
      title="Risk & Compliance"
      subtitle="The controls expected of any Nigerian fintech handling real money."
      icon={ShieldAlert}
      tint="bg-tint-red"
      iconColor="text-accent-red"
    />
  );
}
