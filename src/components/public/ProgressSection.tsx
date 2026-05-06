"use client";
import { TrendingUp } from "lucide-react";

const districts = [
  { name: "Tamalanrea",  pct: 85, kg: "~2,800" },
  { name: "Panakkukang", pct: 70, kg: "~2,200" },
  { name: "Rappocini",   pct: 60, kg: "~2,000" },
  { name: "Makassar",    pct: 45, kg: "~1,500" },
];

export function ProgressSection() {
  return (
    <section className="py-24 px-6"
      style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.03)", borderBottom: "1px solid rgba(0,0,0,0.03)" }}>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: "rgba(22,196,127,0.08)", color: "#16C47F", border: "1px solid rgba(22,196,127,0.18)" }}>
              2025 Annual Target
            </span>
            <h2 className="text-4xl font-black mb-4"
              style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}>
              Projected Target:{" "}
              <span style={{ color: "#16C47F" }}>10,000 kg</span>
            </h2>
            <p className="text-base leading-relaxed mb-3" style={{ color: "#5A8A78" }}>
              Sistem ini diproyeksikan mampu menangani hingga{" "}
              <strong style={{ color: "#16C47F" }}>10,000 kg</strong> e-waste per tahun
              dengan <strong style={{ color: "#1A2E27" }}>4 pilot dropbox</strong> di Makassar.
            </p>
            <p className="text-xs mb-4 px-3 py-2 rounded-lg"
              style={{ color: "#8BAF9E", background: "rgba(22,196,127,0.05)", border: "1px solid rgba(22,196,127,0.1)" }}>
              ⓘ Distribusi berdasarkan simulasi kapasitas per kecamatan.
            </p>
            <div className="flex items-center gap-2 text-sm" style={{ color: "#8BAF9E" }}>
              <TrendingUp size={14} color="#16C47F" />
              Target achieved · Januari – Mei 2025
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-2xl p-8"
            style={{ border: "1px solid #E5EDE9", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
            {/* Overall */}
            <div className="mb-7">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold" style={{ color: "#1A2E27" }}>Projected Capacity Used</span>
                <span className="font-black" style={{ color: "#16C47F" }}>~85% of target</span>
              </div>
              <div className="h-4 rounded-full overflow-hidden" style={{ background: "#F0F5F2" }}>
                <div className="h-full rounded-full"
                  style={{
                    width: "100%",
                    background: "linear-gradient(90deg, #16C47F, #22FF88)",
                    boxShadow: "0 0 10px rgba(22,196,127,0.3)",
                  }} />
              </div>
            </div>

            {/* Per district */}
            <div className="space-y-4">
              {districts.map(({ name, pct, kg }) => (
                <div key={name}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: "#5A8A78" }}>{name}</span>
                    <span style={{ color: "#8BAF9E" }}>{kg} kg (proj.) · {pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#F0F5F2" }}>
                    <div className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: "linear-gradient(90deg, #0EA572, #16C47F)",
                      }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
