import type { Metadata } from "next";
import { NavbarPublic } from "@/components/public/NavbarPublic";
import { HeroSection } from "@/components/public/HeroSection";
import { MaterialSection } from "@/components/public/MaterialSection";
import { HowItWorksSection } from "@/components/public/HowItWorksSection";
import { TrackingSection } from "@/components/public/TrackingSection";
import { ImpactSection } from "@/components/public/ImpactSection";

export const metadata: Metadata = {
  title: "Waste to Worth — Smart E-Waste Management Makassar",
  description:
    "Platform pengelolaan sampah elektronik berbasis komunitas di Makassar. Buang e-waste dengan benar, dapatkan poin, dan bantu lingkungan.",
};

export default function ImpactPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <NavbarPublic />
      <HeroSection />
      <MaterialSection />
      <HowItWorksSection />
      <TrackingSection />
      <ImpactSection />
    </main>
  );
}
