import type { Metadata } from "next";

import { CtaSection } from "@/app/(site)/landing-v1/_sections/cta-section";
import { FaqSection } from "@/app/(site)/landing-v1/_sections/faq-section";
import { HeroSection } from "@/app/(site)/landing-v1/_sections/hero-section";
import { HowItWorksSection } from "@/app/(site)/landing-v1/_sections/how-it-works-section";
import { NumbersSection } from "@/app/(site)/landing-v1/_sections/numbers-section";
import { PortalHubSection } from "@/app/(site)/landing-v1/_sections/portal-hub-section";
import { ProblemSection } from "@/app/(site)/landing-v1/_sections/problem-section";

export const metadata: Metadata = {
  title: "Civic-Chain Landing V1 Archive",
  description: "Archived first Civic-Chain landing page, preserved for reference.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LandingV1ArchivePage() {
  return (
    <div className="relative overflow-hidden text-foreground">
      <main className="landing-section-flow relative">
        <HeroSection />
        <PortalHubSection />
        <ProblemSection />
        <HowItWorksSection />
        <NumbersSection />
        <CtaSection />
        <FaqSection />
      </main>
    </div>
  );
}
