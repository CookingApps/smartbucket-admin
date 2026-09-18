import { type LucideIcon } from "lucide-react";
import PageHeader from "./PageHeader";
import Card from "./Card";
import IconChip from "./IconChip";

export default function ComingSoon({
  title,
  subtitle,
  icon: Icon,
  tint,
  iconColor,
}: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  tint: string;
  iconColor: string;
}) {
  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} />
      <Card className="flex flex-col items-center gap-3 py-16 text-center">
        <IconChip size={56} className={tint}>
          <Icon size={24} className={iconColor} />
        </IconChip>
        <p className="text-sm font-medium text-text">Being built next</p>
        <p className="max-w-sm text-sm text-text-secondary">
          This section is scoped in the project doc — the core screens (Overview, Customers) come first.
        </p>
      </Card>
    </div>
  );
}
