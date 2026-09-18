import { ArrowLeftRight } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export default function TransactionsPage() {
  return (
    <ComingSoon
      title="Transactions"
      subtitle="A complete, searchable record of every deposit, withdrawal, and internal transfer."
      icon={ArrowLeftRight}
      tint="bg-tint-teal"
      iconColor="text-accent-teal"
    />
  );
}
