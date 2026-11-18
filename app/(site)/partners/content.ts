// Single source of truth for the Partners page copy.
//
// The partner descriptions below are subject to WRITTEN partner sign-off
// (see the developer handoff, Section 8). Do not paraphrase, trim, or
// "tighten" them — any edit invalidates the approval. Keep this file the only
// place the copy lives so /partners, the newsroom post, and the homepage
// "Built on" strip stay character-for-character identical.

export type Partner = {
  id: string;
  /** Real text, never an image. Used as the accessible name and the h3. */
  name: string;
  /** Partner-supplied logo. `null` falls back to a text wordmark. */
  logoSrc: string | null;
  /** Intrinsic pixel size of the logo file (for next/image aspect ratio). */
  logoWidth: number;
  logoHeight: number;
  /** Small-caps / muted label directly under the name. Kept sentence case. */
  roleLabel: string;
  /** Link to the partner's own website, shown inside the card. */
  href: string;
  /** Paragraph 1: what the partner does. Paragraph 2: how it works here. */
  paragraphs: [string, string];
};

export const intro =
  "Civic-Chain is built on regulated financial infrastructure and integrates with established payment providers. We name our partners because municipalities deserve to know exactly who handles public money and where it sits at every step.";

export const partners: Partner[] = [
  {
    id: "modern-treasury",
    name: "Modern Treasury",
    logoSrc: "/partners/modern-treasury.webp",
    logoWidth: 642,
    logoHeight: 379,
    roleLabel: "Payment operations and settlement infrastructure",
    href: "https://www.moderntreasury.com",
    paragraphs: [
      "Modern Treasury is a payment operations platform that provides direct access to bank rails, ACH, same-day ACH, wire, RTP and FedNow, alongside a real-time financial ledger and an integrated compliance stack covering business verification, identity verification and ongoing transaction monitoring.",
      "Modern Treasury is how money actually moves on Civic-Chain. Municipal funds are held in accounts at FDIC-insured banking partners, never as tokens or crypto assets. When a contract is funded, Civic-Chain opens a dedicated sub-account against it; when work is approved, payment leaves for the vendor's registered bank account in dollars. Every movement produces a ledger entry that Civic-Chain writes to its permanent audit record. Towns fund in dollars. Vendors receive dollars.",
    ],
  },
  {
    id: "repay",
    name: "REPAY",
    logoSrc: "/partners/repay.webp",
    logoWidth: 813,
    logoHeight: 102,
    roleLabel: "Accounts payable automation and card payments",
    href: "https://www.repay.com",
    paragraphs: [
      "REPAY (NASDAQ: RPAY), founded in 2006, is a payments technology company serving government and municipal clients among numerous other industries. Its accounts payable automation converts eligible vendor payments away from manual check processing and onto controlled electronic methods, which reduces handling time, strengthens payment controls against fraud, and turns qualifying payments into a source of rebate revenue for the paying organization.",
      "REPAY is available to municipalities that want to keep a conventional AP workflow, or that already run one. Approved payments can be routed to REPAY for electronic disbursement, with vendors enrolled in REPAY's network receiving card-based payment and rebate revenue flowing back to the municipality. This runs alongside Civic-Chain's standard settlement path rather than replacing it. A town can use one, the other, or both, on a contract-by-contract basis.",
    ],
  },
];

// Condition of partner approval, not decoration. Must render on every surface
// that shows the REPAY logo: /partners, the homepage strip, and the newsroom
// post. Keep it verbatim.
export const legalFootnote =
  "Civic-Chain partners with REPAY for payment processing. Not all payments on Civic-Chain are processed by REPAY. All trademarks belong to their respective owners.";

export const partnerWithUs = {
  title: "Interested in partnering with Civic-Chain?",
  body: "We work with payment providers, government technology vendors and municipal associations. Tell us what you have in mind.",
  email: "info@civic-chain.com",
} as const;
