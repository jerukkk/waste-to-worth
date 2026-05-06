"use client";
import Link from "next/link";
import { PackagePlus, Truck, Gift, ChevronRight } from "lucide-react";

const actions = [
  {
    icon: PackagePlus,
    color: "#16C47F",
    bg: "rgba(22,196,127,0.10)",
    title: "Submit via Dropbox",
    desc: "Scan QR dropbox terdekat dan input data e-waste kamu.",
    href: "/dashboard/submit",
    cta: "Submit Sekarang",
  },
  {
    icon: Truck,
    color: "#3498DB",
    bg: "rgba(52,152,219,0.10)",
    title: "Request Pickup",
    desc: "Jadwalkan penjemputan e-waste langsung ke lokasi kamu.",
    href: "/dashboard/pickup",
    cta: "Jadwalkan Pickup",
  },
  {
    icon: Gift,
    color: "#8E44AD",
    bg: "rgba(142,68,173,0.10)",
    title: "Redeem Rewards",
    desc: "Tukar poinmu dengan token listrik, Transum, atau voucher.",
    href: "/dashboard/rewards",
    cta: "Lihat Hadiah",
  },
];

export function QuickActions() {
  return (
    <div className="mb-8">
      <h2 className="text-base font-bold mb-4" style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}>
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions.map(({ icon: Icon, color, bg, title, desc, href, cta }) => (
          <Link key={href} href={href}
            className="group bg-white rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-200"
            style={{ border: "1px solid #E5EDE9", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", textDecoration: "none" }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
              el.style.transform = "translateY(-3px)";
              el.style.borderColor = "#B8DECA";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
              el.style.transform = "translateY(0)";
              el.style.borderColor = "#E5EDE9";
            }}>
            <div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: bg }}>
                <Icon size={22} color={color} strokeWidth={2} />
              </div>
              <p className="font-bold text-sm mb-1.5" style={{ color: "#1A2E27" }}>{title}</p>
              <p className="text-xs leading-relaxed mb-5" style={{ color: "#8BAF9E" }}>{desc}</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold" style={{ color }}>
              {cta} <ChevronRight size={13} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
