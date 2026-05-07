"use client";

import { useEffect, useState } from "react";

interface BoxInfo {
  id: string;
  boxNumber: string;
  isAvailable: boolean;
}

interface BatchInfo {
  id: string;
  type: string;
  status: string;
  createdAt: string;
  submissions: {
    id: string;
    status: string;
    submittedAt: string;
    user: { name: string; email: string };
    submissionItems: { itemType: string; quantity: number }[];
  }[];
}

interface DropboxInfo {
  id: string;
  name: string;
  address: string;
  isActive: boolean;
  maxCapacity: number;
  currentBoxCount: number;
  capacityPercent: number;
  availableBoxes: BoxInfo[];
}

export default function AdminDropboxesPage() {
  const [dropboxes, setDropboxes] = useState<DropboxInfo[]>([]);
  const [batches, setBatches] = useState<BatchInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [scope, setScope] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dropboxes", { cache: "no-store" });
      const result = await res.json();
      if (!res.ok) throw new Error(result?.error || "Failed to load data");
      setDropboxes(result?.data || []);
      setBatches(result?.batches || []);
      setScope(result?.scope || "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getOpenBatches = (dropboxId: string) =>
    batches.filter(
      (b) =>
        b.status === "OPEN" &&
        ((b as unknown as { dropbox?: { id: string } })?.dropbox?.id === dropboxId ||
          (b as unknown as { dropboxId?: string })?.dropboxId === dropboxId)
    );

  const handleCollect = async (batchId: string) => {
    setActionLoading(batchId);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchId, action: "verify" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to collect batch");
      setSuccess(`Batch ${batchId.slice(0, 8)} collected & sent to verification.`);
      await fetchData();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Collection failed");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dropbox Management</h1>
          <p className="text-gray-600">
            Kelola lokasi dropbox dan kumpulkan batch untuk verifikasi.
            {scope && (
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 capitalize">
                District: {scope}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={fetchData}
          className="px-4 py-2 rounded bg-slate-800 text-white text-sm font-medium"
          disabled={loading}
        >
          Refresh
        </button>
      </header>

      {error && (
        <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 text-sm">
          {success}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-6">
          {dropboxes.map((db) => {
            const openBatches = getOpenBatches(db.id);
            const pct = Math.round(
              (db.currentBoxCount / db.maxCapacity) * 100
            );
            const usedBoxes = db.maxCapacity - (db.availableBoxes?.length || 0);

            return (
              <div
                key={db.id}
                className="rounded-xl border bg-white overflow-hidden"
              >
                {/* Dropbox header */}
                <div className="px-5 py-4 border-b flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-lg">{db.name}</h2>
                    <p className="text-sm text-gray-500">{db.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        db.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {db.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                {/* Capacity */}
                <div className="px-5 py-3 border-b bg-gray-50">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">
                      Box Capacity: {usedBoxes} / {db.maxCapacity} used
                    </span>
                    <span className="font-semibold">{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background:
                          pct >= 90
                            ? "#ef4444"
                            : pct >= 75
                              ? "#f59e0b"
                              : "#10b981",
                      }}
                    />
                  </div>
                </div>

                {/* Open Batches */}
                <div className="px-5 py-4">
                  {openBatches.length === 0 ? (
                    <p className="text-sm text-gray-400">
                      Tidak ada batch OPEN untuk dikumpulkan.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-gray-700">
                        Batch Siap Dikumpulkan ({openBatches.length})
                      </p>
                      {openBatches.map((batch) => (
                        <div
                          key={batch.id}
                          className="border rounded-lg p-4 bg-amber-50/50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold text-sm">
                                Batch #{batch.id.slice(0, 8)}
                              </p>
                              <p className="text-xs text-gray-500">
                                Created:{" "}
                                {new Date(batch.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <span className="text-xs font-semibold px-2 py-1 rounded bg-amber-100 text-amber-700">
                              {batch.status}
                            </span>
                          </div>

                          {/* Submissions in batch */}
                          <div className="space-y-1 mb-3">
                            {batch.submissions.map((sub) => (
                              <div
                                key={sub.id}
                                className="flex items-center justify-between text-xs bg-white rounded px-3 py-2 border"
                              >
                                <div>
                                  <span className="font-medium">
                                    {sub.user.name}
                                  </span>
                                  <span className="text-gray-400 ml-2">
                                    {sub.user.email}
                                  </span>
                                </div>
                                <span className="text-gray-500">
                                  {sub.submissionItems
                                    .map(
                                      (i) => `${i.itemType} x${i.quantity}`
                                    )
                                    .join(", ")}
                                </span>
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={() => handleCollect(batch.id)}
                            disabled={actionLoading === batch.id}
                            className="w-full py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-60 transition"
                            style={{ background: "#10b981" }}
                          >
                            {actionLoading === batch.id
                              ? "Processing..."
                              : `Collect & Send to Verification (${batch.submissions.length} submission${batch.submissions.length > 1 ? "s" : ""})`}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
