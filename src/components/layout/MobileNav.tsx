"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, LogOut } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import { useAuth } from "@/lib/auth-context";
import NavLink from "./NavLink";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  // Lock body scroll while the sheet is open, same as every bottom sheet in
  // the consumer app.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="SmartBucket" width={28} height={28} className="rounded-lg" />
          <span className="text-sm font-semibold tracking-tight text-text">SmartBucket Admin</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-bg text-text"
        >
          <Menu size={20} />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-3xl bg-surface pb-[max(env(safe-area-inset-bottom),16px)]">
            <div className="flex items-center justify-between px-5 pt-5 pb-2">
              <div className="flex items-center gap-2.5">
                <Image src="/logo.png" alt="" width={26} height={26} className="rounded-lg" />
                <span className="text-sm font-semibold text-text">Menu</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-bg text-text-secondary"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 overflow-y-auto px-3 py-2">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.href} item={item} onNavigate={() => setOpen(false)} />
              ))}
            </nav>
            <div className="border-t border-border px-3 pt-2">
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-text-secondary hover:text-accent-red"
              >
                <LogOut size={18} strokeWidth={2} />
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
