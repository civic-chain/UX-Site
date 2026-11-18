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
  title: "Three clear views",
  body: "Shared Ledger, Personalized Experiences",
  cards: [
    {
      label: "Town staff",
      body: "Manage bids, approvals, and payments in one place",
      cta: "Town operations",
      icon: "admin",
      tone: "cream",
      chipTone: "gold",
      badgeTone: "gold",
      artworkSrc: "/design-assets/scenes-colored/colored-random-city-hall-books-desk-lamp-seal.webp",
      artworkAlt: "City hall books, desk lamp, and civic seal for town staff.",
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
      artworkSrc: "/design-assets/scenes-colored/colored-random-hardhat-tablet-blueprints.webp",
      artworkAlt: "Hard hat, tablet, and blueprints for contractor status.",
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
      artworkSrc: "/design-assets/scenes-colored/colored-random-contract-record-stack-leaf.webp",
      artworkAlt: "Stack of contract records with a leaf for the public record view.",
      features: [
        { label: "Approved", icon: "completed" },
        { label: "Spent funds", icon: "funding" },
        { label: "Completed", icon: "approvals" },
      ],
    },
  ],
} as const satisfies {
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

          <div className="grid gap-6 lg:gap-4 md:grid-cols-2 md:items-stretch xl:grid-cols-3 xl:pb-10">
            {portalHubContent.cards.map((card, index) => {
              return (
                <article
                  key={card.label}
                  data-testid={`portal-card-${index}`}
                  className={cn(
                    "h-full",
                    index === 2 && "md:col-span-2 md:w-1/2 md:mx-auto xl:col-span-1 xl:w-full xl:mx-0",
                  )}
                >
                  <SurfaceCard
                    tone={card.tone}
                    className={cn(
                      "border-2 border-b-8 border-current/20 border-b-current/40",
                      "relative h-full overflow-hidden",
                    )}
                  >
                    <div className="relative flex h-full flex-col gap-7 p-4 lg:p-5">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className="absolute inset-0">
                          <BrandRasterImage
                            src={card.artworkSrc}
                            alt={card.artworkAlt}
                            fill
                            sizes="(min-width: 1536px) 30vw, (min-width: 768px) 48vw, 90vw"
                            className="object-contain object-center mix-blend-normal"
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
