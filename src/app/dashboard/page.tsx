"use client";

import { useEffect, useState } from "react";
import { SidebarCitizen } from "@/components/citizen/SidebarCitizen";
import { GreetingSection } from "@/components/citizen/GreetingSection";
import { QuickActions } from "@/components/citizen/QuickActions";
import { ActiveSubmissions } from "@/components/citizen/ActiveSubmissions";
import { PlatformImpact } from "@/components/citizen/PlatformImpact";

interface DashboardData {
  user: { name: string; email: string; pointsBalance: number };
  stats: {
    totalPoints: number;
    pointsThisMonth: number;
    totalSubmittedKg: number;
    activeSubmissions: number;
    personalImpactKg: number;
  };
  activeSubmissions: Array<{
    id: string;
    method: string;
    status: string;
    submittedAt: string;
    batchStatus: string | null;
    items: Array<{
      itemType: string;
      quantity: number;
      weightKg: number | null;
    }>;
    location: string;
  }>;
  community: {
    platformCollectionKg: number;
    contributorCount: number;
    districtActivity: Array<{ name: string; totalKg: number }>;
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        className="flex min-h-screen"
        style={{ background: "#F8FAF9" }}
      >
        <SidebarCitizen />
        <main className="flex-1 ml-64 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "#16C47F", borderTopColor: "transparent" }}
            />
            <p className="text-sm" style={{ color: "#8BAF9E" }}>
              Loading dashboard...
            </p>
          </div>
        </main>
      </div>
    );
  }

  const defaultStats = {
    totalPoints: 0,
    pointsThisMonth: 0,
    totalSubmittedKg: 0,
    activeSubmissions: 0,
    personalImpactKg: 0,
  };

  const defaultCommunity = {
    platformCollectionKg: 0,
    contributorCount: 0,
    districtActivity: [],
  };

  return (
    <div className="flex min-h-screen" style={{ background: "#F8FAF9" }}>
      <SidebarCitizen />

      {/* Main content — offset by sidebar width */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="max-w-[1280px] mx-auto px-8 py-10">
          <div className="flex gap-8">
            {/* Left column — main content */}
            <div className="flex-1 min-w-0">
              <GreetingSection
                userName={data?.user?.name || "User"}
                stats={data?.stats || defaultStats}
              />
              <QuickActions />
              <ActiveSubmissions
                submissions={data?.activeSubmissions || []}
              />
            </div>

            {/* Right column — community impact */}
            <div className="w-[320px] flex-shrink-0 pt-[88px]">
              <PlatformImpact
                community={data?.community || defaultCommunity}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
