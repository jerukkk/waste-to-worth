"use client";
import { Users, Weight, Leaf } from "lucide-react";

const districts = [
  { name: "Tamalanrea",   pct: 40 },
  { name: "Panakkukang",  pct: 30 },
  { name: "Rappocini",    pct: 18 },
  { name: "Makassar",     pct: 12 },
];

export function PlatformImpact() {
  return (
    <div className="mb-8">
      <h2 className="text-base font-bold mb-4" style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}>
        Platform Impact
        <span className="ml-2 text-xs font-normal px-2 py-0.5 rounded-full"
          style={{ background: "rgba(22,196,127,0.08)", color: "#16C47F" }}>
          Projected
        </span>
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Left: stats + district */}
        <div className="bg-white rounded-2xl p-6"
          style={{ border: "1px solid #E5EDE9", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          {/* Top stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Weight size={13} color="#16C47F" />
                <span className="text-xs" style={{ color: "#8BAF9E" }}>Total E-Waste</span>
              </div>
              <p className="text-xl font-black" style={{ color: "#16C47F", fontFamily: "'Space Grotesk',sans-serif" }}>10,000+</p>
              <p className="text-xs" style={{ color: "#B8DECA" }}>kg capacity / year</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users size={13} color="#3498DB" />
                <span className="text-xs" style={{ color: "#8BAF9E" }}>Contributors</span>
              </div>
              <p className="text-xl font-black" style={{ color: "#3498DB", fontFamily: "'Space Grotesk',sans-serif" }}>1,000+</p>
              <p className="text-xs" style={{ color: "#B8DECA" }}>estimated users</p>
            </div>
          </div>

          {/* District breakdown */}
          <p className="text-xs font-semibold mb-3" style={{ color: "#5A8A78" }}>Distribusi per Kecamatan</p>
          <div className="space-y-2.5">
            {districts.map(({ name, pct }) => (
              <div key={name}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: "#5A8A78" }}>{name}</span>
                  <span style={{ color: "#8BAF9E" }}>{pct}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "#F0F5F2" }}>
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: "linear-gradient(90deg,#0EA572,#16C47F)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: progress + env impact */}
        <div className="flex flex-col gap-4">
          {/* Progress toward target */}
          <div className="bg-white rounded-2xl p-6"
            style={{ border: "1px solid #E5EDE9", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div className="flex justify-between items-start mb-1">
              <p className="text-sm font-bold" style={{ color: "#1A2E27" }}>Progress Toward Target</p>
              <span className="text-sm font-black" style={{ color: "#16C47F", fontFamily: "'Space Grotesk',sans-serif" }}>50%</span>
            </div>
            <p className="text-xs mb-4" style={{ color: "#8BAF9E" }}>Target: 20,000 kg / year</p>
            <div className="h-3.5 rounded-full overflow-hidden mb-3" style={{ background: "#F0F5F2" }}>
              <div className="h-full rounded-full"
                style={{
                  width: "50%",
                  background: "linear-gradient(90deg,#16C47F,#22FF88)",
                  boxShadow: "0 0 8px rgba(22,196,127,0.30)",
                }} />
            </div>
            <p className="text-xs" style={{ color: "#B8DECA" }}>
              ⓘ Based on projected system capacity
            </p>
          </div>

          {/* Env impact */}
          <div className="bg-white rounded-2xl p-6"
            style={{ border: "1px solid #E5EDE9", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(22,196,127,0.10)" }}>
                <Leaf size={15} color="#16C47F" />
              </div>
              <p className="text-sm font-bold" style={{ color: "#1A2E27" }}>Environmental Impact</p>
            </div>
            <div className="space-y-2">
              {[
                { label: "Hazardous waste prevented", value: "≈ 500 kg" },
                { label: "CO₂ emissions reduced",     value: "≈ 1.5 ton" },
                { label: "Components reusable",        value: "≈ 3,000 parts" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-1"
                  style={{ borderBottom: "1px solid #F0F5F2" }}>
                  <span className="text-xs" style={{ color: "#8BAF9E" }}>{label}</span>
                  <span className="text-xs font-semibold" style={{ color: "#16C47F" }}>{value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: "#B8DECA" }}>
              ⓘ Estimation based on projected usage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
