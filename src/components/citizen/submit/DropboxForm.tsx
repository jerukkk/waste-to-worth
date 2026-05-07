"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { LockKeyhole, Plus, QrCode, Trash2 } from "lucide-react";

interface DropboxData {
  id: string;
  name: string;
  availableBoxes: { boxNumber: string; isAvailable: boolean }[];
}

interface DraftSubmission {
  dropboxId: string;
  dropboxName: string;
  boxNumber: string;
  items: { itemType: string; quantity: number }[];
  notes?: string;
}

interface DropboxFormProps {
  onContinue: (payload: DraftSubmission) => void;
}

const ITEM_OPTIONS = ["smartphone", "charger", "laptop", "kabel", "tablet"];

export function DropboxForm({ onContinue }: DropboxFormProps) {
  const [dropboxes, setDropboxes] = useState<DropboxData[]>([]);
  const [dropboxId, setDropboxId] = useState("");
  const [boxNumber, setBoxNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<{ itemType: string; quantity: number }[]>([
    { itemType: "smartphone", quantity: 2 },
    { itemType: "charger", quantity: 1 },
  ]);

  const selectedDropbox = useMemo(
    () => dropboxes.find((d) => d.id === dropboxId),
    [dropboxId, dropboxes]
  );

  useEffect(() => {
    const fetchDropboxes = async () => {
      try {
        const response = await fetch("/api/dropboxes", { cache: "no-store" });
        const data = await response.json();
        const list = data?.data || [];
        setDropboxes(list);
        if (list.length > 0) {
          setDropboxId(list[0].id);
          setBoxNumber(list[0].availableBoxes?.[0]?.boxNumber || "");
        }
      } catch {
        setError("Unable to load dropbox data");
      } finally {
        setLoading(false);
      }
    };
    fetchDropboxes();
  }, []);

  useEffect(() => {
    if (!selectedDropbox) return;
    setBoxNumber(selectedDropbox.availableBoxes?.[0]?.boxNumber || "");
  }, [selectedDropbox]);

  const addItem = () => {
    setItems((prev) => [...prev, { itemType: "tablet", quantity: 1 }]);
  };

  const updateItem = (index: number, key: "itemType" | "quantity", value: string) => {
    setItems((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [key]: key === "quantity" ? Math.max(1, Number(value) || 1) : value,
            }
          : item
      )
    );
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!selectedDropbox || !boxNumber || items.length === 0) {
      setError("Please complete box and item declaration.");
      return;
    }
    onContinue({
      dropboxId,
      dropboxName: selectedDropbox.name,
      boxNumber,
      items,
      notes,
    });
  };

  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-w2w-accent mb-1">
        New Submission
      </p>
      <h1 className="text-4xl font-bold text-w2w-base mb-6">Confirm Your E-Waste</h1>

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 border border-slate-200 bg-white rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-w2w-base block mb-2">
              Select Dropbox
            </label>
            <select
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-w2w-base focus:outline-none focus:ring-2 focus:ring-w2w-accent/40"
              value={dropboxId}
              onChange={(event) => setDropboxId(event.target.value)}
              disabled={loading}
            >
              {dropboxes.map((dropbox) => (
                <option key={dropbox.id} value={dropbox.id}>
                  {dropbox.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-w2w-base block mb-2">
              Box Number
            </label>
            <div className="relative">
              <select
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 text-sm text-w2w-base focus:outline-none focus:ring-2 focus:ring-w2w-accent/40"
                value={boxNumber}
                onChange={(event) => setBoxNumber(event.target.value)}
              >
                {(selectedDropbox?.availableBoxes || []).map((box) => (
                  <option key={box.boxNumber} value={box.boxNumber}>
                    {box.boxNumber}
                  </option>
                ))}
              </select>
              <LockKeyhole className="absolute right-3 top-3.5 h-4 w-4 text-w2w-accent" />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-w2w-base block mb-2">
              Item Declaration
            </label>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={`${item.itemType}-${index}`} className="flex gap-2">
                  <select
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    value={item.itemType}
                    onChange={(event) => updateItem(index, "itemType", event.target.value)}
                  >
                    {ITEM_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <input
                    className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(event) => updateItem(index, "quantity", event.target.value)}
                  />
                  <button
                    type="button"
                    className="rounded-lg border border-slate-300 px-3 text-slate-500 hover:text-red-500"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 px-4 py-2 text-sm font-medium text-slate-600"
                onClick={addItem}
              >
                <Plus className="h-4 w-4" />
                Add Item
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-w2w-base block mb-2">
              Additional Notes
            </label>
            <textarea
              rows={3}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Optional: Describe condition or handling instructions."
            />
          </div>
        </div>

        <aside className="border border-slate-200 bg-white rounded-2xl p-6">
          <div className="rounded-xl overflow-hidden bg-slate-100 mb-4">
            <div className="h-36 flex items-center justify-center bg-gradient-to-r from-w2w-base/90 to-w2w-accent/80">
              <QrCode className="h-9 w-9 text-white" />
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            Data box dan lokasi dari database real-time. Jarak dan visual image memakai
            placeholder.
          </p>
          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-w2w-accent py-3 text-white font-semibold hover:opacity-90 transition"
            disabled={loading}
          >
            Continue to Review
          </button>
        </aside>
      </form>
    </section>
  );
}
