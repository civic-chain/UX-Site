import type {
  SurfaceDensity,
  SurfaceMaterial,
  SurfaceTone,
} from "@/lib/design-system-types";
export { typographyTokens as typeScale } from "@/lib/design-system-typography";

// Data tables for the /brand reference. Pages stay thin: this file owns the
// values, the doc-kit owns the layout, the page is just glue.

type ToneToken = {
  name: string;
  bg: string;
  fg: string;
  tone: SurfaceTone;
};

type LogoAsset = {
  label: string;
  src: string;
  alt: string;
  tone: SurfaceTone;
};

type SurfaceMaterialGuide = {
  label: string;
  material: SurfaceMaterial;
  tone: SurfaceTone;
  density: SurfaceDensity;
  role: string;
  use: string;
  avoid: string;
};

// ── Overview: section index ─────────────────────────────────────
export const pageIndex = [
  { href: "/brand/color", label: "Color", body: "Token ramps, structural defaults, and resolved values." },
  { href: "/brand/type", label: "Type", body: "Semantic text utilities, Tailwind source sizes, and usage rules." },
  { href: "/brand/surface", label: "Surface", body: "SurfaceCard tones, materials, density, and page backgrounds." },
  { href: "/brand/components", label: "Components", body: "Shared primitives, public props, and code-level usage." },
  { href: "/brand/examples", label: "Examples", body: "Card compositions that combine shared primitives on tonal surfaces." },
  { href: "/brand/big-components", label: "Big components", body: "SiteHeader and SiteFooter shell behavior." },
  { href: "/brand/rules", label: "Rules", body: "Intent, composition, color laws, and the surface-control contract." },
] as const;

// ── Overview: downloadable client logos ─────────────────────────
export const logos: readonly LogoAsset[] = [
  {
    label: "Wordmark",
    src: "/brand/civic-logo-w-text-horizontal.svg",
    alt: "Civic-Chain wordmark",
    tone: "cream",
  },
  {
    label: "Icon mark",
    src: "/brand/civic-chain-logo.svg",
    alt: "Civic-Chain icon mark",
    tone: "sky",
  },
  {
    label: "Hero variant",
    src: "/brand/civic-logo-hero.svg",
    alt: "Civic-Chain hero logo",
    tone: "gold",
  },
];

// ── Surface: the six SurfaceCard tones ──────────────────────────
export const toneTokens: readonly ToneToken[] = [
  { name: "Cream", bg: "var(--cream-50)", fg: "var(--blue-900)", tone: "cream" },
  { name: "Sky", bg: "var(--blue-200)", fg: "var(--blue-700)", tone: "sky" },
  { name: "Gold", bg: "var(--gold-300)", fg: "var(--gold-800)", tone: "gold" },
  { name: "Sage", bg: "var(--green-300)", fg: "var(--green-900)", tone: "sage" },
  { name: "Slate", bg: "var(--slate-500)", fg: "var(--cream-50)", tone: "slate" },
  { name: "Ink", bg: "var(--blue-700)", fg: "var(--cream-50)", tone: "ink" },
];

// ── Surface: material overlays for reusable card meaning ───────
export const surfaceMaterialGuides: readonly SurfaceMaterialGuide[] = [
  {
    label: "Old paper",
    material: "old-paper",
    tone: "cream",
    density: "roomy",
    role: "Civic explanation",
    use: "Use for history, context, process, and human civic framing.",
    avoid: "Avoid for dense metrics or heavy data tables.",
  },
  {
    label: "Banknote",
    material: "banknote",
    tone: "gold",
    density: "roomy",
    role: "Money and controls",
    use: "Use for savings, payments, approvals, budget flow, and audit value.",
    avoid: "Avoid as a generic decoration when the card is not about money.",
  },
  {
    label: "Blueprint",
    material: "blueprint",
    tone: "sky",
    density: "standard",
    role: "System design",
    use: "Use for architecture, implementation paths, planning, and workflow logic.",
    avoid: "Avoid on emotional or resident-first cards.",
  },
  {
    label: "Notebook",
    material: "notebook",
    tone: "sage",
    density: "standard",
    role: "Field note",
    use: "Use for roles, use cases, operational notes, and practical examples.",
    avoid: "Avoid for official proof or financial claims.",
  },
];

// ── Type: the two typefaces ─────────────────────────────────────
type TypeFamily = {
  label: string;
  family: string;
  token: string;
  role: string;
  utility: string;
  sample: string;
  className: string;
};

export const typeFamilies: readonly TypeFamily[] = [
  {
    label: "Display",
    family: "DM Serif Text",
    token: "--font-dm-serif-text",
    role: "Display headings only.",
    utility: "h4 through h1",
    sample: "Display heading sample",
    className: "h3",
  },
  {
    label: "Sans",
    family: "DM Sans",
    token: "--font-dm-sans",
    role: "Interface, controls, body copy.",
    utility: "captions through body-xl",
    sample: "Interface text sample",
    className: "body-lg",
  },
];

type PaddingStep = {
  name: string;
  shape: "card" | "compact";
  note: string;
};

// Padding uses Tailwind spacing utilities directly. Cards are symmetric on all
// four sides; compact controls are symmetric per axis with the label centered.
export const paddingSet: readonly PaddingStep[] = [
  { name: "p-5 lg:p-6", shape: "card", note: "Standard card. Equal inset on all four sides." },
  { name: "p-7 lg:p-10", shape: "card", note: "Airy card for editorial and metric surfaces." },
  { name: "p-4 lg:p-5", shape: "card", note: "A hair tighter than p-5 lg:p-6, for a nested inner border." },
  { name: "px-4 py-2", shape: "compact", note: "Chip/control. Symmetric left/right and top/bottom." },
  { name: "px-3 py-1", shape: "compact", note: "Compact label/control for dense surfaces." },
];

type RadiusStep = {
  name: string;
  token: string;
  className: string;
  note: string;
};

// Radius scales with object size: large cards round more, small elements less.
// The maximum approved radius is rounded-2xl; no full radius tier.
export const radiusSet: readonly RadiusStep[] = [
  { name: "rounded-xl", token: "--radius-xl", className: "rounded-xl", note: "Small cards, chips." },
  { name: "rounded-2xl", token: "--radius-2xl", className: "rounded-2xl", note: "Maximum for cards, controls, icons, and labels." },
];

type SpacingStep = {
  name: string;
  value: string;
  barClassName: string;
};

// The spacing scale, shown as bars. Space between siblings is one of these,
// applied as Tailwind gap/padding/size utilities — never a one-sided pad.
export const spacingScale: readonly SpacingStep[] = [
  { name: "1", value: "calc(var(--spacing) * 1)", barClassName: "w-1" },
  { name: "2", value: "calc(var(--spacing) * 2)", barClassName: "w-2" },
  { name: "3", value: "calc(var(--spacing) * 3)", barClassName: "w-3" },
  { name: "4", value: "calc(var(--spacing) * 4)", barClassName: "w-4" },
  { name: "6", value: "calc(var(--spacing) * 6)", barClassName: "w-6" },
  { name: "8", value: "calc(var(--spacing) * 8)", barClassName: "w-8" },
];

type Swatch = { name: string; token: string; bg: string };
type PaletteGroup = { title: string; note: string; swatches: readonly Swatch[] };

// The whole palette: six hue ramps, lightness 50 (lightest) → 900 (darkest),
// plus the four structural defaults. Everything the UI paints with is a ramp
// step or a ramp step at an opacity. Each swatch carries a literal Tailwind
// class so the value resolves live in the browser.
export const paletteGroups: readonly PaletteGroup[] = [
  {
    title: "Blue — civic ink",
    note: "Primary ink and low-contrast blue surfaces.",
    swatches: [
      { name: "blue-100", token: "--blue-100", bg: "bg-blue-100" },
      { name: "blue-200", token: "--blue-200", bg: "bg-blue-200" },
      { name: "blue-300", token: "--blue-300", bg: "bg-blue-300" },
      { name: "blue-500", token: "--blue-500", bg: "bg-blue-500" },
      { name: "blue-700", token: "--blue-700", bg: "bg-blue-700" },
      { name: "blue-900", token: "--blue-900", bg: "bg-blue-900" },
    ],
  },
  {
    title: "Gold",
    note: "Accent ramp for calls to attention.",
    swatches: [
      { name: "gold-100", token: "--gold-100", bg: "bg-gold-100" },
      { name: "gold-200", token: "--gold-200", bg: "bg-gold-200" },
      { name: "gold-300", token: "--gold-300", bg: "bg-gold-300" },
      { name: "gold-500", token: "--gold-500", bg: "bg-gold-500" },
      { name: "gold-600", token: "--gold-600", bg: "bg-gold-600" },
      { name: "gold-800", token: "--gold-800", bg: "bg-gold-800" },
    ],
  },
  {
    title: "Green — sage",
    note: "Support ramp for civic and public-record surfaces.",
    swatches: [
      { name: "green-100", token: "--green-100", bg: "bg-green-100" },
      { name: "green-200", token: "--green-200", bg: "bg-green-200" },
      { name: "green-300", token: "--green-300", bg: "bg-green-300" },
      { name: "green-500", token: "--green-500", bg: "bg-green-500" },
      { name: "green-600", token: "--green-600", bg: "bg-green-600" },
      { name: "green-900", token: "--green-900", bg: "bg-green-900" },
    ],
  },
  {
    title: "Cream — warm neutral",
    note: "Default paper and card backgrounds.",
    swatches: [
      { name: "cream-50", token: "--cream-50", bg: "bg-cream-50" },
      { name: "cream-100", token: "--cream-100", bg: "bg-cream-100" },
      { name: "cream-200", token: "--cream-200", bg: "bg-cream-200" },
      { name: "cream-300", token: "--cream-300", bg: "bg-cream-300" },
    ],
  },
  {
    title: "Slate — muted purple",
    note: "Muted neutral and dark-stage support.",
    swatches: [
      { name: "slate-100", token: "--slate-100", bg: "bg-slate-100" },
      { name: "slate-200", token: "--slate-200", bg: "bg-slate-200" },
      { name: "slate-300", token: "--slate-300", bg: "bg-slate-300" },
      { name: "slate-400", token: "--slate-400", bg: "bg-slate-400" },
      { name: "slate-500", token: "--slate-500", bg: "bg-slate-500" },
      { name: "slate-700", token: "--slate-700", bg: "bg-slate-700" },
    ],
  },
  {
    title: "Red — danger",
    note: "Error and destructive-state ramp only.",
    swatches: [
      { name: "red-100", token: "--red-100", bg: "bg-red-100" },
      { name: "red-400", token: "--red-400", bg: "bg-red-400" },
      { name: "red-600", token: "--red-600", bg: "bg-red-600" },
    ],
  },
  {
    title: "Structural defaults",
    note: "Default page colors, border, and focus primitives.",
    swatches: [
      { name: "background → cream-100", token: "--background", bg: "bg-background" },
      { name: "foreground → blue-900", token: "--foreground", bg: "bg-foreground" },
      { name: "border → blue-900/14", token: "--border", bg: "bg-border" },
      { name: "ring → blue-900/24", token: "--ring", bg: "bg-ring" },
    ],
  },
];
