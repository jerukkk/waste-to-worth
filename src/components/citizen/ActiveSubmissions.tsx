"use client";
import Link from "next/link";
import { PackagePlus, CheckCircle2, Search, Circle } from "lucide-react";

interface SubmissionItem {
  itemType: string;
  quantity: number;
  weightKg: number | null;
}

interface ActiveSubmission {
  id: string;
  method: string;
  status: string;
  submittedAt: string;
  batchStatus: string | null;
  items: SubmissionItem[];
  location: string;
}

interface ActiveSubmissionsProps {
  submissions: ActiveSubmission[];
}

// 3-step progress: Submitted → Verifying → Completed
const steps = [
  { label: "Submitted" },
  { label: "VERIFYING" },
  { label: "Completed" },
];

function getStepIndex(status: string, batchStatus: string | null): number {
  // If submission is VERIFIED → completed
  if (status === "VERIFIED") return 2;
  // If batch is VERIFYING → verifying step
  if (batchStatus === "VERIFYING" || batchStatus === "COLLECTING") return 1;
  // Default: submitted (step 0)
  return 0;
}

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-0 mt-5 mb-2">
      {steps.map(({ label }, i) => {
        const done = i <= currentStep;
        const active = i === currentStep;
        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: done ? "#16C47F" : "#F0F5F2",
                  boxShadow: active
                    ? "0 0 0 3px rgba(22,196,127,0.20)"
                    : "none",
                }}
              >
                {done ? (
                  i < currentStep ? (
                    <CheckCircle2 size={14} color="#fff" strokeWidth={2.5} />
                  ) : (
                    <Search size={12} color="#fff" strokeWidth={2.5} />
                  )
                ) : (
                  <Circle size={12} color="#B8DECA" strokeWidth={2} />
                )}
              </div>
              <span
                className="text-xs whitespace-nowrap"
                style={{
                  color: active ? "#16C47F" : done ? "#16C47F" : "#B8DECA",
                  fontWeight: active ? 700 : 400,
                  fontSize: "10px",
                  textTransform: active ? "uppercase" : "none",
                }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="flex-1 h-[2px] mx-2 mb-5 rounded-full"
                style={{
                  background: i < currentStep ? "#16C47F" : "#E5EDE9",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function ActiveSubmissions({ submissions }: ActiveSubmissionsProps) {
  if (!submissions || submissions.length === 0) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-base font-bold"
            style={{
              color: "#1A2E27",
              fontFamily: "'Space Grotesk',sans-serif",
            }}
          >
            Active Submissions
          </h2>
        </div>
        <div
          className="bg-white rounded-2xl p-8 text-center"
          style={{
            border: "1px solid #E5EDE9",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <p className="text-sm" style={{ color: "#8BAF9E" }}>
            No active submissions yet. Start by submitting your e-waste!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-base font-bold"
          style={{
            color: "#1A2E27",
            fontFamily: "'Space Grotesk',sans-serif",
          }}
        >
          Active Submissions
        </h2>
        <Link
          href="/history"
          className="text-xs font-semibold transition-colors duration-200"
          style={{ color: "#16C47F" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = "#0EA572";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = "#16C47F";
          }}
        >
          View All History
        </Link>
      </div>

      <div className="space-y-4">
        {submissions.map((s) => {
          const currentStep = getStepIndex(s.status, s.batchStatus);
          const itemSummary =
            s.items.length > 0
              ? `${s.items.reduce((sum, item) => sum + item.quantity, 0)} ${s.items[0]?.itemType || "Items"}`
              : "Items";
          const shortId = `WTW-${s.id.slice(-8).toUpperCase()}`;

          return (
            <div
              key={s.id}
              className="bg-white rounded-2xl p-6 transition-all duration-200"
              style={{
                border: "1px solid #E5EDE9",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* Header */}
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(22,196,127,0.10)" }}
                >
                  <PackagePlus size={18} color="#16C47F" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold text-sm"
                    style={{ color: "#1A2E27" }}
                  >
                    {s.method === "DROPBOX"
                      ? "Dropbox Submission"
                      : "Pickup Submission"}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#8BAF9E" }}>
                    {itemSummary} • {shortId}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <ProgressBar currentStep={currentStep} />

              {/* Bottom info */}
              <div
                className="flex items-center justify-between pt-3 mt-1"
                style={{ borderTop: "1px solid #F0F5F2" }}
              >
                <p className="text-xs" style={{ color: "#8BAF9E" }}>
                  Estimating points value...
                </p>
                <Link
                  href={`/history`}
                  className="text-xs font-semibold"
                  style={{ color: "#16C47F" }}
                >
                  Details &gt;
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
