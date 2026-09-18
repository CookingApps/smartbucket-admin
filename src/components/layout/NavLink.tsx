"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/lib/nav";

export default function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
        active ? "bg-tint-green text-primary" : "text-text-secondary hover:bg-bg hover:text-text",
      )}
    >
      <span className={cn("h-1.5 w-1.5 flex-shrink-0 rounded-full", item.dot)} />
      <Icon size={18} strokeWidth={2} className="flex-shrink-0" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}
