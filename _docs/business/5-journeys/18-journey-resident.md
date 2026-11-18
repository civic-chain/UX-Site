---
description: "The resident's journey: checking municipal spending without a FOIA request, the public ledger and public spend dashboard, and the Tier 2 jurisdiction-aware civic-input (voting) layer."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/whitepaper]]"
---

# 18 — Journey: the resident

## Claim Boundary

- Claim status: mixed — see inline labels
- Source note: [[_docs/facts/product]] (Three perspectives → For the Resident; How the product works step 6; Harpswell scenario; Technology; What v1.0 actually ships). [[_docs/facts/whitepaper]] §3.1, §3.7 (113–189), §7.2, §7.3 (593–672) — raw v9 ambition, not the current claim boundary.

How a resident checks where their tax money went, what they can see today
versus what is roadmap, and how the civic-input (voting) layer is framed.

This document follows the claim boundary in [[_docs/facts/product]]. The white
paper (`whitepaper.md`) is raw v9 ambition and is explicitly **not** the current
public claim boundary; where it claims more than product.md confirms, the extra
detail is marked **Target** or **Needs proof**.

## The starting point: today's resident

Today, if a resident wants to know how their tax money was spent on road
maintenance, they file a FOIA request or call town hall, and may get an answer
in days or weeks. **Actual** (the problem framing in product materials).

A modeled municipal budget carries audit/FOIA overhead of $3,050 inside the
13.8% leakage scenario on a $385K procurement budget. **Modeled** — this is an
illustrative scenario figure, not an observed average.

## What the resident does instead

With CivicChain, the resident opens the public ledger — no login, no
registration. They can inspect contract records, vendor names, logged spend, and
available blockchain hashes they can verify independently on the XRP Ledger.
The buyer-facing value is defensibility and lower records/audit workload:
transparency becomes a self-serve record path, not only a public-good promise.
**Actual** (described in the demo and product materials as the public interface).

The platform has three interfaces — town administrator, vendor/contractor, and
the public (residents, press, anyone) — all connected to the same system. Contract
events are recorded on the XRP Ledger, so anyone can verify them without
reconstructing the record after the fact. **Actual** that records are anchored —
but coverage is **not** literally "every spend": see the per-spend caveat below.

### The chain of record a resident can verify

The end-state story is that every contract event is anchored on the XRP Ledger
with a unique hash: contract creation, card funding, each spend, residual
payment, and unspent balance return — permanent and unalterable. **Target** as
the full claim, with an unresolved source conflict: in the Harpswell demo
scenario **4 records were anchored** (contract, funding, residual, balance
return) while **3 card spends were logged** — the individual spends were *not*
among the anchored records. So "every spend is anchored" is end-state intent,
not demonstrated demo behavior, and per-spend anchoring further depends on the
unresolved v1.0 card boundary below.

What the demo does show: four anchored records and zero FOIA requests needed to
audit the contract. **Actual** within the demo — Harpswell is a demo scenario,
not a confirmed live customer. Treat this as buyer defensibility / records-load
logic, not evidence that resident engagement itself has been proven.

## The public spend dashboard

The white paper's §7.3 describes a Contract Spend Dashboard with a public
citizen view: any citizen reaches the public portal without logging in and sees
the same contract data as the administrator, with two differences — individual
cardholder identities are omitted (only card tier and vehicle alias shown), and
amounts are displayed in USD-equivalent for accessibility.

| Public spend dashboard element | What the resident sees | Claim status |
|---|---|---|
| Live transaction feed | Each phone tap: timestamp, merchant, MCC category, amount, card tier/alias | **Target** (white paper §7.3 spec; depends on the card program) |
| Budget gauge | Card pool spent vs. remaining, residual reserve, hold-back reserve | **Target** |
| Burn rate indicator | Daily spend vs. projected budget | **Target** |
| Payment history | Full chronological log with an XRPL link per entry | **Target** |
| XRPL verification | Tap a link, verify the transaction on a public block explorer | **Target** for the full dashboard; the underlying public-ledger anchoring is **Actual** as product story |

The white paper's illustrative example: a citizen opens the portal on their
phone, sees the plowing contractor spent $94.18 on fuel at 3:14am on Route 7,
taps the XRPL link to verify it on a public block explorer, and confirms
$11,847 remains in the contract pool — "no freedom of information request, no
waiting for a board meeting, no trust required." **Modeled / Target** — this is
a white-paper illustration, not an observed transaction. The buyer value is a
pre-assembled record that reduces manual response work if residents, press, or
auditors ask.

Two scope cautions on this dashboard:

- The white paper frames the spend dashboard as live once "the RLUSD card
  program goes live." RLUSD is **optional Tier 2 / later-layer** settlement;
  v1.0 ships in **USD bridge mode**. The public spend view in v1.0 should be
  understood against USD-mode settlement, not RLUSD. **Target** for RLUSD.
- The card-by-card and per-tap detail depends on the **unresolved v1.0 card
  boundary**: the current product story treats MCC-locked vendor cards as core,
  while the white paper's Release 1 says no virtual cards until Release 2. Do not
  present per-tap card spend as confirmed v1.0 scope. **Needs proof** (product
  owner must resolve).

## The civic-input (voting) layer — Tier 2

The voting feature is **not in v1.0**. product.md lists geolocation voting as
**Tier 2 / jurisdiction-aware**. It lets residents give verified civic input
from their phone, and it must be understood as a **selective public-input
layer** — not a universal requirement for every municipality and every contract,
and not a binding vendor-selection mechanism without jurisdiction-specific
review. **Target** (Tier 2 roadmap), with the framing constraint as a hard
boundary.

### Why a town might open this layer

The white paper's §3.1 argues that including residents in vendor selection is a
quality signal, not a civic gesture: residents have direct experience with
service delivery (e.g., which plowing contractor left their road impassable last
winter), so their input produces selections that are harder to contest. This is
the **white paper's case** for the feature; it is raw v9 ambition. **Target**,
and explicitly subject to legal and procurement framing before being pitched as
a vendor-selection default.

product.md is firmer than the white paper here: it requires legal and
procurement framing and forbids pitching the vote as a universal
vendor-selection default. Where §3.1 reads as advocacy for binding citizen
selection, product.md governs — keep the resident vote framed as advisory civic
input unless jurisdiction-specific legal review says otherwise. **Surfaced
conflict in framing strength; product.md is authoritative.**

### How participation is verified (white paper §3.x)

The white paper describes a three-layer verification model so that only eligible
residents participate. All of this is **Target** (Tier 2 spec, Release 2 build):

| Layer | Signal | Role |
|---|---|---|
| 1 — Primary gate | Device GPS vs. municipality boundary polygon | Hard gate; vote rejected if GPS is outside the boundary |
| 2 — Corroboration | IP address resolved to region | Audit signal only; logged per ballot, mismatch flagged (protects legitimate VPN users), not used to block |
| 3 — Enrollment gate | Registered municipal address verified against voter roll / utility / state records | Upstream identity gate, verified once at enrollment — the strongest defense against fake accounts |

Each ballot carries a confidence score at submission, stored with the record for
administrators if a result is challenged. **Target**:

| Confidence level | Signals present | Administrator action |
|---|---|---|
| High | GPS in boundary, IP consistent, enrollment verified | None required |
| Medium | GPS in boundary, IP mismatch (VPN suspected), enrollment verified | Logged for audit; no action unless challenged |
| Low | GPS in boundary, IP mismatch, enrollment not fully verified | Flagged for review; may quarantine pending verification |
| Rejected | GPS places user outside boundary | Ballot not accepted; user notified with reason |

Privacy architecture (white paper §3.5, **Target**): the raw GPS coordinate is
used only for boundary comparison and discarded immediately. No coordinate,
device identifier, or IP is written to the public XRPL ledger; only a boolean
result, the zone identifier, and the confidence tier are stored. Votes are
anonymous by default.

### What the resident sees in the voting flow

The white paper's public citizen voting dashboard (§7.2) shows, while voting is
open: participation count, quorum status, time remaining, anonymized proposal
summaries (service scope, coverage zone, pricing tier, vendor identity hidden
until close), and confirmation of the resident's own vote (cannot vote twice).
**Target**.

After close, the dashboard transitions to results for both audiences: final
tally per proposal, winner with vendor name unmasked, winning margin, and
confidence distribution. A downloadable PDF confidence certificate is generated,
signed with a CivicChain platform key, anchored to the XRPL, and verifiable via
a SHA-256 hash of the ballot record. **Target** (white paper marks this a
Release 2 deliverable).

After the vote, §3.7 notes residents track the winning vendor's spend on the
public portal in real time — which is the same public spend dashboard described
above. **Target**, with the same RLUSD and card-scope cautions.

### Demo voting figures

The Harpswell demo scenario records a resident vote: 312 votes cast, 87%
approval (271 approve, 41 reject). **Actual** within the demo only — these are
demo numbers, and Harpswell is a demo scenario, not a confirmed live customer.

## What brings a resident back (open gap)

A resident has a clear reason for the *first* visit — check where the money went
without filing a FOIA request. The canon documents no hook for a *second*. Every
alert the system raises — burn-rate, refill, depletion, disputed WCR — fires to the
**manager's** dashboard, not to residents ([[15-journey-town-manager#Contract Spend Dashboard]]),
and the only resident-facing action, voting, is Tier 2 and advisory. So whether
engagement fades after one look, and what alert or subscription would bring a
resident back, is an open **founder dependency** that needs real user evidence.
(Mirrors the desirability audit, Q19/Q22.) This matters beyond the resident: the
defensibility value exists in the record structure, but workload reduction
depends on whether residents, press, or auditors actually self-serve instead of
calling town hall.

## Claim boundary summary for this journey

- Open the public ledger without a FOIA request, inspect contract records and
  verifiable hashes: **Actual** as the product's transparency story and a
  buyer-side records/audit workload lever.
- Full live public spend dashboard with per-tap card detail: **Target**
  (white paper §7.3), gated on the unresolved v1.0 card boundary (**Needs
  proof**) and on settlement mode (RLUSD is **Target**; v1.0 is USD bridge).
- Tier 2 jurisdiction-aware voting with three-layer verification and confidence
  certificates: **Target**; framing as advisory civic input, not a binding
  vendor-selection default, is a hard constraint pending legal review.
- Patents, and any Ripple / RLUSD / market or volume figures referenced in this
  flow, stay on the shared boundary — [[_docs/business/index#Standing boundaries]].

## Sources

- [[_docs/facts/product]] — "Three perspectives → For the Resident"; "How the
  product works" step 6 (public ledger anchoring); "The Harpswell scenario"
  (demo records, vote figures); "Technology (brief)"; "What v1.0 actually ships
  (and what it doesn't)"; "Proof and source discipline" (claim labels, card
  boundary, voting framing, RLUSD, Harpswell, patents).
- [[_docs/facts/whitepaper]] §3.1 "The Case for Citizen Voting" and §3.3–§3.7
  (113–189): verification layers, confidence scoring, privacy, what citizens see
  — raw v9 ambition, not the current claim boundary.
- [[_docs/facts/whitepaper]] §7.2 (public citizen voting dashboard, post-close
  results, confidence certificate) and §7.3 (public citizen spend dashboard)
  (593–672) — raw v9 ambition, marked **Target** here.

## Related

- [[14-how-it-works|14 — How it works (end to end)]]
- [[15-journey-town-manager|15 — Journey: the town manager]]
- [[16-journey-vendor|16 — Journey: the vendor]]
- [[17-journey-worker|17 — Journey: the worker]]
- [[06-competition|06 — Competition]]
- [[_docs/business/index|Index — business knowledge base]]
