#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, join, relative } from "node:path";

const ROOT = process.cwd();
const EXCLUDED_DIRS = new Set([
  ".git",
  ".ignore",
  ".next",
  "node_modules",
  "playwright-report",
  "output",
  "_workspace",
]);

const failures = [];

function toRepoPath(path) {
  return relative(ROOT, path).replaceAll("\\", "/");
}

function read(path) {
  return readFileSync(path, "utf8");
}

function walk(dir) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return [];

  const out = [];
  for (const entry of readdirSync(abs)) {
    if (EXCLUDED_DIRS.has(entry)) continue;
    const path = join(abs, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      out.push(...walk(toRepoPath(path)));
    } else {
      out.push(path);
    }
  }
  return out;
}

function walkDirs(dir) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return [];

  const out = [];
  for (const entry of readdirSync(abs)) {
    if (EXCLUDED_DIRS.has(entry)) continue;
    const path = join(abs, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      out.push(path, ...walkDirs(toRepoPath(path)));
    }
  }
  return out;
}

function lineNumber(text, index) {
  return text.slice(0, index).split("\n").length;
}

function addFailure(file, line, message) {
  failures.push(`${file}:${line} ${message}`);
}

function scanRegex(files, rules) {
  for (const file of files) {
    const text = read(join(ROOT, file));
    for (const rule of rules) {
      rule.regex.lastIndex = 0;
      let match;
      while ((match = rule.regex.exec(text))) {
        addFailure(file, lineNumber(text, match.index), rule.message);
      }
    }
  }
}

const allFiles = walk(".");
const allDirs = walkDirs(".");
const repoFiles = allFiles.map(toRepoPath);
const repoDirs = allDirs.map(toRepoPath);
const allAgents = repoFiles.filter((file) => basename(file) === "AGENTS.md");
const allClaudeShims = repoFiles.filter((file) => basename(file) === "CLAUDE.md");
const skillFiles = repoFiles
  .filter((file) => file.startsWith(".codex/skills/") && file.endsWith("/SKILL.md"));
const codexSkillAgentYamlFiles = repoFiles
  .filter((file) => file.startsWith(".codex/skills/") && file.endsWith("/agents/openai.yaml"));
const claudeSkillInstructionFiles = repoFiles.filter(
  (file) => file.startsWith(".claude/skills/") && (file.endsWith("/SKILL.md") || file.endsWith("/AGENTS.md")),
);
const claudeAgentFiles = repoFiles.filter((file) => /^\.claude\/agents\/[^/]+\.md$/.test(file));
const pathRuleFiles = repoFiles.filter((file) => file.startsWith("_docs/rules/") && file.endsWith(".md"));
const rootInstructionFiles = ["AGENTS.md", "CLAUDE.md", "README.md"].filter((file) => existsSync(join(ROOT, file)));
const runtimeInstructionFiles = [
  ".claude/settings.json",
  ".claude/settings.local.json",
  ".codex/config.toml",
  ".mcp.json",
].filter((file) => existsSync(join(ROOT, file)));
const ruleFiles = repoFiles.filter((file) => file.startsWith("_ops/rules/") && file.endsWith(".md"));
const opsTruthFiles = [
  "_ops/PROJECT-ROADMAP.md",
  "_ops/INTERVIEW.md",
  "_ops/learnings.md",
  "_ops/STRATEGY-DISCUSSION.md",
].filter((file) => existsSync(join(ROOT, file)));
const activeInstructionFiles = [
  ...new Set([
    ...allAgents,
    ...skillFiles,
    ...codexSkillAgentYamlFiles,
    ...claudeSkillInstructionFiles,
    ...claudeAgentFiles,
    ...pathRuleFiles,
    ...rootInstructionFiles,
    ...runtimeInstructionFiles,
    ...ruleFiles,
    ...opsTruthFiles,
  ]),
];
const routingInstructionFiles = [
  ...new Set([
    ...allAgents,
    ...skillFiles,
    ...codexSkillAgentYamlFiles,
    ...claudeSkillInstructionFiles,
    ...claudeAgentFiles,
    ...pathRuleFiles,
    ...rootInstructionFiles,
    ...runtimeInstructionFiles,
    ...ruleFiles,
  ]),
];
const ledgerForbiddenFiles = [...new Set([...skillFiles, ...claudeSkillInstructionFiles])];
const staleIconGuidanceRegex = new RegExp(["Hugeicons", "adapters"].join(" "), "g");
const planningArchiveSegment = "_" + "archive";

scanRegex(activeInstructionFiles, [
  {
    regex: /\b(system-architect|main-strategy|task-planner|criteria-generator|codebase-hygiene|1strategy-discussion|1project-strategy|1task-contract|1repo-power-tools|1user-truth|1before-work|1before-write|1roadmap|1tasks|1repo-shape|1criteria-council)\b/g,
    message: "Retired skill handle in active instruction surface.",
  },
  {
    regex: /\bAskUserQuestion\b/g,
    message: "Claude-only question tool name in shared instruction surface.",
  },
  {
    regex: /\/sandbox\/\[slot\]/g,
    message: "Retired generic sandbox slot route in active instruction surface.",
  },
  {
    regex: /(^|[\s`"'])\/variants(\/|\b|\[)/g,
    message: "Retired variants route in active instruction surface.",
  },
  {
    regex: /\blib\/variants\b/g,
    message: "Retired variants owner path in active instruction surface.",
  },
  {
    regex: /\b_docs\/(visual-work|landing-variants|landing-work)\b/g,
    message: "Retired landing-work owner root in active instruction surface.",
  },
  {
    regex: /\b_ops\/criteria\//g,
    message: "Retired rules owner path; use _ops/rules/.",
  },
  {
    regex: /\b_docs\/Civic-Chain-Justin\b/g,
    message: "Retired client-export owner path; current public copy lives in app/(site) code/content files, with _workspace/Civic-Chain-Justin as reference only.",
  },
  {
    regex: /\b_docs\/landing-page\b/g,
    message: "Retired visual artifact owner path; use _workspace/landing-page for reference-only artifacts and public/landing for runtime assets.",
  },
  {
    regex: /\b_docs\/other-pages\b/g,
    message: "Retired visual artifact owner path; use _workspace/other-pages for reference-only artifacts and public/landing/other-pages for runtime assets.",
  },
  {
    regex: staleIconGuidanceRegex,
    message: "Stale icon guidance; current icon owner is components/ui/icon.tsx with Material Symbols.",
  },
  {
    regex: /scripts\/check-(?:design-system-[A-Za-z0-9_-]+|instruction-drift)\.mjs/g,
    message: "Stale check script path; current checks live under scripts/checks/.",
  },
]);

for (const staleHandle of [
  "playwright" + "-skill",
  "1" + "codex",
  "S" + "mith",
  "bro" + "oks",
]) {
  scanRegex(routingInstructionFiles, [
    {
      regex: new RegExp(`\\b${staleHandle}\\b`, "g"),
      message: "Stale tool or critic handle in active routing surface; verify live handle instead.",
    },
  ]);
}

scanRegex(routingInstructionFiles, [
  {
    regex: /\b(project-roadmap|user-interview)\b/g,
    message: "Stale strategy/user skill handle in active routing surface.",
  },
]);

if (existsSync(join(ROOT, "_ops/STRATEGY-SPIRAL.md"))) {
  addFailure("_ops/STRATEGY-SPIRAL.md", 1, "Parallel live-state memory file is not allowed in active _ops.");
}

const requiredOwnerPaths = [
  "AGENTS.md",
  "README.md",
  "_ops/PROJECT-ROADMAP.md",
  "_ops/rules",
  ".claude/skills/2civic-design/SKILL.md",
  ".claude/skills/2civic-design/reference/code-structure.md",
  "_docs/facts",
  "_docs/business",
  "_docs/marketing",
  "app/(site)",
  "components/ui/icon.tsx",
  "lib/design-system-typography.ts",
  "public/landing",
  "scripts/checks/design-system/policy.mjs",
  "scripts/checks/design-system/fixtures.mjs",
  "scripts/checks/design-system/sync.mjs",
  "scripts/checks/instruction-drift.mjs",
  "scripts/checks/runtime-assets.mjs",
  "tests/visual/README.md",
  "tests/visual/route-contracts.ts",
];

for (const ownerPath of requiredOwnerPaths) {
  if (!existsSync(join(ROOT, ownerPath))) {
    addFailure("scripts/checks/instruction-drift.mjs", 1, `Declared owner path is missing: ${ownerPath}`);
  }
}

for (const retiredRoot of ["_ops/criteria", "_docs/Civic-Chain-Justin", "_docs/landing-page", "_docs/other-pages"]) {
  if (existsSync(join(ROOT, retiredRoot))) {
    addFailure(retiredRoot, 1, "Retired owner root exists in the active repo tree; keep it in _workspace/reference or remove from active routing.");
  }
}

for (const dir of repoDirs) {
  if (new RegExp(`^_ops/plans/.*/${planningArchiveSegment}(?:/|$)`).test(dir)) {
    addFailure(dir, 1, "Archived planning folders are not allowed in active _ops/plans; history lives in git log.");
  }
}

for (const file of allClaudeShims) {
  const text = read(join(ROOT, file));
  if (text !== "@AGENTS.md\n" && text !== "@AGENTS.md") {
    addFailure(file, 1, 'CLAUDE.md must be the exact one-line shim "@AGENTS.md".');
  }
}

// The 2civic-design skill is mirrored for Claude and Codex; its reference files
// must stay byte-identical so a component/rule update lands in both runtimes.
const claudeSkillRef = ".claude/skills/2civic-design/reference";
const codexSkillRef = ".codex/skills/2civic-design/reference";
if (existsSync(join(ROOT, claudeSkillRef)) && existsSync(join(ROOT, codexSkillRef))) {
  const claudeRefs = new Set(readdirSync(join(ROOT, claudeSkillRef)));
  const codexRefs = new Set(readdirSync(join(ROOT, codexSkillRef)));
  for (const name of claudeRefs) {
    if (!codexRefs.has(name)) {
      addFailure(`${codexSkillRef}/${name}`, 1, "Missing in the .codex mirror; update the 2civic-design skill in both runtimes in sync.");
    } else if (read(join(ROOT, claudeSkillRef, name)) !== read(join(ROOT, codexSkillRef, name))) {
      addFailure(`${codexSkillRef}/${name}`, 1, "Differs from the .claude copy; the 2civic-design reference files must stay byte-identical across runtimes.");
    }
  }
  for (const name of codexRefs) {
    if (!claudeRefs.has(name)) {
      addFailure(`${claudeSkillRef}/${name}`, 1, "Missing in the .claude mirror; update the 2civic-design skill in both runtimes in sync.");
    }
  }
}

scanRegex(ledgerForbiddenFiles, [
  {
    regex: /^##\s*(Current|Active) task map\b/gim,
    message: "Live task ledger heading belongs in _ops task files, not skills or route AGENTS.",
  },
  {
    regex: /Текущий статус route/g,
    message: "Live route status belongs in route owner docs/task files, not route AGENTS.",
  },
  {
    regex: /\btask-\d+\b/g,
    message: "Hardcoded task number in skill or route AGENTS; read the matching _ops task file instead.",
  },
]);

const packageJson = JSON.parse(read(join(ROOT, "package.json")));
const scripts = new Set(Object.keys(packageJson.scripts ?? {}));
const npmReferenceFiles = repoFiles.filter((file) => {
  if (!file.endsWith(".md")) return false;
  return (
    basename(file) === "AGENTS.md" ||
    file === "CLAUDE.md" ||
    file.startsWith(".codex/skills/") ||
    file.startsWith(".claude/skills/") ||
    file.startsWith(".claude/agents/") ||
    file.startsWith("_docs/rules/") ||
    file.startsWith("_ops/rules/") ||
    file.startsWith("_ops/plans/")
  );
});

for (const file of npmReferenceFiles) {
  const text = read(join(ROOT, file));
  const regex = /npm run ([A-Za-z0-9_-]+(?::[A-Za-z0-9_-]+)*)\b/g;
  let match;
  while ((match = regex.exec(text))) {
    if (!scripts.has(match[1])) {
      addFailure(file, lineNumber(text, match.index), `Referenced npm script "${match[1]}" is not defined in package.json.`);
    }
  }
}

if (failures.length > 0) {
  console.error("Instruction drift check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Instruction drift check passed.");
