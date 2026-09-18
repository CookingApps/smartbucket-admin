"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "text" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
  loading?: boolean;
}

// Mirrors the consumer app's SbButton exactly: pill shape, same variant
// logic and colors (lib/app/widgets/sb_button.dart) — just sized for a
// mouse-driven dashboard instead of a thumb-driven phone screen.
const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark disabled:bg-text-light",
  secondary: "bg-tint-green text-primary hover:bg-tint-green/70 disabled:text-text-light",
  outline: "bg-transparent text-primary border-2 border-primary hover:bg-tint-green disabled:border-text-light disabled:text-text-light",
  text: "bg-transparent text-primary hover:bg-tint-green disabled:text-text-light",
  danger: "bg-accent-red text-white hover:bg-accent-red/90 disabled:bg-text-light",
};

export default function Button({
  variant = "primary",
  icon,
  loading,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const isText = variant === "text";
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm transition-colors disabled:cursor-not-allowed",
        isText ? "px-3 py-2" : "h-11 px-6",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    >
      {loading ? (
        <span className="flex gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
        </span>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}
