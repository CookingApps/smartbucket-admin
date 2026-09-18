import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

// Mirrors SbCard: white surface, hairline border, no shadow — the app never
// uses elevation/shadow anywhere, borders carry all the separation.
export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-3xl border border-border bg-surface p-4", className)}
      {...props}
    />
  );
}
