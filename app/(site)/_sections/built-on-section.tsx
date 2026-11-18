import Link from "next/link";

import { legalFootnote, partners } from "@/app/(site)/partners/content";
import { PartnerLogo } from "@/app/(site)/partners/partner-logo";
import { cn } from "@/lib/utils";

// Understated supplier strip near the footer. Labeled "Built on" — NEVER "Our
// partners" — and deliberately kept away from any customer or municipality
// names so a supplier logo can never be mistaken for a customer logo. Links to
// /partners; carries the REPAY legal footnote required wherever the logo shows.
export function BuiltOnSection({ className }: { className?: string }) {
  return (
    <section
      id="built-on"
      className={cn("section-shell pb-16 lg:pb-24", className)}
    >
      <div className="mx-auto grid max-page gap-5 border-t border-gold-800/15 pt-8">
        <p className="captions text-slate-500">Built on</p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {partners.map((partner) => (
            <Link
              key={partner.id}
              href="/partners"
              aria-label={`${partner.name} — see how Civic-Chain works with our payment partners`}
              className="inline-flex items-center rounded transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <PartnerLogo
                name={partner.name}
                src={partner.logoSrc}
                width={partner.logoWidth}
                height={partner.logoHeight}
                boxClassName="max-h-7 max-w-[150px]"
              />
            </Link>
          ))}
        </div>
        <p className="max-w-[70ch] body-xs text-slate-500">{legalFootnote}</p>
      </div>
    </section>
  );
}
