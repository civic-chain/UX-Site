import type { IconName } from "@/components/ui/icon";
import type { SurfaceTone } from "@/lib/design-system-types";

// Single source of truth for the Press Kit page copy (/press).
//
// Claim discipline (see the press outline + /partners sign-off): this page names
// only Modern Treasury (payments) and REPAY (card payments) — both already
// public on /partners. It never names a specific chain or token, and avoids
// crypto/fundraising vocabulary. The record layer is always described as "a
// public blockchain". Keep the REPAY legal footnote verbatim.

export const AS_OF = "November 6, 2026";
export const PRESS_EMAIL = "info@civic-chain.com";

export const hero = {
  eyebrow: "Press & media",
  headlineLead: "Money moves fast.",
  headlineAccent: "Everyone watches.",
  subhead:
    "Civic-Chain helps towns pay vendors faster, control contract spending, and show residents where every dollar went, without a records request.",
} as const;

// §1.2 — boilerplate used verbatim in press releases and partner announcements.
export const boilerplate = {
  short:
    "Civic-Chain is municipal payments and transparency software. Towns pay vendors in US dollars through Modern Treasury, keep contract spending inside approved merchant categories, and publish a tamper-evident record of finalized spending that any resident can check. Civic-Chain is based in Maine and serves New England towns and school districts.",
  long:
    "Civic-Chain is municipal payments and transparency software built for towns, school districts and regional units. Town funds stay in US dollars in FDIC-insured accounts at sponsor banks, and payments move over ACH and real-time payment networks through Modern Treasury. Contract spending is held to the merchant categories a contract allows, and accounts-payable card payments are available through REPAY. Every settled payment and card purchase becomes a public record, sealed with a digital fingerprint so it cannot be quietly changed later. Civic-Chain was founded in 2026 in Maine by Michael Stansfield, Justin Harvey and Daniel Durante, and is starting with towns across New England.",
} as const;

// §1.3 — fact sheet. Carries an "As of" date; update when a partner or number
// changes.
export const factSheet: readonly { field: string; value: string }[] = [
  { field: "Company", value: "Civic-Chain" },
  { field: "What it is", value: "Municipal payments and transparency software" },
  { field: "Headquarters", value: "Maine, USA" },
  { field: "Founded", value: "2026" },
  {
    field: "Founders",
    value:
      "Michael Stansfield (CEO), Justin Harvey (CPO), Daniel Durante (CTO)",
  },
  {
    field: "Serves",
    value:
      "Towns, school districts and regional units (RSUs/SADs); starting in New England",
  },
  {
    field: "Payments",
    value:
      "US dollars over ACH, same-day ACH, RTP/FedNow and wire, through Modern Treasury",
  },
  {
    field: "Where town money sits",
    value:
      "FDIC-insured accounts at sponsor banks, never as tokens or crypto assets",
  },
  {
    field: "Card payments",
    value: "Accounts-payable card payments available through REPAY, contract by contract",
  },
  {
    field: "Spending controls",
    value: "Contract spending is limited to the approved merchant categories",
  },
  {
    field: "Transparency",
    value:
      "Each finalized record is sealed with a digital fingerprint published to a public blockchain. No money and no personal data go on-chain.",
  },
  { field: "Website", value: "civic-chain.com" },
  {
    field: "Press contact",
    value: `${PRESS_EMAIL} · replies within one business day`,
  },
];

// §1.4 — how it works.
export const howItWorks = {
  heading: "Dollars move through regulated partners. Only the proof goes public.",
  steps: [
    {
      icon: "payment",
      chipTone: "sky",
      title: "Pay vendors without the paper chase",
      body: "The town funds its account in US dollars. Vendors are paid by ACH, same-day ACH or real-time payment, so nobody waits on a mailed check.",
    },
    {
      icon: "card",
      chipTone: "gold",
      title: "Cards that can't buy the wrong thing",
      body: "Crews get cards tied to a contract. A card works at the fuel pump or parts counter the contract allows and declines everywhere else. Misuse is blocked up front, not found in an audit.",
    },
    {
      icon: "record",
      chipTone: "sage",
      title: "A public record anyone can check",
      body: "Every settled payment and card purchase becomes a public record of the vendor category, amount, budget code and date, sealed with a digital fingerprint. Change it later and the seal no longer matches.",
    },
  ],
  caption:
    "Solid arrows move money. Dashed arrows move records. Town money never leaves US dollars.",
} as const;

// §1.5 — "Is this crypto?" accordion. No chain names; neutral sponsor-bank
// wording (the per-town vs pooled question is unsettled, so this stays general).
export const cryptoFaqs: readonly {
  icon: IconName;
  chipTone: SurfaceTone;
  tone: SurfaceTone;
  question: string;
  answer: string;
}[] = [
  {
    icon: "check-circle",
    chipTone: "sky",
    tone: "sky",
    question: "Is this crypto?",
    answer:
      "No. Town money stays in US dollars in FDIC-insured bank accounts and moves over the same bank-transfer networks banks already use. The only thing published to a public blockchain is a digital fingerprint of each finished record. It works like a tamper seal: if anyone changes the record later, the fingerprint no longer matches. Never money, never personal data.",
  },
  {
    icon: "citizen",
    chipTone: "gold",
    tone: "cream",
    question: "Who can see the records?",
    answer:
      "Anyone. Residents, reporters and auditors can browse published spending without an account or a records request. Cardholder names and card numbers are never shown.",
  },
  {
    icon: "layers",
    chipTone: "sage",
    tone: "sage",
    question: "Does the town have to replace its accounting software?",
    answer:
      "No. Towns keep their existing system. Civic-Chain works from the exports and payments they already make.",
  },
];

// §1.6 — story angles for reporters and producers.
export const storyAngles: readonly { title: string; body: string }[] = [
  {
    title: "Check the plow contract without filing a records request",
    body: "What changes when residents can see finalized spending as it happens.",
  },
  {
    title: "Small contractors stop waiting for checks",
    body: "Many towns still pay vendors by mailed check, and small local businesses carry the wait.",
  },
  {
    title: "The spending card that says no",
    body: "Cards that decline outside approved categories, and why that beats auditing after the fact.",
  },
  {
    title: "A Maine startup rebuilding how New England towns handle money",
    body: "Local founders, local towns.",
  },
  {
    title: "School budgets down to the building",
    body: "District spending tied to budget codes and reported to the board in one export.",
  },
  {
    title: "“Is this crypto?” Why the answer is no",
    body: "Using a public blockchain as a tamper seal without putting public money on it.",
  },
];

// §1.7 — leadership. Bios, track record and press topics, reusing the approved
// live /about founder data verbatim (same resolved claims, no new numbers).
export const leadership: readonly {
  initials: string;
  name: string;
  title: string;
  linkedIn: string;
  bio: string;
  highlights: readonly string[];
  topics: string;
  tone: "cream" | "sky" | "sage";
  art: string;
  artWidth: number;
  artHeight: number;
}[] = [
  {
    initials: "MS",
    name: "Michael Stansfield",
    title: "Chief Executive Officer",
    linkedIn: "https://www.linkedin.com/in/michael-s-9144b096/",
    bio: "A lifelong operator in high-stakes environments, and a farmer when he's off the clock.",
    highlights: [
      "18+ years of leadership and large-program delivery",
      "Deputy Lead Enterprise Agile Coach, US Navy NMCI/NGEN, 65 teams and 700 staff",
      "US Army National Guard and Reserves, enlisted combat medic and commissioned officer",
      "Over a decade in blockchain and decentralized finance",
    ],
    topics: "Company story, town relationships, why New England first",
    tone: "sky",
    art: "/landing/michael-bridge-infrastructure.webp",
    artWidth: 1553,
    artHeight: 591,
  },
  {
    initials: "JH",
    name: "Justin Harvey",
    title: "Chief Product Officer",
    linkedIn: "https://www.linkedin.com/in/justin-harvey-cspo/",
    bio: "Builder since childhood, and a father. More consumer electronics on the bench than a defunct Best Buy.",
    highlights: [
      "6+ years building government payment products at a leading GovTech provider",
      "4x patent creator, blockchain finance and GovTech inventions",
      "Ran $500M/year SaaS payment processing across 20+ agencies, millions of users",
      "Founder, 45th Parallel Risk Management; GLG Council Member",
    ],
    topics: "Product, resident experience, transparency portal demos",
    tone: "cream",
    art: "/landing/justin-civic-building.webp",
    artWidth: 1345,
    artHeight: 851,
  },
  {
    initials: "DD",
    name: "Daniel Durante",
    title: "Chief Technology Officer",
    linkedIn: "https://www.linkedin.com/in/daniel-durante/",
    bio: "Welder, motorcyclist, and carpenter when he isn't shipping code.",
    highlights: [
      "13+ years full-stack engineering for Fortune 100 companies",
      "CTO, Genesis Volatility, real-time infrastructure across 900+ markets at 99.9% uptime",
      "Code shipped in Stripe, Walmart, and Hubcash",
      "Published technical author; Node / Go / Rust, blockchain and DeFi systems",
    ],
    topics: "Security, data handling, the public record, “Is this crypto?”",
    tone: "sage",
    art: "/landing/daniel-courthouse-rotunda.webp",
    artWidth: 1103,
    artHeight: 679,
  },
];

// §2.9 — brand assets available for download. Files served from public/.
export const brandAssets: readonly {
  title: string;
  format: string;
  href: string;
  note: string;
}[] = [
  {
    title: "Primary logo, horizontal",
    format: "SVG",
    href: "/brand/civic-logo-w-text-horizontal.svg",
    note: "Wordmark lockup for light backgrounds",
  },
  {
    title: "Logo mark",
    format: "SVG",
    href: "/brand/civic-chain-logo.svg",
    note: "The mark on its own, for avatars and favicons",
  },
  {
    title: "Hero logo",
    format: "SVG",
    href: "/brand/civic-logo-hero.svg",
    note: "Oversized lockup for covers and title cards",
  },
  {
    title: "Social preview",
    format: "WebP",
    href: "/brand/civic-chain-social-preview.webp",
    note: "Open Graph / share card image",
  },
];

export const KIT_HREF = "/press/civic-chain-press-kit.zip";

// Usage rules shown in the brand-assets section (mirror of the kit README).
export const usageRules: readonly string[] = [
  "Don't alter, recolor, stretch or add effects to the logo. Leave clear space around it at least the height of the mark's center link.",
  "Use the reversed (cream) logo on dark or photo backgrounds.",
  "Write the name “Civic-Chain” with the hyphen.",
  "Partner names and logos may be used only as shown on this page.",
];

// §1.10 footer note + the verbatim REPAY legal footnote (required wherever
// REPAY is named). Do not edit the footnote.
export const footerNote =
  "Civic-Chain is a software company. It does not hold municipal funds. Payments are processed by Modern Treasury, and accounts-payable card payments are processed by REPAY.";

export const repayFootnote =
  "Civic-Chain partners with REPAY for payment processing. Not all payments on Civic-Chain are processed by REPAY. All trademarks belong to their respective owners.";
