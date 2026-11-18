// TRL scoring — the period-end composite (§16). Policy-neutral: it just
// combines the achievement each target already carries, weighted, and applies
// veto (一票否决) handling. All weights and the veto rule are configuration.

import type { Target } from "./trl-data";

export type CompositeScore = {
  composite: number; // 0..100
  rawComposite: number; // before veto cap
  vetoTriggered: boolean;
  vetoTargets: string[]; // ids of veto targets currently MISSED
  breakdown: Array<{ id: string; title: string; weight: number; achievement: number; contribution: number }>;
};

// When a veto target is MISSED the composite is capped per policy. The demo
// caps to this ceiling and flags it, rather than zeroing outright.
const VETO_CAP = 40;

export function computeComposite(targets: Target[]): CompositeScore {
  const weighted = targets.filter((t) => t.weight > 0);
  const totalWeight = weighted.reduce((sum, t) => sum + t.weight, 0) || 1;

  const breakdown = weighted.map((t) => {
    const contribution = (t.achievement * t.weight) / totalWeight;
    return {
      id: t.id,
      title: t.title,
      weight: t.weight,
      achievement: t.achievement,
      contribution,
    };
  });

  const rawComposite = breakdown.reduce((sum, b) => sum + b.contribution, 0);

  const vetoTargets = targets
    .filter((t) => t.veto && t.status === "MISSED")
    .map((t) => t.id);
  const vetoTriggered = vetoTargets.length > 0;

  const composite = vetoTriggered ? Math.min(rawComposite, VETO_CAP) : rawComposite;

  return {
    composite: Math.round(composite),
    rawComposite: Math.round(rawComposite),
    vetoTriggered,
    vetoTargets,
    breakdown,
  };
}
