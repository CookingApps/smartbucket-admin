import { type ReactNode } from "react";
import Card from "./Card";

export default function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">{label}</span>
        {icon}
      </div>
      <p className="mt-2 text-2xl font-medium text-text">{value}</p>
      {hint && <p className="mt-1 text-xs text-text-light">{hint}</p>}
    </Card>
  );
}
