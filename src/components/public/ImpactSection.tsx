"use client";
import Link from "next/link";
import { ChevronRight, Cpu, ShieldAlert, RefreshCw, BarChart3, Heart, Building2, Sprout } from "lucide-react";

const impacts = [
  {
    icon: ShieldAlert,
    color: "#E74C3C",
    colorBg: "rgba(231,76,60,0.08)",
    title: "Cegah Pencemaran B3",
    desc: "Mencegah timbal, merkuri, dan kadmium mencemari tanah dan air tanah di sekitar pemukiman.",
  },
  {
    icon: RefreshCw,
    color: "#16C47F",
    colorBg: "rgba(22,196,127,0.08)",
    title: "Ekonomi Sirkular",
    desc: "Komponen digunakan kembali oleh bengkel lokal, sisanya di-upcycle menjadi produk bernilai ekonomi.",
  },
  {
    icon: BarChart3,
    color: "#3498DB",
    colorBg: "rgba(52,152,219,0.08)",
    title: "Transparansi Data DLH",
    desc: "Alur limbah terpantau digital — mendukung monitoring pemerintah dan Dinas Lingkungan Hidup secara real-time.",
  },
  {
    icon: Heart,
    color: "#27AE60",
    colorBg: "rgba(39,174,96,0.08)",
    title: "SDG 12 — Konsumsi Bertanggung Jawab",
    desc: "Mendorong kebiasaan pengelolaan elektronik yang lebih sadar dan berkelanjutan di masyarakat Makassar.",
  },
  {
    icon: Building2,
    color: "#8E44AD",
    colorBg: "rgba(142,68,173,0.08)",
    title: "SDG 11 — Kota Berkelanjutan",
    desc: "Mendukung infrastruktur smart city berbasis pengelolaan limbah digital yang terdata dan transparan.",
  },
  {
    icon: Sprout,
    color: "#16A085",
    colorBg: "rgba(22,160,133,0.08)",
    title: "Green Jobs di KTI",
    desc: "Membuka peluang kerja baru: kurir e-waste, mitra upcycle, dan operator pengelolaan limbah elektronik.",
  },
];

export function ImpactSection() {
  return (
    <>
      {/* IMPACT INSIGHTS */}
      <section className="py-24 px-6"
        style={{
          background: "linear-gradient(135deg, rgba(22,196,127,0.08), rgba(34,255,136,0.03))",
          borderTop: "1px solid rgba(0,0,0,0.03)",
          borderBottom: "1px solid rgba(0,0,0,0.03)",
        }}>
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(22,196,127,0.1)", color: "#16C47F", border: "1px solid rgba(22,196,127,0.2)" }}>
              Impact Insights
            </span>
            <h2 className="text-3xl font-black mb-2"
              style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}>
              Setiap Kilogram = Dampak Nyata
            </h2>
            <p className="text-sm mb-1" style={{ color: "#5A8A78" }}>
              Ecotronic mengubah e-waste menjadi nilai lingkungan, ekonomi, dan sosial yang terukur.
            </p>
            <p className="text-xs" style={{ color: "#B8DECA" }}>
              Impact based on projected system implementation
            </p>
          </div>

          {/* 3-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {impacts.map(({ icon: Icon, color, colorBg, title, desc }) => (
              <div
                key={title}
                className="group bg-white rounded-2xl overflow-hidden cursor-default transition-all duration-300"
                style={{
                  border: "1px solid #E5EDE9",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)";
                  el.style.borderColor = "#B8DECA";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                  el.style.borderColor = "#E5EDE9";
                }}
              >
                {/* Accent bar top */}
                <div className="h-[3px] w-full" style={{ background: color, opacity: 0.6 }} />

                <div className="p-5">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: colorBg }}>
                    <Icon size={18} color={color} strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <p className="font-semibold text-sm mb-2 leading-snug" style={{ color: "#1A2E27" }}>
                    {title}
                  </p>

                  {/* Description */}
                  <p className="text-xs leading-relaxed" style={{ color: "#8BAF9E" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6"
        style={{
          background: "linear-gradient(135deg, rgba(22,196,127,0.12), rgba(34,255,136,0.06))",
          borderTop: "1px solid rgba(0,0,0,0.03)",
        }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="bg-white rounded-3xl p-10 md:p-14 grid md:grid-cols-[1.6fr_1fr] gap-10 md:gap-16 items-center"
            style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.07)", border: "1px solid #E5EDE9" }}>

            {/* LEFT */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5"
                style={{ background: "rgba(22,196,127,0.1)", color: "#16C47F", border: "1px solid rgba(22,196,127,0.2)" }}>
                Bergabung Sekarang
              </span>
              <h2 className="text-3xl font-black mb-4 leading-tight"
                style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}>
                Siap Berkontribusi?
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#5A8A78" }}>
                Buang e-waste dengan benar, dapatkan reward, dan jadi bagian dari perubahan di Makassar.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm transition-all duration-200"
                  style={{
                    background: "#16C47F",
                    color: "#fff",
                    borderRadius: "999px",
                    boxShadow: "0 4px 16px rgba(22,196,127,0.30)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = "0 8px 24px rgba(22,196,127,0.40)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 4px 16px rgba(22,196,127,0.30)";
                  }}>
                  Daftar Sekarang <ChevronRight size={16} />
                </Link>
                <Link href="/login"
                  className="text-sm font-semibold transition-colors duration-200"
                  style={{ color: "#8BAF9E" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#16C47F"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#8BAF9E"; }}>
                  Sudah punya akun? Login →
                </Link>
              </div>
            </div>

            {/* RIGHT: Mini Impact Card */}
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl p-5" style={{ background: "#F8FAF9", border: "1px solid #E5EDE9" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(22,196,127,0.12)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16C47F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "#1A2E27" }}>Submission Diterima</p>
                    <p className="text-xs" style={{ color: "#8BAF9E" }}>Smartphone · 1.2 kg</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: "linear-gradient(135deg,#16C47F,#0EA572)" }}>
                  <p className="text-white text-xs font-semibold">Poin Didapat</p>
                  <p className="text-white font-black text-lg" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>+50 pts</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[{label:"Token Listrik",sub:"10.000 pts"},{label:"Kredit Transum",sub:"5.000 pts"}].map(r => (
                  <div key={r.label} className="p-3 rounded-xl text-center"
                    style={{ background: "#fff", border: "1px solid #E5EDE9" }}>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: "#1A2E27" }}>{r.label}</p>
                    <p className="text-xs" style={{ color: "#B8DECA" }}>{r.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ borderTop: "1px solid #E5EDE9", background: "#FAFAFA" }}>
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#16C47F,#0EA572)" }}>
              <Cpu size={12} color="#fff" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-bold" style={{ color: "#1A2E27" }}>Waste2Worth</span>
          </div>
          <p className="text-xs" style={{ color: "#8BAF9E" }}>
            © 2025 Waste to Worth · Makassar · Powered by Dinas Lingkungan Hidup
          </p>
        </div>
      </footer>
    </>
  );
}
