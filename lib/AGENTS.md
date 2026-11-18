# Lib Agent Instructions

This folder contains code rules, types, fixtures, and utilities.

## Relevant Rules

- `_ops/rules/landing-design-and-brand.md` - design-system policy and vocabulary.
- `_ops/rules/process.md` - one file, one role; no accumulated helper clutter.
- `_ops/rules/landing-copy.md` - client copy and facts do not live in `lib/`.
- `_ops/rules/agent-discipline.md` - default action chain.

## Local Rules

- `design-policy.ts` owns advisory guardrails for design-system lint during
  active visual iteration.
- `design-system-types.ts` owns shared design-system type aliases.
- `design-system-typography.ts` owns the semantic typography registry consumed
  by `/brand/type` and design-system checks.
- This folder stays flat: no subdirectories until a single domain has 4+ files.
- Do not put client facts here; they belong in `_docs/facts/`.
- Do not add a helper if it can stay next to its only consumer.
