import type { ReactNode } from "react";

import { SystemIcon } from "@/components/ui/system-icon";
import { cn } from "@/lib/utils";

import { ResolvedTokenValue } from "./token-value";

// Page-local documentation kit for the /brand reference. These are not shared
// UI primitives (they never go to components/ui); they exist only to render the
// real system as readable docs with one consistent language across pages.
//
// The split the kit enforces visually:
//   - a Specimen "stage" (dashed neutral canvas) = the live code, the system.
//   - a Specimen caption (name + note) = the human annotation about it.
// Everything reads the same way on every page, so the eye always knows where
// code ends and explanation begins.

// ── Page title block — one per page ─────────────────────────────
export function DocHeader({
  eyebrow,
  title,
  lede,
  id,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  id?: string;
}) {
  return (
    <section id={id} className="section-shell pt-2 lg:pt-4">
      <div className="mx-auto grid max-page gap-3">
        <p className="captions text-slate-500">
          {eyebrow}
        </p>
        <h2 className="h3">{title}</h2>
        {lede ? (
          <p className="max-w-2xl body-lg text-slate-500">{lede}</p>
        ) : null}
      </div>
    </section>
  );
}

// ── A documentation group: heading + one-line note + content ────
export function DocSection({
  id,
  title,
  note,
  children,
}: {
  id?: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section-shell">
      <div className="mx-auto grid max-page gap-6 lg:gap-7">
        <div className="grid min-w-0 gap-3">
          <h2 className="h4">{title}</h2>
          {note ? (
            <p className="max-w-3xl body-sm text-slate-500">{note}</p>
          ) : null}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

type StageVariant = "paper" | "grid" | "plain" | "frame";

// The neutral canvas a live component sits on. A dashed hairline marks it as a
// specimen stage, never a real tone card — so a button shown here reads as "the
// Button", not "a card with a button in it".
function DocStage({
  variant,
  children,
}: {
  variant: StageVariant;
  children: ReactNode;
}) {
  const frame =
    "flex min-w-0 flex-wrap items-center gap-5 rounded-2xl border border-dashed border-blue-900/20 p-6 sm:p-8 [&>*]:min-w-0";

  // Full-bleed stage for components that own their own width and chrome
  // (the site shell): no padding, no flex centering.
  if (variant === "frame") {
    return (
      <div className="min-w-0 overflow-hidden rounded-2xl border border-dashed border-blue-900/20 [&>*]:min-w-0">
        {children}
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-blue-900/20 bg-cream-50">
        <div
          aria-hidden
          className="landing-grid-overlay pointer-events-none absolute inset-0"
        />
        <div className="relative flex flex-wrap items-center gap-5 p-6 sm:p-8">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(frame, variant === "paper" && "bg-cream-50")}>
      {children}
    </div>
  );
}

// ── The specimen: real name + note, then the live component on a stage ──
export function Specimen({
  name,
  api,
  hint,
  note,
  stage = "paper",
  children,
}: {
  /** The literal component name as it appears in code, e.g. "Button". */
  name: string;
  /** Prop vocabulary, e.g. "variant · size · tone". */
  api?: string;
  /** Inline interaction hint, e.g. "Hover for lift + shadow". */
  hint?: string;
  /** One-line designer annotation. */
  note?: string;
  stage?: StageVariant;
  children: ReactNode;
}) {
  return (
    <figure className="grid min-w-0 grid-cols-1 gap-6">
      <figcaption className="grid w-full max-w-full min-w-0 gap-2">
        <div className="flex w-full min-w-0 flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="body-bold">{name}</span>
            {api ? <code className="min-w-0 break-words body-xs text-slate-500">{api}</code> : null}
          </div>
          {hint ? (
            <span className="inline-flex items-center gap-2 body-xs text-slate-500">
              <SystemIcon name="sparkles" size="xs" />
              {hint}
            </span>
          ) : null}
        </div>
        {note ? <p className="max-w-3xl body-sm text-slate-500">{note}</p> : null}
      </figcaption>
      <DocStage variant={stage}>{children}</DocStage>
    </figure>
  );
}

// ── A single color/value swatch with its live resolved token value ──
export function Swatch({
  name,
  token,
  className,
}: {
  name: string;
  token: string;
  className: string;
}) {
  return (
    <div className="grid gap-2">
      <span
        aria-hidden
        className={cn(
          "h-12 rounded-xl border border-border shadow-inner",
          className,
        )}
      />
      <div className="grid">
        <span className="body-xs font-medium">{name}</span>
        <ResolvedTokenValue tokenName={token} />
      </div>
    </div>
  );
}
