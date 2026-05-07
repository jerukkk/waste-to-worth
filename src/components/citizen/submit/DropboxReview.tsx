"use client";

import { AlertCircle, ArrowLeft, CircleCheckBig } from "lucide-react";

interface DraftSubmission {
  dropboxId: string;
  dropboxName: string;
  boxNumber: string;
  items: { itemType: string; quantity: number }[];
  notes?: string;
}

interface DropboxReviewProps {
  draft: DraftSubmission;
  isSaving: boolean;
  errorMessage: string | null;
  onBack: () => void;
  onConfirm: () => void;
}

export function DropboxReview({
  draft,
  isSaving,
  errorMessage,
  onBack,
  onConfirm,
}: DropboxReviewProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 space-y-5">
        <div className="border border-slate-200 bg-white rounded-2xl p-4 flex items-center justify-between">
          <div className="flex-1 text-center">
            <p className="text-sm font-semibold text-w2w-accent">Submitted</p>
          </div>
          <div className="h-[1px] flex-1 bg-slate-200 mx-2" />
          <div className="flex-1 text-center">
            <p className="text-sm text-slate-400">Verifying</p>
          </div>
          <div className="h-[1px] flex-1 bg-slate-200 mx-2" />
          <div className="flex-1 text-center">
            <p className="text-sm text-slate-400">Completed</p>
          </div>
        </div>

        <div className="border border-slate-200 bg-white rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-w2w-base mb-5">Confirm Your E-Waste</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.07em] text-slate-500 mb-1">
                Box Number
              </p>
              <p className="rounded-xl border border-w2w-accent/40 bg-w2w-accent/10 px-4 py-3 font-semibold text-w2w-base">
                {draft.boxNumber}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.07em] text-slate-500 mb-1">
                Item Declaration
              </p>
              <div className="flex flex-wrap gap-2">
                {draft.items.map((item, index) => (
                  <span
                    key={`${item.itemType}-${index}`}
                    className="rounded-full bg-w2w-accent/10 border border-w2w-accent/20 px-3 py-1.5 text-sm font-medium text-w2w-base"
                  >
                    {item.itemType} x {item.quantity}
                  </span>
                ))}
              </div>
            </div>
            {draft.notes ? (
              <div>
                <p className="text-xs uppercase tracking-[0.07em] text-slate-500 mb-1">
                  Additional Notes
                </p>
                <p className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600">
                  {draft.notes}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-w2w-base/80 to-w2w-accent/70" />
          <div className="p-4">
            <p className="text-sm text-slate-500">Connected Dropbox</p>
            <p className="text-2xl font-bold text-w2w-base">{draft.dropboxName}</p>
            <div className="mt-3 h-2 rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-w2w-accent w-[75%]" />
            </div>
            <p className="mt-1 text-sm font-semibold text-w2w-accent">
              Capacity info from database
            </p>
          </div>
        </div>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMessage}
          </div>
        ) : null}

        <button
          className="w-full rounded-full bg-w2w-accent py-3 font-semibold text-white disabled:opacity-60"
          onClick={onConfirm}
          disabled={isSaving}
        >
          {isSaving ? "Submitting..." : "Confirm Submission"}
        </button>
        <button
          className="w-full rounded-full border border-slate-300 py-3 font-semibold text-w2w-base"
          onClick={onBack}
          disabled={isSaving}
        >
          <span className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </span>
        </button>

        <div className="rounded-2xl border border-w2w-accent/20 bg-w2w-accent/10 px-4 py-3 text-sm text-slate-700">
          <p className="font-semibold text-w2w-base mb-1">E-Points Estimation</p>
          <p>You will receive around 450 points after verification is completed.</p>
          <p className="mt-2 text-xs text-slate-500">
            Nilai final mengikuti hasil verifikasi item dari petugas.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
          <p className="font-semibold text-w2w-base mb-1">Flow status</p>
          <p className="inline-flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 text-w2w-accent" />
            Submission belum disimpan sampai tombol confirm ditekan.
          </p>
          <p className="inline-flex items-center gap-2 mt-2">
            <AlertCircle className="h-4 w-4 text-slate-500" />
            Status verifying/completed dibaca dari status submission di DB.
          </p>
        </div>
      </aside>
    </section>
  );
}
