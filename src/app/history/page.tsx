"use client";

import { useEffect, useState } from "react";
import { SidebarCitizen } from "@/components/citizen/SidebarCitizen";
import {
  ClipboardCheck,
  CheckCircle2,
  CircleDollarSign,
  Package,
  Truck,
  MapPin,
  CalendarDays,
  Layers,
  Headphones,
} from "lucide-react";

interface SubmissionItem {
  itemType: string;
  quantity: number;
  weightKg: number | null;
  pointsEarned: number;
}

interface Submission {
  id: string;
  method: "DROPBOX" | "PICKUP";
  status: "PENDING" | "VERIFIED" | "REJECTED";
  totalPointsEarned: number;
  submittedAt: string;
  verifiedAt: string | null;
  notes: string | null;
  batchId: string;
  batchStatus: string | null;
  batchCollectedAt: string | null;
  items: SubmissionItem[];
  dropboxName: string | null;
  boxNumber: string | null;
  pickupDistrict: string | null;
  pickupAddress: string | null;
  pickupDate: string | null;
}

interface Stats {
  inVerification: number;
  completed: number;
  pendingPoints: number;
}

export default function TrackingPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<Stats>({ inVerification: 0, completed: 0, pendingPoints: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = submissions.find((s) => s.id === selectedId) || null;

  useEffect(() => {
    fetch("/api/tracking", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setStats(d.stats || { inVerification: 0, completed: 0, pendingPoints: 0 });
        const list = d.submissions || [];
        setSubmissions(list);
        if (list.length > 0) setSelectedId(list[0].id);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statusBadge = (status: string) => {
    if (status === "VERIFIED") return { label: "Completed", bg: "#d1fae5", color: "#065f46" };
    if (status === "REJECTED") return { label: "Rejected", bg: "#fee2e2", color: "#991b1b" };
    return { label: "Verifying", bg: "#dcfce7", color: "#16a34a" };
  };

  const stepIndex = (s: Submission) => {
    if (s.status === "VERIFIED") return 2;
    if (s.batchStatus === "VERIFYING") return 1;
    return 0;
  };

  const itemsSummary = (items: SubmissionItem[]) =>
    items.map((i) => `${i.quantity} ${i.itemType[0].toUpperCase() + i.itemType.slice(1)}`).join(", ");

  const timeAgo = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hours ago`;
    const days = Math.floor(hrs / 24);
    return `${days} days ago`;
  };

  const activeCount = submissions.filter((s) => s.status === "PENDING").length;

  return (
    <div className="flex min-h-screen" style={{ background: "#F8FAF9" }}>
      <SidebarCitizen />
      <main className="flex-1 ml-64 min-h-screen">
        <div className="max-w-[1100px] mx-auto px-8 py-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-w2w-base">Tracking</h1>
              <p className="text-sm text-slate-500 mt-1">
                Monitor your submission verification and collection progress.
              </p>
            </div>
            {activeCount > 0 && (
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                style={{ background: "#16C47F" }}
              >
                {activeCount} Active Submission{activeCount > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="rounded-2xl border bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <ClipboardCheck className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">In Verification</span>
              </div>
              <p className="text-3xl font-bold text-w2w-base">{loading ? "—" : stats.inVerification}</p>
            </div>
            <div className="rounded-2xl border bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Completed</span>
              </div>
              <p className="text-3xl font-bold text-w2w-base">{loading ? "—" : stats.completed}</p>
            </div>
            <div className="rounded-2xl border bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <CircleDollarSign className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pending Points</span>
              </div>
              <p className="text-3xl font-bold" style={{ color: "#16C47F" }}>
                {loading ? "—" : `+${stats.pendingPoints}`}
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-gray-400 text-center py-16">Loading submissions...</p>
          ) : submissions.length === 0 ? (
            <div className="text-center py-20">
              <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-400 text-sm">No submissions yet. Go to Submit to start.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              {/* Left: Submission list */}
              <div className="lg:col-span-2 space-y-3">
                <h3 className="text-lg font-bold text-w2w-base mb-2">My Submissions</h3>
                {submissions.map((s) => {
                  const badge = statusBadge(s.status);
                  const isActive = s.id === selectedId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedId(s.id)}
                      className="w-full text-left rounded-xl border p-4 transition-all"
                      style={{
                        background: isActive ? "#f0fdf4" : "#fff",
                        borderColor: isActive ? "#16C47F" : "#e2e8f0",
                        borderWidth: isActive ? "2px" : "1px",
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-sm text-w2w-base">
                          {s.method === "DROPBOX" ? "Dropbox Submission" : "E-Waste Pickup"}
                        </p>
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded"
                          style={{ background: badge.bg, color: badge.color }}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{itemsSummary(s.items)}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {s.boxNumber || s.pickupDistrict || ""}
                        {s.boxNumber || s.pickupDistrict ? " • " : ""}
                        Submitted {timeAgo(s.submittedAt)}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right: Detail panel */}
              <div className="lg:col-span-3">
                {selected ? (
                  <div className="rounded-2xl border bg-white p-6 space-y-5 sticky top-10">
                    <h3 className="text-xl font-bold text-w2w-base">Submission Detail</h3>

                    {/* Progress stepper */}
                    <div className="flex items-center justify-center gap-0 py-4">
                      {["Submitted", "Verifying", "Completed"].map((label, idx) => {
                        const currentStep = stepIndex(selected);
                        const done = idx <= currentStep;
                        return (
                          <div key={label} className="flex items-center">
                            {idx > 0 && (
                              <div
                                className="w-16 h-0.5"
                                style={{ background: idx <= currentStep ? "#16C47F" : "#e2e8f0" }}
                              />
                            )}
                            <div className="flex flex-col items-center">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                                style={{
                                  background: done ? "#16C47F" : "#f1f5f9",
                                  color: done ? "#fff" : "#94a3b8",
                                }}
                              >
                                {idx === 0 && <CheckCircle2 className="h-4 w-4" />}
                                {idx === 1 && <ClipboardCheck className="h-4 w-4" />}
                                {idx === 2 && <Package className="h-4 w-4" />}
                              </div>
                              <span
                                className="text-xs mt-1 font-medium"
                                style={{ color: done ? "#16C47F" : "#94a3b8" }}
                              >
                                {label}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* General Info */}
                    <div className="rounded-xl p-4 space-y-2" style={{ background: "#f0fdf4", border: "1px solid #d1fae5" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4" style={{ color: "#16C47F" }} />
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#16C47F" }}>
                          General Info
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-y-1.5 text-sm">
                        {selected.method === "DROPBOX" ? (
                          <>
                            <span className="text-slate-500">Dropbox:</span>
                            <span className="font-medium text-w2w-base">{selected.dropboxName || "—"}</span>
                            <span className="text-slate-500">Box:</span>
                            <span className="font-medium text-w2w-base">{selected.boxNumber || "—"}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-slate-500">District:</span>
                            <span className="font-medium text-w2w-base">{selected.pickupDistrict || "—"}</span>
                            <span className="text-slate-500">Address:</span>
                            <span className="font-medium text-w2w-base text-xs">{selected.pickupAddress || "—"}</span>
                          </>
                        )}
                        <span className="text-slate-500">Items:</span>
                        <span className="font-medium text-w2w-base">{itemsSummary(selected.items)}</span>
                        <span className="text-slate-500">Submitted:</span>
                        <span className="font-medium text-w2w-base">
                          {new Date(selected.submittedAt).toLocaleDateString("id-ID", {
                            month: "short", day: "numeric",
                          })}
                          {" • "}
                          {new Date(selected.submittedAt).toLocaleTimeString("id-ID", {
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Batch Logistics */}
                    <div className="rounded-xl border p-4 space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Layers className="h-4 w-4 text-slate-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Batch Logistics</span>
                      </div>
                      <p className="font-semibold text-sm">
                        {selected.method === "DROPBOX" ? "Dropbox" : "Pickup"} Batch
                      </p>
                      <p className="text-xs text-slate-500">
                        {selected.batchStatus === "OPEN" && "Batch masih terbuka, menunggu collection."}
                        {selected.batchStatus === "VERIFYING" && "Batch sedang dalam proses verifikasi admin."}
                        {selected.batchStatus === "COMPLETED" && (
                          <>Batch selesai diverifikasi{selected.batchCollectedAt ? ` pada ${new Date(selected.batchCollectedAt).toLocaleDateString("id-ID")}` : ""}</>
                        )}
                        {!selected.batchStatus && "Batch information not available."}
                      </p>
                    </div>

                    {/* Points */}
                    <div className="rounded-xl border p-4 space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CircleDollarSign className="h-4 w-4" style={{ color: "#16C47F" }} />
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#16C47F" }}>
                          Points Estimate
                        </span>
                      </div>
                      {selected.status === "VERIFIED" ? (
                        <>
                          <p className="font-bold text-lg" style={{ color: "#16C47F" }}>
                            +{selected.totalPointsEarned} Points
                          </p>
                          <p className="text-xs text-slate-500">Points telah ditambahkan ke wallet kamu.</p>
                        </>
                      ) : (
                        <>
                          <p className="font-semibold">Points Pending</p>
                          <p className="text-xs text-slate-500">
                            Awaiting admin verification and weighing process. Final value will be added to your wallet upon completion.
                          </p>
                        </>
                      )}
                    </div>

                    {/* Pickup date */}
                    {selected.method === "PICKUP" && selected.pickupDate && (
                      <div className="rounded-xl border p-4 space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Truck className="h-4 w-4 text-slate-400" />
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pickup Schedule</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-slate-400" />
                          <p className="text-sm font-medium">
                            {new Date(selected.pickupDate).toLocaleDateString("id-ID", {
                              weekday: "long", day: "numeric", month: "long", year: "numeric",
                            })}
                            {" • "}
                            {new Date(selected.pickupDate).toLocaleTimeString("id-ID", {
                              hour: "2-digit", minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Contact Support */}
                    <button
                      className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
                      style={{ background: "#16C47F" }}
                    >
                      <Headphones className="h-4 w-4" />
                      Contact Support regarding this Item
                    </button>
                  </div>
                ) : (
                  <div className="rounded-2xl border bg-white p-10 text-center text-slate-400 text-sm">
                    Select a submission to view details.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
