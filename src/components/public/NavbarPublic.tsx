"use client";
import Link from "next/link";
import { Cpu } from "lucide-react";

export function NavbarPublic() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "rgba(248,250,249,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid #E5EDE9" }}>
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#16C47F,#0EA572)" }}>
            <Cpu size={15} color="#fff" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg" style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}>
            Waste<span style={{ color: "#16C47F" }}>2</span>Worth
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "rgba(22,196,127,0.1)", color: "#16C47F", border: "1px solid rgba(22,196,127,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#16C47F" }} />
            Live Dashboard
          </div>
          <Link href="/login"
            className="px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg,#16C47F,#0EA572)", color: "#fff" }}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
