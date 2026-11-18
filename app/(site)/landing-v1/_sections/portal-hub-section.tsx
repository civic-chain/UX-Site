import { AccentUnderline } from "@/components/ui/accent-underline";
import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { HeadlineDot } from "@/components/ui/headline-dot";
import type { IconName } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { SurfaceTone } from "@/lib/design-system-types";
import { cn } from "@/lib/utils";

type PortalTone = "cream" | "sky" | "sage";
type PortalCard = {
  label: string;
  body: string;
  cta: string;
  icon: IconName;
  tone: PortalTone;
  chipTone: SurfaceTone;
  badgeTone: BadgeTone;
  artworkSrc: string;
  artworkAlt: string;
  features: readonly { label: string; icon: IconName }[];
};

const portalHubContent = {
  eyebrow: "Portal Hub",
  title: "Three clear views",
  body:
    "The same contract reads differently for town staff, contractors, and the public record.",
  cards: [
    {
      label: "Town staff",
      body: "Manage bids, approvals, and payments in one place",
      cta: "Town operations",
      icon: "admin",
      tone: "cream",
      chipTone: "gold",
      badgeTone: "gold",
      artworkSrc: "/landing/books-lamp-seal.webp",
      artworkAlt: "Books, lamp, and civic seal — town staff illustration.",
      features: [
        { label: "Bids & proposals", icon: "note" },
        { label: "Approvals", icon: "completed" },
        { label: "Payments", icon: "funding" },
      ],
    },
    {
      label: "Contractor",
      body: "Track work status, payment timing, and allowed spending",
      cta: "Contractor status",
      icon: "vendor",
      tone: "sky",
      chipTone: "sky",
      badgeTone: "sky",
      artworkSrc: "/landing/hardhat-tablet-plans.webp",
      artworkAlt: "Hard hat, tablet, and folded plans — contractor illustration.",
      features: [
        { label: "Work status", icon: "paymentTiming" },
        { label: "Payment timing", icon: "calendar" },
        { label: "Allowed spend", icon: "paid" },
      ],
    },
    {
      label: "Public record",
      body: "See what was approved, spent, and completed",
      cta: "Public transparency",
      icon: "record",
      tone: "sage",
      chipTone: "sage",
      badgeTone: "sage",
      artworkSrc: "/landing/contract-stack-plant.webp",
      artworkAlt: "Stack of contracts and a small plant — public record illustration.",
      features: [
        { label: "Approved", icon: "completed" },
        { label: "Spent funds", icon: "funding" },
        { label: "Completed", icon: "approvals" },
      ],
    },
  ],
} as const satisfies {
  eyebrow: string;
  title: string;
  body: string;
  cards: readonly PortalCard[];
};

export function PortalHubSection({ className }: { className?: string }) {
  return (
    <section id="portal-hub" className={cn("section-shell", className)}>
      <div className="mx-auto max-page">
        <div className="grid gap-6 lg:gap-7">
          <div data-testid="section-heading" className="grid gap-6 lg:gap-7">
            <div>
              <Badge tone="gold">{portalHubContent.eyebrow}</Badge>
            </div>
            <div data-testid="section-heading-copy-stack" className="grid gap-3">
              <h2 className="max-w-4xl h3">
                {portalHubContent.title}
                <HeadlineDot />
              </h2>
              <AccentUnderline className="mt-1" />
              <p className="mt-2 max-w-2xl body-lg text-slate-500">
                {portalHubContent.body}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:gap-4 lg:grid-cols-3 lg:items-stretch lg:pb-10">
            {portalHubContent.cards.map((card, index) => {
              return (
                <article
                  key={card.label}
                  data-testid={`portal-card-${index}`}
                  className="h-full"
                >
                  <SurfaceCard
                    tone={card.tone}
                    className={cn(
                      "border-2 border-b-8 border-current/20 border-b-current/40",
                      "relative h-full overflow-hidden",
                    )}
                  >
                    <div className="relative flex h-full flex-col gap-7 p-4 lg:p-5">
                      <div className="relative h-44 lg:h-52">
                        <div className="absolute inset-0">
                          <BrandRasterImage
                            src={card.artworkSrc}
                            alt={card.artworkAlt}
                            fill
                            sizes="(min-width: 1024px) 30vw, 90vw"
                            className="object-contain object-right-top"
                          />
                        </div>
                        <IconChip
                          name={card.icon}
                          tone={card.chipTone}
                          variant="tile"
                          size="lg"
                          className="absolute left-0 top-0"
                        />
                      </div>

                      <div className="grid gap-3">
                        <h3 className="h4">{card.label}</h3>
                        <p className="max-w-xs body text-current/80">
                          {card.body}
                        </p>
                      </div>

                      <div
                        aria-hidden="true"
                        className="border-t border-dashed border-current/15"
                      />

                      <div
                        className={cn(
                          "border-current/30",
                          "grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3",
                        )}
                      >
                        {card.features.map((feature) => (
                          <div
                            key={feature.label}
                            className="flex min-w-0 items-center"
                          >
                            <Badge
                              variant="flat"
                              tone={card.badgeTone}
                              icon={feature.icon}
                            >
                              {feature.label}
                            </Badge>
                          </div>
                        ))}
                      </div>

                      <div
                        aria-hidden="true"
                        className="border-t border-dashed border-current/15"
                      />

                      <span className="inline-flex items-center gap-3 body-sm font-semibold text-current/85">
                        {card.cta}
                      </span>
                    </div>
                  </SurfaceCard>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
