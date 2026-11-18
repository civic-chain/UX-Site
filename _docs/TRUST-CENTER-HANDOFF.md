# Civic-Chain Trust Center — Build Handoff

**Prepared:** 2026-10-27 · for a future session · **Status:** not started

## Why we are building this

The MMA review exposed that Civic-Chain answers security and procurement questions ad hoc, from scratch, per deal. Mature vendors publish a **Trust Center**: a public hub plus a gated repository, so a town can self-serve and a review goes from weeks to "here is our link." We just produced the reusable content (the v3 packet in `~/Downloads`); this turns it into web pages.

Two forcing functions:
1. The v3 legal docs already cite URLs that currently 404: `Civic-Chain.com/subprocessors`, `/licenses`, `/procurement`. These must exist before the packet is sent to a town.
2. The docs reference a Privacy Policy and Terms of Service that are not yet built as reconciled web pages.

Goal: a `/trust` hub plus the specific routes above, honest about current status (no SOC 2 yet, no money-transmitter claim), reusable for every future town.

## Repo facts (so the next session starts fast)

- **Repo:** `/home/nah/Claudia/Civic-Chain-main` (GitHub `justin-harvey/Civic-Chain`, `main` auto-deploys to Netlify).
- **Framework:** Next.js App Router. Site pages live under `app/(site)/`. **Copy the partners page as the template:** `app/(site)/partners/`.
- **Build:** `npm run build` (static export to `out/`). Node >= 20.
- **Lint:** `npm run check` is strict and includes policy checks (`check:design-system`, `check:assets`, `check:instructions`). It is pre-existing red from vendored demo JS, so **validate only your own files**, do not try to get the whole tree green.
- **Design system is enforced** (`check:design-system`): use existing tokens/components, do not hand-roll styles. Read `CLAUDE.md` and `AGENTS.md` in the repo root first.
- **Voice:** match the site narrative; **no em dashes** (Justin's voice, use commas).
- Possible reuse: there is a `scripts/how-diagram/build.mjs` (`npm run build:how-diagram`). Check whether it already renders an architecture diagram we can point the "how it works" section at.

## Information architecture: three tiers

| Tier | What | Mechanism |
| --- | --- | --- |
| **Public (on-site)** | Trust Center landing, subprocessor list, security overview, SLA summary, privacy, terms, regulatory status, procurement/coop vehicles, SOC 2 **status** (honest: readiness, not certified), status-page link | Plain pages |
| **Gated / on-request (NDA)** | The actual SOC 2 report (when it exists), pen-test report, full security questionnaire answers, insurance COIs, counsel's money-transmitter memo, detailed architecture | "Request documents" (mailto or form; NDA click-through later) |
| **Never public** | Sponsor bank specifics, the liability-cap numbers, pricing | Not published |

## Page-by-page content source map

Each public route maps to an artifact already written (all v3 files in `~/Downloads`):

| Route | Source artifact | Notes / cautions |
| --- | --- | --- |
| `/trust` (landing) | `CivicChain_Architecture_Overview_for_MMA.docx` | Overview + links out to everything below. Lead with the "two rails, money vs record" story. |
| `/security` | `InfoSec Policy v3.docx` | It is already written as the public-shareable summary. State SOC 2 as "readiness program, not yet certified." |
| `/subprocessors` | `Subprocessors v3.docx` | This doc is explicitly meant to be public ("always current at Civic-Chain.com/subprocessors"). Lowest-effort, highest-value page. |
| `/licenses` (Regulatory status) | Clause C posture + Architecture Overview §5 | Ship the "software, not a bank + flow-of-funds summary" version now. **Do not claim money transmitter licenses.** Gate the actual memo. |
| `/procurement` | GovtRider §4.3 + coop purchasing language | Cooperative purchasing vehicles list; the GovtRider cites this URL. |
| SLA summary | `SLA v3.docx` | Summarize uptime/credits; link to full doc on request. |
| `/privacy` | Privacy Policy **(NOT yet rebuilt)** | Tier B, deprioritized earlier. Needs the XRPL to Public Ledger reconciliation first. Stub or build this pass (open question below). |
| `/terms` | Terms of Service **(NOT yet rebuilt)** | Same: needs reconciliation; also the ACH-finality fix (Part 5 #4) is still pending. |
| "How it works" / architecture | Two Rails doc + Overview | Consider reusing `scripts/how-diagram`. |

## Honest-status rules (claim discipline, carry from the packet)

- **SOC 2:** "readiness program, not yet certified." Never imply a report exists.
- **No money-transmitter-license claims** until counsel's memo lands.
- **Yield:** disclosed, with a per-municipality pass-through being enabled.
- **On-chain contents:** a hash plus a budget/warrant code, the amount, and the prior hash. Payee names, account numbers, and memos stay sealed off-chain. Money never moves on-chain.
- **Chain-agnostic:** say "Public Ledger," do not hard-code a chain name.

## Dependencies before some pages can go live

- `/privacy` and `/terms` need their source docs reconciled (Tier B, not done). Either build them this pass or stub with "available on request" + contact.
- `/licenses` can ship now with the software-not-a-bank posture; gate the memo until counsel delivers it.
- Decide the gating mechanism before building the "request documents" flow.

## Build plan (ordered, for next session)

1. Read `CLAUDE.md` + `AGENTS.md`; open `app/(site)/partners/` as the template; inventory design-system tokens/components.
2. Scaffold `/trust` landing + nav entry.
3. Ship the already-reconciled pages first: `/subprocessors`, `/security`, SLA summary, `/procurement`, `/licenses`.
4. Build `/privacy` + `/terms` after reconciling those two source docs, or stub them.
5. Add the gated "request documents" flow (start simple: mailto to a trust@ or privacy@ alias).
6. Confirm every URL the legal docs cite now resolves (no more 404s).
7. `npm run check` on your own files, `npm run build`, push to `main` → Netlify. Keep the Roundup/demo content OFF prod (per existing deploy rules).

## Open questions for the next session

- **Gating mechanism:** plain mailto, a form, or a real NDA portal (SafeBase / Vanta Trust Center) later?
- **Privacy + Terms:** rebuild this pass, or stub with "on request"?
- **Architecture visual:** reuse `scripts/how-diagram`, or design fresh?
- **SOC 2 tooling** (Vanta / Drata / Secureframe): affects whether we can embed a live trust badge and auto-answer questionnaires later.

## Where everything lives

- **Source content (v3 packet):** `~/Downloads/` — `MSA & DPA v3.docx`, `GovtRider v3.docx`, `SLA v3.docx`, `Subprocessors v3.docx`, `InfoSec Policy v3.docx`, `CivicChain_Architecture_Overview_for_MMA.docx`, `CivicChain_MMA_Open_Decisions_Checklist.docx`.
- **Ground truth:** `~/Downloads/CivicChain_Architecture_Change_Log_and_MMA_Blockers.md` and `~/Downloads/Two Rails, One Meter (Copy).md`.
- **Site repo:** `~/Claudia/Civic-Chain-main` (this file is in its `_docs/`).
- **Related memory:** `project-civic-chain-contract-repaper`, `civic-chain-site-narrative`, `civic-chain-design-system`, `project-civic-chain-partners-page`.
