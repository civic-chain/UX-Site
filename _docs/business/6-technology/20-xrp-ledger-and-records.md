---
description: "The public-record spine — the XRP Ledger, Smart Agreement Records anchored to it, and the cross-ledger audit chain that links a payment event to the contract, the issuer, and the platform database. The Actual core of the product."
depends-on:
  - "[[_docs/facts/evidence/technology-baseline]]"
  - "[[_docs/facts/evidence/records-and-civic-law]]"
  - "[[_docs/facts/CivicChain_Product_Guide_2026]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/product]]"
---

# 20 — XRP Ledger and records

## Claim Boundary

- Claim status: mixed — public ledger + SARs Actual; per-spend anchoring and audit-chain patent scope Target
- Source note: [[_docs/facts/evidence/technology-baseline]] §1 (XRPL baseline); [[_docs/facts/CivicChain_Product_Guide_2026]] (source-only broad anchoring claims); [[_docs/facts/whitepaper]] §4 Smart Contract Management / SAR (348-375), §9.3 Payment Flow / §9 XRPL Ledger Service (713, 737-746); [[_docs/facts/product]] (Technology; What v1.0 actually ships); [[_docs/facts/evidence/records-and-civic-law]]

The public ledger is the part of CivicChain that is real today and that the
whole transparency story rests on. A contract event is anchored on a public
blockchain so anyone can verify it independently, instead of reconstructing the
record after the fact through a FOIA request.

## The XRP Ledger (XRPL)

CivicChain anchors records on the **XRP Ledger**, a public blockchain that
reaches finality by consensus validation rather than probabilistic block
confirmations.

- **Finality / speed:** ledger versions close about every **3–5 seconds**; a
  transaction is final once it appears in a validated ledger. **[Confirmed]** —
  [[technology-baseline]]. Do **not** claim "<500ms" finality for XRPL; the
  defensible figure is the ~3–5s close window.
- **Cost:** a standard transaction costs **10 drops = 0.00001 XRP** (well under
  $0.0001 at recent prices), scaling up under load. **[Confirmed]**.
- **Anchoring mechanism:** the optional **`Memos` field** holds **≤1 KB**, and a
  256-bit hash is ~32 bytes — so anchoring a hash as the verification root is a
  well-documented, low-cost pattern, not novel engineering.
- **Throughput:** cite a **range, ~1,000–1,500 tx/s** — XRPL sources conflict, so
  no single hard number.

CivicChain's **own** end-to-end latency on its USD-bridge path is unmeasured; the
3–5s figure is the XRPL rail baseline, not a measurement of the live product
([[technology-baseline]]).

## Smart Agreement Records (SARs)

A **Smart Agreement Record** is the contract object anchored to XRPL. It carries
the contract reference and splits the budget across three sub-pools — the **card
pool**, the **residual payment reserve**, and a **hold-back reserve** released on
final sign-off. The public contract ledger is built from SARs and their memos.
Public ledger + SARs are the **confirmed core (Actual)** — visible in the demo.

## The cross-ledger audit chain

This is the integrating idea, and the heart of the payment-architecture patent
theme. A single **SHA-256 hash** derived from a payment event is written across
four systems so they can be reconciled without trusting any one of them:

1. the card network / issuer settlement layer,
2. the Rail account ledger,
3. the platform's PostgreSQL database, and
4. the **XRPL memo — the immutable verification root**.

Two properties matter for the accountability story:

- **Declines are evidence too.** A blocked out-of-scope purchase is anchored as a
  compliance event, not an invisible card-network reject.
- **The write is asynchronous.** Anchoring never blocks the real-time
  authorization decision (see [[22-cards-and-mcc-lock]]).

As a **patent** matter the audit chain is **Target / Needs proof** until claims
are examined — provisional applications do not establish granted scope. See
[[11-ip-and-moat]] for the filing and the safe-claim language.

## What is Actual vs Target on coverage

The end-state story is that *every* contract event is anchored — contract
creation, card funding, each spend, residual, balance return. Treat
**"every spend is anchored" as Target**: in the demo CivicChain anchored **4
records** (contract, funding, residual, balance return) while logging **3 card
spends**, so individual spends were not among the anchored records. Per-spend
anchoring also depends on the unresolved v1.0 card boundary
([[22-cards-and-mcc-lock]]).

The 2026 Product Guide uses broader "every dollar / every transaction" wording.
Keep that as **Target** coverage language, not demo proof: current evidence shows
4 anchored records, not every card spend.

> Records-law note: permanent on-chain publication is the sharpest legal
> exposure, but Maine law mandates record *preservation*, not deletion
> ([[records-and-civic-law]]). The defensible pattern anchors only a
> hash/reference on-chain (close to the XRPL memo model) and keeps raw records
> and any PII off-chain. **Needs counsel** before external use.

## Sources

- [[_docs/facts/evidence/technology-baseline]] — §1 XRPL baseline: close time,
  cost, drop conversion, finality model, memo size, throughput range (2026-06-03).
- [[_docs/facts/CivicChain_Product_Guide_2026]] — broad anchoring and
  transaction-visibility claims. Source-only; unresolved.
- [[_docs/facts/whitepaper]] — §4 Module 3 Smart Contract Management / SAR
  (348-375); §9 XRPL Ledger Service and §9.3 Payment Flow Diagram (713, 737-746).
  Raw v9 ambition, mechanism source only.
- [[_docs/facts/product]] — "Technology (brief)" and confirmed-core / v1.0 scope.
- [[_docs/facts/evidence/records-and-civic-law]] — preservation vs immutability.

## Related

- [[19-technology-overview|19 — Technology overview]]
- [[22-cards-and-mcc-lock|22 — Cards and the MCC lock]]
- [[11-ip-and-moat|11 — IP and moat]]
- [[14-how-it-works|14 — How it works (end to end)]]
- [[_docs/business/index|Index — business knowledge base]]
