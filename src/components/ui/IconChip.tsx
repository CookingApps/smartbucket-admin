import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

// Mirrors the white circular icon chip used for the notification bell and
// the alert-banner icon on Home — a colored icon sitting in a plain white
// circle, regardless of what it's placed on top of.
export default function IconChip({
  children,
  size = 40,
  className,
}: {
  children: ReactNode;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-shrink-0 items-center justify-center rounded-full bg-white", className)}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
}
