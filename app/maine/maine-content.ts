// Civic-Chain for Maine, public voter-education portal content.
//
// Civic-Chain branded explainer for the Maine general public, plain language,
// credibility-first, honest about limits. Maine-localized: Freedom of Access
// (FOAA) instead of NH Right-to-Know, Maine towns, select-board warrant cycle.
// Every ROI figure is presented as an ILLUSTRATIVE modeled estimate, never as
// fact, per the business-doc claim discipline
// (_docs/business/3-model/07-business-model-and-pricing.md).

import type { IconName } from "@/components/ui/icon";

// ── How it works, three plain steps ──
export const STEPS: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "record",
    title: "1 · Record",
    body: "Every contract, bid, and payment is entered once, in one place, plowing, busing, construction, the lot.",
  },
  {
    icon: "trust",
    title: "2 · Anchor",
    body: "Each record gets a tamper-evident digital seal, so it can't be quietly changed after the fact.",
  },
  {
    icon: "search",
    title: "3 · Verify",
    body: "Anyone, you, an auditor, a reporter, can check a record against its seal and confirm it's genuine.",
  },
];

// ── Start local: where Maine property taxes actually go ──
export const SPEND_CATEGORIES: Array<{ icon: IconName; heading: string; items: string }> = [
  {
    icon: "citizen",
    heading: "Your school district contracts for",
    items: "student transportation · food service · special-education services · buildings & grounds · construction & renovation · utilities",
  },
  {
    icon: "building",
    heading: "Your town contracts for",
    items: "snow & ice / road maintenance · solid waste · fire & EMS · engineering · facilities · IT & software",
  },
];

// ── Myths vs. Facts (leads with the #1 objection) ──
export const MYTHS: Array<{ myth: string; fact: string }> = [
  {
    myth: "A hacker could rewrite the records.",
    fact: "The record is tamper-evident, any change shows. Encryption is bank- and federal-grade.",
  },
  {
    myth: "It adds bureaucracy and costs jobs.",
    fact: "It automates the paperwork. It removes busywork, not people.",
  },
];

// ── FAQ / Pushback, grouped, plain-language, complexity abstracted ──
export type Faq = { q: string; a: string };
export type FaqGroup = { title: string; icon: IconName; items: Faq[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "“Isn't this just crypto?”",
    icon: "globe",
    items: [
      {
        q: "Is this Bitcoin or cryptocurrency?",
        a: "No. Civic-Chain doesn't buy, sell, or speculate on any coin, there's nothing to trade and no volatile price. It uses the same kind of secure digital record-keeping behind the scenes, the way a debit card uses a payment network you never see. Every dollar stays in U.S. dollars.",
      },
      {
        q: "What about FTX, meme coins, exchange hacks, Ponzi schemes?",
        a: "Those were trading exchanges and speculative tokens, people gambling on prices. Civic-Chain moves no speculative assets and holds no one's investments. It's a record-keeping and payment-tracking layer for money that's already the town's, sitting in regulated U.S.-dollar accounts. A completely different thing.",
      },
      {
        q: "“Blockchain” sounds complicated and scary.",
        a: "You don't need to understand it any more than you need to understand a credit-card network to tap your card. Here, “blockchain” just means a shared record that can't be quietly edited later. That's the whole point: a receipt nobody can secretly change.",
      },
      {
        q: "Does it follow the new federal rules?",
        a: "The Maine pilot runs in plain U.S. dollars through regulated banks, so there's nothing speculative involved. And it's designed to meet the federal GENIUS Act, the 2025 law that sets rules for dollar-backed digital payments, if and when a town ever chooses a digital-dollar settlement option.",
      },
    ],
  },
  {
    title: "Security & the money",
    icon: "trust",
    items: [
      {
        q: "Can it get hacked?",
        a: "It's built to the same security standards banks and federal agencies use, bank-grade encryption and SOC 2, NIST, and FIPS-validated cryptography. And because the public record is tamper-evident, even an intruder couldn't quietly rewrite history without it showing.",
      },
      {
        q: "Is my personal information on a public ledger?",
        a: "No. The public record shows contracts and payments, who got paid, how much, and for what, not residents' personal data. Sensitive information is kept off the public record entirely.",
      },
    ],
  },
  {
    title: "For the people who'd run it",
    icon: "admin",
    items: [
      {
        q: "Won't this be extra work, another system to babysit?",
        a: "It's designed to replace paperwork, not add it. The workflow is streamlined and repeatable, the same steps every time, and it builds audit and FOAA (Freedom of Access) packages automatically instead of staff compiling them by hand. It removes busywork, not people, and no jobs are eliminated.",
      },
      {
        q: "Won't people second-guess every purchase, “why X and not Y?”",
        a: "Actually the opposite. Today, when a decision is questioned, staff have to dig up the justification months later. With Civic-Chain the bids, reasoning, and approvals are recorded at the moment, so a documented, defensible trail protects the employee instead of exposing them. It's a shield, not a spotlight.",
      },
    ],
  },
  {
    title: "“Will it actually change anything?”",
    icon: "compass",
    items: [
      {
        q: "Government would never want this.",
        a: "Local governments already do. Town managers and finance offices are the ones drowning in manual reconciliation and public-records requests, this makes their books defensible and their week shorter. It's built for them, not against them.",
      },
      {
        q: "Isn't this just another layer of government?",
        a: "It's the opposite, it collapses layers. One record replaces scattered spreadsheets, PDFs, and filing-cabinet audits. The proof is in using it: once you watch a dollar traced from the town account to the vendor, the “extra layer” worry falls away.",
      },
      {
        q: "Nothing ever changes with government. Why would this?",
        a: "Fair skepticism. The difference is you don't have to take anyone's word for it. This is a level of transparency you've never had: you can open the public record yourself and check where the money went. If it doesn't deliver, that's visible immediately, which is exactly the point.",
      },
      {
        q: "How do I know you're not a plant, or this isn't just a sales pitch?",
        a: "You don't have to trust us, that's the design. The whole idea is “don't trust, verify.” The records are open and independently checkable; the math and the money are out in the open. It's built precisely because it doesn't ask for blind faith, the proof is on the public record for anyone to check.",
      },
    ],
  },
];

// ── Plain-language glossary ──
export const GLOSSARY: Array<{ term: string; def: string }> = [
  { term: "Ledger", def: "A running record of transactions. Here, a public one anyone can read." },
  { term: "Anchor / hash", def: "A unique digital fingerprint of a record. Change the record even slightly and the fingerprint stops matching, so tampering is obvious." },
  { term: "Freedom of Access (FOAA)", def: "Maine's public-records law (1 M.R.S. §401). Civic-Chain produces records already formatted to answer these requests, instead of staff compiling them by hand." },
  { term: "Tamper-evident", def: "You can't secretly alter it without leaving proof behind." },
  { term: "Permissioned", def: "Only authorized bodies (the town, its auditors) can write records; the public can read and verify them." },
];

// ── Honest limits, the strongest trust-builder ──
export const LIMITS: string[] = [
  "It can't force a town to spend wisely, it makes spending visible, so voters and auditors can judge it.",
  "It can't prove a vendor did good work, only that they were paid, when, and for what.",
  "It isn't anonymous magic money, it's the opposite: traceable, regulated U.S. dollars.",
  "It won't replace your elected officials or town meeting, it gives them, and you, better information to work with.",
];

// ── ROI calculator model ──
// Each lever is a recoverable saving expressed as a % of the contracted-services
// budget. Defaults are anchored to a modeled Maine town case: on a $385K
// services budget the levers sum to ~8.9% gross. These are ILLUSTRATIVE modeled
// ranges, not observed results.
export type Lever = { id: string; label: string; help: string; defaultPct: number; min: number; max: number };

export const LEVERS: Lever[] = [
  { id: "delay", label: "Vendor delay premium recovered", help: "Vendors pad bids 3–8% to cover slow, uncertain town payment. Fast, guaranteed payment removes most of it, the single biggest lever.", defaultPct: 3.0, min: 1, max: 6 },
  { id: "admin", label: "Staff & admin time saved", help: "Less manual accounts-payable, reconciliation, and audit prep. Modeled 40–55% reduction on those tasks.", defaultPct: 4.2, min: 1, max: 6 },
  { id: "fees", label: "Payment-processing fees", help: "Legacy government payment portals run ~2.25–2.75%; Civic-Chain models ~0.35% on processed volume.", defaultPct: 1.1, min: 0.3, max: 2.5 },
  { id: "audit", label: "Audit & FOAA compliance", help: "Records requests and audit packages are generated automatically instead of compiled by hand.", defaultPct: 0.6, min: 0.2, max: 1.5 },
];

export const PLATFORM_TIERS: Array<{ id: string; label: string; fee: number; note: string }> = [
  { id: "pilot", label: "Transparency Pilot", fee: 5000, note: "Read-only transparency dashboard · any size town" },
  { id: "community", label: "Community", fee: 8400, note: "Adds proposals, board voting & contracts · under 2,500 residents" },
  { id: "professional", label: "Professional", fee: 25000, note: "Adds payments & vendor cards · 2,500–25,000 residents" },
];

export const ROI_PRESETS: Array<{ id: string; label: string; budget: number; tier: string }> = [
  { id: "example-town", label: "Fictional Maine town (~4,200)", budget: 385000, tier: "community" },
  { id: "smalltown", label: "Small town", budget: 750000, tier: "community" },
  { id: "school", label: "School district", budget: 2000000, tier: "professional" },
];
