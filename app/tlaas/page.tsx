import type { Metadata } from "next";

import { TLaaSDemoPage } from "@/components/interface/tlaas-demo";

export const metadata: Metadata = {
  title: "Civic-Chain: TLaaS Demo",
  description: "Transparency Layer as a Service — REPAY partnership demo for healthcare, municipalities, and enterprise.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TLaaSDemoPage />;
}
