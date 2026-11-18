import Link from "next/link";

import { AccentRule } from "@/components/ui/accent-rule";
import { AccentUnderline } from "@/components/ui/accent-underline";
import { Badge } from "@/components/ui/badge";
import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import { DotMatrix } from "@/components/ui/dot-matrix";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { Icon } from "@/components/ui/icon";
import { IconChip } from "@/components/ui/icon-chip";
import { cn } from "@/lib/utils";

const heroContent = {
  illustrationSrc: "/landing/hero-civic-scene-with-board-text-canonical-cutout.webp",
  illustrationAlt:
    "People standing around a public procurement record board in front of a courthouse, illustrating an open civic ledger scene.",
  headline: ["Every dollar", "on the record"],
  body: "One place where your town's spending is always current and anyone can see it. Works with the system you already use. Nothing to replace.",
  // Two plain-language proof points. Both map to what ships today: records are
  // write-once (tamper-proof) and the payment trail is public (chain of custody).
  proofPoints: [
    { label: "Tamper-proof government", icon: "trust", tone: "sage" },
    { label: "Public chain of custody for tax dollars", icon: "paid", tone: "sky" },
  ],
  support: [
    {
      label: "For residents",
      href: "/residents",
      icon: "citizen",
      body: "Public spending stays visible without a request, a login, or a call to town hall.",
    },
    {
      label: "For vendors",
      href: "/vendors",
      icon: "vendor",
      body: "Card-funded work can begin the same day the contract is awarded, not a month later.",
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
        <div className="landing-hero-frame grid items-center gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] xl:gap-10 2xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="grid gap-3">
              <h1 className="grid max-w-4xl gap-1 h3 lg:h2">
                {heroContent.headline.map((line, index) => {
                  const isLast = index === heroContent.headline.length - 1;
                  return (
                    <span key={line}>
                      {line}
                      {isLast ? <HeadlineDot /> : null}
                    </span>
                  );
                })}
              </h1>
              <AccentUnderline className="mt-1" />
              <p className="mt-2 max-w-xl w-fit body text-slate-500">
                {heroContent.body}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {heroContent.proofPoints.map((point) => (
                  <Badge key={point.label} tone={point.tone} icon={point.icon}>
                    {point.label}
                  </Badge>
                ))}
              </div>
            </div>

            <AccentRule />

            <div className="grid gap-5 sm:gap-8 sm:grid-cols-2 lg:gap-10">
              {/* The whole block is one link: the negative margin + padding grow
                  the hover/focus area without moving the content. */}
              {heroContent.support.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group -m-3 flex flex-col gap-3 rounded-2xl p-3 transition-colors duration-[var(--dur-fast)] ease-[var(--ease-soft)] hover:bg-current/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div className="flex items-center gap-4">
                    <IconChip name={item.icon} tone="gold-soft" variant="tile" size="md" />
                    <div className="captions text-slate-500 group-hover:text-current">
                      {item.label}
                    </div>
                    <Icon
                      name="arrow-right"
                      size="sm"
                      className="-ml-2 text-slate-500 opacity-0 transition-[opacity,transform] duration-[var(--dur-fast)] group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                    />
                  </div>
                  <AccentUnderline />
                  <p className="max-w-sm body">{item.body}</p>
                </Link>
              ))}
            </div>

            <DotMatrix rows={3} cols={6} className="w-20 self-start" />
          </div>

          <div
            className="relative mx-auto aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-2xl xl:mx-0 xl:max-w-none"
          >
            <BrandRasterImage
              src={heroContent.illustrationSrc}
              alt={heroContent.illustrationAlt}
              fill
              priority
              loading="eager"
              sizes="(min-width: 1280px) 67vw, 100vw"
              className="object-contain object-center mix-blend-normal"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
