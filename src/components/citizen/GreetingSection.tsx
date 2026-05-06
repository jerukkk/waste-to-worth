"use client";
import { Coins, Package, RefreshCw, Gift } from "lucide-react";

const kpis = [
  { icon: Coins,     color: "#16C47F", bg: "rgba(22,196,127,0.10)", value: "1.250",  unit: "Points",  label: "Saldo Poin",         sub: "Your Impact" },
  { icon: Package,   color: "#3498DB", bg: "rgba(52,152,219,0.10)", value: "12 kg",  unit: "",        label: "Total Submitted",    sub: "Your Impact" },
  { icon: RefreshCw, color: "#F39C12", bg: "rgba(243,156,18,0.10)", value: "2",      unit: "Ongoing", label: "Active Submissions", sub: "Your Impact" },
  { icon: Gift,      color: "#8E44AD", bg: "rgba(142,68,173,0.10)", value: "3",      unit: "Rewards", label: "Rewards Redeemed",   sub: "Your Impact" },
];

export function GreetingSection() {
  return (
    <div className="mb-8">
      {/* Greeting */}
      <div className="mb-7">
        <h1 className="text-2xl font-black mb-1" style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}>
          Hi, Noval 👋
        </h1>
        <p className="text-sm" style={{ color: "#8BAF9E" }}>
          Let's turn your e-waste into impact today.
        </p>
      </div>

      {/* Personal KPI */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(({ icon: Icon, color, bg, value, unit, label, sub }) => (
          <div key={label} className="bg-white rounded-2xl p-5 transition-all duration-200"
            style={{ border: "1px solid #E5EDE9", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
              el.style.transform = "translateY(0)";
            }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: bg }}>
              <Icon size={18} color={color} strokeWidth={2} />
            </div>
            <div className="flex items-baseline gap-1 mb-0.5">
              <span className="text-2xl font-black" style={{ color, fontFamily: "'Space Grotesk',sans-serif" }}>{value}</span>
              {unit && <span className="text-xs font-semibold" style={{ color }}>{unit}</span>}
            </div>
            <p className="text-xs font-semibold mb-0.5" style={{ color: "#1A2E27" }}>{label}</p>
            <p className="text-xs" style={{ color: "#B8DECA" }}>{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
