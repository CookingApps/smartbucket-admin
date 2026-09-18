import { ShieldCheck } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export default function IdentityPage() {
  return (
    <ComingSoon
      title="Identity Verification"
      subtitle="The review queue for identity checks the system couldn't approve automatically."
      icon={ShieldCheck}
      tint="bg-tint-purple"
      iconColor="text-accent-purple"
    />
  );
}
