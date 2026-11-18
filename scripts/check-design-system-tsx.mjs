#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const ROOT = process.cwd();
const DEFAULT_TARGETS = ["app", "components"];
const TARGET_EXTENSIONS = new Set([".tsx"]);
const EXCLUDED_PREFIXES = ["components/ui/"];

const RULES = [
  {
    label: "Typography (text-*)",
    id: "typography",
    regex: /\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b/g,
    suggestion: "Use owner-backed type utilities instead of raw Tailwind text-size classes.",
  },
  {
    label: "Tracking (tracking-*)",
    id: "tracking",
    regex: /tracking-\[|tracking-(tighter|tight|normal|wide|wider|widest)\b/g,
    suggestion: "Use owner-backed tracking utilities.",
  },
  {
    label: "Leading (leading-*)",
    id: "leading",
    regex: /leading-\[|leading-(tight|snug|normal|relaxed|loose|[0-9])/g,
    suggestion: "Use owner-backed type utilities instead of raw line-height classes.",
  },
  {
    label: "Colors (hex/rgb/hsl)",
    id: "colors",
    regex: /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/g,
    suggestion: "Use CSS variables from the nearest token owner instead of raw color literals.",
  },
  {
    label: "Shadows (shadow-*)",
    id: "shadows",
    regex: /shadow-\[|\bshadow-(sm|md|lg|xl|2xl)\b|\bshadow-inner\b(?!-)/g,
    suggestion: "Use owner-approved shadow utilities.",
  },
  {
    label: "Inline font-size",
    id: "inline-font-size",
    regex: /font-size:/g,
    suggestion: "Use owner-backed type utilities instead of inline font-size.",
  },
];

function toRepoPath(path) {
  return relative(ROOT, path).replaceAll("\\", "/");
}

function shouldSkip(repoPath) {
  return EXCLUDED_PREFIXES.some((prefix) => repoPath === prefix || repoPath.startsWith(prefix));
}

function collectFiles(target) {
  const absoluteTarget = join(ROOT, target);

  if (!existsSync(absoluteTarget)) {
    return [];
  }

  const repoPath = toRepoPath(absoluteTarget);
  if (shouldSkip(repoPath)) {
    return [];
  }

  const stat = statSync(absoluteTarget);
  if (stat.isFile()) {
    return TARGET_EXTENSIONS.has(extname(absoluteTarget)) ? [repoPath] : [];
  }

  if (!stat.isDirectory()) {
    return [];
  }

  const files = [];
  for (const entry of readdirSync(absoluteTarget, { withFileTypes: true })) {
    files.push(...collectFiles(join(target, entry.name)));
  }

  return files;
}

function collectViolations(filePath) {
  const content = readFileSync(join(ROOT, filePath), "utf8");
  const lines = content.split("\n");
  const violations = [];

  for (const [index, line] of lines.entries()) {
    for (const rule of RULES) {
      for (const match of line.matchAll(rule.regex)) {
        violations.push({
          filePath,
          lineNumber: index + 1,
          rule,
          token: match[0],
        });
      }
    }
  }

  return violations;
}

const targets = process.argv.slice(2);
const files = (targets.length > 0 ? targets : DEFAULT_TARGETS)
  .flatMap((target) => collectFiles(target))
  .sort((left, right) => left.localeCompare(right));

const violations = files.flatMap((filePath) => collectViolations(filePath));
const counts = new Map(RULES.map((rule) => [rule.id, 0]));

for (const violation of violations) {
  counts.set(violation.rule.id, (counts.get(violation.rule.id) ?? 0) + 1);
}

console.log("Design System TSX Audit");
console.log("=======================");
for (const rule of RULES) {
  console.log(`${rule.label.padEnd(26)} ${counts.get(rule.id) ?? 0}`);
}

if (violations.length === 0) {
  process.exit(0);
}

console.error("");
console.error("Violations:");
for (const violation of violations) {
  console.error(
    `${violation.filePath}:${violation.lineNumber} [${violation.rule.id}] ${violation.token} — ${violation.rule.suggestion}`,
  );
}

process.exit(1);
