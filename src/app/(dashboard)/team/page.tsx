import { UserCog } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export default function TeamPage() {
  return (
    <ComingSoon
      title="Team & Permissions"
      subtitle="Controls who on staff can do what."
      icon={UserCog}
      tint="bg-tint-pink"
      iconColor="text-accent-pink"
    />
  );
}
