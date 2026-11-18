# Mobile landing (`/m`) — handoff

**Status:** live on `civic-chain.com` (deploys from `main` → Netlify).
**Branch:** `mobile-landing-slimdown` (also merged to `main`).

## What it is

Phones that hit `civic-chain.com/` are auto-forwarded to **`/m`**, a short,
standalone mobile landing. Desktop is **untouched** — it renders the normal site
exactly as before. The whole feature is deliberately isolated so it can be
removed with zero impact on the desktop site.

## The two files

1. **`app/m/page.tsx`** — the entire mobile landing, as its own route. It reuses
   shared components (it does **not** edit them). Sections, in order:
   - `SiteHeader` (shared nav) → compact hero + CTA → 2-stat proof strip →
     4 benefit cards (`How Civic-Chain helps`) → trust block (`Built on`
     partner logos + a 3-item `<details>` FAQ) → closing CTA → `SiteFooter`.
   - Metadata: `robots: { index: false }` + `canonical: "/"` so it never
     competes with the real homepage in search.
   - Top of the file has a one-line **desktop guard**: a viewer ≥640px wide on
     `/m` is sent back to `/`.
2. **`app/(site)/page.tsx`** — the **only** change to the existing site: a
   one-line inline `<script>` that forwards viewers **<640px** to `/m`. It
   renders nothing and no-ops on desktop.

Nothing else in the repo was changed for this feature.

## How the redirect works

Both guards key off the **same 640px breakpoint** (Tailwind `sm`), so they can
never loop:

- Home `/`: `if (!matchMedia('(min-width:640px)')) location.replace('/m')`
  → phones go to `/m`; desktop stays.
- `/m`: `if (matchMedia('(min-width:640px)')) location.replace('/')`
  → desktop bounces to `/`; phones stay.

It's a client-side redirect because the site is a **static export**
(`output: "export"`), so there is no server/middleware at request time. Phones
in landscape, tablets, or "Request Desktop Site" report ≥640px and correctly get
the desktop site.

## Editing content

All copy lives in plain arrays at the top of `app/m/page.tsx`:
`stats`, `helpCards`, `faqs`. The partner logos + legal footnote come from
`app/(site)/partners/content.ts` (that partner copy is **sign-off-protected** —
do not paraphrase it).

Claim discipline: the benefit cards and FAQ are grounded in `_docs/facts`
(fraud "impossible to conceal", tamper-evident anchoring, efficiency over the
paper stack, float yield "designed to meet the GENIUS Act"). Keep new claims
inside that boundary or stop and check `_docs/facts`.

## Build / test / deploy

- Node **≥20** (`nvm use 20`). Dev: `npm run dev`, then open on a phone via the
  machine's LAN IP (e.g. `http://<lan-ip>:3000`); `/` forwards to `/m`.
  To preview `/m` on desktop, use DevTools device mode (narrow <640px) first,
  or the guard will bounce you to `/`.
- Build check: `npx next build` → `/m` exports to `out/m.html`.
- Deploy: push to `main`. Netlify builds and publishes `civic-chain.com`.
- Verify live: `curl https://civic-chain.com/m` and grep for expected copy;
  `curl https://civic-chain.com/` should contain the `location.replace('/m')`
  guard.

## Rollback

Deleting the feature is clean and leaves the desktop site identical:
1. Remove the `<script>` guard block in `app/(site)/page.tsx`.
2. Delete `app/m/`.
3. Push `main`.

(Equivalently, revert the mobile commits — they only ever touch those two paths.)

## Gotcha (cost us time once)

`git fetch` / remote reads here **must** use the token (authenticated). A plain
`git fetch origin` silently fails and leaves a **stale `origin/main` ref** — it
once falsely showed `main` ~200 commits behind when it was actually in sync.
Always confirm with an authenticated `git ls-remote origin main` before
reasoning about deploy state.
