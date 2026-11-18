import { AccentRule } from "@/components/ui/accent-rule";
import { AccentUnderline } from "@/components/ui/accent-underline";
import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import { CtaContactPair } from "@/components/ui/cta-contact-pair";
import { DotMatrix } from "@/components/ui/dot-matrix";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { IconChip } from "@/components/ui/icon-chip";
import { cn } from "@/lib/utils";

const heroContent = {
  illustrationSrc: "/landing/hero-civic-scene-with-board-text.webp",
  illustrationAlt:
    "People standing around a public procurement record board in front of a courthouse, illustrating an open civic ledger scene.",
  headline: ["Every dollar", "on the record"],
  body: "A procurement platform where money moves fast, and everyone can watch.",
  cta: {
    primaryLabel: "Contact us",
    emailHref: "/contact",
    emailLabel: "civic-chain.com/contact",
  },
  support: [
    {
      label: "For residents",
      icon: "citizen",
      body: "Public spending stays visible without a request, a login, or a call to town hall.",
    },
    {
      label: "For vendors",
      icon: "vendor",
      body: "Card-funded work begins the same day the contract is awarded, not a month later.",
    },
  ],
} as const;

export function HeroSection({ className }: { className?: string }) {
  return (
    <section
      id="hero"
      className={cn("section-shell pt-12 pb-12 lg:pt-20 lg:pb-20", className)}
    >
      <div className="mx-auto max-page">
        <div className="landing-hero-frame grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[0.96fr_1.04fr]">
          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="grid gap-3">
              <h2 className="grid max-w-4xl gap-1 h3 lg:h2">
                {heroContent.headline.map((line, index) => {
                  const isLast = index === heroContent.headline.length - 1;
                  return (
                    <span key={line}>
                      {line}
                      {isLast ? <HeadlineDot /> : null}
                    </span>
                  );
                })}
              </h2>
              <AccentUnderline className="mt-1" />
              <p className="mt-2 max-w-xl w-fit body text-slate-500">
                {heroContent.body}
              </p>
            </div>

            <CtaContactPair
              primaryLabel={heroContent.cta.primaryLabel}
              emailHref={heroContent.cta.emailHref}
              emailLabel={heroContent.cta.emailLabel}
            />

            <AccentRule />

            <div className="grid gap-5 sm:gap-8 sm:grid-cols-2 lg:gap-10">
              {heroContent.support.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center gap-4">
                    <IconChip name={item.icon} tone="gold-soft" variant="tile" size="md" />
                    <div className="captions text-slate-500">
                      {item.label}
                    </div>
                  </div>
                  <AccentUnderline />
                  <p className="max-w-sm body">{item.body}</p>
                </div>
              ))}
            </div>

            <DotMatrix rows={3} cols={6} className="w-20 self-start" />
          </div>

          <div
            data-allow-viewport-overflow="hero-art"
            className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:-mr-6 sm:overflow-visible lg:-ml-8 lg:-mr-8 lg:aspect-[1.06/1] xl:-ml-12 xl:-mr-12"
          >
            <BrandRasterImage
              src={heroContent.illustrationSrc}
              alt={heroContent.illustrationAlt}
              fill
              priority
              loading="eager"
              sizes="(min-width: 1280px) 48vw, (min-width: 1024px) 46vw, 100vw"
              className="object-contain object-center sm:origin-left sm:scale-125 sm:object-left lg:scale-[1.32] xl:scale-[1.34]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
