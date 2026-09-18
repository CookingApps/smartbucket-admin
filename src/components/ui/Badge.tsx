import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "green" | "red" | "orange" | "blue" | "purple" | "teal" | "pink" | "gray";

const TONE_CLASSES: Record<Tone, string> = {
  green: "bg-tint-green text-primary",
  red: "bg-tint-red text-accent-red",
  orange: "bg-tint-orange text-accent-orange",
  blue: "bg-tint-blue text-accent-blue",
  purple: "bg-tint-purple text-accent-purple",
  teal: "bg-tint-teal text-accent-teal",
  pink: "bg-tint-pink text-accent-pink",
  gray: "bg-bg text-text-secondary",
};

// Mirrors the "2/7 buckets used" pill on Home: tinted background, colored
// text, fully rounded, small semibold label. Used for status tags throughout.
export default function Badge({ tone = "green", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
        TONE_CLASSES[tone],
      )}
    >
      {children}
    </span>
  );
}
