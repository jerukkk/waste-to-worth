"use client";
import { Smartphone, Laptop, Cable, Tv, AirVent, Printer, MonitorSpeaker, BatteryCharging } from "lucide-react";

const materials = [
  { icon: Smartphone,      label: "Smartphone & HP",  desc: "Semua merek, semua kondisi" },
  { icon: Laptop,          label: "Laptop & Tablet",  desc: "Termasuk charger & aksesoris" },
  { icon: Tv,              label: "TV & Monitor",     desc: "LCD, LED, tabung (CRT)" },
  { icon: Cable,           label: "Kabel & Adaptor",  desc: "Semua jenis kabel elektronik" },
  { icon: AirVent,         label: "AC & Kipas",       desc: "Unit indoor/outdoor" },
  { icon: Printer,         label: "Printer & Scanner",desc: "Termasuk tinta & cartridge" },
  { icon: MonitorSpeaker,  label: "Speaker & Audio",  desc: "Headphone, radio, amplifier" },
  { icon: BatteryCharging, label: "Baterai & Power",  desc: "Power bank, baterai bekas" },
];

export function MaterialSection() {
  return (
    <section className="relative py-24 px-6"
      style={{
        background: "linear-gradient(135deg, rgba(22,196,127,0.08), rgba(34,255,136,0.04))",
        borderTop: "1px solid rgba(0,0,0,0.03)",
        borderBottom: "1px solid rgba(0,0,0,0.03)",
      }}>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(22,196,127,0.08)", color: "#16C47F", border: "1px solid rgba(22,196,127,0.18)" }}>
            Material yang Diterima
          </span>
          <h2 className="text-3xl font-black mb-3"
            style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}>
            Apa Saja yang Bisa Kamu Buang?
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "#5A8A78" }}>
            Kami menerima semua jenis perangkat elektronik — rusak, usang, maupun tidak terpakai.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {materials.map(({ icon: Icon, label, desc }, i) => (
            <div key={i}
              className="group bg-white rounded-2xl p-6 cursor-default transition-all duration-300"
              style={{
                border: "1px solid #E5EDE9",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.07), 0 0 0 1px rgba(22,196,127,0.12)";
                el.style.borderColor = "#B8DECA";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                el.style.borderColor = "#E5EDE9";
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: "rgba(22,196,127,0.08)", border: "1px solid rgba(22,196,127,0.12)" }}>
                <Icon size={22} color="#16C47F" strokeWidth={1.8} />
              </div>
              <p className="font-bold text-sm mb-1" style={{ color: "#1A2E27" }}>{label}</p>
              <p className="text-xs leading-relaxed" style={{ color: "#8BAF9E" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
