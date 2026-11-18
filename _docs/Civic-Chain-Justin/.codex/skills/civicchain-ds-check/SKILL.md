---
name: civicchain-ds-check
description: Use after editing `.tsx` components in this repo to grep-audit design-system violations such as hardcoded type sizes, tracking, leading, colors, shadows, or inline font-size. Best for `app/**` and `components/**` outside `components/ui/**`.
---

# Civicchain DS Check

Run this after `.tsx` edits in `app/**` or `components/**` outside `components/ui/**`.

Use `rg`, not `grep`, and report counts plus violations.

## Checks

### 1. Typography classes

```bash
rg -n --glob '*.tsx' --glob '!components/ui/**' --glob '!node_modules/**' --glob '!.next/**' '\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b' .
```

Expected: `0` matches.

### 2. Hardcoded tracking

```bash
rg -n --glob '*.tsx' --glob '!components/ui/**' --glob '!node_modules/**' --glob '!.next/**' 'tracking-\[' .
```

Expected: `0` matches.

### 3. Hardcoded leading

```bash
rg -n --glob '*.tsx' --glob '!components/ui/**' --glob '!node_modules/**' --glob '!.next/**' 'leading-\[|leading-(tight|snug|normal|relaxed|loose|[0-9])' .
```

Expected: `0` matches.

### 4. Hardcoded colors

```bash
rg -n --glob '*.tsx' --glob '!components/ui/**' --glob '!node_modules/**' --glob '!.next/**' '#[0-9a-fA-F]{3,8}\b' .
```

Expected: `0` matches.

### 5. Hardcoded shadows

```bash
rg -n --glob '*.tsx' --glob '!components/ui/**' --glob '!node_modules/**' --glob '!.next/**' '\bshadow-(sm|md|lg|xl|2xl|inner)\b' .
```

Expected: `0` matches outside intentional state classes.

### 6. Inline font-size

```bash
rg -n --glob '*.tsx' --glob '!components/ui/**' --glob '!node_modules/**' --glob '!.next/**' 'font-size:' .
```

Expected: `0` matches.

## Output shape

Report:

```text
Design System Audit
===================
Typography (text-*):  <count>
Tracking (tracking-[): <count>
Leading (leading-*):  <count>
Colors (#hex):        <count>
Shadows (shadow-*):   <count>
Inline font-size:     <count>
```

If violations exist, list `file:line` and the offending token/class, then suggest the design-system alternative.

## Reference replacements

- Typography: `type-*`
- Tracking: token-backed tracking utilities
- Leading: type utilities instead of raw line-height
- Shadows: token-backed shadow vars
- Colors: CSS variables such as `var(--foreground)` and tone tokens
