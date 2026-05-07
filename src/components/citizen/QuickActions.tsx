"use client";
import Link from "next/link";
import { PackagePlus, Truck } from "lucide-react";

export function QuickActions() {
  return (
    <div className="mb-8">
      <h2
        className="text-base font-bold mb-4"
        style={{ color: "#1A2E27", fontFamily: "'Space Grotesk',sans-serif" }}
      >
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Submit via Dropbox */}
        <div
          className="bg-white rounded-2xl p-6 transition-all duration-200"
          style={{
            border: "1px solid #E5EDE9",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
            el.style.transform = "translateY(-2px)";
            el.style.borderColor = "#B8DECA";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            el.style.transform = "translateY(0)";
            el.style.borderColor = "#E5EDE9";
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(22,196,127,0.10)" }}
            >
              <PackagePlus size={22} color="#16C47F" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p
                className="font-bold text-sm mb-1"
                style={{ color: "#1A2E27" }}
              >
                Submit via Dropbox
              </p>
              <p
                className="text-xs leading-relaxed mb-4"
                style={{ color: "#8BAF9E" }}
              >
                Scan a nearby QR code to submit instantly.
              </p>
              <Link
                href="/submit/dropbox"
                className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: "#16C47F",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "#0EA572";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "#16C47F";
                }}
              >
                Start Submission
              </Link>
            </div>
          </div>
        </div>

        {/* Request Pickup */}
        <div
          className="bg-white rounded-2xl p-6 transition-all duration-200"
          style={{
            border: "1px solid #E5EDE9",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
            el.style.transform = "translateY(-2px)";
            el.style.borderColor = "#B8DECA";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            el.style.transform = "translateY(0)";
            el.style.borderColor = "#E5EDE9";
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(52,152,219,0.10)" }}
            >
              <Truck size={22} color="#3498DB" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p
                className="font-bold text-sm mb-1"
                style={{ color: "#1A2E27" }}
              >
                Request Pickup
              </p>
              <p
                className="text-xs leading-relaxed mb-4"
                style={{ color: "#8BAF9E" }}
              >
                For bulk items or large collection quantities.
              </p>
              <Link
                href="/submit/pickup"
                className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: "#fff",
                  color: "#1A2E27",
                  border: "1px solid #E5EDE9",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "#1A2E27";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "#E5EDE9";
                }}
              >
                Book Pickup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
