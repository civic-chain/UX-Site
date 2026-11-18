import type { Metadata } from "next";

import { VendorPortalPage } from "@/components/interface/vendor-portal";

export const metadata: Metadata = {
  title: "Civic-Chain: Vendor Portal",
  description: "Frozen demo snapshot of the Civic-Chain vendor portal.",
  robots: { index: false, follow: false },
};

export default function VendorPage() {
  return <VendorPortalPage />;
}
