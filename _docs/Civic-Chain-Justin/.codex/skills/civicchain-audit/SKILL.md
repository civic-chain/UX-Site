---
name: civicchain-audit
description: Use when the user asks to audit, review, verify, or check work in this repo, or before declaring a non-trivial task done. Produces a findings-first, severity-graded review against `_ops`, `_docs`, content-lock, composition rules, design-policy, handoff conventions, and verification gates. Read-only while running this skill.
---

# Civicchain Audit

This is a read-only review skill. Do not edit or fix while using it.

## Mandatory pre-read

Read, in order:

1. `_ops/1-NORTH-STAR.md`
2. `_ops/3-CURRENT-STRATEGY.md`
3. `_ops/learnings.md`
4. Relevant `_docs/direction/*.md`
5. `AGENTS.md`
6. Any repo-local skill files actually in play for the audited work

Read `_ops/2-RATIONALE.md` only when the why behind a bet materially changes a finding.

## What to check

- Strategy alignment against current objective, anti-goals, and false-success definition
- Design-policy and layering violations
- Composition over copy-paste for landing variants and sections
- Content-lock violations
- Handoff conventions and folder legibility
- Scope creep and "while I'm here" side-work
- Verification evidence: lint, diff scope, and targeted checks

## Verification commands

Run these as needed:

```bash
npm run lint
git status
git diff --stat
```

When `.tsx` changes are in scope, also run:

```bash
node scripts/check-design-system-policy.mjs --changed <file>
```

Do not start background dev servers or make remote-state changes while auditing.

## Output format

Return findings first, grouped as:

- `BLOCKER`
- `MAJOR`
- `MINOR`
- `CHECK`

Each finding should include:

- file path
- line reference when available
- violated rule
- observed vs expected behavior

Then include:

- verification summary
- verdict: `READY` or `NEEDS-FIX`

## Review stance

- Never rewrite copy while auditing.
- Never invent a finding without evidence.
- If a rule is missing from the audited surface, say so plainly instead of pretending it exists.
