import type { Metadata } from "next";

import { PasswordGate } from "@/components/access/password-gate";
import { MainePortal } from "./maine-portal";

// Change this to rotate the passphrase for the Maine portal.
const MAINE_PASSPHRASE = "CivicChain2026";

export const metadata: Metadata = {
  title: "Civic-Chain for Maine, See where your tax dollars go",
  description:
    "A plain-English guide for Mainers: how Civic-Chain makes town and school-district spending a public, tamper-proof record you can verify yourself. Not cryptocurrency. Shared for public education, non-partisan in content.",
  robots: { index: false, follow: false },
};

export default function MainePage() {
  return (
    <PasswordGate passphrase={MAINE_PASSPHRASE} subtitle="This preview is private. Enter the access passphrase to continue.">
      <MainePortal />
    </PasswordGate>
  );
}
