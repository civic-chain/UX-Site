---
description: "Go-to-market strategy: speed-vs-margin tension, BaaS Path A to Path B migration, four-phase national rollout, and the municipal-association channel."
depends-on:
  - "[[_docs/facts/product]]"
  - "[[_docs/facts/CivicChain_Product_Guide_2026]]"
  - "[[_docs/facts/whitepaper]]"
  - "[[_docs/facts/evidence/records-and-civic-law]]"
  - "[[_docs/facts/evidence/payment-cost-savings]]"
  - "[[_docs/facts/evidence/market-sizing]]"
  - "[[_docs/facts/evidence/funds-flow-and-licensing]]"
  - "[[_docs/business/2-market/05-customers-and-beachhead]]"
  - "[[07-business-model-and-pricing]]"
  - "[[customer-savings-mechanism]]"
  - "[[08-financial-projections]]"
  - "[[_docs/business/4-execution/legal-and-compliance]]"
---

# 09 — Go-to-market

## Claim Boundary

- Claim status: mixed — see inline labels. product.md is the current claim boundary; whitepaper §13 numbers are raw v9 forecast economics, marked Modeled or Needs proof.
- Source note: [[_docs/facts/product]] (How it spreads, Market context, Pricing, Technology, What v1.0 ships); [[_docs/facts/CivicChain_Product_Guide_2026]] (source-only Transparency Pilot and procurement claims); [[_docs/facts/whitepaper]] §13 Go-to-Market and BaaS (980-1183); [[_docs/facts/evidence/records-and-civic-law]] (procurement-law caveats); [[_docs/facts/evidence/payment-cost-savings]] (Phase 0 measurement wedge); [[_docs/facts/evidence/market-sizing]] (municipality denominators); [[_docs/facts/evidence/funds-flow-and-licensing]] and [[legal-and-compliance]] (MTL, BaaS, float caveats); [[05-customers-and-beachhead]] (beachhead/channel owner); [[07-business-model-and-pricing]], [[customer-savings-mechanism]], and [[08-financial-projections]] (pricing, savings-value, and forecast owners)

This document covers how CivicChain reaches market: the strategic tension
between launching fast and owning margin, the planned move from a rented
compliance stack (Path A) to an owned one (Path B), the four-phase national
rollout, and the municipal-association channel that carries it.

Narrative rule for GTM: sell the municipal buyer's ROI first. Vendor payment,
resident transparency, and public ledger access are adoption proof only when
they reduce buyer risk, widen the bidder pool, lower modeled payment-risk
premium, save staff time, or make the purchase easier to defend.

A discipline note before the numbers. The growth logic and channel mechanics
below are confirmed product narrative drawn from `product.md`. The dollar
trajectories, phase customer targets, and infrastructure-cost figures come from
the raw white paper §13, which is v9 ambition and **not** the current public
claim boundary. They are presented here as **Modeled** scenario economics or
**Needs proof** where they depend on dated external checks (rail volume,
interchange, float yield, license counts, ARR). Do not move any of these into
external copy without the owner resolving them against a dated source.

---

## The channel logic: how it spreads

CivicChain's growth model is not traditional marketing. It is confirmed product
narrative that distribution runs through three self-reinforcing pressure loops
plus an association channel. **Actual** (described in current product
materials):

- **Vendor pressure.** A contractor gets a cleaner, faster approved-payment
  workflow in one town and waits through a slower manual cycle in the next. The
  buyer-side point is not vendor charity; it is a wider bidder pool, fewer
  status-chasing calls, and a lower modeled payment-risk premium.
- **Competitive pressure.** When one town's bids drop because vendors no longer
  price in payment risk, the neighboring town notices the gap. (Earlier framing
  cited "Maine law (§124) must accept the lowest responsible bid" — but §124 is
  *county* purchasing and the state standard is best-value, so the town-level duty
  is **Needs proof**, see [[records-and-civic-law]].)
- **Public-record pressure.** A body of towns with public procurement records
  showing lower bids and cleaner audit/public-record posture becomes evidence
  that is hard to ignore. The platform markets itself through buyer-defensible
  proof, not through transparency as a standalone public good.

The expansion path of record in `product.md` is: **Maine pilot towns → Maine
Municipal Association → national channels (ICMA, NLC).** The white paper §13
generalizes this to all state municipal associations; treat that broader claim
as **Target**.

**Fallback if associations do not endorse.** No fallback distribution motion is
confirmed. The owner-safe fallback is still a founder decision: direct outreach to
the eight target towns, a paid or transparency-only pilot with one reference
town, regional council-of-governments / joint-procurement entry, or accountant /
auditor referral. Until one is chosen, the association channel is a **Target**
path, not a guaranteed go-to-market route. See [[business-status]] and
[[open-external-blockers]].

The bid-savings mechanism was framed as leaning on a legal fact — but that fact
does **not** hold as stated: §124 governs *county* purchasing, and the Maine
*state* standard is best-value, not "lowest responsible bid" (5 M.R.S. §1825-B);
the sub-5K *town* standard is local-ordinance ([[records-and-civic-law]]).
Removing the payment-risk premium lowers bids, but "the statute drives the savings
automatically" is **Needs proof** at the town level — downgraded from Actual. The
mechanism still works through buyer choice and visible public-record pressure; it
is not a guaranteed statutory result.

---

## Transparency-first pilot wedge

There is a lower-friction entry path before CivicChain moves a dollar:

> Make already-approved municipal spending visible, tamper-evident, and easier
> to answer under public-records pressure.

This is a **Target / Needs proof** go-to-market wedge, not a replacement for the
core vendor-payment model. It helps with the first-sale problem because it avoids
the hardest day-one blockers: custody, stablecoin settlement, card issuing,
Plaid/bank-feed politics, and full ERP integration.

The all-in payment-cost evidence makes Phase 0 more than a nice transparency
demo: it can become the measurement instrument. Before claiming ROI, use the
wedge to capture the current cost per reconciled, audit-ready transaction:
manual warrant/AP time, bank statement fees, exceptions, audit prep, and
public-record response burden. The buyer payoff is a defensible baseline: the
town learns how much staff time, risk, and proof assembly the current workflow
really consumes.

| Step | Input | CivicChain output | Why this order |
| --- | --- | --- | --- |
| 0 | Public warrants / agenda PDFs already posted online | Parsed warrant batch, public dashboard, ledger hash | Shows staff-time/public-record value with no town agreement or money movement. |
| 1 | Manual warrant CSV upload | Immutable warrant batch + public spending view | One finance upload per meeting; minimal IT burden. |
| 2 | Scheduled SFTP AP export | Nightly AP / warrant dashboard | Near-live without bank-feed politics. |
| 3 | ERP API | Near-real-time AP/budget sync | Stronger, but requires vendor/town authorization. |
| 4 | Bank/Plaid feed | Settled transaction evidence | Useful after trust; poor first ask for small municipalities. |
| 5 | WCR + payment authorization + controlled spend | Core CivicChain vendor-payment workflow | Only after the town trusts the evidence layer. |

Do not turn this into a second product thesis. The wedge should ladder into the
same product sequence: transparency-only dashboard -> warrant/AP evidence layer
-> WCR and payment authorization -> controlled vendor spend -> RLUSD/card rail
where justified.

The 2026 Product Guide reinforces this wedge with a "Transparency Pilot" and
2-4 week go-live language. Keep only that sequencing signal; do not import its
"no procurement process in most New England states" claim without counsel or
auditor proof.

Also do not import a second ledger story. The local product canon is XRPL/RLUSD;
Stellar or any alternate chain is a strategy fork that needs an explicit owner
decision before it appears in GTM materials.

---

## The core tension: speed vs. margin

Getting municipalities paid in real time forces one early choice: rent the
compliance infrastructure and reach market in months, or build it and own the
margin for years. The white paper's position is that the right answer changes
with stage — speed wins at seed, margin wins at Series A — and that the entire
section is about knowing when to migrate between the two.

The two paths, as modeled in white paper §13.1. **All figures Modeled**
(forecast economics); the rail-volume, interchange, and float-yield rows are
additionally **Needs proof** (dated source check) before any external use:

| Dimension | Path A — BaaS partner (seed) | Path B — Independent (Series A+) |
|---|---|---|
| Time to first live payment | 3–5 months | 12–24 months |
| Upfront cost | $175K–$295K | $750K–$1.5M |
| Ongoing compliance cost | Low (partner's burden) | High ($200K+/year) |
| Settlement speed | Same-day ACH or RTP | Minutes via Ripple Rail |
| RLUSD / stablecoin | No: USD only | Yes: full stack |
| Net interchange margin | ~0.9% net | ~1.5% gross |
| Float yield per customer/yr | ~$1,300 (shared) | ~$2,960–$6,600 (full) |
| Float at 1,990 customers | ~$2.6M ARR | ~$5.9M–$13.1M ARR |
| Regulatory risk | Low (partner absorbs) | High (yours to manage) |
| Investor narrative | Pragmatic, capital-efficient | Ambitious, higher moat |

**Recommended approach (white paper §13.1):** start on Path A (BaaS), migrate to
Path B at Series A. Under Path A the $750K Ripple Rail seed line item drops to
~$250K, freeing a ~$500K delta for engineering and customer acquisition. The
white paper claims migration payback at Series A is under 30 days at 25+
customers, and that every year of delay after Series A is a compounding cost.
**Modeled.**

Note the consistency check with `product.md`: v1.0 ships in USD bridge mode, and
RLUSD is an optional Tier 2 / later-layer settlement path. The Path A "USD only"
position matches that boundary. The Path B "minutes via Ripple Rail" and full
RLUSD stack are **Target** rail-path claims, not proof of live operations —
Ripple, RLUSD, and rail-volume claims are **Needs proof** (dated source check).

---

## BaaS partner evaluation

White paper §13.2 names five candidate providers for the Path A integration,
judged on native card issuing, real-time authorization webhooks,
government-adjacent fintech experience, and commercial terms that do not leave
revenue-sharing obligations surviving the Series A migration. This is internal
vendor assessment, not a commitment. **Target** (no provider selected in
`product.md`):

| Provider | Strengths | Fit assessment |
|---|---|---|
| Column Bank | Real bank charter, developer API, ACH + wire + card issuing | Strong: native card issuing, real bank not middleware |
| Unit | Card issuing + ledger + compliance built in | Very strong: widely used by gov-adjacent fintechs |
| Increase.com | Modern bank API, ACH + RTP + cards | Strong developer experience, honest pricing |
| Synctera | Fintech-designed, bank-sponsor model | Flexible on custom use cases |
| Stripe Treasury | Easiest integration, fastest to market | Good for MVP: thin margins, platform owns relationship |

A boundary reminder tied to provider selection: this evaluation assumes virtual
card issuing as core scope. **v1.0 card scope is unresolved** — the demo and
product story treat MCC-locked cards as core, but the white paper's Release 1
says no virtual cards until Release 2. Do not present card issuing as confirmed
v1.0 scope, and do not let the BaaS card-issuing criterion imply that cards ship
at launch. **Needs proof** (owner must resolve the card boundary).

---

## BaaS revenue impact (GTM view)

The financial model lives in [[08-financial-projections|08 — Financial
projections]]. GTM only needs the decision it implies: accept a finite seed-stage
BaaS margin drag to launch fast, then make full margin capture a Series A
milestone.

White paper §13.3 estimates the two-year seed drag at roughly **$4.5M** in
deferred revenue, against a **~$750K** migration investment and payback **under 30
days at 25 customers**. **Modeled / Needs proof.** The GTM use of that model is
not "BaaS is cheaper"; it is "BaaS buys speed, owned rail later buys margin."

The blended $35,000 SaaS ACV is a modeling assumption; it does not match any
single row of the `product.md` pricing table (Track A $25K–$75K, Track C
$6K–$15K, Track B $0). Treat it as a blended-book average, **Modeled**, not a
list price.

---

## Four-phase national rollout

White paper §13.4 lays out a staged geographic and segment expansion over ~10
years, each phase gated by the prior phase's proof points and funded by the ARR
it generates. The phase structure and customer targets below are **Target**
(roadmap intent); the ARR and infrastructure-cost figures are **Modeled** and,
where they touch rail/interchange/float/license, **Needs proof**.

### Phase 1 — New England beachhead (2026–2027, seed)

- **Geography:** New England — ME, NH, VT, MA, RI, CT.
- **Segment:** municipalities under 25,000 population.
- **Customer target:** 40 by end of Year 1 (accelerated), 117 by end of Year 2.
- **Infrastructure:** BaaS Path A (Column or Unit), USD-denominated, ACH
  settlement.
- **ARR at phase end:** $8.67M accelerated / $1.62M base. **Modeled.**

Rationale: density, not nostalgia. The white paper cites ~1,400 municipalities
across six states networked through state municipal associations, where a
reference customer in one Maine town influences neighboring towns. (The 1,400
New England figure also appears in `product.md` market context as the initial
SOM, marked **Needs proof** — source before external use.) Phase 1 levers:
state municipal-association group-procurement vehicles, a 90-day free pilot tier
for towns under 2,500 population (below most micro-procurement thresholds), tax-
season onboarding timing, and a referral program through municipal accountants
and consultants.

### Phase 2 — National small-town rollout + Path B migration (2028–2029, Series A)

- **Geography:** all 50 states, focus on Midwest and Southeast after New England
  saturation.
- **Segment:** municipalities under 25,000 (national), first 50 counties.
- **Customer target:** 248 by end of 2028, 428 by end of 2029.
- **Infrastructure:** migrate to Path B (Ripple Rail, RLUSD, full interchange
  and float).
- **ARR at phase end:** $44M (2029, accelerated). **Modeled.**

Funded by Phase 1 ARR plus a planned $15M Series A. The BaaS-to-Ripple-Rail
migration happens at Series A close, with licensing work running in parallel
during Phase 1 so it activates immediately. A vendor marketplace adds a network
effect: a vendor registered in one state appears in another's procurement
without resubmitting documents. **Target / Modeled.** RLUSD and Ripple Rail
remain **Needs proof** rail-path claims.

### Phase 3 — County and mid-city layer (2029–2031, Series B)

- **Segments:** US counties (3,069 total, target 200), mid-sized cities
  25K–500K population (target 50).
- **Customer target:** 500 municipalities + 200 counties + 50 cities by 2031.
- **Infrastructure:** full Path B, national MTL coverage (all 50 states),
  white-label for county governments.
- **ARR at phase end:** ~$133M (accelerated). **Modeled.**

The white paper argues counties carry higher payment volumes (~$85M annually
vs. ~$18M for small towns) and often administer contracts for their constituent
municipalities, making a county contract a force multiplier. National MTL
(money-transmitter license) coverage is a **Needs proof** license claim. The
multi-municipality white-label is Tier 4 in `product.md`'s shipping boundary —
**Target**, not v1.0.

### Phase 4 — State contracts (2031+, Series C)

- **Segment:** state governments (50 total, target 5–10 contracts by 2033).
- **Per-state economics:** ~$2M SaaS ACV + ~$24M transaction fees + ~$1.1M float
  = ~$27M ARR per state. **Modeled / Needs proof.**
- Five state contracts add ~$135M ARR — modeled as equivalent to the entire
  small-municipality book at Year 10.

State contracts are the highest-value, longest-cycle sales in the model, built on
the credibility of 200-plus municipal deployments and a multi-year public-ledger
record. The white paper notes state contracts "often obligate or strongly
incentivize" municipal adoption within that state; treat the strength of that
obligation as **Needs proof** (legal/procurement confirmation).

The white paper also reframes the patent portfolio at this stage as a sales
asset — "provisional patents on blockchain payment architecture and geolocation
voter verification." Hold the patent language to the evidence boundary:
**provisional applications filed April 4, 2026**, never "issued patents" or
"patented technology." Geolocation voting is Tier 2, jurisdiction-aware civic
input — not a universal default and not a binding vendor-selection mechanism
without legal review.

---

## Modeled ARR trajectory

The canonical forecast table lives in [[08-financial-projections|08 — Financial
projections]]. GTM keeps only the market-sequencing read: Phase 1 proves the New
England small-town motion, Phase 2 funds national rollout and Path B migration,
and county/state expansion stays upside until separately proven.

> **Number note.** The phase-end ARR figures in the four phase blocks above are
> the white paper's §13.4 phase-summary roundings (e.g. 2029: 428 customers /
> $44M; Phase 3 end 2031: ~$133M). They differ from the §13.5 year-by-year table,
> which the ARR owner [[08-financial-projections]] treats as canonical (2029: 478
> incl. counties / $58.3M; $133M at 2032). Both are **Modeled / Needs proof**; if
> you cite an ARR number, take it from 08, not from these stage roundings.

---

## Cross-source conflicts to surface

GTM-specific framing to keep inside the boundary:

- **Card v1.0 scope** — the BaaS provider evaluation assumes card issuing; do not
  let it imply launch-day cards (demo treats cards as core; white paper Release 1
  defers them).
- **Phase customer targets** sit on municipality denominators now **reconciled**
  in [[market-sizing]] (~19,500 municipal governments; the "16,500" was the
  separate township category). The 1,400 New England SOM still needs a source.
- **Phase 4 patent-as-sales-asset** framing must stay inside "provisional
  applications filed April 4, 2026."
- **Payment-cost wedge** — do not lead with "crypto beats bank fees." Lead with
  the measurable all-in workflow cost and compare against ACH/e-check, FedNow,
  RTP, AP automation, and controlled-spend alternatives.

Full conflict list (team figures, etc.) and boundaries:
[[_docs/business/index#Open source conflicts]] · [[_docs/business/index#Standing boundaries]].

---

## Sources

- [[_docs/facts/product]] — "How it spreads" (vendor / competitive / public-
  record pressure loops, ICMA/NLC expansion path), "Market context" (New England
  SOM, target towns, municipality counts), "Pricing" (Track A/B/C), "Technology"
  and "What v1.0 actually ships" (USD bridge mode, RLUSD Tier 2, card boundary,
  geolocation voting Tier 2), conflict list.
- [[_docs/facts/whitepaper]] §13 Go-to-Market and BaaS Partnership Model
  (lines 980–1183): §13.1 speed-vs-margin, §13.2 BaaS evaluation, §13.3 revenue
  impact, §13.4 four-phase rollout, §13.5 ARR trajectory. Raw v9 ambition,
  not the current public claim boundary.
- [[_docs/facts/evidence/records-and-civic-law]] — procurement-law caveats and
  the town-level "lowest responsible bid" downgrade.
- [[_docs/facts/evidence/payment-cost-savings]] — Phase 0 measurement wedge and
  all-in payment-cost proof standard.
- [[_docs/facts/evidence/market-sizing]] — reconciled municipality counts and
  New England SOM caveat.
- [[_docs/facts/evidence/funds-flow-and-licensing]] — money-mover, BaaS, MTL,
  and float-yield caveats behind the Path A/Path B plan.
- [[05-customers-and-beachhead|05 — Customers and beachhead]] — beachhead,
  target-town, and channel-pressure owner.
- [[07-business-model-and-pricing|07 — Business model and pricing]] — pricing and
  revenue-component owner.
- [[customer-savings-mechanism|Customer savings mechanism]] — customer-savings
  value mechanism and all-in transaction-cost measurement model.
- [[08-financial-projections|08 — Financial projections]] — ARR and BaaS
  revenue-impact owner.
- [[legal-and-compliance|Legal and compliance posture]] — legal owner for MTL,
  procurement, float, and counsel-needed GTM claims.

## Related

- [[05-customers-and-beachhead|05 — Customers and beachhead]]
- [[07-business-model-and-pricing|07 — Business model and pricing]]
- [[12-roadmap-and-stages|12 — Roadmap and stages]]
- [[_docs/business/index|Index — business knowledge base]]
