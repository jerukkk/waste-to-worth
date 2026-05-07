"use client";

import { useEffect, useMemo, useState } from "react";

type AdminSubmissionItem = {
  id: string;
  itemType: string;
  quantity: number;
  weightKg: number | null;
};

type AdminSubmission = {
  id: string;
  method: "DROPBOX" | "PICKUP";
  status: "PENDING" | "VERIFIED" | "REJECTED";
  submittedAt: string;
  notes: string | null;
  user: { id: string; name: string; email: string };
  submissionItems: AdminSubmissionItem[];
  dropboxSubmissionDetail: {
    dropbox: { name: string; address: string };
    box: { boxNumber: string };
  } | null;
  pickupSubmissionDetail: {
    district: { name: string };
    address: string;
  } | null;
};

type ApiMeta = {
  pendingCount: number;
  hasPointRules: boolean;
  pointRulesMap: Record<string, number>;
};

export default function AdminVerificationsPage() {
  const [submissions, setSubmissions] = useState<AdminSubmission[]>([]);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const [weights, setWeights] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const selectedSubmission = useMemo(
    () => submissions.find((submission) => submission.id === selectedId) || null,
    [selectedId, submissions]
  );

  const fetchPending = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/verifications", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || "Failed to load verification data");
      }

      const incoming = (result?.data || []) as AdminSubmission[];
      const incomingMeta = result?.meta as ApiMeta;
      setSubmissions(incoming);
      setMeta(incomingMeta);

      if (incoming.length > 0) {
        const firstId = incoming[0].id;
        setSelectedId((prev) => (prev && incoming.some((s) => s.id === prev) ? prev : firstId));
      } else {
        setSelectedId("");
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to fetch pending submissions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  useEffect(() => {
    if (!selectedSubmission) return;
    const initialWeights: Record<string, string> = {};
    selectedSubmission.submissionItems.forEach((item) => {
      initialWeights[item.id] = item.weightKg ? String(item.weightKg) : "0.5";
    });
    setWeights(initialWeights);
    setNotes(selectedSubmission.notes || "");
  }, [selectedSubmission]);

  const verifySelected = async () => {
    if (!selectedSubmission) return;
    if (!meta?.hasPointRules) {
      setError("Point rules belum tersedia di database. Jalankan seed point rules dulu.");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const itemWeights = selectedSubmission.submissionItems.map((item) => ({
        itemId: item.id,
        weightKg: Number(weights[item.id] || 0),
      }));

      const hasInvalid = itemWeights.some((item) => !Number.isFinite(item.weightKg) || item.weightKg <= 0);
      if (hasInvalid) {
        setError("Semua berat item wajib diisi dan harus lebih dari 0.");
        setSaving(false);
        return;
      }

      const response = await fetch("/api/admin/verifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: selectedSubmission.id,
          action: "verify",
          notes,
          itemWeights,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || "Verification failed");
      }

      setSuccess(`Submission ${selectedSubmission.id.slice(0, 10)} verified successfully.`);
      await fetchPending();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Verification failed");
    } finally {
      setSaving(false);
    }
  };

  const rejectSelected = async () => {
    if (!selectedSubmission) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch("/api/admin/verifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: selectedSubmission.id,
          action: "reject",
          notes,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || "Rejection failed");
      }

      setSuccess(`Submission ${selectedSubmission.id.slice(0, 10)} rejected.`);
      await fetchPending();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Rejection failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Submission Verifications</h1>
          <p className="text-gray-600">
            Verifikasi submission dari batch yang sudah dikumpulkan. Kumpulkan batch terlebih dahulu di halaman{" "}
            <a href="/admin/dropboxes" className="text-emerald-600 underline font-medium">Dropboxes</a>.
          </p>
        </div>
        <button
          onClick={fetchPending}
          className="px-4 py-2 rounded bg-slate-800 text-white text-sm font-medium"
          disabled={loading}
        >
          Refresh
        </button>
      </header>

      {error ? <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div> : null}
      {success ? <div className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">{success}</div> : null}

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 rounded-xl border bg-white">
          <div className="px-4 py-3 border-b">
            <p className="font-semibold">Pending Queue</p>
            <p className="text-sm text-gray-500">
              {loading ? "Loading..." : `${meta?.pendingCount || 0} pending submission(s)`}
            </p>
          </div>
          <div className="max-h-[540px] overflow-auto">
            {submissions.length === 0 && !loading ? (
              <p className="p-4 text-sm text-gray-500">Tidak ada submission pending.</p>
            ) : (
              submissions.map((submission) => {
                const boxNum = submission.dropboxSubmissionDetail?.box?.boxNumber;
                return (
                  <button
                    key={submission.id}
                    onClick={() => setSelectedId(submission.id)}
                    className={`w-full text-left p-4 border-b hover:bg-gray-50 ${
                      selectedId === submission.id ? "bg-emerald-50" : "bg-white"
                    }`}
                  >
                    <p className="font-bold text-base">
                      {boxNum || (submission.method === "PICKUP" ? "Pickup" : "—")}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">{submission.user.name}</p>
                    <p className="text-xs text-gray-400">{submission.user.email}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="lg:col-span-2 rounded-xl border bg-white p-5">
          {!selectedSubmission ? (
            <p className="text-sm text-gray-500">Pilih submission dari daftar untuk verifikasi.</p>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Submission ID</p>
                  <p className="font-semibold">{selectedSubmission.id}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-amber-100 text-amber-700">
                  {selectedSubmission.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded border p-3">
                  <p className="font-semibold mb-1">Citizen</p>
                  <p>{selectedSubmission.user.name}</p>
                  <p className="text-gray-500">{selectedSubmission.user.email}</p>
                </div>
                <div className="rounded border p-3">
                  <p className="font-semibold mb-1">Drop-off / Pickup</p>
                  {selectedSubmission.method === "DROPBOX" ? (
                    <>
                      <p>{selectedSubmission.dropboxSubmissionDetail?.dropbox.name}</p>
                      <p className="text-gray-500">
                        Box {selectedSubmission.dropboxSubmissionDetail?.box.boxNumber}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>{selectedSubmission.pickupSubmissionDetail?.district.name}</p>
                      <p className="text-gray-500">{selectedSubmission.pickupSubmissionDetail?.address}</p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <p className="font-semibold mb-3">Item Verification</p>
                <div className="space-y-3">
                  {selectedSubmission.submissionItems.map((item) => {
                    const pointsPerKg = meta?.pointRulesMap?.[item.itemType.toLowerCase()] || 0;
                    const weight = Number(weights[item.id] || 0);
                    const estimatedPoints = Number.isFinite(weight)
                      ? Math.floor(weight * pointsPerKg)
                      : 0;
                    return (
                      <div key={item.id} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center border rounded p-3">
                        <div className="md:col-span-2">
                          <p className="font-medium">{item.itemType}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Weight (kg)</label>
                          <input
                            type="number"
                            min={0.1}
                            step={0.1}
                            value={weights[item.id] || ""}
                            onChange={(event) =>
                              setWeights((prev) => ({ ...prev, [item.id]: event.target.value }))
                            }
                            className="mt-1 w-full rounded border px-2 py-1.5 text-sm"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">pts/kg</p>
                          <p className="text-sm font-medium">{pointsPerKg}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Est. points</p>
                          <p className="text-sm font-semibold text-emerald-600">{estimatedPoints}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold block mb-2">Admin Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className="w-full rounded border px-3 py-2 text-sm"
                  placeholder="Tambahkan catatan verifikasi (opsional)"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={verifySelected}
                  disabled={saving || !meta?.hasPointRules}
                  className="px-4 py-2 rounded bg-emerald-600 text-white text-sm font-semibold disabled:opacity-60"
                >
                  {saving ? "Processing..." : "Verify Submission"}
                </button>
                <button
                  onClick={rejectSelected}
                  disabled={saving}
                  className="px-4 py-2 rounded border border-red-300 text-red-700 text-sm font-semibold disabled:opacity-60"
                >
                  Reject Submission
                </button>
              </div>

              {!meta?.hasPointRules ? (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2">
                  Point rules belum tersedia di database. Verification tidak bisa dijalankan sampai
                  rule tersedia.
                </p>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
