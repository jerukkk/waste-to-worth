"use client";

import { useEffect, useState } from "react";
import { SidebarCitizen } from "@/components/citizen/SidebarCitizen";
import Link from "next/link";
import {
  PackagePlus,
  Truck,
  Zap,
  MonitorSmartphone,
  MapPin,
  CheckCircle2,
  CalendarClock,
  Home,
  Package,
} from "lucide-react";

interface DropboxData {
  id: string;
  name: string;
  address: string;
  isActive: boolean;
  maxCapacity: number;
  currentBoxCount: number;
  capacityPercent: number;
  isFull: boolean;
  availableBoxes: { id: string; boxNumber: string; isAvailable: boolean }[];
}

interface DistrictData {
  id: string;
  name: string;
}

export default function SubmitPage() {
  const [dropboxes, setDropboxes] = useState<DropboxData[]>([]);
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/dropboxes").then((r) => r.json()),
      fetch("/api/dashboard").then((r) => r.json()),
    ])
      .then(([dropboxRes, dashboardRes]) => {
        if (dropboxRes.data) setDropboxes(dropboxRes.data);
        if (dashboardRes.community?.districtActivity) {
          setDistricts(
            dashboardRes.community.districtActivity.map(
              (d: { name: string }) => ({
                id: d.name.toLowerCase(),
                name: d.name,
              })
            )
          );
        }
        // Fallback districts if none from dashboard
        if (
          !dashboardRes.community?.districtActivity ||
          dashboardRes.community.districtActivity.length === 0
        ) {
          setDistricts([
            { id: "tamalanrea", name: "Tamalanrea" },
            { id: "panakkukang", name: "Panakkukang" },
            { id: "rappocini", name: "Rappocini" },
          ]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen" style={{ background: "#F8FAF9" }}>
      <SidebarCitizen />
      <main className="flex-1 ml-64 min-h-screen">
        <div className="max-w-[1100px] mx-auto px-8 py-10">
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-2xl font-black mb-1"
              style={{
                color: "#1A2E27",
                fontFamily: "'Space Grotesk',sans-serif",
              }}
            >
              Choose Submission Method
            </h1>
            <p className="text-sm" style={{ color: "#8BAF9E" }}>
              Select the method that best fits your current needs.
            </p>
          </div>

          {/* Two method cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Smart Dropbox */}
            <div
              className="bg-white rounded-2xl p-7 transition-all duration-200 flex flex-col"
              style={{
                border: "2px solid rgba(22,196,127,0.3)",
                boxShadow: "0 2px 12px rgba(22,196,127,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 30px rgba(22,196,127,0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 2px 12px rgba(22,196,127,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(22,196,127,0.10)" }}
              >
                <PackagePlus size={28} color="#16C47F" strokeWidth={1.5} />
              </div>
              <h2
                className="text-xl font-bold mb-3"
                style={{
                  color: "#1A2E27",
                  fontFamily: "'Space Grotesk',sans-serif",
                }}
              >
                Smart Dropbox
              </h2>
              <p
                className="text-sm mb-5 leading-relaxed"
                style={{ color: "#8BAF9E" }}
              >
                Scan a QR code at a verified dropbox location to continue with
                your e-waste submission.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  { icon: Zap, text: "Faster verification" },
                  {
                    icon: MonitorSmartphone,
                    text: "Real-time capacity tracking",
                  },
                  { icon: MapPin, text: "Direct drop-off system" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "#1A2E27" }}
                  >
                    <Icon size={16} color="#16C47F" strokeWidth={2} />
                    <span className="font-medium">{text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Link
                  href="/submit/dropbox"
                  className="block text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: "#16C47F",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(22,196,127,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "#0EA572";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "#16C47F";
                  }}
                >
                  Open Form Details
                </Link>
                <p
                  className="text-xs text-center mt-3"
                  style={{ color: "#B8DECA" }}
                >
                  Requires a verified QR dropbox scan
                </p>
              </div>
            </div>

            {/* On-Demand Pickup */}
            <div
              className="bg-white rounded-2xl p-7 transition-all duration-200 flex flex-col"
              style={{
                border: "1px solid #E5EDE9",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(0,0,0,0.08)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(0,0,0,0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(52,152,219,0.08)" }}
              >
                <Truck size={28} color="#5A8A78" strokeWidth={1.5} />
              </div>
              <h2
                className="text-xl font-bold mb-3"
                style={{
                  color: "#1A2E27",
                  fontFamily: "'Space Grotesk',sans-serif",
                }}
              >
                On-Demand Pickup
              </h2>
              <p
                className="text-sm mb-5 leading-relaxed"
                style={{ color: "#8BAF9E" }}
              >
                Schedule a professional collection from your doorstep. Best for
                bulk items or large home appliances.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  { icon: Home, text: "Zero travel required" },
                  { icon: CalendarClock, text: "Batch-based scheduling system" },
                  { icon: Package, text: "Ideal for large white goods" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "#1A2E27" }}
                  >
                    <Icon size={16} color="#5A8A78" strokeWidth={2} />
                    <span className="font-medium">{text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Link
                  href="/submit/pickup"
                  className="block text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: "#fff",
                    color: "#1A2E27",
                    border: "1.5px solid #E5EDE9",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "#1A2E27";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "#E5EDE9";
                  }}
                >
                  Schedule Collection
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom section: Hub Capacity + Districts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Smart Hub Capacity */}
            <div>
              <h2
                className="text-lg font-bold mb-4"
                style={{
                  color: "#1A2E27",
                  fontFamily: "'Space Grotesk',sans-serif",
                }}
              >
                Smart Hub Capacity
              </h2>
              <div className="space-y-4">
                {loading ? (
                  <div
                    className="bg-white rounded-2xl p-6 text-center"
                    style={{ border: "1px solid #E5EDE9" }}
                  >
                    <p className="text-sm" style={{ color: "#8BAF9E" }}>
                      Loading hubs...
                    </p>
                  </div>
                ) : dropboxes.length === 0 ? (
                  <div
                    className="bg-white rounded-2xl p-6 text-center"
                    style={{ border: "1px solid #E5EDE9" }}
                  >
                    <p className="text-sm" style={{ color: "#8BAF9E" }}>
                      No dropbox hubs available
                    </p>
                  </div>
                ) : (
                  dropboxes.map((db) => {
                    const pct = Math.round(
                      (db.currentBoxCount / db.maxCapacity) * 100
                    );
                    const hubName = db.name.includes("Tamalanrea")
                      ? "UNHAS Tamalanrea Hub"
                      : db.name.includes("Panakkukang")
                        ? "Panakkukang Hub"
                        : db.name;
                    // Placeholder distances
                    const distance = db.name.includes("Tamalanrea")
                      ? "1.2km away"
                      : "4.5km away";

                    return (
                      <div
                        key={db.id}
                        className="bg-white rounded-2xl p-5 transition-all duration-200"
                        style={{
                          border: "1px solid #E5EDE9",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-lg flex items-center justify-center"
                              style={{
                                background: "rgba(22,196,127,0.10)",
                              }}
                            >
                              <PackagePlus
                                size={16}
                                color="#16C47F"
                                strokeWidth={2}
                              />
                            </div>
                            <span
                              className="font-bold text-sm"
                              style={{ color: "#1A2E27" }}
                            >
                              {hubName}
                            </span>
                          </div>
                          <span
                            className="text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{
                              background: db.isActive
                                ? "rgba(22,196,127,0.10)"
                                : "rgba(231,76,60,0.10)",
                              color: db.isActive ? "#16C47F" : "#E74C3C",
                              border: `1px solid ${db.isActive ? "rgba(22,196,127,0.2)" : "rgba(231,76,60,0.2)"}`,
                            }}
                          >
                            {db.isActive ? "Operational" : "Offline"}
                          </span>
                        </div>
                        {/* Capacity bar */}
                        <div
                          className="h-2.5 rounded-full overflow-hidden mb-2"
                          style={{ background: "#F0F5F2" }}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${pct}%`,
                              background:
                                pct >= 90
                                  ? "#E74C3C"
                                  : pct >= 75
                                    ? "#F39C12"
                                    : "linear-gradient(90deg,#0EA572,#16C47F)",
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs">
                          <span style={{ color: "#5A8A78" }}>
                            {pct}% Capacity
                          </span>
                          <span style={{ color: "#8BAF9E" }}>{distance}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Available Pickup Districts */}
            <div>
              <h2
                className="text-lg font-bold mb-2"
                style={{
                  color: "#1A2E27",
                  fontFamily: "'Space Grotesk',sans-serif",
                }}
              >
                Available Pickup Districts
              </h2>
              <p className="text-sm mb-4" style={{ color: "#8BAF9E" }}>
                Our collection fleet currently serves the following districts in
                Makassar:
              </p>
              <div className="space-y-3">
                {districts.map((d) => (
                  <div
                    key={d.id}
                    className="bg-white rounded-2xl px-5 py-4 flex items-center gap-3 transition-all duration-200"
                    style={{
                      border: "1px solid #E5EDE9",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    <CheckCircle2
                      size={18}
                      color="#16C47F"
                      strokeWidth={2}
                    />
                    <span
                      className="font-semibold text-sm"
                      style={{ color: "#1A2E27" }}
                    >
                      {d.name} District
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
