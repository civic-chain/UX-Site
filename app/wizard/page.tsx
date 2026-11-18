import type { Metadata } from "next";

import { WizardPage } from "@/components/interface/wizard-page";

export const metadata: Metadata = {
  title: "Civic-Chain: Municipality Onboarding Wizard",
  description: "Step-by-step onboarding guide for municipalities going live on Civic-Chain.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <WizardPage />;
}
