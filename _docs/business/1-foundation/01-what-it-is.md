---
description: "The one-line thesis, the category CivicChain creates, the three interfaces, and the 'Stripe for Municipal Contracting' hook."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/whitepaper]]"
---

# 01 — What CivicChain is

## Claim Boundary

- Claim status: mixed — see inline labels
- Source note: [[_docs/facts/product]] (What CivicChain is, Three perspectives, Technology, What v1.0 actually ships); [[_docs/facts/whitepaper]] (Executive Summary, §1 Platform Overview) — used as ambition context only.

## The one-line thesis

CivicChain is a transparent municipal contracting platform for smaller towns
that need cleaner procurement, faster contractor payments, and a visible audit
trail without enterprise-level overhead. It replaces the way municipalities
contract vendors, pay them, and report spending to residents. **Actual**
(product reference, current claim boundary).

Lead with municipal contracting, cleaner contractor payments, and visible
accountability. The technology explains *how* trust is verified; it is not the
opening story.

## The hook: "The Stripe for Municipal Contracting"

The one-sentence investor shorthand is **"The Stripe for Municipal
Contracting."** Use it as a memory hook, not as the full thesis. **Actual**
(approved shorthand in product reference).

The analogy works the same way Stripe's does: a single integrated layer that
handles the money movement, the record, and the interfaces so the town does not
have to stitch together checks, spreadsheets, emailed RFPs, and manual
reconciliation. What CivicChain adds beyond a payments processor is a public,
verifiable record of every transaction.

## The category it creates

CivicChain is not municipal accounting software, not a citizen-engagement
portal, and not a payments processor on its own. It combines all three into one
contracting layer where **transparency is the default state, not something a
resident has to request.** **Actual** (positioning in product reference).

The structural differentiator, in the founders' words: *"It does not make fraud
harder to commit by policy. It makes fraud impossible to conceal by design."*
**Actual** (product voice / quote) — but any categorical competitor comparison
behind this line is **Needs proof** (cite current product docs and contract data
before external use).

## The three interfaces

The platform has three interfaces, all connected to the same system. Every
payment is recorded on a public blockchain (the XRP Ledger), so it can be
verified by anyone without reconstructing the record after the fact. **Actual**
(product reference).

| Interface | Who it serves | What it does |
|-----------|---------------|--------------|
| Town administrator console | Town manager / municipal staff | One console for active contracts, card activity, pending approvals, and budget status — replacing scattered email threads, spreadsheets, and paper checks. |
| Vendor / contractor view | The winning vendor | Receives contract award, payment instrument, and residual release; designed so the contractor is paid fast instead of waiting 30–45 days. |
| Public ledger | Residents, press, anyone | Open view — no login, no registration — of every active contract, vendor, transaction, and blockchain hash, verifiable independently on the XRP Ledger. |

A note on the administrator and vendor experience: the current demo and product
narrative center on **MCC-locked virtual payment cards** (loaded with 80% of the
contract value, declined outside approved merchant categories). Treat these as
**core story / Target scope** — the raw white paper's Release 1 says no virtual
cards until Release 2, so cards are **not confirmed v1.0 shipping scope** until
the product owner resolves that boundary.

A note on the public interface: the **voting / civic-input feature is Tier 2**
and jurisdiction-aware. It is a selective public-input layer, **not** a universal
requirement for every municipality and every contract, and **not** a binding
vendor-selection mechanism without jurisdiction-specific legal and procurement
review. **Target** (Tier 2 roadmap).

## What the white paper claims that this is not (yet)

The raw white paper (v9, March 2026) frames CivicChain as **five integrated
modules** — Proposal Engine, Geolocation Voting, Contract Management, RLUSD Phone
Tap Payments, and a Payment Rail — with RLUSD-native settlement and phone-tap
cards as central. That is **v9 ambition, explicitly not the current public claim
boundary.**

| White paper framing | Current claim status |
|---------------------|----------------------|
| Five integrated modules, RLUSD-native end to end | **Target** — current scope ships in USD bridge mode; RLUSD is optional Tier 2 / later-layer settlement. |
| Phone-tap virtual cards as the defining feature | **Target / unresolved** — central to the demo story, but v1.0 card scope is not confirmed. |
| Geolocation-verified citizen voting as the accountability mechanism | **Target** — Tier 2, jurisdiction-aware, not a default. |
| "Built on patented... architecture" | **Needs proof** — use only "provisional applications filed April 4, 2026." Never "issued patents" or "patented technology." |
| Ripple / RLUSD / market / TAM / license / volume figures | **Needs proof** — dated source check required before any external use. |

## What v1.0 actually ships

Confirmed core story for v1.0: public ledger, Smart Agreement Records on the XRP
Ledger, Work Completion Records, payment authorization flow, burn-rate alerts,
and exportable reporting. **Actual** (product reference, confirmed core).

v1.0 ships in USD bridge mode. RLUSD is optional, introduced in Tier 2 after the
first audit cycle. The product launches focused on seasonal service contracts
(snow, roads, landscaping) in towns under 25K population. **Target** (launch
scope and sequencing).

## Cross-source conflicts to surface

This thesis page makes no claim that depends on the open conflicts (v1.0 card
scope, patent status, team and municipality figures). Full list and claim
boundaries: [[_docs/business/index#Open source conflicts]] · [[_docs/business/index#Standing boundaries]].

## Sources

- [[_docs/facts/product]] — "What CivicChain is" (one-line thesis, Stripe
  hook, three interfaces), "Three perspectives" (interface detail), "Technology
  (brief)", "What v1.0 actually ships (and what it doesn't)", and the conflict
  list in "Proof and source discipline."
- [[_docs/facts/whitepaper]] — Executive Summary and §1 Platform Overview (five
  modules, five actor groups), used as ambition context only; subordinate to
  `product.md`.

## Related

- [[02-the-problem|02 — The problem]]
- [[03-the-product|03 — The product]]
- [[14-how-it-works|14 — How it works (end to end)]]
- [[_docs/business/index|Index — business knowledge base]]
