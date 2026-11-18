import { AccentRule } from "@/components/ui/accent-rule";
import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import { Badge } from "@/components/ui/badge";
import { CtaContactPair } from "@/components/ui/cta-contact-pair";
import { DotMatrix } from "@/components/ui/dot-matrix";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { IconChip } from "@/components/ui/icon-chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";

const ctaContent = {
  eyebrow: "Next Step",
  title: "Contact us",
  body: "If you want to talk through the workflow, reach the team directly.",
  primaryLabel: "Contact us",
  emailLabel: "civic-chain.com/contact",
  emailHref: "/contact",
  illustrationSrc: "/landing/cta-courthouse-trees-planter.webp",
  illustrationAlt:
    "Line-art illustration of a courthouse with trees and a planter on a pale circular backdrop.",
} as const;

export function CtaSection({ className }: { className?: string }) {
  return (
    <section
      id="cta"
      className={cn("section-shell pb-16 lg:pb-24", className)}
    >
      <div className="mx-auto max-page">
        <SurfaceCard tone="sky" className="relative overflow-hidden">
          <DotMatrix
            rows={4}
            cols={6}
            className="pointer-events-none absolute right-6 top-6 hidden w-20 lg:block"
          />

          <div className="grid gap-7 p-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-8 lg:p-12">
            <div className="grid gap-6">
              <div data-testid="section-heading" className="grid gap-6 lg:gap-7">
                <div>
                  <Badge tone="gold">{ctaContent.eyebrow}</Badge>
                </div>
                <div data-testid="section-heading-copy-stack" className="grid gap-3">
                  <h2 className="max-w-md h3">
                    {ctaContent.title}
                    <HeadlineDot />
                  </h2>
                  <p className="mt-1 max-w-md body-lg text-current/80">
                    {ctaContent.body}
                  </p>
                </div>
              </div>

              <CtaContactPair
                primaryLabel={ctaContent.primaryLabel}
                emailHref={ctaContent.emailHref}
                emailLabel={ctaContent.emailLabel}
              />

              <AccentRule
                sigil={<IconChip name="trust" tone="cream" variant="tile" size="sm" />}
                className="mt-2"
              />
            </div>

            <div className="relative hidden h-72 w-full lg:block">
              <span
                aria-hidden="true"
                className="absolute right-8 top-1/2 size-72 -translate-y-1/2 rounded-2xl bg-cream-50 opacity-70"
              />
              <BrandRasterImage
                src={ctaContent.illustrationSrc}
                alt={ctaContent.illustrationAlt}
                fill
                sizes="36vw"
                className="relative object-contain object-right"
              />
            </div>
          </div>
        </SurfaceCard>
      </div>
    </section>
  );
}
