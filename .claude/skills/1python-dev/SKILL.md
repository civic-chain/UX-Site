---
name: 1python-dev
description: >
  Use automatically whenever the task touches Python code or Python project
  files: .py files, pyproject.toml, pytest, typing, linting, refactoring,
  debugging, Python scripts, dependencies, package layout, CLI tools, or code
  review. Keep Python changes minimal, deletion-friendly, testable, typed where
  useful, and easy for future agents to modify. Use this to prevent LLM code
  bloat: speculative abstractions, defensive branches, wrappers, over-validation,
  and "just in case" logic. Skip pure non-Python tasks and discussion that does
  not inspect, write, review, or plan Python code.
---

# Python Dev

## Result

Python changes solve the requested behavior with the least new code that stays
readable and testable. A future agent can find the behavior owner, change it in
one place, and delete unused paths confidently.

## Work Path

1. Find the project contract first: `pyproject.toml`, package layout, existing
   tests, and local commands. Prefer project commands over global defaults.
2. Run the code-budget gate: can this be solved by deleting code, narrowing a
   condition, reusing an existing owner, changing config/data, or calling an
   existing helper? Add new code only after those fail.
3. Make the smallest behavior-preserving or behavior-changing edit that satisfies
   the request. Reuse existing names, helpers, and patterns before adding files.
4. Keep domain logic pure when possible. Put filesystem, network, env, clock,
   randomness, subprocesses, and database calls at boundaries.
5. Give data a visible shape: `dataclass`, `TypedDict`, `Protocol`, `Enum`, or
   precise built-in types when the shape is known. Avoid `dict[str, Any]` unless
   the input is genuinely open.
6. Add or update tests only for changed behavior or a reproduced bug. Prefer
   small pytest tests; use property tests only when invariants matter more than
   examples.
7. Run focused checks. If the repo has no command, use
   `scripts/python_quality_gate.sh <repo>` from this skill.
8. Do a delete pass before final: remove unused branches, wrappers, parameters,
   dependencies, files, and speculative extension points.

Read `references/global-tools.md` when installing, configuring, choosing,
explaining, or debugging Python quality tools.

## Design Rules

- One concept has one owner. If one change needs many scattered edits, stop and
  reduce the change radius before adding more logic.
- No generic `utils`, `helpers`, `manager`, or `processor` unless the repo
  already uses that owner clearly.
- Add an abstraction only when it removes existing duplication, isolates a side
  effect, names a real domain concept, or shrinks current change radius.
- Do not add validation, retries, caching, factories, adapters, plugins, config
  layers, or error classes unless the current requirement or observed failure
  needs them.
- Prefer flat readable control flow over nested cleverness. Guard clauses beat
  deep `if/else` stacks.
- Catch exceptions only where recovery, translation, or user-facing context is
  added. Do not hide failures with broad `except`.
- New dependency requires a reason: it removes meaningful code or provides a
  tested capability the stdlib/local code should not own.

## Checks

Default: run the smallest project-owned command that proves the touched behavior
and syntax. Add broader lint/type/test/coverage/dead-code/dependency/complexity
checks only when the change touches shared code, public API, dependencies,
security-sensitive paths, or the user asks for a wider quality pass. If no
project command exists, run `scripts/python_quality_gate.sh <repo>`; it handles
common skips explicitly.

## Closeout

Report only:

```md
Changed: <paths>
Checked: <commands>
Risk: <remaining risk or none>
```
