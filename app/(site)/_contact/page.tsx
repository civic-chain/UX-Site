/* eslint-disable @next/next/no-img-element -- Transparent foreground WebP scene failed to paint through next/image on narrow cards. */
import Link from "next/link";

import { AccentRule } from "@/components/ui/accent-rule";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import { SurfaceCard } from "@/components/ui/surface-card";

const nextItems = [
  { label: "Pilot framing for Maine towns", icon: "admin", tone: "sage", step: "Start" },
  { label: "Low-friction outreach path", icon: "conversation", tone: "sky", step: "Talk" },
  { label: "Follow-up tailored to town managers and operators", icon: "vote", tone: "gold-soft", step: "Decide" },
] as const;

export default function ContactPage() {
  return (
    <main className="pb-16 lg:pb-24">
      <section id="contact-hero" className="section-shell pt-8 lg:pt-12">
        <div className="mx-auto grid max-page gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.68fr)] lg:items-start lg:gap-12">
          <div className="grid content-start gap-8 lg:gap-9">
            <div className="grid max-w-4xl gap-6 lg:gap-7">
              <div>
                <Badge tone="gold" className="gap-2">
                  <span aria-hidden="true" className="text-gold-300">*</span>
                  Pilot conversation preview
                </Badge>
              </div>
              <div className="grid gap-3">
                <h2 className="max-w-4xl h3 lg:h2">Pilot conversation preview</h2>
                <p className="max-w-2xl body-lg text-slate-500">
                  This route will eventually become the low-friction path for towns that want
                  to talk about a pilot.
                </p>
              </div>
              <div>
                <Button asChild variant="outline">
                  <Link href="/">Back to landing</Link>
                </Button>
              </div>
            </div>

            <AccentRule
              className="max-w-3xl"
              sigil={<span aria-hidden="true" className="text-gold-300">*</span>}
            />

            <section id="contact-path" className="grid gap-8">
              <div className="grid gap-2">
                <h2 className="h4">Pilot conversations start here.</h2>
                <p className="max-w-[56ch] body text-slate-500">
                  Use this page as the simple handoff destination for towns that want a
                  walkthrough. Until a full form is ready, the email path stays direct and
                  reviewable.
                </p>
              </div>
              <div className="relative grid gap-4 sm:grid-cols-3 sm:gap-9">
                <span
                  aria-hidden="true"
                  className="absolute left-11 right-11 top-7 hidden h-px bg-green-900/65 sm:block"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-7 left-7 top-7 w-px bg-green-900/50 sm:hidden"
                />
                {nextItems.map((item, index) => (
                  <SurfaceCard
                    key={item.label}
                    className="relative grid grid-cols-[3.5rem_1fr] gap-4 rounded-2xl p-4 sm:grid-cols-1 sm:justify-items-center sm:border-0 sm:bg-transparent sm:p-0 sm:text-center"
                  >
                    <IconChip name={item.icon} tone={item.tone} variant="tile" size="lg" />
                    <div className="grid gap-1">
                      <span className="captions text-current/50">
                        {index + 1}. {item.step}
                      </span>
                      <p className="max-w-56 body-sm font-medium text-current/80">
                        {item.label}
                      </p>
                    </div>
                  </SurfaceCard>
                ))}
              </div>
            </section>
          </div>

          <section
            id="contact-email"
            className="min-w-0 lg:border-l lg:border-dashed lg:border-gold-800/60"
          >
            <SurfaceCard tone="cream" className="relative h-full min-h-96 overflow-hidden border-2 border-b-8 border-gold-200 border-b-gold-300 lg:min-h-0">
              <div className="relative z-10 flex flex-col gap-8 p-7 lg:gap-9 lg:p-10">
                <div className="grid gap-6">
                  <IconChip name="email" tone="sage" variant="tile" size="lg" />
                  <div className="grid gap-2">
                    <h2 className="max-w-md h3">Reach the team directly.</h2>
                    <span aria-hidden="true" className="h-px w-20 bg-gold-600" />
                    <p className="max-w-md body text-current/68">
                      Direct, private, and reviewable.
                    </p>
                  </div>
                </div>
                <Button asChild size="lg" fullWidth className="max-w-full whitespace-normal break-all text-center sm:min-w-72 sm:break-normal">
                  <Link href="mailto:info@civic-chain.com">
                    <Icon name="email" />
                    <span>info@civic-chain.com</span>
                  </Link>
                </Button>
                <p className="inline-flex items-center gap-2 body-sm text-current/58">
                  <Icon name="trust" />
                  <span>Direct, private, and reviewable.</span>
                </p>
                <img
                  src="/design-assets/scenes-colored/colored-random-small-town-courthouse-landscape.webp"
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  width={1445}
                  height={1089}
                  className="mx-auto h-auto w-full max-w-md object-contain opacity-90"
                />
              </div>
            </SurfaceCard>
          </section>
        </div>
      </section>
    </main>
  );
}
