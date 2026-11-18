import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { BrandIcon } from "@/components/ui/brand-icon";
import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";

import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact | Civic-Chain",
  description:
    "Tell us about your town and the right person will follow up directly. No account, no queue.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="pb-16 lg:pb-24">
      <section id="contact" className="section-shell pt-8 lg:pt-12">
        <div className="mx-auto grid max-w-2xl gap-8">
          <div className="grid justify-items-center gap-4 text-center">
            <Badge tone="gold" className="gap-2">
              <span aria-hidden="true" className="text-[color:var(--tone-gold)]">*</span>
              Contact
            </Badge>
            <h1 className="type-display">Contact Civic-Chain.</h1>
            <p className="max-w-md type-body-lg text-[color:var(--muted-foreground)]">
              Tell us about your town and the right person will follow up directly.
              No account, no queue.
            </p>
          </div>

          <SurfaceCard tone="cream" className="relative flex flex-col overflow-hidden border-2 border-b-[6px] border-[color:var(--edge-gold-tile)] border-b-[color:var(--tone-gold)]">
            <div className="relative z-10 flex flex-col items-center gap-6 px-7 py-9 sm:px-11 sm:py-11">
              <ContactForm />
              <p className="inline-flex items-center justify-center gap-2 type-body-sm text-current/58">
                <BrandIcon name="trust" size={16} strokeWidth={1.1} />
                <span>Direct, private, and reviewable.</span>
              </p>
            </div>
            <div aria-hidden="true" className="relative mt-2 h-28 w-full">
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[color:color-mix(in_oklab,var(--tone-sage),var(--tone-cream)_35%)] to-transparent opacity-70" />
              <BrandRasterImage
                src="/landing/other-pages/contact/town-courthouse-landscape.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
                width={1725}
                height={615}
                className="pointer-events-none absolute bottom-0 left-0 w-full origin-bottom opacity-90 sm:opacity-80"
              />
            </div>
          </SurfaceCard>

          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/">Back to landing</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
