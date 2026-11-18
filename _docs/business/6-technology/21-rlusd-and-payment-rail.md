---
description: "How money moves — RLUSD as the dollar-pegged unit of account and Ripple Payments / Rail as the settlement infrastructure, including the affiliate model that keeps each town's funds segregated. Target / Needs proof: v1.0 ships USD bridge mode."
depends-on:
  - "[[_docs/facts/evidence/technology-baseline]]"
  - "[[_docs/facts/evidence/funds-flow-and-licensing]]"
  - "[[_docs/facts/evidence/payment-cost-savings]]"
  - "[[_docs/facts/CivicChain_Product_Guide_2026]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/product]]"
---

# 21 — RLUSD and the payment rail

## Claim Boundary

- Claim status: Target / Needs proof — v1.0 ships USD bridge mode; Ripple-scale numbers need a dated source check
- Source note: [[_docs/facts/evidence/technology-baseline]] §2 (RLUSD); [[_docs/facts/CivicChain_Product_Guide_2026]] (source-only Ripple/RLUSD tier claims); [[_docs/facts/whitepaper]] §6 Module 5 Payment Rail (460-525), §9.2 Rail Compliance (718-734); [[_docs/facts/product]] (Technology; What v1.0 actually ships); [[_docs/facts/evidence/funds-flow-and-licensing]]; [[_docs/facts/evidence/payment-cost-savings]]

This is the money-movement layer. It is the most ambitious part of the white
paper and the least settled in v1.0: **v1.0 ships in USD bridge mode**, with
RLUSD as an optional Tier 2 / later-layer settlement path introduced after the
first audit cycle. Treat everything here as **Target / Needs proof** unless the
label says otherwise.

The 2026 Product Guide says payments process on Ripple Rail using RLUSD. This is
not adopted as v1.0 fact: keep it as **Target / Needs proof** while v1.0 ships
in USD bridge mode.

## RLUSD

**RLUSD** is Ripple's dollar-pegged stablecoin, designed and redeemable 1:1 with
USD — used in the target architecture as the internal unit of account for
contract pools, card balances, and residual reserves. Do not state "no conversion
risk" as a live v1.0 promise.

- Issued through a **limited-purpose trust company chartered by NYDFS**, pegged
  1:1, backed by cash / US Treasuries / cash equivalents, with **monthly
  third-party reserve attestations**. NYDFS final approval **2024-12-10**, launch
  **2024-12-17**. **[Confirmed]** — [[technology-baseline]].
- **Market cap ≈ $1.81B, ranked ~#40** (CoinMarketCap, retrieved 2026-06). Cite
  market-cap figures **with the retrieval date** — they are point-in-time.

> The white paper's Ripple-scale numbers — "$100B+ processed, 60+ markets, 51
> rails, 75+ licenses, RLUSD past $1B market cap" — are **Needs proof**: a dated
> source check is required before any external use ([[_docs/business/index#Standing boundaries]]).
> Use the dated figures in [[technology-baseline]], not the white-paper rounding.

## Ripple Payments / Rail

CivicChain's settlement runs on **Rail**, Ripple's API platform for
stablecoin-native money movement, with the underlying XRPL providing the
verifiable record ([[20-xrp-ledger-and-records]]).

### The affiliate model (the architectural keystone)

Rail prohibits "nesting" — moving money on behalf of a party not onboarded to
Rail. So CivicChain **cannot** pool town funds in its own accounts. Instead,
**each municipality is onboarded as its own Rail corporate customer** (via KYB),
its accounts legally belong to the town, and payments flow from the town's own
account to vendors. CivicChain only manages those accounts programmatically.

This constraint is actually a **selling point**: funds are segregated by design,
CivicChain can never commingle or touch treasury balances, and Rail's AML / OFAC
screening on every counterparty is handled natively rather than rebuilt. That is
exactly the financial segregation government clients require. Funds-flow and
licensing detail: [[funds-flow-and-licensing]].

### The USD → RLUSD on-ramp (unconfirmed)

USD-to-RLUSD conversion is referenced by Ripple as OTC / deep-liquidity, **not** a
self-service API endpoint. CivicChain must confirm the programmatic path with
Ripple before committing. Three paths exist:

| Path | Mechanism | Trade-off |
|------|-----------|-----------|
| Programmatic API exchange | Rail exchange API, USD-RLUSD pair under commercial agreement | Ideal target; subject to confirmation. Release 2 target. |
| OTC desk + daily batch | Pre-convert RLUSD, hold a float reserve | Available today; same-business-day settlement on conversion. |
| **USD-native Phase 1** | Skip RLUSD; USD on Rail (accounts, transfers, ACH) | **Simplest path to market — this is v1.0.** Full RLUSD upgrade in Release 2. |

### The seven-stage flow, compressed

(1) Municipality **KYB onboarding** → (2) **treasury funding** (ACH/Fedwire into
the town's Rail USD account) → (3) **contract-pool allocation** (internal Rail
transfers to card pool / residual / hold-back) → (4) **vendor counterparty AML
screening** (in parallel, before payment time) → (5) **real-time phone-tap spend**
([[22-cards-and-mcc-lock]]) → (6) **work verification + residual withdrawal**
(the Work Completion Record doubles as Rail's proof-of-payment in one step) →
(7) **dispute handling via EDD** (holds disbursements while service continues).

Rail handles the compliance burden natively — KYB, vendor OFAC/AML, inbound
deposit AML, withdrawal RFI, EDD dispute state, consumer protection — so
CivicChain monitors and acts on signals rather than building each system.

## What the rail does not prove

The rail layer does **not** by itself prove that CivicChain is cheaper than the
status quo. Traditional ACH and check rails can be inexpensive at the direct-fee
level. The economic claim has to come from the whole workflow: board-gated speed,
vendor-risk premium reduction, controlled spend, fewer manual reconciliation
steps, and public/audit evidence that does not have to be reconstructed later.
FedNow, RTP, ACH/e-check, AP automation, p-cards, lockbox, and treasury reporting
are real comparison options. CivicChain has to win as a controls-and-evidence
bundle, not as a raw crypto rail.

So the safe technology claim is narrow:

> RLUSD/Rail/XRPL can make settlement and records faster and more verifiable once
> the municipal authorization and compliance gates are satisfied.

Do not say: "CivicChain saves cities huge money because crypto avoids bank
commissions." That is **Needs proof** and, for many vendor-payment comparisons,
the wrong baseline.

## Revenue note (one line)

The rail also carries the revenue model beyond SaaS — card **interchange** and
**float yield** on Rail balances. Those economics and their legality live in
[[07-business-model-and-pricing]] and [[09-go-to-market]]; float-yield legality
is claim-disciplined in [[funds-flow-and-licensing]].

## Sources

- [[_docs/facts/evidence/technology-baseline]] — §2 RLUSD: issuer, charter,
  backing, attestation, peg, launch dates, dated market cap (2026-06-03).
- [[_docs/facts/CivicChain_Product_Guide_2026]] — Ripple/RLUSD payment-rail and
  tier claims. Source-only; unresolved.
- [[_docs/facts/whitepaper]] — §6 Module 5 The RLUSD Payment Rail (460-525);
  §9.2 Rail Compliance Architecture (718-734). Raw v9 ambition.
- [[_docs/facts/product]] — "Technology (brief)"; RLUSD as optional Tier 2;
  v1.0 USD bridge mode.
- [[_docs/facts/evidence/funds-flow-and-licensing]] — money-transmission, BaaS,
  float-yield legality (2026-06-03).
- [[_docs/facts/evidence/payment-cost-savings]] — ACH/wire/FedNow/RTP baselines,
  all-in payment-cost packet, and workflow-savings proof standard.

## Related

- [[19-technology-overview|19 — Technology overview]]
- [[20-xrp-ledger-and-records|20 — XRP Ledger and records]]
- [[22-cards-and-mcc-lock|22 — Cards and the MCC lock]]
- [[07-business-model-and-pricing|07 — Business model and pricing]]
- [[09-go-to-market|09 — Go-to-market]]
- [[_docs/business/index|Index — business knowledge base]]
