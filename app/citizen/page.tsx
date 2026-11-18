import type { Metadata } from "next";

import { CitizenLedgerPage } from "@/components/interface/citizen-ledger";

export const metadata: Metadata = {
  title: "Civic-Chain: Public Ledger | Town of Any Town",
  description: "Frozen demo snapshot of the Civic-Chain public ledger.",
  robots: { index: false, follow: false },
};

export default function CitizenPage() {
  return <CitizenLedgerPage />;
}
