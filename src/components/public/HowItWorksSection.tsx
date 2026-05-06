"use client";

const steps = [
  {
    num: "01",
    title: "Datang ke Dropbox atau Jadwalkan Pickup",
    desc: "Temukan dropbox terdekat via peta, atau jadwalkan pickup ke rumahmu. Admin menjemput bersamaan jadwal truk sampah Dinas Lingkungan Hidup.",
  },
  {
    num: "02",
    title: "Scan QR & Input Data",
    desc: "Scan QR code di dropbox untuk identifikasi lokasi otomatis. Input nomor box dan deklarasikan jenis serta jumlah barang yang kamu bawa.",
  },
  {
    num: "03",
    title: "Admin Verifikasi & Timbang",
    desc: "Tim kami mengumpulkan batch e-waste, menimbang setiap item, dan verifikasi. Semua proses tercatat transparan di sistem.",
  },
  {
    num: "04",
    title: "Poin Masuk ke Dompetmu",
    desc: "Setelah verifikasi, poin langsung masuk ke saldo dompetmu. Tukar dengan token listrik, kredit Transum, atau voucher bengkel elektronik.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="py-24 px-6"
      style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.03)", borderBottom: "1px solid rgba(0,0,0,0.03)" }}>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(22,196,127,0.08)", color: "#16C47F", border: "1px solid rgba(22,196,127,0.18)" }}>
            Cara Kerja
          </span>
          <h2 className="text-3xl font-black mb-3"
            style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}>
            Transparan dari Awal hingga Akhir
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "#5A8A78" }}>
            Setiap langkah prosesmu tercatat — kamu bisa lacak status submission secara real-time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 relative">
          {/* Connector line between cards — decorative */}
          <div aria-hidden className="hidden md:block absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[70%]"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(22,196,127,0.15), transparent)" }} />
            <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
              style={{ background: "linear-gradient(to right, transparent, rgba(22,196,127,0.15), transparent)" }} />
          </div>

          {steps.map(({ num, title, desc }) => (
            <div key={num}
              className="group bg-white rounded-2xl p-7 transition-all duration-300"
              style={{
                border: "1px solid #E5EDE9",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.07), 0 0 0 1px rgba(22,196,127,0.1)";
                el.style.borderColor = "#B8DECA";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                el.style.borderColor = "#E5EDE9";
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                  style={{ background: "#16C47F", color: "#fff", fontFamily: "'Space Grotesk',sans-serif" }}>
                  {num}
                </div>
                <div>
                  <h3 className="font-bold text-base mb-2" style={{ color: "#1A2E27" }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#5A8A78" }}>{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
