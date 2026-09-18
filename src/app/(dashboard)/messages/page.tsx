import { Megaphone } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export default function MessagesPage() {
  return (
    <ComingSoon
      title="Messages & Settings"
      subtitle="Reaching customers, and adjusting how the app behaves."
      icon={Megaphone}
      tint="bg-primary-dark"
      iconColor="text-white"
    />
  );
}
