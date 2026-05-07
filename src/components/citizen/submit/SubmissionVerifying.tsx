"use client";

import { CheckCircle2, LoaderCircle } from "lucide-react";

interface SubmissionResult {
  id: string;
  batchId: string;
  items: { itemType: string; quantity: number }[];
  dropboxName: string;
  boxNumber: string;
  pointsEstimate: number;
}

interface SubmissionVerifyingProps {
  submission: SubmissionResult;
  onSubmitAnother: () => void;
  isStartingNew: boolean;
  canSubmitAnother: boolean;
}

export function SubmissionVerifying({
  submission,
  onSubmitAnother,
  isStartingNew,
  canSubmitAnother,
}: SubmissionVerifyingProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 space-y-5">
        <div className="border border-slate-200 bg-white rounded-2xl p-4 flex items-center justify-between">
          <div className="flex-1 text-center text-w2w-accent font-semibold">Submitted</div>
          <div className="h-[1px] flex-1 bg-w2w-accent/60 mx-2" />
          <div className="flex-1 text-center text-w2w-accent font-semibold">Verifying</div>
          <div className="h-[1px] flex-1 bg-slate-200 mx-2" />
          <div className="flex-1 text-center text-slate-400">Completed</div>
        </div>

        <header>
          <h1 className="text-4xl font-bold text-w2w-base mb-2">Your items are being verified.</h1>
          <p className="text-slate-600">
            Submission telah tercatat dan sedang diverifikasi petugas. Halaman ini
            otomatis membaca perubahan status dari database.
          </p>
        </header>

        <div className="border border-slate-200 bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-w2w-base">Submission Recorded</p>
              <p className="text-slate-500">ID: {submission.id.slice(0, 14)}</p>
            </div>
            <span className="rounded-full border border-w2w-accent/30 bg-w2w-accent/10 px-3 py-1 text-sm font-semibold text-w2w-base">
              Batch #{submission.batchId.slice(0, 4)}
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {submission.items.map((item, index) => (
              <div
                key={`${item.itemType}-${index}`}
                className="rounded-xl border border-w2w-accent/20 bg-w2w-accent/10 p-4"
              >
                <p className="text-lg font-semibold text-w2w-base">
                  {item.quantity}x {item.itemType}
                </p>
                <p className="text-sm text-slate-500">Model/spec akan diisi saat verifikasi.</p>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-slate-200 pt-4 text-sm text-slate-600">
            <p className="font-semibold text-w2w-base">Drop-off Point</p>
            <p>{submission.dropboxName}</p>
            <p>Box {submission.boxNumber}</p>
          </div>
        </div>

        <div className="border border-slate-200 bg-white rounded-2xl p-6">
          <p className="text-xl font-bold text-w2w-base mb-3">Processing Log</p>
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-semibold text-w2w-accent">10:45 AM</span> Arrival logged
            </p>
            <p>
              <span className="font-semibold text-w2w-accent">11:02 AM</span> Verification started
            </p>
            <p className="text-slate-500">Log timestamp masih placeholder sesuai handover.</p>
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-2xl bg-w2w-base p-5 text-white">
          <p className="text-3xl font-bold mb-2">Weighing Process</p>
          <p className="text-sm text-white/85 mb-4">
            Teknisi menimbang dan memvalidasi komponen item untuk kalkulasi poin.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-w2w-accent" /> Visual assessment
            </li>
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-w2w-accent" /> Precision weighing
            </li>
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-w2w-accent" /> Category validation
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
          <p className="font-semibold text-w2w-base mb-2">Status Sync</p>
          <p className="inline-flex items-center gap-2">
            <LoaderCircle className="h-4 w-4 animate-spin text-w2w-accent" />
            Menunggu status berubah ke VERIFIED dari database...
          </p>
          {canSubmitAnother ? (
            <>
              <button
                className="mt-4 w-full rounded-full border border-w2w-accent py-2.5 font-semibold text-w2w-base hover:bg-w2w-accent/10 disabled:opacity-60"
                onClick={onSubmitAnother}
                disabled={isStartingNew}
              >
                {isStartingNew ? "Preparing form..." : "Submit Lagi ke Dropbox"}
              </button>
              <p className="mt-2 text-xs text-slate-500">
                Pengajuan ini tetap lanjut diverifikasi admin, sementara kamu bisa
                bikin submission baru karena slot dropbox masih tersedia.
              </p>
            </>
          ) : (
            <p className="mt-4 text-xs text-slate-500">
              Submit ulang dinonaktifkan karena saat ini tidak ada slot box tersedia
              di dropbox aktif.
            </p>
          )}
        </div>
      </aside>
    </section>
  );
}
