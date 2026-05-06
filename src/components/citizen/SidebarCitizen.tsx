"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, PackagePlus, Truck, Gift, LogOut, Cpu, User,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",      href: "/dashboard" },
  { icon: PackagePlus,     label: "Submit Dropbox", href: "/dashboard/submit" },
  { icon: Truck,           label: "Request Pickup", href: "/dashboard/pickup" },
  { icon: Gift,            label: "Redeem Rewards", href: "/dashboard/rewards" },
];

export function SidebarCitizen() {
  const pathname = usePathname();
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 flex flex-col z-40"
      style={{ background: "#fff", borderRight: "1px solid #E5EDE9" }}>
      {/* Logo */}
      <div className="h-16 flex items-center gap-2.5 px-6"
        style={{ borderBottom: "1px solid #E5EDE9" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#16C47F,#0EA572)" }}>
          <Cpu size={15} color="#fff" strokeWidth={2.5} />
        </div>
        <span className="font-bold text-base" style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}>
          Waste<span style={{ color: "#16C47F" }}>2</span>Worth
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: active ? "rgba(22,196,127,0.10)" : "transparent",
                color: active ? "#16C47F" : "#5A8A78",
                fontWeight: active ? 600 : 400,
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "#F8FAF9"; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}>
              <Icon size={17} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Profile + Logout */}
      <div className="px-3 pb-5 space-y-1" style={{ borderTop: "1px solid #E5EDE9", paddingTop: "12px" }}>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: "#F8FAF9" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(22,196,127,0.12)" }}>
            <User size={14} color="#16C47F" />
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: "#1A2E27" }}>Noval Rahman</p>
            <p className="text-xs" style={{ color: "#8BAF9E" }}>Citizen · Tamalanrea</p>
          </div>
        </div>
        <Link href="/impact"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200"
          style={{ color: "#8BAF9E" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#E74C3C"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#8BAF9E"; }}>
          <LogOut size={16} />
          Logout
        </Link>
      </div>
    </aside>
  );
}
