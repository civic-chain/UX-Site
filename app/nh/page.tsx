import type { Metadata } from "next";

import { PasswordGate } from "@/components/access/password-gate";
import { NhPortal } from "./nh-portal";

// Change this to rotate the passphrase for the NH portal.
const NH_PASSPHRASE = "CivicChain2026";

export const metadata: Metadata = {
  title: "Civic-Chain for New Hampshire, See where your tax dollars go",
  description:
    "A plain-English guide for Granite Staters: how Civic-Chain makes town and school-district spending a public, tamper-proof record you can verify yourself. Not cryptocurrency. Shared for public education, non-partisan in content.",
  robots: { index: false, follow: false },
};

export default function NhPage() {
  return (
    <PasswordGate passphrase={NH_PASSPHRASE} subtitle="This preview is private. Enter the access passphrase to continue.">
      <NhPortal />
    </PasswordGate>
  );
}
