"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, PlusSquare, MapPin, Wallet, Settings, HelpCircle, User,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: PlusSquare, label: "Submit", href: "/submit" },
  { icon: MapPin, label: "Tracking", href: "/history" },
  { icon: Wallet, label: "Wallet", href: "/rewards" },
];

export function SidebarCitizen() {
  const pathname = usePathname();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((data) => {
        if (data.user?.name) {
          setUserName(data.user.name);
        }
      })
      .catch(() => { });
  }, []);

  const firstName = userName.split(" ")[0] || "User";

  return (
    <aside
      className="fixed top-0 left-0 h-screen w-64 flex flex-col z-40"
      style={{ background: "#fff", borderRight: "1px solid #E5EDE9" }}
    >
      {/* Logo */}
      <div className="px-6 pt-7 pb-6">
        <h1
          className="text-lg font-bold leading-tight"
          style={{ color: "#16C47F", fontFamily: "'Space Grotesk',sans-serif" }}
        >
          Waste to
          <br />
          Worth
        </h1>
        <p className="text-xs mt-0.5" style={{ color: "#8BAF9E" }}>
          W2W Platform
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: active ? "rgba(22,196,127,0.10)" : "transparent",
                color: active ? "#16C47F" : "#5A8A78",
                fontWeight: active ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (!active)
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "#F8FAF9";
              }}
              onMouseLeave={(e) => {
                if (!active)
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "transparent";
              }}
            >
              <Icon size={17} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Profile + Settings + Help */}
      <div
        className="px-3 pb-5 space-y-1"
        style={{ borderTop: "1px solid #E5EDE9", paddingTop: "12px" }}
      >
        {/* User info — no avatar as requested */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: "#F8FAF9" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(22,196,127,0.12)" }}
          >
            <User size={14} color="#16C47F" />
          </div>
          <div className="min-w-0">
            <p
              className="text-xs font-semibold truncate"
              style={{ color: "#1A2E27" }}
            >
              {firstName}
            </p>
            <p className="text-xs truncate" style={{ color: "#8BAF9E" }}>
              Makassar
            </p>
          </div>
        </div>

        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200"
          style={{ color: "#5A8A78" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#F8FAF9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "transparent";
          }}
        >
          <Settings size={16} />
          Settings
        </Link>

        <Link
          href="/help"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200"
          style={{ color: "#5A8A78" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#F8FAF9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "transparent";
          }}
        >
          <HelpCircle size={16} />
          Help Center
        </Link>
      </div>
    </aside>
  );
}
