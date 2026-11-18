import type { Metadata } from "next";

import { AudiencePage } from "@/app/(site)/_audience/audience-page";

import { vendorsContent } from "./content";

// Linked from the hero's "For vendors" block.
export const metadata: Metadata = {
  title: "For vendors | Civic-Chain",
  description:
    "Card-funded work can begin the same day the contract is awarded. See where your contract and payment stand, and get paid without the chase.",
  alternates: { canonical: "/vendors" },
};

export default function VendorsPage() {
  return <AudiencePage content={vendorsContent} />;
}
