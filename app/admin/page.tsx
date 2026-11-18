import type { Metadata } from "next";

import { AdminConsolePage } from "@/components/interface/admin-console";

export const metadata: Metadata = {
  title: "Civic-Chain: Municipality Admin Console",
  description: "Frozen demo snapshot of the Civic-Chain municipality admin console.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminConsolePage />;
}
