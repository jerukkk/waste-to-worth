"use client";
import Link from "next/link";
import { Lock, Coins, CheckCircle2, Truck, ClipboardCheck, Star } from "lucide-react";

const steps = [
  { icon: ClipboardCheck, label: "Submitted",    done: true  },
  { icon: Truck,          label: "Dijemput",     done: true  },
  { icon: CheckCircle2,   label: "Diverifikasi", done: false },
  { icon: Star,           label: "Poin Masuk",   done: false },
];

export function TrackingSection() {
  return (
    <section className="py-24 px-6"
      style={{ background: "#F1F8F5", borderTop: "1px solid rgba(0,0,0,0.03)", borderBottom: "1px solid rgba(0,0,0,0.03)" }}>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(22,196,127,0.08)", color: "#16C47F", border: "1px solid rgba(22,196,127,0.18)" }}>
            Lacak & Dompet
          </span>
          <h2 className="text-3xl font-black mb-3"
            style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}>
            Status & Dompetmu dalam Satu Layar
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "#5A8A78" }}>
            Login untuk melihat status pengumpulan real-time dan saldo poin kamu.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* WALLET PREVIEW */}
          <div className="relative bg-white rounded-2xl p-8 overflow-hidden"
            style={{
              border: "1px solid #E5EDE9",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}>
            {/* Very subtle green tint inside card */}
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{ background: "radial-gradient(circle at 80% 10%, rgba(22,196,127,0.04) 0%, transparent 60%)" }} />

            {/* Lock overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl"
              style={{ backdropFilter: "blur(7px)", background: "rgba(255,255,255,0.72)" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ background: "rgba(22,196,127,0.1)" }}>
                <Lock size={22} color="#16C47F" />
              </div>
              <p className="font-bold text-sm mb-1" style={{ color: "#1A2E27" }}>Available after login</p>
              <p className="text-xs mb-5" style={{ color: "#8BAF9E" }}>Login untuk akses dompet dan histori kamu</p>
              <Link href="/login"
                className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg,#16C47F,#0EA572)",
                  color: "#fff",
                  boxShadow: "0 4px 16px rgba(22,196,127,0.22)",
                }}>
                Login to Access
              </Link>
            </div>

            {/* Dummy content behind blur */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full" style={{ background: "#E5EDE9" }} />
              <div>
                <div className="h-3 w-24 rounded-full mb-1.5" style={{ background: "#E5EDE9" }} />
                <div className="h-2 w-16 rounded-full" style={{ background: "#F0F5F2" }} />
              </div>
            </div>
            <div className="p-5 rounded-xl mb-4"
              style={{ background: "linear-gradient(135deg,#16C47F,#0EA572)" }}>
              <p className="text-white/80 text-xs mb-1">Total Poin Kamu</p>
              <p className="text-white text-4xl font-black">2.450</p>
              <p className="text-white/70 text-xs mt-1">≈ Rp 24.500 equiv.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Token Listrik", "Transum"].map((r) => (
                <div key={r} className="p-3 rounded-xl" style={{ background: "#F8FAF9", border: "1px solid #E5EDE9" }}>
                  <Coins size={14} color="#16C47F" className="mb-1" />
                  <p className="text-xs font-semibold" style={{ color: "#1A2E27" }}>{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TRACKING STEPPER */}
          <div className="bg-white rounded-2xl p-8"
            style={{
              border: "1px solid #E5EDE9",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}>
            <p className="font-bold text-base mb-0.5" style={{ color: "#1A2E27" }}>Submission #WTW-MKS01-007</p>
            <p className="text-xs mb-8" style={{ color: "#8BAF9E" }}>Smartphone · 1.2 kg · Tamalanrea</p>

            <div className="relative">
              <div className="absolute left-5 top-10 bottom-6 w-px" style={{ background: "#E5EDE9" }} />
              <div className="absolute left-5 top-10 w-px" style={{ height: "52%", background: "linear-gradient(to bottom, #16C47F, #16C47F80)" }} />
              <div className="space-y-8">
                {steps.map(({ icon: Icon, label, done }, i) => (
                  <div key={i} className="flex items-center gap-5 relative">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all duration-300"
                      style={{
                        background: done ? "#16C47F" : "#fff",
                        border: done ? "none" : "2px solid #E5EDE9",
                        boxShadow: done ? "0 0 0 4px rgba(22,196,127,0.1)" : "none",
                      }}>
                      <Icon size={16} color={done ? "#fff" : "#8BAF9E"} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: done ? "#1A2E27" : "#8BAF9E" }}>{label}</p>
                      <p className="text-xs" style={{ color: done ? "#B8DECA" : "#D1DDD8" }}>
                        {done ? "Selesai ✓" : "Menunggu..."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
