import type { Metadata } from "next";
import Link from "next/link";

import { HowItWorksTimeline } from "./how-it-works-timeline";

import { AccentRule } from "@/components/ui/accent-rule";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { SurfaceCard } from "@/components/ui/surface-card";

export const metadata: Metadata = {
  title: "How It Works | Civic-Chain",
  description:
    "Five Civic-Chain feature cards pairing documented municipal finance pain points with structural feature fixes.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <main className="section-flow gap-28 pb-16 lg:gap-56 lg:pb-24">
      <section id="how-it-works-hero" className="section-shell pt-10 lg:pt-14">
        <div className="mx-auto grid max-page gap-8">
          <div className="grid max-w-6xl gap-6 lg:gap-7">
            <div>
              <Badge
                tone="sky"
                size="lg"
                className="body-sm normal-case tracking-normal"
              >
                How It Works
              </Badge>
            </div>
            <div className="grid gap-4">
              <h1 className="max-w-6xl h4 lg:h3">
                Five problems. Five structural fixes
                <HeadlineDot />
              </h1>
              <p className="max-w-2xl body-lg text-slate-500">
                Every Civic-Chain feature starts from a real, documented pain
                point in municipal finance. Hover each card, or tap it, to see
                how the feature resolves it.
              </p>
            </div>
          </div>

          <AccentRule className="max-w-6xl" />
        </div>
      </section>

      <HowItWorksTimeline />

      <section id="how-it-works-cta" className="section-shell">
        <div className="mx-auto max-w-5xl">
          <SurfaceCard
            tone="sky"
            material="blueprint"
            density="roomy"
            className="text-center"
          >
            <div className="mx-auto grid max-w-2xl justify-items-center gap-6">
              <Badge
                tone="neutral"
                size="lg"
                className="body-sm normal-case tracking-normal"
              >
                Ready to See It Live
              </Badge>
              <div className="grid gap-3">
                <h2 className="h4">
                  Every card is in production
                  <HeadlineDot />
                </h2>
                <p className="body text-current/75">
                  Civic-Chain is built and deployable today. Talk to us about
                  piloting in your municipality.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link href="/contact">Request a Demo</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/#how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>
          </SurfaceCard>
        </div>
      </section>
    </main>
  );
}
