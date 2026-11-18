---
description: "Controlled spend — MCC-locked virtual cards on standard issuer-processors, the card tier hierarchy, the phone-tap authorization lifecycle, and why the lock mechanism is off-the-shelf while the contract-bound framing is the claimed novelty. v1.0 card scope is unresolved."
depends-on:
  - "[[_docs/facts/evidence/technology-baseline]]"
  - "[[_docs/facts/evidence/patent-filings]]"
  - "[[_docs/facts/evidence/payment-cost-savings]]"
  - "[[_docs/facts/CivicChain_Product_Guide_2026]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/product]]"
---

# 22 — Cards and the MCC lock

## Claim Boundary

- Claim status: mixed — v1.0 card scope unresolved (Target); MCC control standard/feasible (Actual); contract-bound framing Target as granted patent scope
- Source note: [[_docs/facts/evidence/technology-baseline]] §3 (MCC-locked card feasibility); [[_docs/facts/CivicChain_Product_Guide_2026]] (source-only card tier claims); [[_docs/facts/whitepaper]] §5 Module 4 Phone Tap Payments (377-457), §9.4 Card Authorization Latency (749-758); [[_docs/facts/product]] (What v1.0 actually ships — virtual cards); [[_docs/facts/evidence/patent-filings]] (64/029,416); [[_docs/facts/evidence/payment-cost-savings]]

The white paper calls this "the module that separates Civic-Chain from every
other govtech product." It is also the **least settled scope question** in v1.0:
the demo and product story treat MCC-locked vendor cards as central, but the raw
white paper's Release 1 says **no virtual cards until Release 2**. The product
owner has not resolved this. Do **not** present cards as confirmed v1.0 scope —
treat them as **product-story / Target** until confirmed.

The 2026 Product Guide presents biometric virtual cards as tier features and says
"not plastic." That is sales wording; current boundary keeps card scope
unresolved and preserves physical backup cards for rural terminals.

## What the MCC lock is — and is not

An **MCC** (Merchant Category Code, ISO 18245) restriction is a **core,
network-standard** card control: at authorization, before settlement, the
issuer/processor checks the transaction's MCC against an allow/block list and
**declines in real time** if it is out of scope. This is explicitly supported by
**Lithic**, **Stripe Issuing**, **Marqeta**, and **Galileo**. **[Confirmed]** —
[[technology-baseline]].

So the lock itself is **standard, not novel** — a commodity issuer-processor
feature. What is differentiated is the **framing**: MCC permissions are derived
from the **procurement contract type**, not a manual expense-card policy, and
both approvals *and* declines become audit events. Honest investor language is
*"uses standard issuer-processor MCC controls,"* **never** "proprietary
technology." The contract-bound framing is the claimed patent novelty — **Target /
Needs proof** as granted scope; see [[11-ip-and-moat]] (filing 64/029,416).

The card layer also does not make card economics disappear. The payment-cost
evidence says cards should be justified when they buy authorization-time control,
spend evidence, and fewer exceptions, not because phone-tap or virtual-card
payments are free.

## Card tier hierarchy

All tiers draw from the **same SAR contract pool** ([[20-xrp-ledger-and-records]])
and no tier can spend beyond the available pool balance.

| Tier | Card | Issued to | Use |
|------|------|-----------|-----|
| Company | Contract Master Card | Vendor company (one per SAR) | Large purchases: bulk fuel, equipment rental, materials |
| Individual | Named Worker Card | Each driver / crew member | Per-shift fuel, tolls, small consumables; **biometric-authenticated** on the phone |
| Equipment | Vehicle / Asset Card | Each truck or asset | Fuel tied to a specific vehicle; per-asset tracking |

The Company card is the administrative parent; the vendor sets sub-limits on
worker and equipment cards within bounds the municipality configured.

## MCC profiles by contract type (examples)

| Contract type | Allowed categories | Always blocked |
|---------------|--------------------|----------------|
| Snow & ice removal | Fuel, auto parts, fleet services, equipment repair | Restaurants, entertainment, retail, cash advances |
| Road maintenance | Fuel, construction materials, hardware, equipment rental | Restaurants, entertainment, clothing, cash advances |
| Fire protection | Fuel, safety equipment, industrial supplies, vehicle repair | Restaurants, entertainment, retail, cash advances |

## The phone-tap lifecycle

Why phone tap instead of a physical card: a tap requires **biometric
authentication** (Face ID / Touch ID / PIN), tying the card to a person rather
than a piece of plastic, and virtual cards reach a worker's Apple/Google Pay
wallet **within minutes** of SAR activation. A physical backup card is available
for **rural terminals without NFC** — same pool, same MCC locks, same webhook.

The authorization path (a real-time webhook call from the card network):

1. Worker taps; device prompts biometric auth; Apple/Google Pay sends a
   tokenized credential to the terminal.
2. Card network calls **CivicChain's authorization webhook**.
3. CivicChain checks, in order: **pool balance** (from Redis, <10ms), **MCC**
   against the SAR allow-list (<5ms), per-card and per-transaction **limits**,
   and **balance sufficiency**.
4. Approve or decline — **targeting under 500ms** (the network auto-declines at
   ~2s). On decline, the worker gets the reason by SMS and app.
5. **Asynchronously**, the event is written to PostgreSQL and anchored to XRPL as
   a memo — never blocking the decision.

**On the "<500ms" number:** it is a **design target** for CivicChain's own
webhook, not a measured production latency, and it is unrelated to XRPL finality
(~3–5s, [[technology-baseline]]). Redis is the live balance source of truth
during authorization; PostgreSQL and XRPL are the persistent record.

## Balance management

The card pool runs on a **strict budget with no auto-refill**. When depleted, all
cards under the SAR are hard-declined and a **Refill Request** goes to the
municipal and platform administrators with burn-rate context; an admin approves a
capped amount, RLUSD moves into the pool, cards re-enable, and the refill is
logged on XRPL. The point is accountability: a contractor who burns the fuel
budget early must explain it before getting more money.

## Issuing partner

CivicChain integrates a commercial card-issuance API; the **authorization webhook
model is architecturally required** for real-time pool-balance checking. Named
candidates: **Marqeta** (just-in-time funding), **Lithic** (developer-first,
simpler early-stage compliance), **Stripe Issuing** (broadest ecosystem).

## Sources

- [[_docs/facts/evidence/technology-baseline]] — §3 MCC-locked card feasibility:
  standard-not-novel verdict, named platforms (2026-06-03).
- [[_docs/facts/CivicChain_Product_Guide_2026]] — card tier/package wording.
  Source-only; unresolved.
- [[_docs/facts/whitepaper]] — §5 Module 4 RLUSD-Funded Phone Tap Payments
  (377-457); §9.4 Card Authorization Latency Requirements (749-758). Raw v9.
- [[_docs/facts/product]] — "What v1.0 actually ships": cards central in demo,
  deferred to Release 2 in the white paper; unresolved boundary.
- [[_docs/facts/evidence/patent-filings]] — filing 64/029,416 (contract-bound
  MCC card control).
- [[_docs/facts/evidence/payment-cost-savings]] — card/contactless economics and
  all-in payment-cost proof standard.

## Related

- [[19-technology-overview|19 — Technology overview]]
- [[21-rlusd-and-payment-rail|21 — RLUSD and the payment rail]]
- [[20-xrp-ledger-and-records|20 — XRP Ledger and records]]
- [[11-ip-and-moat|11 — IP and moat]]
- [[14-how-it-works|14 — How it works (end to end)]]
- [[_docs/business/index|Index — business knowledge base]]
