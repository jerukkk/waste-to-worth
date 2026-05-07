"use client";
import { TrendingUp } from "lucide-react";

interface Stats {
  totalPoints: number;
  pointsThisMonth: number;
  totalSubmittedKg: number;
  activeSubmissions: number;
  personalImpactKg: number;
}

interface GreetingSectionProps {
  userName: string;
  stats: Stats;
}

export function GreetingSection({ userName, stats }: GreetingSectionProps) {
  const firstName = userName.split(" ")[0] || "User";

  return (
    <div className="mb-8">
      {/* Top row: greeting + badge */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1
            className="text-2xl font-black mb-1"
            style={{
              color: "#1A2E27",
              fontFamily: "'Space Grotesk',sans-serif",
            }}
          >
            Hi, {firstName} 👋
          </h1>
          <p className="text-sm" style={{ color: "#8BAF9E" }}>
            Let&apos;s turn your e-waste into meaningful impact today.
          </p>
        </div>

        {stats.activeSubmissions > 0 && (
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold flex-shrink-0"
            style={{
              background: "#fff",
              border: "1px solid #E5EDE9",
              color: "#1A2E27",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#16C47F" }}
            />
            Today: {stats.activeSubmissions} Active Submission
            {stats.activeSubmissions !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Total Points */}
        <div
          className="bg-white rounded-2xl p-5 transition-all duration-200"
          style={{
            border: "1px solid #E5EDE9",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
            el.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            el.style.transform = "translateY(0)";
          }}
        >
          <p
            className="text-xs font-medium mb-2"
            style={{ color: "#8BAF9E" }}
          >
            Total Points
          </p>
          <p
            className="text-2xl font-black mb-1"
            style={{
              color: "#1A2E27",
              fontFamily: "'Space Grotesk',sans-serif",
            }}
          >
            {stats.totalPoints.toLocaleString()}
          </p>
          {stats.pointsThisMonth > 0 && (
            <div className="flex items-center gap-1">
              <TrendingUp size={12} color="#16C47F" />
              <span
                className="text-xs font-semibold"
                style={{ color: "#16C47F" }}
              >
                +{stats.pointsThisMonth} this month
              </span>
            </div>
          )}
        </div>

        {/* Total Submitted */}
        <div
          className="bg-white rounded-2xl p-5 transition-all duration-200"
          style={{
            border: "1px solid #E5EDE9",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
            el.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            el.style.transform = "translateY(0)";
          }}
        >
          <p
            className="text-xs font-medium mb-2"
            style={{ color: "#8BAF9E" }}
          >
            Total Submitted
          </p>
          <p
            className="text-2xl font-black mb-1"
            style={{
              color: "#1A2E27",
              fontFamily: "'Space Grotesk',sans-serif",
            }}
          >
            {stats.totalSubmittedKg}{" "}
            <span className="text-sm font-semibold" style={{ color: "#8BAF9E" }}>
              kg
            </span>
          </p>
          <p className="text-xs" style={{ color: "#8BAF9E" }}>
            Lifetime collection
          </p>
        </div>

        {/* Active Submissions */}
        <div
          className="bg-white rounded-2xl p-5 transition-all duration-200"
          style={{
            border: "1px solid #E5EDE9",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
            el.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            el.style.transform = "translateY(0)";
          }}
        >
          <p
            className="text-xs font-medium mb-2"
            style={{ color: "#8BAF9E" }}
          >
            Active Submissions
          </p>
          <p
            className="text-2xl font-black mb-1"
            style={{
              color: "#1A2E27",
              fontFamily: "'Space Grotesk',sans-serif",
            }}
          >
            {stats.activeSubmissions}
          </p>
          {stats.activeSubmissions > 0 && (
            <span
              className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full"
              style={{
                background: "rgba(22,196,127,0.10)",
                color: "#16C47F",
                border: "1px solid rgba(22,196,127,0.2)",
              }}
            >
              In Verification
            </span>
          )}
        </div>

        {/* Personal Impact */}
        <div
          className="bg-white rounded-2xl p-5 transition-all duration-200"
          style={{
            border: "1px solid rgba(22,196,127,0.3)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            background:
              "linear-gradient(135deg, rgba(22,196,127,0.03) 0%, #fff 100%)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = "0 6px 20px rgba(22,196,127,0.12)";
            el.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            el.style.transform = "translateY(0)";
          }}
        >
          <p
            className="text-xs font-semibold mb-2"
            style={{ color: "#16C47F" }}
          >
            Personal Impact
          </p>
          <p
            className="text-2xl font-black mb-1"
            style={{
              color: "#1A2E27",
              fontFamily: "'Space Grotesk',sans-serif",
            }}
          >
            {stats.personalImpactKg}{" "}
            <span className="text-sm font-semibold" style={{ color: "#8BAF9E" }}>
              kg
            </span>
          </p>
          <p className="text-xs" style={{ color: "#8BAF9E" }}>
            Hazardous Waste Prevented
          </p>
        </div>
      </div>
    </div>
  );
}
