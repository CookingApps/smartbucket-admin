"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import { useAuth } from "@/lib/auth-context";
import NavLink from "./NavLink";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-border bg-surface lg:flex">
      <div className="flex items-center gap-3 px-6 py-6">
        <Image src="/logo.png" alt="SmartBucket" width={32} height={32} className="rounded-lg" />
        <span className="text-sm font-semibold tracking-tight text-text">SmartBucket Admin</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-bg hover:text-accent-red"
        >
          <LogOut size={18} strokeWidth={2} />
          Log out
        </button>
      </div>
    </aside>
  );
}
