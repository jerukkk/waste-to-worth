"use client";

import Link from "next/link";
import { CircleCheckBig, Leaf, MapPinned } from "lucide-react";

interface SubmissionResult {
  id: string;
  batchId: string;
  items: { itemType: string; quantity: number }[];
  dropboxName: string;
  boxNumber: string;
  pointsEstimate: number;
}

interface SubmissionCompletedProps {
  submission: SubmissionResult;
}

export function SubmissionCompleted({ submission }: SubmissionCompletedProps) {
  const totalItemCount = submission.items.reduce((sum, item) => sum + item.quantity, 0);
  const estimatedRecoveredKg = Number((totalItemCount * 0.45).toFixed(1));
  const estimatedCo2OffsetKg = Number((estimatedRecoveredKg * 3).toFixed(1));

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 space-y-5">
        <div className="border border-slate-200 bg-white rounded-2xl p-4 flex items-center justify-between">
          <div className="flex-1 text-center text-w2w-accent font-semibold">Submitted</div>
          <div className="h-[1px] flex-1 bg-w2w-accent/70 mx-2" />
          <div className="flex-1 text-center text-w2w-accent font-semibold">Verifying</div>
          <div className="h-[1px] flex-1 bg-w2w-accent/70 mx-2" />
          <div className="flex-1 text-center text-w2w-accent font-semibold">Completed</div>
        </div>

        <div className="rounded-2xl bg-w2w-accent p-8 text-white">
          <span className="inline-flex rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase">
            Success Confirmed
          </span>
          <h1 className="text-5xl font-bold mt-3 mb-2">Submission Verified!</h1>
          <p className="text-white/90 text-lg">
            E-waste kamu sudah diproses. Dampak positifmu langsung tercatat.
          </p>
          <div className="mt-5 inline-flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3">
            <div>
              <p className="text-sm text-white/85">Reward Points Awarded</p>
              <p className="text-4xl font-bold">+{submission.pointsEstimate || 450}</p>
            </div>
            <CircleCheckBig className="h-8 w-8" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-200 bg-white rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.08em] text-slate-500 mb-2">
              Inventory Summary
            </p>
            {submission.items.map((item, index) => (
              <div
                key={`${item.itemType}-${index}`}
                className="rounded-lg bg-w2w-accent/10 border border-w2w-accent/20 px-3 py-2 mb-2"
              >
                <p className="font-semibold text-w2w-base">
                  {item.itemType} ({item.quantity})
                </p>
              </div>
            ))}
          </div>

          <div className="border border-slate-200 bg-white rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.08em] text-slate-500 mb-2">Impact Stats</p>
            <p className="text-4xl font-bold text-w2w-base">
              {estimatedRecoveredKg}kg
            </p>
            <p className="text-sm text-slate-500">Metals recovered (estimation)</p>
            <div className="mt-4 h-2 rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-w2w-accent w-[70%]" />
            </div>
            <p className="mt-3 inline-flex items-center gap-2 text-w2w-base font-semibold">
              <Leaf className="h-4 w-4 text-w2w-accent" />
              CO2 offset: {estimatedCo2OffsetKg}kg
            </p>
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-2xl overflow-hidden border border-slate-200">
          <div className="h-56 bg-gradient-to-br from-slate-800 to-slate-600" />
          <div className="bg-white p-4">
            <p className="text-xl font-semibold text-w2w-base">Environmental Certificate</p>
            <p className="text-sm text-slate-500">ID: #{submission.id.slice(0, 12)}</p>
            <p className="text-xs text-slate-500 mt-2">
              Placeholder: berkas sertifikat PDF belum diimplementasikan backend.
            </p>
          </div>
        </div>

        <Link
          href="/tracking"
          className="block text-center rounded-full bg-w2w-accent py-3 font-semibold text-white"
        >
          Track Submission
        </Link>
        <Link
          href="/dashboard"
          className="block text-center rounded-full border border-slate-300 py-3 font-semibold text-w2w-base"
        >
          Back to Dashboard
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
          <p className="inline-flex items-center gap-2 font-semibold text-w2w-base">
            <MapPinned className="h-4 w-4 text-w2w-accent" />
            Processed at {submission.dropboxName}
          </p>
          <p>Box {submission.boxNumber}</p>
        </div>
      </aside>
    </section>
  );
}
