"use client";
import { ClipboardCheck, Truck, ShieldCheck, Star, ChevronRight } from "lucide-react";

const steps = [
  { icon: ClipboardCheck, label: "Submitted" },
  { icon: Truck,          label: "Collecting" },
  { icon: ShieldCheck,    label: "Verifying" },
  { icon: Star,           label: "Completed" },
];

const submissions = [
  {
    id: "WTW-MKS01-042",
    item: "Laptop Dell · 2.1 kg",
    location: "Dropbox · Tamalanrea",
    date: "5 Mei 2025",
    currentStep: 2, // 0-indexed: Verifying
  },
  {
    id: "WTW-MKS01-039",
    item: "Smartphone Oppo · 0.8 kg",
    location: "Dropbox · Panakkukang",
    date: "2 Mei 2025",
    currentStep: 1, // Collecting
  },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-0 mt-4">
      {steps.map(({ icon: Icon, label }, i) => {
        const done = i <= currentStep;
        const active = i === currentStep;
        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: done ? "#16C47F" : "#F0F5F2",
                  boxShadow: active ? "0 0 0 3px rgba(22,196,127,0.20)" : "none",
                }}>
                <Icon size={14} color={done ? "#fff" : "#B8DECA"} strokeWidth={2.5} />
              </div>
              <span className="text-xs whitespace-nowrap"
                style={{ color: done ? "#16C47F" : "#B8DECA", fontWeight: active ? 600 : 400, fontSize: "10px" }}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-1 mb-5 rounded-full"
                style={{ background: i < currentStep ? "#16C47F" : "#E5EDE9" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function ActiveSubmissions() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold" style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}>
          Active Submissions
        </h2>
        <a href="/dashboard/submissions"
          className="flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
          style={{ color: "#8BAF9E" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#16C47F"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#8BAF9E"; }}>
          Lihat Semua <ChevronRight size={12} />
        </a>
      </div>

      <div className="space-y-4">
        {submissions.map(({ id, item, location, date, currentStep }) => (
          <div key={id} className="bg-white rounded-2xl p-6 transition-all duration-200"
            style={{ border: "1px solid #E5EDE9", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="font-bold text-sm" style={{ color: "#1A2E27" }}>{item}</p>
                <p className="text-xs mt-0.5" style={{ color: "#8BAF9E" }}>{location} · {date}</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                style={{ background: "rgba(243,156,18,0.10)", color: "#F39C12", border: "1px solid rgba(243,156,18,0.2)" }}>
                {steps[currentStep].label}
              </span>
            </div>
            <p className="text-xs mb-1" style={{ color: "#B8DECA" }}>#{id}</p>
            <StepIndicator currentStep={currentStep} />
          </div>
        ))}
      </div>
    </div>
  );
}
