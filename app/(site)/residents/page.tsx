import type { Metadata } from "next";

import { AudiencePage } from "@/app/(site)/_audience/audience-page";

import { residentsContent } from "./content";

// Linked from the hero's "For residents" block.
export const metadata: Metadata = {
  title: "For residents | Civic-Chain",
  description:
    "See where your town's money goes: contracts and payments on a public record anyone can open, with no request and no login.",
  alternates: { canonical: "/residents" },
};

export default function ResidentsPage() {
  return <AudiencePage content={residentsContent} />;
}
