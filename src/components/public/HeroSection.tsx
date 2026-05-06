"use client";
import { Weight, Users, MapPin, Cpu } from "lucide-react";
import { KpiCard } from "./KpiCard";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-28 px-6 overflow-hidden"
      style={{ background: "#ffffff", borderBottom: "1px solid rgba(0,0,0,0.03)" }}>

      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-14 items-center relative z-10">
        {/* LEFT */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(22,196,127,0.08)", border: "1px solid rgba(22,196,127,0.18)", color: "#16C47F" }}>
            Makassar E-Waste Management Platform
          </div>
          <h1 className="text-5xl font-black leading-tight mb-5"
            style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}>
            Transforming<br />
            E-Waste{" "}
            <span style={{ color: "#16C47F" }}>into Impact</span>
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "#5A8A78" }}>
            Platform pengelolaan sampah elektronik berbasis komunitas di Makassar.
            Buang e-waste dengan benar, dapatkan poin, dan bantu lingkungan.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/register"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#16C47F,#0EA572)",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(22,196,127,0.25)",
              }}>
              Mulai Sekarang
            </a>
            <a href="#cara-kerja"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200"
              style={{ border: "1px solid #E5EDE9", color: "#1A2E27", background: "#fff" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#B8DECA"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E5EDE9"; }}>
              Cara Kerja
            </a>
          </div>
        </div>

        {/* RIGHT: KPI 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          <KpiCard icon={<Weight size={20} color="#16C47F" />} value={10000} suffix="kg+" label="Potential Capacity" sublabel="Projected / year" delay={0} />
          <KpiCard icon={<Users size={20} color="#16C47F" />} value={1000} suffix="+" label="Est. Contributors" sublabel="Simulated usage" delay={150} />
          <KpiCard icon={<MapPin size={20} color="#16C47F" />} value={4} label="Pilot Dropbox Sites" sublabel="Across districts" delay={300} />
          <KpiCard icon={<Cpu size={20} color="#16C47F" />} value={28000} suffix="+" label="Est. Parts Recoverable" sublabel="Projected components" delay={450} />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-[1200px] mx-auto px-0 mt-8">
        <p className="text-xs text-center" style={{ color: "#B8DECA" }}>
          ⓘ Values shown are based on simulation and projected usage for MVP demonstration purposes.
        </p>
      </div>

    </section>
  );
}
