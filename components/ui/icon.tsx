import { cn } from "@/lib/utils";

// Material Symbols Rounded (outline) — one glyph font for the whole site.
// `name` is a curated alias; the value is the Material Symbols ligature the
// font renders. Add a row here when a page needs an icon, so the vocabulary
// stays one readable list instead of raw ligatures scattered through JSX.
const iconLigatures = {
  // ── Product / civic meaning ──
  admin: "account_balance",
  vendor: "storefront",
  citizen: "groups",
  payment: "payments",
  payments: "payments",
  vote: "how_to_vote",
  metric: "monitoring",
  trust: "verified_user",
  email: "mail",
  maine: "location_on",
  record: "receipt_long",
  project: "request_quote",
  send: "send",
  pilot: "route",
  conversation: "forum",
  bids: "gavel",
  approvals: "task_alt",
  workStatus: "timeline",
  paymentTiming: "schedule",
  allowedSpend: "account_balance_wallet",
  completed: "done_all",
  building: "apartment",
  bank: "account_balance",
  card: "credit_card",
  flash: "bolt",
  delivery: "inventory_2",
  search: "search",
  calendar: "calendar_month",
  paid: "paid",
  funding: "savings",
  note: "description",
  announce: "campaign",
  award: "workspace_premium",
  // ── Utility / control ──
  "arrow-left": "arrow_back",
  "arrow-right": "arrow_forward",
  check: "check",
  "check-circle": "check_circle",
  "chevron-down": "expand_more",
  "chevron-right": "chevron_right",
  "chevron-up": "expand_less",
  close: "close",
  compass: "explore",
  menu: "menu",
  globe: "public",
  layers: "layers",
  link: "link",
  "layout-panel-top": "view_quilt",
  "layout-template": "grid_view",
  "more-horizontal": "more_horiz",
  sparkles: "auto_awesome",
  swatch: "palette",
  type: "text_fields",
} as const;

export type IconName = keyof typeof iconLigatures;

// The full named vocabulary, derived from the registry — one source for both
// the `IconName` type and any UI that lists icons (e.g. the brand sandbox).
export const iconNames = Object.keys(iconLigatures) as IconName[];

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconWeight = "light" | "regular" | "bold";

const sizeClasses: Record<IconSize, string> = {
  xs: "icon-sz-xs",
  sm: "icon-sz-sm",
  md: "icon-sz-md",
  lg: "icon-sz-lg",
  xl: "icon-sz-xl",
};

// Stroke override for context: quiet civic line vs loud impact stroke.
// "regular" keeps the size-derived weight (small icons read heavier).
const weightClasses: Record<IconWeight, string> = {
  light: "icon-weight-light",
  regular: "",
  bold: "icon-weight-bold",
};

type IconProps = {
  name: IconName;
  size?: IconSize;
  weight?: IconWeight;
  /** Accessible name. Omit for icons that only decorate adjacent text. */
  label?: string;
  className?: string;
};

export function Icon({
  name,
  size = "md",
  weight = "regular",
  label,
  className,
}: IconProps) {
  return (
    <span
      className={cn(
        "material-symbols-rounded",
        sizeClasses[size],
        weightClasses[weight],
        className,
      )}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {iconLigatures[name]}
    </span>
  );
}
