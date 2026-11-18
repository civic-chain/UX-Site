import type { Metadata } from "next";
import type { ReactNode } from "react";

import { BrandSectionNav } from "./_components/brand-section-nav";

// Internal design-system docs (team + handoff), not public marketing.
// Keep the whole /brand/* tree out of search.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type BrandLayoutProps = {
  children: ReactNode;
};

export default function BrandLayout({ children }: BrandLayoutProps) {
  return (
    <>
      <div className="section-shell pt-6 lg:pt-10">
        <div className="mx-auto max-page">
          <div className="flex justify-center lg:justify-start">
            <BrandSectionNav />
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
