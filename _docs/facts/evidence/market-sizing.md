---
description: "Internet-sourced reconciliation of municipality counts — US municipalities under 25K and Maine total — with definitions and method notes. Resolves the 16,500-vs-19,500 and 484-vs-488 conflicts flagged in the audit. Evidence input; open primary Census/Maine URLs in-browser before external citation."
depends-on:
  - "[[_docs/facts/evidence/maine-municipal-constraints]]"
---

# Market Sizing Evidence

Internet research (2026-06-03) reconciling the conflicting municipality counts
in the business case to dated, authoritative sources **with a stated counting
method**. **Evidence input, not approved public copy.** The load-bearing primary
pages (census.gov, Maine SOS/Auditor) returned 403 to automated fetch, so the
figures below were cross-confirmed across openable sources — **open the primary
URLs in a browser to capture exact table cells before any external citation.**

## 1. US municipalities under 25,000

- **The conflict is definitional, not arithmetic.** The **2022 Census of
  Governments** counts **35,705 subcounty general-purpose governments**, split
  into **19,491 municipal governments** (incorporated places: cities, villages,
  boroughs) and **16,214 town/township governments** (minor civil divisions —
  the New England / NY / WI / PA "town" form).
  - "**Municipalities**" in the strict Census sense ≈ **19,491** (the "19,500"
    figure). ~76% have fewer than 5,000 people and only ~4% exceed 50,000, so the
    count **under 25,000 is roughly 18,500–18,800** — *no source publishes an
    exact single "under-25K" number*; this band is derived from the size
    distribution.
  - The "**16,500**" figure is **not** a subset of small municipalities — it is
    the **separate town/township category (16,214)**. The business decks appear
    to have mislabeled the township count as "small municipalities under 25K."
- **Status:** **[Confirmed]** for the two category totals (19,491 / 16,214).
  **[GAP: not confirmed]** for an exact published "incorporated places under
  25,000" count — derivable, not a stated Census figure.
- **Sources:**
  - *2022 Census of Governments — Organization* (US Census Bureau, 2023) — https://www2.census.gov/programs-surveys/gus/datasets/2022/2022_gov_org_meth_tech_doc.pdf
    *(figures retrieved via Census-indexed search; PDF 403s to automated
    fetch — verify in-browser)*
  - *Cities 101 — Number of Local Governments* (National League of Cities) — https://www.nlc.org/resource/cities-101-number-of-local-governments/
    *(2012 CoG: 19,519 municipal + 16,360 township — confirms both categories
    are stable and distinct)*
  - *Three-Fourths of the Nation's Incorporated Places Have Fewer Than 5,000
    People* (US Census Bureau, 2020-05) — https://www.census.gov/library/stories/2020/05/america-a-nation-of-small-towns.html

## 2. Maine municipalities (total)

- **Best-supported figure: 482 organized municipalities** as of 2023 = **23
  cities + 430 towns + 29 plantations**. (The rest of the state is **Unorganized
  Territory** — ~435 townships, ~half the land area, governed by the State.)
- **Why the conflict exists:** **vintage drift from plantation deorganization.**
  Maine had **491** municipalities in early 2016; a wave of deorganizations
  (incl. **Drew Plantation, the 54th community to deorganize, in 2023**) brought
  it to 482. **"488" and "484" are older counts** captured during that decline.
- **Status:** **[Confirmed]** at 482 (2023) from the type breakdown; 484/488 are
  **[Conflicting sources]** explained as stale vintages.
- **Sources:**
  - *List of municipalities in Maine* (Wikipedia, as of 2023) — https://en.wikipedia.org/wiki/List_of_municipalities_in_Maine
    *(23 cities + 430 towns + 29 plantations = 482; Drew Plantation → UT 2023)*
  - *Past Municipal Deorganizations* (Maine Office of the State Auditor) — https://www.maine.gov/audit/unorganized-territory/past-municipal-deorganizations.html
    *(primary deorganization registry; 403s to fetch — verify in-browser)*
  - Maine Municipal Association, *About Local Government in Maine* — https://www.memun.org/Training/Citizen-Education/Local-Government-in-Maine

## 3. Maine distribution under 5,000 and under 25,000

- **Best-supported figure:** Of ~482 municipalities, **only 5 exceed 25,000**
  (Portland, Lewiston, Bangor, South Portland, Auburn), so **~477 are under
  25,000**; **~288 are under 5,000**.
- **Status:** **[GAP: not confirmed from primary source]** — the under-5,000 and
  under-25,000 counts come from a Census-data aggregator, not a primary Census
  table. The "5 cities over 25K" list is high-confidence; verify the ~288
  under-5,000 figure against a data.census.gov size-class table before external
  use.
- **Sources:**
  - *Maine Cities by Population (2026)* (maine-demographics.com, citing 2024 ACS
    5-Year, US Census Bureau) — https://www.maine-demographics.com/cities_by_population

## Recommended numbers to use

- **US small municipalities:** use **~19,500 municipal governments** (2022 Census
  of Governments). Method note: *"municipal governments" = incorporated
  cities/villages/boroughs, distinct from the 16,214 town/township MCDs; of these
  ~76% are under 5,000 and the vast majority under 25,000. Do **not** cite
  "16,500" as "small municipalities" — that is the separate township category.*
- **Maine total:** use **482 municipalities** (2023: 23 cities + 430 towns + 29
  plantations; Unorganized Territory excluded). Method note: *484/488 are stale
  pre-deorganization vintages (491 in 2016 → 482 in 2023).*

This supersedes the rougher "~488" used in [[maine-municipal-constraints]] and
the "16,500+ / 19,500" split flagged in [[marketing-content-claim-audit]].
