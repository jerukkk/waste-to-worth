import type { Metadata } from "next";
import { SidebarCitizen } from "@/components/citizen/SidebarCitizen";
import { GreetingSection } from "@/components/citizen/GreetingSection";
import { QuickActions } from "@/components/citizen/QuickActions";
import { ActiveSubmissions } from "@/components/citizen/ActiveSubmissions";
import { PlatformImpact } from "@/components/citizen/PlatformImpact";

export const metadata: Metadata = {
  title: "Dashboard — Waste to Worth",
  description: "Monitor poin, lacak status submission, dan kelola e-waste kamu.",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen" style={{ background: "#F8FAF9" }}>
      <SidebarCitizen />

      {/* Main content — offset by sidebar width */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="max-w-[1100px] mx-auto px-8 py-10">
          <GreetingSection />
          <QuickActions />
          <ActiveSubmissions />
          <PlatformImpact />
        </div>
      </main>
    </div>
  );
}
