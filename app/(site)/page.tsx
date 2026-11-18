import { BuiltOnSection } from "@/app/(site)/_sections/built-on-section";
import { CtaSection } from "@/app/(site)/_sections/cta-section";
import { FaqSection } from "@/app/(site)/_sections/faq-section";
import { HeroSection } from "@/app/(site)/_sections/hero-section";
import { HowItWorksSection } from "@/app/(site)/_sections/how-it-works-section";
import { MobileBridgeSection } from "@/app/(site)/_sections/mobile-bridge-section";
import { NumbersSection } from "@/app/(site)/_sections/numbers-section";
import { PortalHubSection } from "@/app/(site)/_sections/portal-hub-section";
import { ProblemSection } from "@/app/(site)/_sections/problem-section";
import { RecordFlowSection } from "@/app/(site)/_sections/record-flow-section";
import type { Metadata } from "next";

// Self-referential canonical for the tracked landing page. Resolved against
// metadataBase (civic-chain.com) in the root layout.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="relative overflow-hidden text-foreground">
      {/* Phones are forwarded to the standalone mobile landing (/m). Desktop is
          untouched: this guard only fires below the 640px (sm) breakpoint and
          renders nothing. Removing it (or the /m route) restores the original
          site with zero other changes. */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "if(window.matchMedia&&!window.matchMedia('(min-width:640px)').matches){location.replace('/m')}",
        }}
      />
      <main className="landing-section-flow landing-section-flow-roomy relative">
        <HeroSection />

        {/* Mobile only: 2-stat bridge replaces the 5 heavy middle sections */}
        <MobileBridgeSection className="sm:hidden" />

        {/* Desktop only: full middle sections (hidden on mobile) */}
        <div className="landing-section-flow landing-section-flow-roomy hidden sm:flex">
          <ProblemSection />
          <NumbersSection />
          <RecordFlowSection />
          <PortalHubSection />
          <HowItWorksSection />
        </div>

        <CtaSection />
        <FaqSection mobileLimit={2} />

        {/* Understated supplier strip near the footer — links to /partners. */}
        <BuiltOnSection />
      </main>
    </div>
  );
}
