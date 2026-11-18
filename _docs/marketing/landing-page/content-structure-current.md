---
description: "Faithful map of the landing page (/) as it ships today — section order, real copy, CTAs, and links — captured from the code, plus a short diagnosis against the audience map. The 'before' half of the before/after pair."
depends-on:
  - "[[audience-fears-and-wants]]"
---

# Landing content structure — current

A faithful record of what is on `/` today, captured 2026-06-03 from
`app/(site)/page.tsx` and its section files. The **code is the source of
truth**; this document mirrors it so we can compare "before" against the
improved structure. Copy is quoted verbatim. Italic *Note* lines are diagnosis,
not part of the page.

## Page chrome

- **Header** (`site-header.tsx`): Civic Chain logo (links home) + a single pill
  button showing `info@civic-chain.com`. No nav menu.
- **Footer** (`site-footer.tsx`): "© 2026 Civic Chain" + links **About**,
  **Contact**, `info@civic-chain.com`.

## Section flow (7 sections, in render order)

The page renders: Hero → Portal Hub → Problem → How It Works → Numbers → CTA →
FAQ. Note the close: **CTA comes before FAQ**, so the page ends on FAQ, not on
the call to action.

---

### 1. Hero — `#hero`

- **Headline:** "Every dollar / on the record."
- **Body:** "A procurement platform where money moves fast, and everyone can
  watch."
- **CTA:** "Contact us" → `info@civic-chain.com`.
- **Two support blocks:**
  - **For residents** — "Public spending stays visible without a request, a
    login, or a call to town hall."
  - **For vendors** — "Card-funded work begins the same day the contract is
    awarded, not a month later."
- **Illustration:** civic scene with a public procurement record board.

*Note — outcome-first, good: leads with transparency + speed, not "blockchain."
Two gaps: (1) the buyer — town staff / the town manager — is not one of the two
support blocks; the page opens speaking to residents and vendors, not to the
person who signs. (2) "money moves fast" and "same day the contract is awarded"
assert a settlement speed the canon marks **Target** and gates behind the
select-board warrant cycle — see [[audience-fears-and-wants]] (vendor "same day"
honesty note).*

### 2. Portal Hub — `#portal-hub`

- **Eyebrow:** "Portal Hub" · **Title:** "Three clear views"
- **Body:** "Choose the view that fits your role. Each entry opens the same
  contract from a different perspective."
- **Three cards (each links to a demo interface):**
  - **Town staff** → `/admin` — "Manage bids, approvals, and payments in one
    place." Pills: Bids & proposals · Approvals · Payments.
  - **Contractor** → `/vendor` — "Track work status, payment timing, and allowed
    spending." Pills: Work status · Payment timing · Allowed spend.
  - **Public record** → `/citizen` — "See what was approved, spent, and
    completed." Pills: Approved · Spent funds · Completed.
- **Behavior:** a sticky compact portal bar appears on scroll.

*Note — this is the second thing a visitor sees, right after the hero. It pushes
people into demo portals before the page has made any argument (problem, how,
why). Through the audience lens, it invites exploration before it has reduced any
fear. There is a real "show, don't tell" case for keeping it high, but the
improved buyer-first spec now recommends demoting it below the buyer argument.*

### 3. Problem — `#problem`

- **Eyebrow:** "The Problem" · **Title:** "Contract work is scattered. Slow.
  Unclear"
- **Body:** "Most municipalities manage real contractor spend through inboxes,
  PDFs, calls, and memory. The result is weaker clarity, weaker accountability,
  and slower answers for everyone involved. In most towns, one person is managing
  all of it."
- **Three cards:**
  - **01 Fragmented workflow** — procurement, approvals, work confirmation, and
    payment follow-up live in different places and depend on staff memory.
  - **02 Payment friction** — contractors face uncertainty on timing, status, and
    approvals, which can raise the price of risk.
  - **03 Late visibility** — "Most public records requests are just asking who got
    paid what. A live ledger answers that before anyone asks."

*Note — the "one person managing all of it" line and card 03 are the closest the
page comes to the town manager's real world. But the framing is abstract
("inboxes, PDFs, calls") rather than the concrete pains the audience map names:
the one-person five-role office, audit prep, FOAA Fridays. Strong raw material,
under-aimed.*

### 4. How It Works — `#how-it-works`

- **Eyebrow:** "How It Works" · **Title:** "From request to payout"
- **Body:** "Civic-Chain turns a fragmented process into a shared contract
  workflow. Each step below pairs two stages that stay connected inside the same
  contract record."
- **Three steps:**
  - **01 Open the work and keep the starting record clear** — town publishes the
    request and can document public input "where appropriate without letting that
    layer take over." Stages: Publish request · Document input.
  - **02 Move from award to controlled spend** — contract record, spend rules, and
    payment readiness stay tied to one workflow. Stages: Record award · Control
    spend.
  - **03 Confirm the work and authorize payout** — completed work is confirmed
    before payout. Stages: Confirm work · Authorize payout.

*Note — solid and claim-safe. Public input is framed as optional (matches the
Tier 2 boundary). "Controlled spend" leans toward the card mechanism without
naming cards, which keeps it inside the boundary. Does not yet say it works
inside the board's warrant approvals — an honest reassurance it could add.*

### 5. Numbers — `#numbers` (eyebrow "Why It Matters")

- **Title:** "Friction costs money"
- **Body:** "When every contract is managed manually, cost grows on both sides.
  Staff chase status, contractors price around uncertainty, and weak visibility
  makes every follow-up slower."
- **Three sourced metrics:**
  - **$208B** — cost to U.S. construction from late payments in a year, up 53%
    (Rabbet, 2022 Construction Payments Report).
  - **~25%** — of global government procurement lost to inefficiency, ~$1T/yr
    (World Bank, 2022).
  - **82% faster** — invoice processing with digital workflows (Ardent Partners,
    2024).
- **Feature metric — 4 seconds:** "to settle a vendor payment on XRPL versus 1 to
  3 business days on ACH. Civic-Chain funds vendors the same day a contract is
  awarded, at less than a cent per transaction instead of $25 to $50 per wire."
  (XRP Ledger Foundation.)

*Note — the three external stats are real and properly cited; keep them. The
**4-seconds feature line is the page's sharpest claim-honesty issue:** "funds
vendors the same day a contract is awarded" presents a **Target** rail capability,
gated by the §5603 warrant cycle, as present fact. The 4-second figure is the
rail's settlement speed, not a measurement of CivicChain's live payment path.*

### 6. CTA — `#cta` (eyebrow "Next Step")

- **Title:** "Contact us"
- **Body:** "If you want to talk through the workflow, reach the team directly."
- **CTA:** "Contact us" → `info@civic-chain.com`.

*Note — generic. Aimed at no one in particular; does not speak to the town
manager's next step (a pilot conversation).*

### 7. FAQ — `#faq`

- **Title:** "Quick answers"
- **Body:** "The end of the page should close calmly. These answers are here to
  remove friction, not to restart the story."
- **Five Q&A:**
  1. **Who is Civic-Chain built for?** — any entity managing shared contractor
     spend: small towns, mid-size cities, counties, school districts, HOAs.
  2. **Why start with smaller municipalities?** — concentrated pain, lean teams,
     strong accountability pressure.
  3. **Is Civic-Chain primarily a blockchain company?** — "No… a municipal
     contracting and accountability platform first."
  4. **Is public input required for every contract?** — "No… not the default
     mechanism for every municipality and every contract."
  5. **Why does contractor payment clarity matter?** — uncertainty creates
     friction on both sides.

*Note — Q3 and Q4 directly honor the canon (blockchain underneath; public input
optional). Strong. Missing: the town manager's two real adoption fears — "do I
have to replace my current system?" (TRIO double-entry) and "does this go around
my select board?" (warrant authority).*

---

## Where it stands vs the audience map

What the current page already gets right (keep these):

- **Outcome-first, blockchain underneath** — honored in the hero and stated
  outright in FAQ Q3.
- **Public input framed as optional** — FAQ Q4 matches the Tier 2 boundary.
- **Real, cited external numbers** — the Numbers section is stronger evidence
  than the canon's internal "Needs proof" figures.

The gaps the improved structure has to close
([[content-structure-improved]] carries the fixes):

1. **The buyer is never sold to.** Nothing on the page answers the town
   manager's fears (political cover, audit-readiness, freeing the clerk's
   Friday). The hero speaks to residents and vendors; the manager only appears as
   a portal link.
2. **No relief framing.** The page describes features and friction; it does not
   convert the manager's fears into calm relief.
3. **Claim-honesty on speed.** Hero and Numbers assert same-day / instant
   settlement that the canon marks **Target** and gates behind the warrant cycle.
4. **FAQ misses two adoption objections** — replacing the current system, and
   bypassing the select board.
5. **Portal Hub placement** — demo entry points sit above the argument. This is
   useful product proof, but it gives three co-equal front doors before the buyer
   has been sold.

## Sources

- `app/(site)/page.tsx` — section order.
- `app/(site)/_sections/{hero,portal-hub,problem,how-it-works,numbers,cta,faq}-section.tsx` — copy.
- `components/site/site-header.tsx`, `components/site/site-footer.tsx` — chrome.
- [[audience-fears-and-wants]] — the audience map this is diagnosed against.
