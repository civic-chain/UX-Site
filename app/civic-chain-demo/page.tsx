import type { Metadata } from "next";

import { DemoConsole } from "./demo-console-v2";
// Route-scoped: landscape print orientation belongs to this console, not to the
// marketing pages. Next.js only loads this for the /civic-chain-demo segment.
import "./print.css";

export const metadata: Metadata = {
  title: "Civic-Chain: Any Town, USA (Demo Snapshot)",
  description:
    "Static Civic-Chain demo snapshot for Any Town, USA.",
};

export default function CivicChainDemoPage() {
  return <DemoConsole />;
}
