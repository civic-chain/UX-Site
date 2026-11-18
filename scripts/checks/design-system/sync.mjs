#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { typographyTokenNames } from "../../../lib/design-system-typography.ts";

const ROOT = process.cwd();

const motionIndexPath = "components/motion/index.ts";
const designDocPath = ".claude/skills/2civic-design/reference/code-structure.md";
const primitivesPath = "app/styles/primitives.css";

const motionIndex = readFileSync(join(ROOT, motionIndexPath), "utf8");
const designDoc = readFileSync(join(ROOT, designDocPath), "utf8");
const primitivesCss = readFileSync(join(ROOT, primitivesPath), "utf8");

const staleMotionNames = [
  "AnimatedBar",
  "Typewriter",
  "DrawUnderline",
  "DrawPath",
  "FlipChip",
  "ScrollStages",
  "useAutoAdvance",
  "scroll stages",
  "typewriter",
];

const exportedMotionValues = [...motionIndex.matchAll(/^export\s+\{\s*([^}]+)\s*\}\s+from\s+["'][^"']+["'];?$/gm)]
  .flatMap((match) => match[1].split(","))
  .map((name) => name.trim().replace(/\s+as\s+.+$/, ""))
  .filter(Boolean);
const cssUtilityNames = [...primitivesCss.matchAll(/^@utility\s+([A-Za-z0-9-]+)\s+\{/gm)]
  .map((match) => match[1]);
const expectedTypographyNames = new Set(typographyTokenNames);
const cssTypographyNames = cssUtilityNames.filter((name) =>
  expectedTypographyNames.has(name) ||
  /^type-/.test(name) ||
  /^h[1-4]$/.test(name) ||
  /^body(?:-|$)/.test(name) ||
  name === "captions",
);

const failures = [];

for (const staleName of staleMotionNames) {
  if (designDoc.includes(staleName)) {
    failures.push(`${designDocPath} still mentions retired motion primitive "${staleName}".`);
  }
}

for (const exportedName of exportedMotionValues) {
  if (!designDoc.includes(`\`${exportedName}\``)) {
    failures.push(`${designDocPath} does not mention exported motion adapter \`${exportedName}\`.`);
  }
}

for (const tokenName of typographyTokenNames) {
  if (!cssUtilityNames.includes(tokenName)) {
    failures.push(`${primitivesPath} is missing typography @utility ${tokenName}.`);
  }
}

for (const utilityName of cssTypographyNames) {
  if (!expectedTypographyNames.has(utilityName)) {
    failures.push(`${primitivesPath} defines unregistered typography @utility ${utilityName}.`);
  }
}

if (failures.length > 0) {
  console.error("Design-system sync check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Design-system sync check passed (${motionIndexPath} exports reflected in ${designDocPath}; typography registry matches ${primitivesPath}).`,
);
