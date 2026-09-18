import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// twMerge resolves conflicting Tailwind utilities (e.g. a component's default
// bg-surface vs. a caller's override bg-primary-dark) so the LAST one wins,
// the way a className override is actually supposed to behave — clsx alone
// just concatenates both classes and leaves the winner to CSS source order.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
