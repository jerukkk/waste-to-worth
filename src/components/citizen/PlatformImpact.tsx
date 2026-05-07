"use client";
import { Sparkles } from "lucide-react";

interface DistrictActivity {
  name: string;
  totalKg: number;
}

interface CommunityData {
  platformCollectionKg: number;
  contributorCount: number;
  districtActivity: DistrictActivity[];
}

interface PlatformImpactProps {
  community: CommunityData;
}

export function PlatformImpact({ community }: PlatformImpactProps) {
  const maxKg = Math.max(
    ...community.districtActivity.map((d) => d.totalKg),
    1
  );

  // Placeholder target (no DB schema for this)
  const targetKg = 20000;
  const currentKg = community.platformCollectionKg;
  const progressPct = Math.min(
    Math.round((currentKg / targetKg) * 100),
    100
  );

  return (
    <div className="space-y-4">
      {/* Community Impact Card */}
      <div
        className="bg-white rounded-2xl p-6"
        style={{
          border: "1px solid #E5EDE9",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <h3
          className="text-sm font-bold mb-5"
          style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}
        >
          Community Impact
        </h3>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p
              className="text-xs mb-1"
              style={{ color: "#8BAF9E", textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              Platform Collection
            </p>
            <p
              className="text-xl font-black"
              style={{ color: "#16C47F", fontFamily: "'Space Grotesk',sans-serif" }}
            >
              {currentKg > 0
                ? `${currentKg.toLocaleString()} kg`
                : "10,000+ kg"}
            </p>
          </div>
          <div>
            <p
              className="text-xs mb-1"
              style={{ color: "#8BAF9E", textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              Contributors
            </p>
            <p
              className="text-xl font-black"
              style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}
            >
              {community.contributorCount > 0
                ? community.contributorCount.toLocaleString() + "+"
                : "1,000+"}
            </p>
          </div>
        </div>

        {/* District Activity */}
        <p
          className="text-xs font-bold mb-3"
          style={{ color: "#1A2E27" }}
        >
          District Activity
        </p>
        <div className="space-y-3">
          {community.districtActivity.length > 0 ? (
            community.districtActivity.map(({ name, totalKg }) => (
              <div key={name}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: "#5A8A78" }}>{name}</span>
                  <span
                    className="font-semibold"
                    style={{ color: "#1A2E27" }}
                  >
                    {totalKg > 0
                      ? `${totalKg.toLocaleString()} kg`
                      : "—"}
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "#F0F5F2" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.max((totalKg / maxKg) * 100, 5)}%`,
                      background:
                        "linear-gradient(90deg,#0EA572,#16C47F)",
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <>
              {[
                { name: "Tamalanrea", kg: "4,200 kg", pct: 100 },
                { name: "Panakkukang", kg: "2,800 kg", pct: 67 },
              ].map(({ name, kg, pct }) => (
                <div key={name}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: "#5A8A78" }}>{name}</span>
                    <span
                      className="font-semibold"
                      style={{ color: "#1A2E27" }}
                    >
                      {kg}
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: "#F0F5F2" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background:
                          "linear-gradient(90deg,#0EA572,#16C47F)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* 2026 Collection Target — dark card */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg, #0F2A24 0%, #1A3D34 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} color="#16C47F" />
          <p className="text-sm font-bold" style={{ color: "#E6FFF4" }}>
            2026 Collection Target
          </p>
        </div>

        <div className="flex items-baseline gap-3 mb-1">
          <p
            className="text-3xl font-black"
            style={{
              color: "#fff",
              fontFamily: "'Space Grotesk',sans-serif",
            }}
          >
            {currentKg > 0
              ? currentKg.toLocaleString()
              : "10,000"}
          </p>
          <p className="text-sm" style={{ color: "#8BAF9E" }}>
            / {targetKg.toLocaleString()} kg
          </p>
          <p
            className="text-sm font-bold ml-auto"
            style={{ color: "#16C47F" }}
          >
            {progressPct}%
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="h-2.5 rounded-full overflow-hidden mb-4"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${Math.max(progressPct, 3)}%`,
              background: "linear-gradient(90deg, #16C47F, #22FF88)",
              boxShadow: "0 0 12px rgba(22,196,127,0.4)",
            }}
          />
        </div>

        <p className="text-xs leading-relaxed" style={{ color: "#8BAF9E" }}>
          Building Makassar&apos;s first digital e-waste infrastructure.
        </p>
      </div>
    </div>
  );
}
