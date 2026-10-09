import {
  LayoutGrid,
  Users,
  ShieldCheck,
  ArrowLeftRight,
  ShieldAlert,
  BarChart3,
  UserCog,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  dot: string;
}

// Full 8-section set lives in the proposal doc — only the ones actually
// designed so far are shown in nav. Uncomment a row here once its page is
// built; the route itself still exists under (dashboard)/, this just keeps
// it out of the demo until it's ready to show.
export const NAV_ITEMS: NavItem[] = [
  { href: "/overview", label: "Overview", icon: LayoutGrid, dot: "bg-primary" },
  { href: "/customers", label: "Customers", icon: Users, dot: "bg-accent-blue" },
  { href: "/identity", label: "Identity Verification", icon: ShieldCheck, dot: "bg-accent-purple" },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight, dot: "bg-accent-teal" },
  { href: "/risk", label: "Risk & Compliance", icon: ShieldAlert, dot: "bg-accent-red" },
  { href: "/insights", label: "Insights", icon: BarChart3, dot: "bg-accent-orange" },
  { href: "/team", label: "Team & Permissions", icon: UserCog, dot: "bg-accent-pink" },
  { href: "/messages", label: "Messages & Settings", icon: Megaphone, dot: "bg-primary-dark" },
];
