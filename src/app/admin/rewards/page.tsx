"use client";

import { useEffect, useState } from "react";

interface Reward {
  id: string;
  name: string;
  type: string;
  pointsRequired: number;
  stock: number;
  isActive: boolean;
  bengkelName: string | null;
  bengkelAddress: string | null;
  bengkelPhone: string | null;
}

interface Redemption {
  id: string;
  status: string;
  rewardCode: string | null;
  createdAt: string;
  reward: Reward;
  user: { id: string; name: string; email: string };
}

const TYPES = [
  { value: "TOKEN_LISTRIK", label: "Token Listrik" },
  { value: "TRANSUM", label: "Transportasi Umum" },
  { value: "VOUCHER_BENGKEL", label: "Voucher Bengkel" },
];

export default function AdminRewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Create form
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState("TOKEN_LISTRIK");
  const [formPoints, setFormPoints] = useState("500");
  const [formStock, setFormStock] = useState("10");
  const [formBengkelName, setFormBengkelName] = useState("");
  const [formBengkelAddress, setFormBengkelAddress] = useState("");
  const [formBengkelPhone, setFormBengkelPhone] = useState("");
  const [creating, setCreating] = useState(false);

  // Approve modal
  const [approveId, setApproveId] = useState<string | null>(null);
  const [rewardCode, setRewardCode] = useState("");

  // Tab
  const [tab, setTab] = useState<"rewards" | "redemptions">("rewards");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rRes, rdRes] = await Promise.all([
        fetch("/api/rewards", { cache: "no-store" }),
        fetch("/api/redemptions", { cache: "no-store" }),
      ]);
      const [rData, rdData] = await Promise.all([rRes.json(), rdRes.json()]);
      setRewards(rData?.data || []);
      setRedemptions(rdData?.data || []);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async () => {
    if (!formName || !formPoints) return;
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/rewards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          type: formType,
          pointsRequired: formPoints,
          stock: formStock,
          bengkelName: formType === "VOUCHER_BENGKEL" ? formBengkelName : undefined,
          bengkelAddress: formType === "VOUCHER_BENGKEL" ? formBengkelAddress : undefined,
          bengkelPhone: formType === "VOUCHER_BENGKEL" ? formBengkelPhone : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setSuccess("Reward berhasil dibuat!");
      setShowForm(false);
      resetForm();
      await fetchData();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setCreating(false);
    }
  };

  const resetForm = () => {
    setFormName("");
    setFormType("TOKEN_LISTRIK");
    setFormPoints("500");
    setFormStock("10");
    setFormBengkelName("");
    setFormBengkelAddress("");
    setFormBengkelPhone("");
  };

  const handleApprove = async () => {
    if (!approveId || !rewardCode.trim()) return;
    setActionLoading(approveId);
    setError(null);
    try {
      const res = await fetch("/api/redemptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ redemptionId: approveId, action: "approve", rewardCode: rewardCode.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setSuccess("Redemption approved!");
      setApproveId(null);
      setRewardCode("");
      await fetchData();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setActionLoading("");
    }
  };

  const handleDeliver = async (redemptionId: string) => {
    setActionLoading(redemptionId);
    setError(null);
    try {
      const res = await fetch("/api/redemptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ redemptionId, action: "deliver" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setSuccess("Redemption delivered!");
      await fetchData();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setActionLoading("");
    }
  };

  const pendingRedemptions = redemptions.filter((r) => r.status === "PENDING");
  const approvedRedemptions = redemptions.filter((r) => r.status === "APPROVED");
  const deliveredRedemptions = redemptions.filter((r) => r.status === "DELIVERED");

  const typeBadge = (type: string) => {
    if (type === "TOKEN_LISTRIK") return { bg: "#fef9c3", color: "#92400e", label: "Token Listrik" };
    if (type === "TRANSUM") return { bg: "#dbeafe", color: "#1e40af", label: "Transum" };
    return { bg: "#f3e8ff", color: "#6b21a8", label: "Voucher Bengkel" };
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reward Management</h1>
          <p className="text-gray-600">Kelola rewards, stok, dan proses redemption.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchData} disabled={loading} className="px-4 py-2 rounded bg-slate-200 text-sm font-medium">
            Refresh
          </button>
          <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 rounded text-white text-sm font-semibold" style={{ background: "#10b981" }}>
            {showForm ? "Cancel" : "+ New Reward"}
          </button>
        </div>
      </header>

      {error && <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">{error}</div>}
      {success && <div className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 text-sm">{success}</div>}

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("rewards")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === "rewards" ? "bg-white shadow text-slate-900" : "text-slate-500"}`}
        >
          Rewards ({rewards.length})
        </button>
        <button
          onClick={() => setTab("redemptions")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === "redemptions" ? "bg-white shadow text-slate-900" : "text-slate-500"}`}
        >
          Redemptions ({redemptions.length})
          {pendingRedemptions.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs bg-red-500 text-white">{pendingRedemptions.length}</span>
          )}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="rounded-xl border bg-white p-5 space-y-4">
          <h3 className="font-semibold">Create New Reward</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Nama Reward</label>
              <input className="w-full rounded border px-3 py-2 text-sm" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="PLN Electricity Token" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Tipe</label>
              <select className="w-full rounded border px-3 py-2 text-sm" value={formType} onChange={(e) => setFormType(e.target.value)}>
                {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Points Required</label>
              <input type="number" className="w-full rounded border px-3 py-2 text-sm" value={formPoints} onChange={(e) => setFormPoints(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Stock</label>
              <input type="number" className="w-full rounded border px-3 py-2 text-sm" value={formStock} onChange={(e) => setFormStock(e.target.value)} />
            </div>
            {formType === "VOUCHER_BENGKEL" && (
              <>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">Nama Bengkel</label>
                  <input className="w-full rounded border px-3 py-2 text-sm" value={formBengkelName} onChange={(e) => setFormBengkelName(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">Alamat Bengkel</label>
                  <input className="w-full rounded border px-3 py-2 text-sm" value={formBengkelAddress} onChange={(e) => setFormBengkelAddress(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">Telepon Bengkel</label>
                  <input className="w-full rounded border px-3 py-2 text-sm" value={formBengkelPhone} onChange={(e) => setFormBengkelPhone(e.target.value)} />
                </div>
              </>
            )}
          </div>
          <button
            onClick={handleCreate}
            disabled={creating || !formName}
            className="px-6 py-2 rounded text-white text-sm font-semibold disabled:opacity-50"
            style={{ background: "#10b981" }}
          >
            {creating ? "Creating..." : "Create Reward"}
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : tab === "rewards" ? (
        /* Rewards list */
        <div className="space-y-3">
          {rewards.length === 0 ? (
            <p className="text-gray-400 text-sm">Belum ada reward. Klik &quot;+ New Reward&quot; untuk membuat.</p>
          ) : (
            rewards.map((r) => {
              const badge = typeBadge(r.type);
              return (
                <div key={r.id} className="rounded-xl border bg-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-sm">{r.name}</p>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: badge.bg, color: badge.color }}>
                          {badge.label}
                        </span>
                      </div>
                      {r.bengkelName && <p className="text-xs text-gray-400">Partner: {r.bengkelName}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-bold" style={{ color: "#16C47F" }}>{r.pointsRequired}</p>
                      <p className="text-xs text-gray-400">points</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{r.stock}</p>
                      <p className="text-xs text-gray-400">stock</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${r.isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                      {r.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Redemptions */
        <div className="space-y-6">
          {/* Pending */}
          {pendingRedemptions.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-amber-700 mb-2">⏳ Pending Approval ({pendingRedemptions.length})</h3>
              <div className="space-y-2">
                {pendingRedemptions.map((rd) => (
                  <div key={rd.id} className="rounded-xl border bg-amber-50/50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-sm">{rd.user.name} <span className="text-gray-400 font-normal">({rd.user.email})</span></p>
                        <p className="text-xs text-gray-500">
                          {rd.reward.name} — {rd.reward.pointsRequired} pts • {new Date(rd.createdAt).toLocaleString("id-ID")}
                        </p>
                      </div>
                      <button
                        onClick={() => { setApproveId(rd.id); setRewardCode(""); }}
                        disabled={actionLoading === rd.id}
                        className="px-3 py-1.5 rounded text-xs font-semibold text-white bg-emerald-600 disabled:opacity-50"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approved */}
          {approvedRedemptions.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-2">✅ Approved ({approvedRedemptions.length})</h3>
              <div className="space-y-2">
                {approvedRedemptions.map((rd) => (
                  <div key={rd.id} className="rounded-xl border bg-blue-50/50 p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{rd.user.name}</p>
                      <p className="text-xs text-gray-500">
                        {rd.reward.name} — Code: <span className="font-mono font-semibold">{rd.rewardCode}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeliver(rd.id)}
                      disabled={actionLoading === rd.id}
                      className="px-3 py-1.5 rounded text-xs font-semibold text-white bg-blue-600 disabled:opacity-50"
                    >
                      {actionLoading === rd.id ? "..." : "Mark Delivered"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivered */}
          {deliveredRedemptions.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-emerald-700 mb-2">📦 Delivered ({deliveredRedemptions.length})</h3>
              <div className="space-y-2">
                {deliveredRedemptions.map((rd) => (
                  <div key={rd.id} className="rounded-xl border bg-emerald-50/30 p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{rd.user.name}</p>
                      <p className="text-xs text-gray-500">
                        {rd.reward.name} — {new Date(rd.createdAt).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-emerald-100 text-emerald-700">DELIVERED</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {redemptions.length === 0 && (
            <p className="text-gray-400 text-sm">Belum ada redemption.</p>
          )}
        </div>
      )}

      {/* Approve modal */}
      {approveId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-lg font-bold mb-1">Approve Redemption</h3>
            <p className="text-sm text-gray-500 mb-4">Masukkan kode reward untuk diberikan ke user.</p>
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 block mb-1">Reward Code</label>
              <input
                className="w-full rounded border px-3 py-2 text-sm font-mono"
                value={rewardCode}
                onChange={(e) => setRewardCode(e.target.value)}
                placeholder="PLN-X72-BKL"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleApprove}
                disabled={!rewardCode.trim() || actionLoading === approveId}
                className="flex-1 py-2.5 rounded-lg text-sm font-bold text-white disabled:opacity-50"
                style={{ background: "#10b981" }}
              >
                {actionLoading === approveId ? "Processing..." : "Confirm Approve"}
              </button>
              <button onClick={() => setApproveId(null)} className="flex-1 py-2.5 rounded-lg text-sm font-semibold border hover:bg-slate-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
