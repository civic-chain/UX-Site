---
description: "What CivicChain is as a product, the five modules at a glance, and the v1.0 shipping boundary versus end-state ambition."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/CivicChain_Product_Guide_2026]]"
  - "[[_docs/facts/whitepaper]]"
---

# 03 — The product

## Claim Boundary

- Claim status: mixed — see inline labels
- Source note: [[_docs/facts/product]] (How the product works; What v1.0 actually ships; Technology; Three perspectives); [[_docs/facts/CivicChain_Product_Guide_2026]] (source-only 2026 module/tier packaging); [[_docs/facts/whitepaper]] §1 Platform Overview (50-73), §2 (75-111), §4 (348-375), §5 (377-411)

CivicChain is a transparent municipal contracting platform for smaller US towns.
It replaces how a town solicits vendors, pays them, and reports spending to
residents, with one shared system behind three interfaces: a town-administrator
console, a vendor/contractor view, and a public portal anyone can read without a
login. Every payment is recorded on a public blockchain (the XRP Ledger), so the
record can be verified independently rather than reconstructed after the fact.
**Actual** — this is the product story visible in the current demo and materials.

Two boundaries run through everything below. The **white paper (v9)** describes a
five-module end state and is raw ambition, not the current public claim boundary.
The **2026 Product Guide** repackages modules and tiers for sales/pricing use,
but is also source-only, unreconciled evidence. **`product.md`** is the
authoritative claim boundary and confirms a narrower v1.0. Where sources
disagree, the white paper or guide feature is marked **Target**, **Modeled**, or
**Needs proof**, not stated as fact.

## The five modules at a glance

The white paper §1 frames the end-state platform as five integrated modules. This
is the full vision; see the next section for what v1.0 actually ships.

| # | Module | Function (white paper end state) | v1.0 status |
|---|--------|----------------------------------|-------------|
| 1 | Proposal Engine | Structured digital proposal submission via email, routed by Contract Reference Number (CRN). | Demo flow + Release 1 scope, but **not** itemized in product.md's confirmed-core list. Near-term **Target**, not stated-Actual. |
| 2 | Geolocation Voting | Layered GPS + IP verification for citizen eligibility; mobile voting with a confidence score per ballot. | Not in v1.0 — Tier 2. **Target**. |
| 3 | Contract Management | Smart Agreement Records (SARs) anchored on XRPL; public contract ledger; budget split across card pool, residual payment, and reserve hold. | SAR + public ledger: confirmed core, **Actual**. The card-pool budget split is card-dependent — **unresolved** v1.0 scope. |
| 4 | RLUSD Phone Tap Payments | Virtual cards in Apple/Google Pay, funded by RLUSD from the contract pool, MCC-locked per contract type, authorized in real time. | Card scope **unresolved**; RLUSD funding is Tier 2. **Target / Needs proof**. |
| 5 | Payment Rail | End-to-end RLUSD flow: municipal USD converts to RLUSD, held in named virtual accounts via Ripple Payments, disbursed to vendors in minutes. | v1.0 ships USD bridge mode; RLUSD rail is **Target / Needs proof** (dated source check). |

Note the naming gap: the white paper builds modules 4 and 5 around RLUSD as the
unit of account. `product.md` overrides this — **v1.0 ships in USD bridge mode**,
with RLUSD as an optional Tier 2 / later-layer settlement path introduced after
the first audit cycle.

The 2026 Product Guide packages these modules as commercial tiers. Treat that
table as sales packaging, not shipping proof: cards, RLUSD, geolocation, NLP,
marketplace, APIs/SLA, and white-label remain **Target** or unresolved unless
[[_docs/facts/product]] says otherwise.

## End-state vs confirmed-core boundary

`product.md` "What v1.0 actually ships" draws the line explicitly.

**Confirmed core story (v1.0).** **Actual** — visible in the demo and product
materials:

- Public ledger on the XRP Ledger.
- Smart Agreement Records (SARs) anchored on XRPL.
- Work Completion Records.
- Payment authorization flow.
- Burn-rate / spend alerts.
- Exportable reporting.

**Unresolved v1.0 boundary — virtual cards.** The current demo and product
narrative treat MCC-locked vendor cards as central: a winning vendor receives a
virtual card loaded with part of the contract value, locked to approved merchant
categories (fuel, equipment rental, construction supply), added to Apple Pay or
Google Pay. The raw white paper's Release 1, however, says **no virtual cards
until Release 2**. These two sources conflict, and the product owner has not
resolved it. Do not present cards as confirmed v1.0 scope — treat them as
**product-story / Target** until confirmed.

## Not in v1.0

`product.md` names four capabilities explicitly outside the first release. Each is
roadmap intent, not a current claim.

| Capability | Tier | Status | What to say |
|------------|------|--------|-------------|
| Geolocation voting | Tier 2 | **Target** | Jurisdiction-aware civic-input layer. Not a universal default, not a binding vendor-selection mechanism without jurisdiction-specific legal and procurement review. |
| RLUSD settlements | Tier 2 (optional) | **Target / Needs proof** | v1.0 ships USD bridge mode; RLUSD is optional, after the first audit cycle. RLUSD market-cap and regulatory callouts need a dated external check. |
| AI solicitation drafting | Tier 3 | **Target** | Not in scope for v1.0. |
| Multi-municipality white-label | Tier 4 | **Target** | Not in scope for v1.0. |

On geolocation voting specifically: the white paper §2-§3 describe a three-layer
GPS / IP / enrollment model with per-ballot confidence scoring. That is end-state
design, **Target** at best for the public claim. It is a selective public-input
layer, not a requirement for every municipality and every contract.

## How v1.0 reads to each user

A v1.0-scoped reading of the three interfaces in `product.md`. Card-dependent
behavior is flagged because card scope is unresolved.

- **Town manager.** A single console for active contracts, payment status,
  pending approvals, and budget. The public ledger lets residents check spending
  themselves, so "where did the money go?" is already answered online. **Actual**
  (console + ledger). The "unauthorized spending is structurally impossible"
  claim depends on MCC-locked cards — **Target** until card scope is confirmed.
- **Vendor / contractor.** A small-town contractor today waits 30–45 days for
  payment and prices that delay into every bid. CivicChain's pitch is faster,
  more predictable payment so the risk premium drops. The same-day loaded-card
  experience is **Target** (card-dependent); the faster-payment direction is the
  confirmed value story. Seconds-level residual settlement is a **Target /
  rail-path** claim, not proof of live v1.0 operation.
- **Resident.** Opens the public portal with no login and sees active contracts,
  vendors, transactions, and the XRPL hash to verify independently. Transparency
  is the default state, not a FOIA request. **Actual** (public ledger). The
  voting feature is Tier 2 — **Target**.

## Technology, briefly

The landing page should not lead with technology; this is context only. For the
full breakdown of each technology and how it connects to the rest of the
project, see [[19-technology-overview]] and the `6-technology` section.

- **Blockchain:** XRP Ledger — public, immutable transaction records. **Actual**.
- **Stablecoin:** RLUSD as an optional Tier 2 / later-layer settlement path.
  Market-cap and regulatory callouts need a dated external check. **Needs proof**.
- **Payment rail:** Ripple Payments / Rail as the target architecture. Geography,
  license, and volume claims need dated external checks. **Needs proof**.
- **Cards:** MCC-locked virtual vendor cards, provisioned to Apple/Google Pay.
  Shipping scope unresolved between current product story and Release 1 wording.
  **Target**.
- **Settlement:** seconds-level in the target rail path; USD-first / ACH paths
  may be same-day or slower. v1.0 ships in **USD bridge mode**.

Patent posture: the underlying payment architecture is covered by **provisional
applications filed April 4, 2026**. Do not describe this as "issued patents" or
"patented technology." **Needs proof** for any stronger wording.

## Open conflicts to resolve before external use

Two conflicts change what this page can claim, and both stay on the `product.md`
boundary: **virtual-card v1.0 scope** (MCC-locked cards are core in the demo but
deferred to Release 2 in the white paper) and **RLUSD vs USD** (white paper
assumes RLUSD; v1.0 ships USD bridge mode). Full list (Harpswell, team and
municipality figures): [[_docs/business/index#Open source conflicts]] · [[_docs/business/index#Standing boundaries]].

## Sources

- [[_docs/facts/product]] — "How the product works", "What v1.0 actually ships
  (and what it doesn't)", "Technology (brief)", "Three perspectives", "Proof and
  source discipline", and the known-conflicts list. Authoritative claim boundary.
- [[_docs/facts/CivicChain_Product_Guide_2026]] — 2026 sales/pricing guide.
  Source-only tier and module packaging; not a shipping boundary.
- [[_docs/facts/whitepaper]] — §1 Platform Overview / Five Integrated Modules
  (lines 50-73); §2 Module 1 Structured Proposal Submission (75-111); §4 Module 3
  Smart Contract Management / SARs (348-375); §5 Module 4 RLUSD Phone Tap Payments
  (377-411). Raw v9 ambition, used as source material only — not the public claim
  boundary.

## Related

- [[01-what-it-is|01 — What CivicChain is]]
- [[14-how-it-works|14 — How it works (end to end)]]
- [[12-roadmap-and-stages|12 — Roadmap and stages]]
- [[19-technology-overview|19 — Technology overview]]
- [[_docs/business/index|Index — business knowledge base]]
