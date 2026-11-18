---
description: "Fact sheet and claim-boundary reference for Civic-Chain landing and related pages."
depends-on:
  - "[[_docs/facts/CivicChain_Product_Guide_2026]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/evidence/funds-flow-and-licensing]]"
  - "[[_docs/facts/evidence/market-sizing]]"
  - "[[_docs/facts/evidence/payment-cost-savings]]"
  - "[[_docs/facts/evidence/patent-filings]]"
  - "[[_docs/facts/evidence/maine-municipal-constraints]]"
  - "[[_docs/facts/evidence/marketing-content-claim-audit]]"
  - "[[_docs/facts/evidence/records-and-civic-law]]"
  - "[[_docs/facts/evidence/technology-baseline]]"
---

# Civic-Chain: Product Reference

A fact sheet for designers and developers working on the landing page. It
consolidates the approved pitch, demo, roadmap, raw white papers, the 2026
product/pricing guide, and evidence memos. Use this as the local claim boundary
for content work; raw source files are evidence and context, not landing copy.

## Proof and source discipline

Use four claim labels when turning these facts into public copy, deck copy, or
handoff notes:

- **Actual / observed:** visible in the current demo, product materials, or
  evidence memos.
- **Modeled:** a scenario, ROI model, forecast, or illustrative economics.
- **Target:** roadmap intent or planned milestone.
- **Needs proof:** strong claim that needs an external source, dated market
  check, legal confirmation, or founder confirmation before external use.

Current boundaries:

- Lead with municipal contracting, cleaner contractor payments, and visible
  accountability. Technology explains how trust is verified; it is not the
  opening story.
- Treat Harpswell as a demo scenario unless a separate business-status document
  confirms a live customer, signed pilot, LOI, or design partner.
- Patent language should follow
  `_docs/facts/evidence/patent-filings.md`: provisional applications filed on
  April 4, 2026; do not say "issued patents" or "patented technology" from
  those records alone.
- Ripple, RLUSD, market-cap, rail-volume, license-count, TAM, CAC, ARR, and ROI
  numbers require dated source checks before they become external claims.
- The 2026 Product & Pricing Guide is **source-only, unreconciled evidence**. It
  does not override this file, pricing owners, legal owners, roadmap owners, or
  live copy. Treat its tier table, payment-rate comparison, ROI cases, security /
  compliance language, and contact copy as inputs to reconcile through owners.
- Customer savings are workflow-level: vendor risk premium, staff AP and
  reconciliation time, controlled spend, audit / FOIA evidence, and visible
  payment friction. Do not claim Civic-Chain simply saves cities money by
  replacing banks with crypto or avoiding "huge commissions."
- Payment-cost claims should be judged by the all-in cost per reconciled,
  audit-ready, legally valid municipal transaction. Posted convenience fees,
  raw ACH fees, and raw crypto-rail costs are inputs, not the claim boundary.
- Citizen voting is a jurisdiction-aware civic-input layer. Do not pitch it as
  a universal vendor-selection default without legal and procurement framing.
- The current sources still conflict on virtual-card shipping scope: this file
  and the marketing source treat MCC-locked cards as part of the core product
  story, while the raw white paper's Release 1 says no virtual cards until
  Release 2. Do not present cards as confirmed v1.0 shipping scope until the
  product owner resolves that boundary.

Known source conflicts to resolve before external publication:

- Detailed conflicts from `civicchain-marketing/content` live in
  `_docs/facts/evidence/marketing-content-claim-audit.md`.
- Highest-risk unresolved conflicts: team bios, v1.0 virtual-card scope,
  Harpswell / traction status, market counts, RLUSD/Ripple live metrics, and
  legal framing for citizen voting.
- Guide-specific conflicts now added to the boundary: flat annual tiers vs the
  current A/C/B pricing tracks, "documented" ROI vs modeled case studies, money-
  transmitter / procurement / SLA claims that need counsel or founder proof,
  RLUSD and card features promoted to current tier promises, geolocation voting
  presented as purchasable scope, SAR terminology (`Service Agreement Records`
  vs `Smart Agreement Records`), `support@civic-chain.com` vs the protected live
  CTA channel, and broad "every transaction / every dollar" anchoring language
  where per-spend anchoring remains **Target**.

---

## What Civic-Chain is

A transparent municipal contracting platform for smaller towns that need
cleaner procurement, faster contractor payments, and a visible audit trail
without enterprise-level overhead. It replaces the way municipalities contract
vendors, pay them, and report spending to residents.

The one-sentence investor shorthand: "The Stripe for Municipal Contracting."
Use it as a memory hook, not as the full thesis.

The platform has three interfaces — one for the town administrator, one for the vendor/contractor, and one for the public (residents, press, anyone). All three connect to the same system. Every payment is recorded on a public blockchain (XRP Ledger), so it can be verified by anyone without needing to reconstruct the record after the fact.

---

## The problem

Small towns manage millions in contracted services using systems from the 1970s–80s. Paper checks, Excel spreadsheets, emailed RFPs, manual reconciliation. This isn't a technology complaint — it costs real money.

### The numbers

| Fact | Number | Claim status | Source context |
|------|--------|--------------|----------------|
| Added to U.S. construction bids annually because vendors expect slow payment | **$273B** | Needs dated citation | Raw white paper attributes this to the Rabbet 2023 Construction Payments Report. Cite the report directly before public use. |
| Modeled budget leakage in a sample municipality | **13.8%** | Modeled | On a modeled $385K procurement budget, the scenario loses $52,958/year to fees, premiums, labor overhead, and audit costs. Do not call this an average without proof. |
| Resident card / convenience fees on public payments | Often around **2-3%** in checked official examples | Actual as background pain; not the core comparison | Boston, Harris County, Portland utility, and Maine PayPort examples show visible card / portal fees or no-municipality-cost portal economics beside cheaper ACH, e-check, check, or daily-ACH paths. |
| Vendor payments still on paper check in small municipalities | **50–70%** | Needs proof | Industry estimate in legacy materials; needs source or primary research. |
| Annual procurement fraud losses in local government | **$1.3B+** | Needs dated citation | Use only with a source and definition of local-government procurement fraud. |
| General contractors who raised bids in 2024 due to payment delay | **97%** | Needs dated citation | Trade-survey claim; cite directly before public use. |
| Portion of construction costs attributable to slow payment | **14%** | Needs dated citation | Industry estimate; cite directly before public use. |

### Where the 13.8% leaks

Modeled leakage on a $385K municipal procurement budget:

- Processing fees: $5,468 (2.5% per transaction)
- Vendor bid premiums: $14,370 (3–8% risk premium for payment uncertainty)
- Staff labor overhead: $25,320 (18–25% of procurement staff time on manual work)
- Audit/FOIA overhead: $3,050
- Untracked expenses: $4,750

### The core insight

"The problem is not corruption. The problem is infrastructure."

Towns aren't losing money because people are stealing. They're losing money because the payment system is so slow and opaque that vendors charge more, staff spend time on manual reconciliation, and nobody can easily see where the money went.

### How the savings happen

Civic-Chain's strongest savings claim is not that crypto makes every payment
free. The technology changes the cost stack around a municipal vendor contract:

- Vendors can price less payment uncertainty into bids if approved work expenses
  and residual payments become faster and more predictable.
- The founder-reported hidden fee stack — processor / portal fees, bank-service
  fees, card / contactless economics, compliance, and office labor — should be
  decomposed before use. Civic-Chain can compress some layers, but Rail / BaaS /
  card-provider fees remain and need provider term sheets.
- The newest all-in payment-cost packet supports the existence of those cost
  categories; it does not prove a national average, live Civic-Chain ROI, or
  that official fee schedules are false. The safer read is that posted fees are
  incomplete for strategy unless bank statements, exception logs, staff time,
  audit work, and public-record burden are measured too.
- Town staff spend less time chasing invoices, matching checks, rebuilding AP
  exports, preparing audit packets, and answering money-related FOIA / FOAA
  questions.
- MCC-locked cards, per-card limits, contract pools, hard declines, and
  administrator-approved refills can stop out-of-scope spend before settlement
  instead of discovering it after the fact.
- XRPL anchoring makes the contract record cheap to verify independently, but
  low-cost anchoring is not the same as whole-product ROI.
- Public card / portal fees help residents understand payment friction, but the
  core Civic-Chain comparison is a municipal vendor contract, not a resident
  tax, DMV, or utility checkout.

---

## How the product works

The demo and end-state product story flows through these steps. For current
shipping scope, use the boundary in "What v1.0 actually ships" below.

**1. Town posts a project.** The town manager creates a solicitation (e.g., "Route 123 crack sealing, $18,500 budget"). It goes live on the public ledger immediately — no mailing lists or paper packets. The payment split is locked upfront: 80% loaded onto a vendor card, 20% held as residual until work is complete.

**2. Public input can be documented where appropriate.** Towns can keep input tied to the broader contract process when they choose to open that layer. This is not the required or default mechanism for every contract.

**3. Vendor wins and gets a card.** In the controlled-spend story, the winning
vendor receives a virtual payment card loaded with 80% of the contract value —
same day, sometimes within minutes. The card is MCC-locked: it can only be spent
at approved merchant categories (fuel, equipment rental, construction supply).
It physically declines at a restaurant or retail store. The vendor adds it to
Apple Pay or Google Pay and starts work. Treat this as core story / target scope
until the v1.0 card boundary is confirmed.

**4. Work happens, spending is tracked.** Every card transaction is logged automatically — merchant, amount, category, timestamp. The town manager sees activity in real time. No invoices. No end-of-month statements.

**5. Work is complete, residual is released.** The vendor submits a Work
Completion Record. The town manager approves it. The remaining 20% is released
through the payment rail. Seconds-level settlement is a target / rail-path claim,
not proof of live v1.0 operations.

**6. Everything is on the public ledger.** Every transaction — contract creation, card funding, each spend, residual payment, unspent balance return — is anchored on the XRP Ledger with a unique hash. Any resident can look it up and verify independently. No FOIA request. No phone call to town hall. The record is permanent and cannot be altered.

### Operating architecture boundaries

- Municipal funds should remain municipality-owned. Civic-Chain orchestrates
  workflow and payment operations; it should not commingle funds from multiple
  municipalities in Civic-Chain-owned accounts.
- Actions that move money or change the public record need administrator
  approval.
- Work Completion Records are payment and compliance artifacts, not only
  internal task status.
- Approvals and declines can both become audit evidence. A blocked
  out-of-scope transaction is useful proof that contract restrictions were
  enforced.
- Card-pool refills should be administrator-approved, not automatic.

---

## Three perspectives

### For the Town Manager

The town manager's daily reality: scattered email threads about contracts, spreadsheets tracking payments, paper checks to process, phone calls from residents asking where the road money went, and annual audit prep that takes weeks.

Civic-Chain replaces this with a single console. Active contracts, card activity, pending approvals, budget status — all in one place. The public ledger means residents can check spending themselves. The MCC-locked cards mean the town manager doesn't need to audit vendor spending after the fact — unauthorized spending is structurally impossible.

The political angle matters: when spending is public by default, the town manager is protected. If anyone asks "where did the money go?" — the answer is already online.

### For the Vendor / Contractor

A typical small-town contractor waits 30–45 days for payment after finishing work. Sometimes longer. This is why they add a risk premium to every bid — they're effectively financing the town's slow payment process.

With Civic-Chain's target controlled-spend flow, the contractor can get approved
work-expense funding earlier through a contract-bound card pool. They tap their
phone at the gas station, the equipment rental, or the materials supplier; the
transaction is checked against the contract's allowed spend categories before
settlement. Same-day card provisioning and seconds-level residual settlement are
target rail / card-scope claims, not confirmed v1.0 promises.

This changes the bidding dynamic. A contractor who trusts the payment workflow
doesn't need to pad as much for slow payment, invoice uncertainty, and cash-flow
risk. Lower bids can save the town through buyer choice and public-record
pressure. Do not say Maine law makes this automatic: old Title 30-A §124
language applies to county purchasing, and the town-level award rule needs local
confirmation.

### For the Resident

Today, if a Harpswell resident wants to know how their tax money was spent on road maintenance, they file a FOIA request or call town hall. They might get an answer in days or weeks.

With Civic-Chain, they open the public ledger — no login, no registration. They see every active contract, every vendor, every transaction, every blockchain hash they can verify independently on the XRP Ledger. The system is designed so transparency is the default state, not something you have to request.

The voting feature (coming in Tier 2) lets residents give verified civic input
from their phone. It should be understood as a selective public-input layer, not
a universal requirement for every municipality and every contract, and not a
binding vendor-selection mechanism without jurisdiction-specific review.

---

## The Harpswell scenario

This is a demo scenario showing the full product cycle. All numbers below are
from the working demo; they are not proof that Harpswell is a live customer.

**The project:** Route 123 Pavement Crack Sealing, 1.4 miles. Town of Harpswell, Maine.

**Budget ceiling:** $18,500

**Winning vendor:** Coastal Road Services LLC, bid $17,200 (came in $1,300 under budget)

**Contract reference:** CRN-2026-HRP-0041

### Financial flow

| Step | Amount |
|------|--------|
| Card pool funded (80% of $17,200) | $13,760 |
| Card spending during work (fuel, equipment, materials) | $13,214.50 |
| Unspent card balance returned to town | $545.50 |
| Residual payment on completion (20%) | $3,440 |
| **Total paid to vendor** | **$16,654.50** |
| **Total town savings vs. budget** | **$1,845.50** |

### Other facts from the scenario

- Demo resident vote: 312 votes cast, 87% approval (271 approve, 41 reject)
- Invoices submitted: 0
- Blockchain records anchored: 4 (contract, funding, residual, balance return)
- Residual settlement time in demo / target rail path: ~4 seconds via Ripple Payments Rail
- FOIA requests needed to audit: 0

### Card spending detail

Three transactions over 3 work days:

1. Harpswell Equipment Rental — $3,200 (Equipment Rental MCC)
2. Irving Oil, Bath ME — $847.20 (Fuel & Gas MCC)
3. Maine Pavement Supply Co. — $5,167.30 (Construction Supply MCC)

All approved automatically against MCC lock. No manual review needed.

---

## Market context

### Size

| Metric | Number | Claim status |
|--------|--------|--------------|
| Annual U.S. municipal spending | $2T+ | Needs source and definition |
| Municipal governments (addressable category) | ~19,500 municipal governments; the old 16,500 figure was the separate town/township category, not "small municipalities" | Reconciled in `_docs/facts/evidence/market-sizing.md`; verify primary Census table before external use |
| New England municipalities (initial SOM) | 1,400 | Needs source before external use |
| Maine municipalities | 482 organized municipalities (2023); 484/488 are stale pre-deorganization vintages | Reconciled in `_docs/facts/evidence/market-sizing.md`; verify primary Maine source before external use |
| Priority target towns | 8 (all in Maine) | Internal target list |

### Why Maine, why small towns

Small towns have simpler governance: a Town Manager can approve a $5K pilot without a Town Meeting, board vote, or competitive bidding process (Maine Title 30-A §2636). This means the sales cycle is one person, one decision.

The beachhead is seasonal service contracts — snow plowing, road maintenance, landscaping. These are high-frequency, high-accountability-gap contracts that happen every year in every town. They're the simplest use case to prove the product.

### The eight target towns

1. **Gray** (8,429 pop.) — Already contracts 30+ miles of snow plowing on 3-year terms. Exact use case match.
2. **Rumford** (5,942 pop.) — Featured on GovTech.com for 5G streetlight adoption. Tech-forward.
3. **Ellsworth** (8,657 pop.) — Attended Maine Municipal Innovation Day 2026.
4. **Falmouth** (12,755 pop.) — Affluent Portland suburb with fast budget decisions.
5. **Kennebunk** (11,820 pop.) — Heavy seasonal road and snow contracts.
6. **Camden** (5,242 pop.) — First Maine town to adopt Town Manager form, 1925. 3-year contract limits.
7. **Bar Harbor** (5,244 pop.) — Acadia tourism creates seasonal service needs.
8. **South Portland** (26,930 pop.) — AAA bond rating, $61.4M budget. Flagship reference target.

### How it spreads

The growth model is not traditional marketing. It works through three pressure loops:

**Vendor pressure:** A contractor gets a cleaner, faster approved-payment
workflow in one town and waits through a slower manual cycle in the next. They
tell other contractors. They ask the slow-paying town: "can you use Civic-Chain
too?" Word moves fast in small contractor networks.

**Competitive pressure:** When one town's bids drop because vendors no longer
price in as much payment risk, neighboring towns can see the gap in public
records and ask why their own payment workflow still creates that premium.

**Public record pressure:** 50 towns with public procurement records showing lower bids create a body of evidence that's hard to ignore. The platform markets itself through its own transparency.

Expansion path: Maine pilot towns → Maine Municipal Association → national channels (ICMA, NLC).

---

## Team

Three co-founders. The key signal: they come from inside the industry they're disrupting.
The bio details below retain the current local reference values, but several
numbers and names conflict with the marketing source. Do not use numeric team
claims externally until founder bios are confirmed.

**Justin Harvey — Chief Product Officer**
6+ years as Product Owner at Tyler Technologies — the dominant incumbent in municipal software. Led government SaaS platforms processing $50M annually across 20+ agency clients and 500K+ users. He built the systems that Civic-Chain is replacing. Also founded 45th Parallel Risk Management ($340K revenue). GLG Council Member advising institutional investors.

**Michael Stansfield — Chief Executive Officer**
10+ years leading delivery on security-cleared U.S. government IT programs. Deputy Lead Agile Coach on NGEN (U.S. Navy enterprise network — 65 teams, 650 staff). U.S. Army National Guard officer and combat medic. Directed 100-person emergency operations during Hurricane Sandy. Blockchain practitioner with independent DeFi experience.

**Daniel Durante — Chief Technology Officer**
13+ years full-stack engineering for Fortune 100 companies. Former CTO at Genesis Volatility (real-time infrastructure processing 900+ markets at 99.9% uptime). Code deployed in Stripe, Walmart, and Hubcash infrastructure. Published author (Packt, Amazon #1 New Release in MySQL Guides). Original maintainer of Sequelize and InfernoJS.

---

## Competitors

These rows are directional positioning, not a sourced competitive benchmark.
Cite current product docs and contract data before using categorical claims
externally.

| Company | What they do | What they lack |
|---------|-------------|---------------|
| **Tyler Technologies** | Dominant municipal software ($635–645M platform revenue). Justin spent 6 years there. | No real-time payments, no blockchain records, no public ledger, no vendor cards. Settlement: 3–5 day ACH. |
| **OpenGov** | Acquired by Cox for $1.8B (Feb 2024). Budgeting and planning tools. | No payment rail. No vendor-facing features. No public transparency layer. |
| **CivicPlus** | Citizen-facing portals. | Limited to citizen engagement. No procurement, no payments, no blockchain. Enterprise pricing. |

Civic-Chain's structural differentiator: "It does not make fraud harder to commit by policy. It makes fraud impossible to conceal by design."

---

## Pricing

Pricing is modeled business logic, not validated revenue.

| Track | Population | Annual fee | Transaction fee | Target |
|-------|-----------|-----------|----------------|--------|
| A (licensed) | 10K+ | $25K–$75K SaaS | — | Larger towns |
| C (hybrid) | 2.5K–10K | $6K–$15K SaaS | + partial portal fee | Mid-size |
| B (pass-through) | Under 2.5K | $0 SaaS | 0.35–0.75% on payouts | Smallest towns |

All tracks also generate ~1.5% card interchange and ~4% annualized float yield on contract pool balances.
These are revenue assumptions, not proof of customer savings. Interchange
depends on the unresolved card scope, and float yield on public funds needs
legal confirmation before it can be treated as Civic-Chain revenue.

Pilot entry: under $5K — deliberately priced below the Town Manager's unilateral authority threshold.

---

## Key quotes

Use these as raw material for copywriting. They capture the product's voice.

- "The problem is not corruption. The problem is infrastructure."
- "Approved payment moves faster, so vendors can stop pricing a month of uncertainty into every bid."
- "Vendors stop financing uncertainty, clerks stop rebuilding records by hand, and towns get spend controls while the work happens."
- "It makes fraud impossible to conceal by design."
- "$2 trillion market still running on payment rails designed in 1978 is not a niche. It's an oversight."
- "Every contract, every dollar, every decision — on the record."

---

## Technology (brief)

Only include this section for context. The landing page should not lead with technology.

- **Blockchain:** XRP Ledger — public, immutable transaction records
- **Stablecoin:** RLUSD as optional Tier 2 / later-layer settlement path. Market-cap and regulatory callouts need a dated external check.
- **Payment rail:** Ripple Payments / Rail as the target architecture. Geography, license, and volume claims need dated external checks.
- **Cards:** MCC-locked virtual vendor cards, provisioned to Apple Pay / Google Pay. Shipping scope is unresolved between current product story and raw Release 1 wording.
- **Settlement:** Seconds-level settlement in the target rail path; USD-first / ACH paths may be same-day or slower.

v1.0 ships in USD bridge mode. RLUSD is optional, introduced in Tier 2 after the first audit cycle.

---

## What v1.0 actually ships (and what it doesn't)

**Confirmed core story:** Public ledger, Smart Agreement Records on XRPL, Work
Completion Records, payment authorization flow, burn-rate alerts, and exportable
reporting.

**Unresolved v1.0 boundary:** MCC-locked cards are central to the current demo
and product narrative, but the raw white paper's Release 1 says no virtual cards
until Release 2. Treat cards as product-story / target scope until confirmed.

**Not in v1.0:** Geolocation voting (Tier 2 / jurisdiction-aware), RLUSD
settlements (Tier 2, optional), AI solicitation drafting (Tier 3),
multi-municipality white-label (Tier 4).

The product launches focused on seasonal service contracts (snow, roads, landscaping) in towns under 25K population. It expands from there.
