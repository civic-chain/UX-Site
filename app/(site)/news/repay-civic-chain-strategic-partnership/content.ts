import { legalFootnote } from "@/app/(site)/partners/content";

// Live partnership announcement. Copy is partner-approved; keep the legal
// footnote (imported below) and the NASDAQ ticker rendering intact, and do not
// change the slug — the post URL must stay permanent.

export const meta = {
  slug: "repay-civic-chain-strategic-partnership",
  category: "Press release",
  // Visible publication date. Update to the approved release date.
  date: "September 22, 2026",
  // Both company names appear in the h1 and the <title>.
  title:
    "Civic-Chain and REPAY Announce Strategic Partnership to Modernize Municipal Vendor Payments",
  lede: "Civic-Chain and REPAY (NASDAQ: RPAY) are partnering to give municipalities more control over how they pay vendors, pairing Civic-Chain's contract-native settlement with REPAY's accounts payable automation and card payments.",
  // Dateline origin city.
  dateline: "Portland, Maine",
};

export const body: string[] = [
  "Civic-Chain, a municipal procurement and payments platform, today announced a strategic partnership with REPAY (NASDAQ: RPAY), a payments technology company serving government and municipal clients among numerous other industries. The partnership gives towns and cities that use Civic-Chain an additional, controlled way to pay their vendors electronically.",
  "REPAY's accounts payable automation converts eligible vendor payments away from manual check processing and onto controlled electronic methods, which reduces handling time, strengthens payment controls against fraud, and turns qualifying payments into a source of rebate revenue for the paying organization.",
  "On Civic-Chain, REPAY is available to municipalities that want to keep a conventional AP workflow, or that already run one. Approved payments can be routed to REPAY for electronic disbursement, with vendors enrolled in REPAY's network receiving card-based payment and rebate revenue flowing back to the municipality. This runs alongside Civic-Chain's standard settlement path rather than replacing it. A town can use one, the other, or both, on a contract-by-contract basis.",
];

export const aboutCivicChain =
  "Civic-Chain is a municipal procurement and payments platform designed for faster payments, transparent records, and clearer public spending. Municipal funds are held in dollars at FDIC-insured banking partners, never as tokens or crypto assets, and every movement is written to a permanent audit record.";

// Approved REPAY description, used verbatim as the "About REPAY" boilerplate.
export const aboutRepay =
  "REPAY (NASDAQ: RPAY), founded in 2006, is a payments technology company serving government and municipal clients among numerous other industries. Its accounts payable automation converts eligible vendor payments away from manual check processing and onto controlled electronic methods, which reduces handling time, strengthens payment controls against fraud, and turns qualifying payments into a source of rebate revenue for the paying organization.";

export const contact = {
  label: "Contact",
  name: "Civic-Chain",
  email: "info@civic-chain.com",
};

export const footnote = legalFootnote;

