"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardData {
  stats: {
    totalSubmissions: number;
    pendingSubmissions: number;
    verifiedSubmissions: number;
    rejectedSubmissions: number;
    totalPointsIssued: number;
    totalWeightKg: number;
  };
  batches: { open: number; verifying: number; completed: number };
}

interface ScopedDropbox {
  id: string;
  name: string;
  maxCapacity: number;
  currentBoxCount: number;
  isActive: boolean;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [dropboxes, setDropboxes] = useState<ScopedDropbox[]>([]);
  const [scope, setScope] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/dashboard", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/admin/dropboxes", { cache: "no-store" }).then((r) => r.json()),
    ])
      .then(([dashData, dbData]) => {
        setData(dashData);
        setDropboxes(dbData?.data || []);
        setScope(dbData?.scope || "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500">Loading dashboard...</p>;
  if (!data) return <p className="text-red-500">Failed to load dashboard data.</p>;

  const { stats, batches } = data;

  const statCards = [
    { label: "Total Submissions", value: stats.totalSubmissions, color: "#3b82f6" },
    { label: "Pending", value: stats.pendingSubmissions, color: "#f59e0b" },
    { label: "Verified", value: stats.verifiedSubmissions, color: "#10b981" },
    { label: "Rejected", value: stats.rejectedSubmissions, color: "#ef4444" },
    { label: "Points Issued", value: stats.totalPointsIssued.toLocaleString(), color: "#8b5cf6" },
    { label: "Weight (kg)", value: stats.totalWeightKg, color: "#0ea5e9" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        {scope && (
          <p className="text-sm text-gray-500 mt-1">
            District:{" "}
            <span className="font-semibold text-emerald-600 capitalize">{scope}</span>
          </p>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-xl border bg-white p-4">
            <p className="text-xs text-gray-500 mb-1">{card.label}</p>
            <p className="text-2xl font-bold" style={{ color: card.color }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Batch overview */}
        <div className="rounded-xl border bg-white p-5">
          <h2 className="font-semibold mb-4">Batch Overview</h2>
          <div className="space-y-3">
            {[
              { label: "Open (awaiting collection)", value: batches.open, color: "#f59e0b", href: "/admin/dropboxes" },
              { label: "Verifying", value: batches.verifying, color: "#3b82f6", href: "/admin/verifications" },
              { label: "Completed", value: batches.completed, color: "#10b981", href: "/admin/batches" },
            ].map((b) => (
              <Link
                key={b.label}
                href={b.href}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50 transition"
              >
                <span className="text-sm">{b.label}</span>
                <span className="text-lg font-bold" style={{ color: b.color }}>
                  {b.value}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Dropbox capacity (district-scoped) */}
        <div className="rounded-xl border bg-white p-5">
          <h2 className="font-semibold mb-4">Dropbox Capacity</h2>
          {dropboxes.length === 0 ? (
            <p className="text-sm text-gray-400">No dropboxes in your district.</p>
          ) : (
            <div className="space-y-4">
              {dropboxes.map((db) => {
                const pct = db.maxCapacity > 0 ? Math.round((db.currentBoxCount / db.maxCapacity) * 100) : 0;
                return (
                  <div key={db.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{db.name}</span>
                      <span className="text-gray-500">{db.currentBoxCount}/{db.maxCapacity}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          background: pct >= 90 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#10b981",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
