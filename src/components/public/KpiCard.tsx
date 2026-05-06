"use client";

import { useEffect, useRef, useState } from "react";

interface KpiCardProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
  delay?: number;
}

function useCountUp(target: number, duration = 2000, delay = 0) {
  const [count, setCount] = useState(0);
  const alive = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => {
      alive.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        if (!alive.current) return;
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCount(Math.floor(eased * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(t); alive.current = false; };
  }, [target, duration, delay]);

  return count;
}

export function KpiCard({ icon, value, suffix = "", label, sublabel, delay = 0 }: KpiCardProps) {
  const count = useCountUp(value, 2000, delay);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay + 80);
    return () => clearTimeout(t);
  }, [delay]);

  const formatted = count >= 1000 ? count.toLocaleString("id-ID") : count.toString();

  return (
    <div
      className="group relative bg-white rounded-2xl p-6 cursor-default transition-all duration-500"
      style={{
        border: "1px solid #E5EDE9",
        boxShadow: "0 2px 12px rgba(22,196,127,0.06)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(22,196,127,0.15)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(22,196,127,0.06)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Icon */}
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{ background: "linear-gradient(135deg,rgba(22,196,127,0.15),rgba(34,255,136,0.08))" }}>
        {icon}
      </div>

      {/* Number */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl font-black" style={{ color: "#16C47F", fontFamily: "'Space Grotesk',sans-serif" }}>
          {formatted}
        </span>
        {suffix && <span className="text-base font-semibold" style={{ color: "#16C47F" }}>{suffix}</span>}
      </div>

      <p className="text-sm font-semibold" style={{ color: "#1A2E27" }}>{label}</p>
      {sublabel && <p className="text-xs mt-0.5" style={{ color: "#8BAF9E" }}>{sublabel}</p>}

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg,transparent,#16C47F,transparent)" }} />
    </div>
  );
}
