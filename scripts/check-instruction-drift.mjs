#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, join, relative } from "node:path";

const ROOT = process.cwd();
const EXCLUDED_DIRS = new Set([".git", ".ignore", ".next", "node_modules", "playwright-report", "output"]);

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
const repoFiles = allFiles.map(toRepoPath);
const allAgents = repoFiles.filter((file) => basename(file) === "AGENTS.md");
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
const criteriaFiles = repoFiles.filter((file) => file.startsWith("_ops/criteria/") && file.endsWith(".md"));
const opsTruthFiles = [
  "_ops/PROJECT-ROADMAP.md",
  "_ops/INTERVIEW.md",
  "_ops/learnings.md",
  "_ops/STRATEGY-DISCUSSION.md",
].filter((file) => existsSync(join(ROOT, file)));
const routeAgentFiles = allAgents.filter((file) => /^app\/landing-[^/]+\/AGENTS\.md$/.test(file));
const activeInstructionFiles = [
  ...new Set([
    ...allAgents,
    ...skillFiles,
    ...codexSkillAgentYamlFiles,
    ...claudeSkillInstructionFiles,
    ...claudeAgentFiles,
    ...pathRuleFiles,
    ...rootInstructionFiles,
    ...criteriaFiles,
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
    ...criteriaFiles,
  ]),
];
const ledgerForbiddenFiles = [...new Set([...skillFiles, ...claudeSkillInstructionFiles, ...routeAgentFiles])];
const routeStatusForbiddenFiles = [
  ".codex/skills/civicchain-frontend-router/SKILL.md",
  ...routeAgentFiles,
].filter((file) => existsSync(join(ROOT, file)));

scanRegex(activeInstructionFiles, [
  {
    regex: /\b(system-architect|main-strategy|task-planner|criteria-generator|codebase-hygiene|1strategy-discussion|1project-strategy|1task-contract|1repo-power-tools)\b/g,
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
]);

scanRegex(routingInstructionFiles, [
  {
    regex: /\b(project-roadmap|user-interview)\b/g,
    message: "Stale strategy/user skill handle in active routing surface.",
  },
]);

if (existsSync(join(ROOT, "_ops/STRATEGY-SPIRAL.md"))) {
  addFailure("_ops/STRATEGY-SPIRAL.md", 1, "Parallel live-state memory file is not allowed in active _ops.");
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

scanRegex(routeStatusForbiddenFiles, [
  {
    regex: /\bpaused awaiting approved set\b/g,
    message: "Concrete route status phrase in router/local AGENTS; derive it from owner docs.",
  },
  {
    regex: /\bapproved-input \/ build-pending\b/g,
    message: "Concrete route status phrase in router/local AGENTS; derive it from owner docs.",
  },
  {
    regex: /\bapproved-input \/ implementation-pending\b/g,
    message: "Concrete route status phrase in router/local AGENTS; derive it from owner docs.",
  },
  {
    regex: /\bapproved-translated\b/g,
    message: "Concrete route status phrase in router/local AGENTS; derive it from owner docs.",
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
