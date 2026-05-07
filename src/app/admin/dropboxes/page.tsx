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
  dropboxId: string;
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
  usedBoxes: number;
  totalBoxes: number;
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

  const getBatchesForDropbox = (dropboxId: string) =>
    batches.filter((b) => b.dropboxId === dropboxId);

  const getOpenBatches = (dropboxId: string) =>
    getBatchesForDropbox(dropboxId).filter((b) => b.status === "OPEN");

  const getVerifyingBatches = (dropboxId: string) =>
    getBatchesForDropbox(dropboxId).filter((b) => b.status === "VERIFYING");

  const getCompletedBatches = (dropboxId: string) =>
    getBatchesForDropbox(dropboxId).filter((b) => b.status === "COMPLETED");

  const hasActiveOrVerifyingBatch = (dropboxId: string) => {
    const dbs = getBatchesForDropbox(dropboxId);
    return dbs.some((b) => b.status === "OPEN" || b.status === "VERIFYING");
  };

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

  const handleOpenNewBatch = async (dropboxId: string) => {
    setActionLoading(`new-${dropboxId}`);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dropboxId, action: "open" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to open new batch");
      setSuccess(`Batch baru dibuka untuk dropbox.`);
      await fetchData();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to open new batch");
    } finally {
      setActionLoading(null);
    }
  };

  const statusBadge = (status: string) => {
    if (status === "OPEN") return { bg: "bg-amber-100", text: "text-amber-700" };
    if (status === "VERIFYING") return { bg: "bg-blue-100", text: "text-blue-700" };
    if (status === "COMPLETED") return { bg: "bg-emerald-100", text: "text-emerald-700" };
    return { bg: "bg-gray-100", text: "text-gray-700" };
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
            const verifyingBatches = getVerifyingBatches(db.id);
            const completedBatches = getCompletedBatches(db.id);
            const canOpenNew = !hasActiveOrVerifyingBatch(db.id);
            const pct = db.capacityPercent;

            return (
              <div key={db.id} className="rounded-xl border bg-white overflow-hidden">
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
                      Box Used: {db.usedBoxes} / {db.totalBoxes}
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

                {/* Batches section */}
                <div className="px-5 py-4 space-y-4">
                  {/* Open Batches */}
                  {openBatches.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-gray-700">
                        Batch Siap Dikumpulkan ({openBatches.length})
                      </p>
                      {openBatches.map((batch) => (
                        <BatchCard
                          key={batch.id}
                          batch={batch}
                          statusBadge={statusBadge}
                          actionLoading={actionLoading}
                          onAction={() => handleCollect(batch.id)}
                          actionLabel={`Collect & Send to Verification (${batch.submissions.length} submission${batch.submissions.length > 1 ? "s" : ""})`}
                          cardBg="bg-amber-50/50"
                        />
                      ))}
                    </div>
                  )}

                  {/* Verifying Batches */}
                  {verifyingBatches.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-blue-700">
                        Sedang Diverifikasi ({verifyingBatches.length})
                      </p>
                      {verifyingBatches.map((batch) => (
                        <BatchCard
                          key={batch.id}
                          batch={batch}
                          statusBadge={statusBadge}
                          actionLoading={actionLoading}
                          cardBg="bg-blue-50/50"
                        />
                      ))}
                    </div>
                  )}

                  {/* Completed Batches (latest only) */}
                  {completedBatches.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-emerald-700">
                        Batch Terakhir Selesai
                      </p>
                      <BatchCard
                        batch={completedBatches[0]}
                        statusBadge={statusBadge}
                        actionLoading={actionLoading}
                        cardBg="bg-emerald-50/30"
                      />
                    </div>
                  )}

                  {/* No batches at all */}
                  {openBatches.length === 0 && verifyingBatches.length === 0 && completedBatches.length === 0 && (
                    <p className="text-sm text-gray-400">
                      Belum ada batch untuk dropbox ini.
                    </p>
                  )}

                  {/* Open New Batch button */}
                  {canOpenNew && (
                    <button
                      onClick={() => handleOpenNewBatch(db.id)}
                      disabled={actionLoading === `new-${db.id}`}
                      className="w-full py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-60 transition"
                      style={{ background: "#3b82f6" }}
                    >
                      {actionLoading === `new-${db.id}`
                        ? "Opening..."
                        : "🔄 Open New Batch (Siap menerima submission baru)"}
                    </button>
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

function BatchCard({
  batch,
  statusBadge,
  actionLoading,
  onAction,
  actionLabel,
  cardBg = "",
}: {
  batch: BatchInfo;
  statusBadge: (s: string) => { bg: string; text: string };
  actionLoading: string | null;
  onAction?: () => void;
  actionLabel?: string;
  cardBg?: string;
}) {
  const badge = statusBadge(batch.status);
  return (
    <div className={`border rounded-lg p-4 ${cardBg}`}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-semibold text-sm">Batch #{batch.id.slice(0, 8)}</p>
          <p className="text-xs text-gray-500">
            Created: {new Date(batch.createdAt).toLocaleString()}
          </p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded ${badge.bg} ${badge.text}`}>
          {batch.status}
        </span>
      </div>

      {batch.submissions.length > 0 && (
        <div className="space-y-1 mb-3">
          {batch.submissions.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center justify-between text-xs bg-white rounded px-3 py-2 border"
            >
              <div>
                <span className="font-medium">{sub.user.name}</span>
                <span className="text-gray-400 ml-2">{sub.user.email}</span>
              </div>
              <span className="text-gray-500">
                {sub.submissionItems
                  .map((i) => `${i.itemType} x${i.quantity}`)
                  .join(", ")}
              </span>
            </div>
          ))}
        </div>
      )}

      {onAction && actionLabel && (
        <button
          onClick={onAction}
          disabled={actionLoading === batch.id}
          className="w-full py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-60 transition"
          style={{ background: "#10b981" }}
        >
          {actionLoading === batch.id ? "Processing..." : actionLabel}
        </button>
      )}
    </div>
  );
}
