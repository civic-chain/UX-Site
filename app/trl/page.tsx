import type { Metadata } from "next";

import { PasswordGate } from "@/components/access/password-gate";
import { TrlConsole } from "./trl-console";

// Change this to rotate the passphrase for the TRL demo.
const TRL_PASSPHRASE = "CivicChain2026";

export const metadata: Metadata = {
  title: "Target Responsibility Ledger — Binlan District (Demo)",
  description:
    "Tamper-evident, citizen-verifiable Target Responsibility System for the theoretical Binlan District. Consortium-anchored commitments, achievement, and geo-verified resident satisfaction — no payments, no value transfer.",
  robots: { index: false, follow: false },
};

export default function TrlPage() {
  return (
    <PasswordGate passphrase={TRL_PASSPHRASE} subtitle="This demo is private. Enter the access passphrase to continue.">
      <TrlConsole />
    </PasswordGate>
  );
}
