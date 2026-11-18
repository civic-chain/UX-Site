---
description: "The CivicChain technology stack at a glance — what each layer is, which module it powers, where it appears in the rest of the business knowledge base, and its claim status. The hub for the technology section."
depends-on:
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/evidence/technology-baseline]]"
---

# 19 — Technology overview

## Claim Boundary

- Claim status: mixed — see inline labels
- Source note: [[_docs/facts/whitepaper]] §1 Platform Overview (50-73), §9 Technical Architecture (702-758); [[_docs/facts/evidence/technology-baseline]] (XRPL, RLUSD, MCC baselines); [[_docs/facts/product]] (Technology; What v1.0 actually ships)

This section is the **mechanism layer** of the business knowledge base: how
CivicChain is actually built, and how each technology connects to the product,
the modules, the patents, and the user journeys. The narrative chapters
(`1-foundation` … `5-journeys`) draw on this layer but should not lead with it —
the product story comes first, technology is the proof underneath it.

Like the rest of `_docs/business/`, these documents are a **derived reference**,
not a source of truth. Hard, defensible numbers (XRPL close time, RLUSD market
cap, MCC feasibility) live in `[[technology-baseline|technology-baseline.md]]`
under the evidence layer; the v1.0 claim boundary lives in `product.md`. The raw
white paper (v9) supplies the mechanism detail but is **ambition, not the public
claim boundary** — where it claims more than `product.md` confirms, the label
says **Target** or **Needs proof**.

## The stack at a glance

CivicChain is a normal web/mobile application (React / Next.js front ends, a
Node API, PostgreSQL, Redis) wrapped around four distinctive technology layers.
Three of them are public infrastructure CivicChain integrates rather than owns;
the differentiation is in how they are combined and bound to a procurement
contract.

| Layer | What it is | What CivicChain adds |
|-------|------------|----------------------|
| **Public ledger + records** | The XRP Ledger (XRPL) as a public, tamper-evident record; Smart Agreement Records (SARs) anchored to it. | The cross-ledger audit chain — one hash links the card event, the issuer settlement, the public ledger, and the platform database. |
| **Money movement** | RLUSD (a dollar-pegged stablecoin) settled over Ripple Payments / Rail. | The affiliate-model architecture: each town holds its own funds; CivicChain never commingles treasury money. |
| **Controlled spend** | MCC-locked virtual cards on standard issuer-processors (Lithic / Stripe / Marqeta), provisioned to Apple/Google Pay. | The lock is derived from the procurement *contract type*, not a manual expense policy — and declines are audit evidence too. |
| **Civic-input verification** | Device GPS, IP geolocation, and enrolled address combined into a per-ballot confidence score. | A confidence-tier model (not pass/fail) with a privacy architecture that discards raw coordinates. |

## How each technology connects to the rest of the project

This is the map from technology → the module it powers → where it already
appears in this knowledge base → its current claim status.

| Technology | White-paper module | Also discussed in | Claim status |
|------------|--------------------|-------------------|--------------|
| XRP Ledger + SARs + audit chain | Module 3 (Contract Management) | [[20-xrp-ledger-and-records]] · [[03-the-product]] · [[11-ip-and-moat]] · [[14-how-it-works]] | Public ledger + SARs **Actual** (in demo); audit-chain patent scope **Target / Needs proof** |
| RLUSD + Ripple Payments / Rail | Module 5 (Payment Rail) | [[21-rlusd-and-payment-rail]] · [[03-the-product]] · [[09-go-to-market]] | **Target / Needs proof** — v1.0 ships USD bridge mode; Ripple-scale numbers need a dated check |
| MCC-locked virtual cards | Module 4 (Phone Tap Payments) | [[22-cards-and-mcc-lock]] · [[03-the-product]] · [[11-ip-and-moat]] · [[14-how-it-works]] | v1.0 scope **unresolved** (cards core in demo, deferred to Release 2 in white paper); MCC control itself **standard, not novel** |
| Geolocation confidence scoring | Module 2 (Citizen Voting) | [[23-geolocation-verification]] · [[03-the-product]] · [[11-ip-and-moat]] | **Target** — Tier 2, jurisdiction-aware; not in v1.0 |
| Proposal intake (email + CRN routing) | Module 1 (Proposal Engine) | [[03-the-product]] · [[14-how-it-works]] | Near-term **Target** (Release 1 scope), not itemized in product.md confirmed core |

The two technologies that are **Actual** today are the public ledger and SARs;
everything else is roadmap intent at varying distance. v1.0 ships in **USD
bridge mode** with a public ledger; RLUSD, phone-tap cards, and geolocation
voting arrive in later releases.

## Patent posture (one line, see IP doc)

The payment architecture and the geolocation model are covered by **provisional
applications filed April 4, 2026** — never "issued patents" or "patented
technology." Full framing and safe-claim language: [[11-ip-and-moat]].

## Sources

- [[_docs/facts/whitepaper]] — §1 Platform Overview / Five Integrated Modules
  (50-73); §9 Technical Architecture / System Components (702-758). Raw v9
  ambition, mechanism source only.
- [[_docs/facts/evidence/technology-baseline]] — defensible XRPL / RLUSD / MCC
  numbers and feasibility verdicts (2026-06-03).
- [[_docs/facts/product]] — "Technology (brief)" and "What v1.0 actually ships."
  Authoritative claim boundary.

## Related

- [[20-xrp-ledger-and-records|20 — XRP Ledger and records]]
- [[21-rlusd-and-payment-rail|21 — RLUSD and the payment rail]]
- [[22-cards-and-mcc-lock|22 — Cards and the MCC lock]]
- [[23-geolocation-verification|23 — Geolocation verification]]
- [[03-the-product|03 — The product]]
- [[14-how-it-works|14 — How it works (end to end)]]
- [[_docs/business/index|Index — business knowledge base]]
