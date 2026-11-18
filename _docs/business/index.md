---
description: "Business knowledge base for CivicChain — answers to the core business questions, reconciled to the current claim boundary."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/CivicChain_Product_Guide_2026]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/evidence/patent-filings]]"
  - "[[_docs/facts/evidence/maine-municipal-constraints]]"
  - "[[_docs/facts/evidence/funds-flow-and-licensing]]"
  - "[[_docs/facts/evidence/records-and-civic-law]]"
  - "[[_docs/facts/evidence/market-sizing]]"
  - "[[_docs/facts/evidence/technology-baseline]]"
  - "[[_docs/facts/evidence/payment-cost-savings]]"
---

# CivicChain Business Knowledge Base

Answers to the core questions about the CivicChain business, one document per
question. This folder is a **derived reference**, synthesized from two sources
with different authority:

- [[_docs/facts/product]] — the **current claim boundary**. Authoritative.
- [[_docs/facts/CivicChain_Product_Guide_2026]] — source-only 2026 sales /
  pricing guide; unreconciled, never an override.
- [[_docs/facts/whitepaper]] — raw White Paper v9 ambition, explicitly **"not
  the current public claim boundary."** Source material, never an override.

Where the white paper or product guide claims more than `product.md` confirms,
these documents mark it as **Target**, **Modeled**, or **Needs proof**, not as
fact. This folder is internal business reference; raw source files stay the
evidence layer.

## How to read these documents

Every strong quantitative or competitive claim carries one of four labels
(inherited from `product.md`):

- **Actual / observed** — visible in the current demo, product materials, or evidence memos.
- **Modeled** — a scenario, ROI model, forecast, or illustrative economics.
- **Target** — roadmap intent or a planned milestone.
- **Needs proof** — needs an external source, dated market check, legal confirmation, or founder confirmation before external use.

## Standing boundaries

- **Patents:** provisional applications filed April 4, 2026. Never "issued patents" or "patented technology."
- **Ripple / RLUSD / market-cap / rail-volume / license-count / TAM / CAC / ARR / ROI** numbers: **Needs proof** (dated source check) before external use.
- **v1.0 card scope is unresolved:** the demo and product story treat MCC-locked cards as core; the white paper's Release 1 says no virtual cards until Release 2. Not confirmed v1.0 scope.
- **Geolocation voting:** Tier 2, jurisdiction-aware civic-input layer — not a universal default, not a binding vendor-selection mechanism without legal review.
- **RLUSD:** optional Tier 2 / later-layer settlement; v1.0 ships in USD bridge mode.
- **Harpswell:** demo scenario, not a confirmed live customer.
- **Resident payment fees:** real background pain, but not the core CivicChain comparison. The apples-to-apples unit is a municipal vendor contract, not a resident paying property tax, DMV, or utility fees.
- **Western Union / bank-fee framing:** do not use as the baseline. ACH and wire rails can be cheap; the defensible savings claim is workflow-level: faster board-gated vendor payment, controlled spend, less reconciliation/audit/FOAA burden, and lower modeled vendor risk premium.
- **Hidden fee-stack framing:** founder-reported payment pain includes
  processing, banking-service, card/contactless, compliance, and office-labor
  costs. Decompose these layers before using them; CivicChain compresses some
  workflow costs, but Rail/BaaS/card-provider fees remain and need term sheets.
- **All-in payment-cost benchmark:** judge CivicChain by the cost per
  reconciled, audit-ready, legally valid municipal transaction. Posted
  convenience fees and raw rail fees are only inputs; they do not prove savings
  by themselves.
- **Customer savings vs CivicChain revenue:** town/vendor/resident savings live
  in [[customer-savings-mechanism]] and
  [[_docs/facts/evidence/payment-cost-savings]]; CivicChain revenue lines live
  in [[07-business-model-and-pricing]]. Do not count company fees as customer
  savings.
- **Transparency-first pilot wedge:** public warrants, AP exports, or manual warrant CSV uploads can prove the ledger/dashboard value before CivicChain moves money. This is **Target / Needs proof** GTM sequencing, not a replacement for the core vendor-payment product.
- **2026 Product Guide:** source-only. Its tiers, ROI, rate comparison, legal /
  compliance and contact claims must be routed through product, pricing, legal,
  and roadmap owners before external use.
- **External blockers:** unresolved founder, counsel, and eng/product decisions
  live in [[open-external-blockers]]. Do not turn raw audit gaps into public
  claims.

## Open source conflicts

Resolve before external publication.

- **Team figures differ across sources:** Justin's Tyler processing figure ($50M here vs $500M in marketing source), company name (45th Parallel Risk Management vs 4Ts Parallel Risk Management); Michael's experience (10+ vs 30+ years); Daniel's surname (Durante vs Durantes).
- **Small-municipality count:** **reconciled** ([[market-sizing]]) — ~19,500 US municipal governments; the "16,500" was the separate township category, not a conflicting count.
- **Maine municipality count:** **reconciled** ([[market-sizing]]) — 482 (2023); 484/488 are stale pre-deorganization vintages.
- **2026 Product Guide:** unreconciled conflicts include flat annual tiers vs
  A/C/B pricing tracks, "documented" ROI vs modeled cases, legal/procurement/SLA
  claims without counsel proof, current-tier RLUSD/cards/geolocation language,
  `Service Agreement Records` vs `Smart Agreement Records`,
  `support@civic-chain.com` vs protected live CTA, and broad "every transaction / every dollar"
  anchoring claims.

## Document map

Folders mirror the reading order; each file keeps its `NN-` prefix.

### 1 — Foundation
- [[01-what-it-is|01 — What CivicChain is]]
- [[02-the-problem|02 — The problem]]
- [[03-the-product|03 — The product]]
- [[benefits-by-audience|Benefits by audience]]

### 2 — Market
- [[04-market-and-tam|04 — Market and TAM]]
- [[05-customers-and-beachhead|05 — Customers and beachhead]]
- [[06-competition|06 — Competition]]

### 3 — Model
- [[07-business-model-and-pricing|07 — Business model and pricing]]
- [[customer-savings-mechanism|Customer savings mechanism]]
- [[customer-savings-dollar-model|Customer savings dollar model]]
- [[08-financial-projections|08 — Financial projections]]
- [[09-go-to-market|09 — Go-to-market]]

### 4 — Execution
- [[10-team|10 — Team]]
- [[11-ip-and-moat|11 — IP and moat]]
- [[12-roadmap-and-stages|12 — Roadmap and stages]]
- [[13-risks-and-mitigations|13 — Risks and mitigations]]

### 5 — Journeys
- [[14-how-it-works|14 — How it works (end to end)]]
- [[15-journey-town-manager|15 — Journey: the town manager]]
- [[16-journey-vendor|16 — Journey: the vendor]]
- [[17-journey-worker|17 — Journey: the worker]]
- [[18-journey-resident|18 — Journey: the resident]]

### 6 — Technology
The mechanism layer the narrative chapters draw on: what CivicChain is built
from and how each technology connects to the rest of the project. Start with the
overview; hard numbers stay in [[technology-baseline]] (evidence), not here.
- [[19-technology-overview|19 — Technology overview]]
- [[20-xrp-ledger-and-records|20 — XRP Ledger and records]]
- [[21-rlusd-and-payment-rail|21 — RLUSD and the payment rail]]
- [[22-cards-and-mcc-lock|22 — Cards and the MCC lock]]
- [[23-geolocation-verification|23 — Geolocation verification]]

## Reference and status (living docs, not pitch chapters)

These change on their own cadence — a signed customer, a counsel memo — separate
from the numbered narrative above.

- [[business-status|Business status — traction, pipeline, conversion]]
- [[legal-and-compliance|Legal and compliance posture]]
- [[open-external-blockers|Open external blockers]]

## Sources

- [[_docs/facts/product]] — current claim boundary
- [[_docs/facts/CivicChain_Product_Guide_2026]] — source-only 2026 product /
  pricing guide; unreconciled input
- [[_docs/facts/whitepaper]] — raw White Paper v9 (ambition, not a claim boundary)
- [[_docs/facts/evidence/patent-filings]]
- [[_docs/facts/evidence/maine-municipal-constraints]]
- [[_docs/facts/evidence/funds-flow-and-licensing]] — money-transmission, BaaS, float-yield legality (2026-06-03 internet research)
- [[_docs/facts/evidence/records-and-civic-law]] — records vs immutability, voting, vendor confidentiality (2026-06-03)
- [[_docs/facts/evidence/market-sizing]] — reconciled municipality counts (2026-06-03)
- [[_docs/facts/evidence/technology-baseline]] — XRPL, RLUSD, MCC-lock baselines (2026-06-03)
- [[_docs/facts/evidence/payment-cost-savings]] — fee-stack evidence,
  customer-savings mechanism, ACH/wire/card baseline, and all-in municipal
  payment-cost proof model (2026-06-04/05)
