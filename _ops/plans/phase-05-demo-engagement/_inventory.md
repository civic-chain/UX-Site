# Phase 05 · Demo Engagement Inventory

Read-only anchor for phase tasks. Update when a task changes the code surface.

## Demo Routes

| Route | Code entry | Notes |
|---|---|---|
| `/topsham` | `app/topsham/page.tsx` → `components/interface/topsham-demo.tsx` | Primary client demo. Three verticals: TLaaS general fund, TIF district, vendor contracts. Password-gated. |
| `/admin` | `app/admin/page.tsx` → `components/interface/...` | Admin demo. Current state: functional but lighter than Topsham. |
| `/vendor` | `app/vendor/page.tsx` → `components/interface/...` | Vendor-facing demo. |
| `/citizen` | `app/citizen/page.tsx` → `components/interface/...` | Citizen transparency demo. |
| `/dev/components` | `app/dev/components/page.tsx` + `./_demos.tsx` | Component library reference. Server component (metadata) + client demos. Not linked from public site. |

## Interface Component Files (`components/interface/`)

| File | Purpose | Known compliance issues |
|---|---|---|
| `topsham-demo.tsx` | Full Topsham dashboard | Tab bar + vertical picker cards use raw `<button>`; UtilizationRing/CategoryBar use inline styles with var() |
| `compare-tool.tsx` | Feature comparison tool | ~7 raw buttons, ~6 inline styles |
| `ledger-table.tsx` | Ledger table component | 2 raw buttons |
| `luna-companion.tsx` | Luna AI companion widget | 1 inline style |
| `onboarding-wizard.tsx` | Onboarding flow | 2 raw buttons, 1 inline style |
| `tlaas-demo.tsx` | TLaaS demo interface | Many raw buttons and inline styles (largest backlog) |
| `wizard-page.tsx` | Wizard page wrapper | 1 raw button, 1 inline style |
| `demo-auth-shell.tsx` | Password gate wrapper | — |
| `interface-icons.tsx` | Icon adapter (allowlisted) | — |

## UI Primitive Status

| Component | Showcased in `/dev/components` | Notes |
|---|---|---|
| Button | ✓ | variant × size matrix |
| Badge | ✓ | — |
| SurfaceCard | ✓ | — |
| IconChip | ✓ | — |
| Alert | ✓ | 5 variants |
| BannerFlag | ✓ | 5 variants + dismissible + action |
| Table | ✓ | — |
| Dialog | ✓ | — |
| DropdownMenu | ✓ | — |
| Sheet | ✓ | — |
| Tooltip | ✓ | — |
| Toaster / toast | ✓ | — |
| Form (Field, Input, Select, Checkbox, InputGroup) | ✓ | — |
| Media (Image, BrandRasterImage) | ✓ | — |
| Progress | ✓ | Three fill variants (accent, warning, success); indicatorClassName override pattern |
| Expandable | ✓ | Single-open (ExpandableScope + group="single") and multi-open demos |
| Breadcrumb | ✓ | Two-level and three-level path demos |
| StatusChip | ✓ | New primitive in `components/ui/status-chip.tsx` — 5 states: anchored, active, redacted, expiring, pending |
| card.tsx | NOT showcased | Generic card primitive |
| AccentRule, AccentUnderline, HeadlineDot | ✓ | Landing-layer primitives |
| StepBadge, FeaturePill, DotMatrix, CtaContactPair | ✓ | Landing-layer primitives |
| BrandIcon, SystemIcon | ✓ | Icon adapters |

## Patterns Not Yet Formalized

| Pattern | Current state | Target |
|---|---|---|
| StatusChip | Formalized as `components/ui/status-chip.tsx` — 5 states, workspace token pairs | Complete |
| KPI stat card | `components/interface/stat-card.tsx` — Topsham-aligned pattern, showcased at `/dev/components` | Complete |
| Key-value list | Assembled inline in Sheet and sidebar | Document pattern, not new component |
| Empty state | Inline in TabPanel (topsham + hope) and `/dev/components` Table showcase | Documented |
| Loading state | `isLoading` prop on TabPanel/DashboardPanel; skeleton rows inline; shown in `/dev/components` | Documented |

## Workspace Token Layer

Workspace semantic tokens (all in `app/styles/tokens.css`):

| Semantic | Background | Border/Edge | Text/Icon |
|---|---|---|---|
| success | `--workspace-success-bg` | `--workspace-success-edge` | `--workspace-success` |
| warning | `--workspace-warning-bg` | `--workspace-warning-edge` | `--workspace-warning` |
| danger  | `--workspace-danger-bg`  | `--workspace-danger-edge`  | `--workspace-danger`  |
| info    | `--workspace-info-bg`    | `--workspace-info-edge`    | `--workspace-info`    |
| muted   | `--workspace-muted`      | `--workspace-border`       | `--muted-foreground`  |

Surface tokens: `--workspace-panel`, `--workspace-surface`, `--workspace-nav-bg-strong`.
Layout tokens: `--workspace-header-height`, `--workspace-sidebar-width`, `--workspace-grid-gap`.

## Topsham Interaction Model (reference for demo parity)

Three-tier progressive disclosure on transaction tables:
1. Row click → inline expand (quick field summary + hash preview)
2. "View full Stellar record →" link or "···" row action menu → Sheet slide-over
3. Sheet: transaction fields · chain proof (SHA-256 + Stellar tx) · audit timeline · copy footer

Row action menu (DropdownMenu): View full record · Copy SHA-256 hash · Copy record ID.

Budget category bars → transactions table: not yet wired (task-02).
