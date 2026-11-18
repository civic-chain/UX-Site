import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AccentRuleSides = "both" | "left" | "right";

type AccentRuleProps = {
  sigil?: ReactNode;
  sides?: AccentRuleSides;
  className?: string;
};

export function AccentRule({
  sigil,
  sides = "both",
  className,
}: AccentRuleProps) {
  const renderedSigil = sigil ?? (
    <span
      aria-hidden="true"
      className="inline-block size-1.5 rounded-2xl bg-gold-300"
    />
  );

  return (
    <span
      aria-hidden={sigil ? undefined : "true"}
      className={cn(
        "flex items-center gap-3 text-blue-900/30",
        className,
      )}
    >
      {sides !== "right" && (
        <span className="h-px flex-1 bg-current/40" />
      )}
      <span className="inline-flex shrink-0 items-center">{renderedSigil}</span>
      {sides !== "left" && (
        <span className="h-px flex-1 bg-current/40" />
      )}
    </span>
  );
}
