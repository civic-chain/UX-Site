# Global Python Tools

Use this reference only when setting up, choosing, explaining, or debugging the
Python quality toolchain. Prefer project-defined commands first.

## Installed Baseline

- `uv` - run project commands and install isolated global CLI tools.
- `ruff` - formatting, linting, import order, many safe autofixes.
- `pyright` - fast static type checking when the project uses Pyright.
- `mypy` - static type checking when the project uses Mypy.
- `pytest` - tests.
- `coverage` - branch coverage and untested-code visibility.
- `vulture` - dead-code candidates.
- `deptry` - missing, unused, and transitive dependency checks.
- `xenon` - Radon-based complexity threshold.
- `pre-commit` - run checks before commit.
- `bandit` - security scan for risky Python source patterns.
- `pip-audit` - dependency vulnerability audit.

Do not install tool-specific dependencies into a project just because the global
CLI exists. Add project dependencies only when the repo needs that check in CI or
in its documented workflow.

## Order Of Use

1. **Project contract**: read `pyproject.toml`, `tox.ini`, `noxfile.py`,
   `Makefile`, CI config, and existing docs. Run the project's command when it
   exists.
2. **Fast local loop**: `ruff format --check .`, `ruff check .`, then the
   configured type checker.
3. **Behavior loop**: run focused `pytest` first, then full `pytest -q` when the
   change can affect neighbors.
4. **Regression visibility**: use branch coverage after behavior changes, not as
   a vanity percentage.
5. **Bloat scan**: use `vulture`, `deptry`, and `xenon` when the change adds,
   moves, or removes meaningful code, dependencies, or branching. Skip for tiny
   leaf edits after saying why.
6. **Risk scan**: use `bandit` and `pip-audit` for code that touches auth,
   secrets, subprocesses, file paths, HTTP, dependency changes, or deployable
   packages.
7. **Hooking**: add `pre-commit` only when the repo owns the config. Keep hooks
   fast: `ruff` and light type/test commands; leave slow audits for CI/manual
   closeout.

## Command Patterns

Use `uv run` for project-scoped execution:

```bash
uv run ruff format --check .
uv run ruff check .
uv run pyright
uv run mypy src
uv run pytest -q
uv run coverage run --branch -m pytest -q
uv run coverage report
```

Use the global tools when the project has no environment yet:

```bash
ruff format --check .
ruff check .
pyright
mypy src
pytest -q
coverage run --branch -m pytest -q && coverage report
```

Use bloat and risk scans as second-pass checks:

```bash
vulture src tests --min-confidence 90
deptry .
xenon --max-absolute B --max-modules A --max-average A src
bandit -q -r src
pip-audit -r requirements.txt
pip-audit --locked .
```

If a tool has no project config, either skip it explicitly or run it in advisory
mode. Do not reshape code just to satisfy an unowned global default.

## Tool Decisions

- `ruff format` owns formatting. Do not add Black separately unless the repo
  already uses it.
- `ruff check` owns lint/autofix. Use `ruff check --fix` only after reading the
  diff; fixes can change imports and remove compatibility code.
- `pyright` and `mypy` are alternatives by project ownership. Run both only when
  both are configured.
- `pytest` failures are behavior evidence. Decide whether the implementation is
  wrong or the expected behavior changed before editing tests.
- `coverage` shows blind spots, not correctness. Missing changed branches matter
  more than total percentage.
- `vulture` reports candidates. Delete only after checking dynamic imports,
  plugin entry points, CLI commands, migrations, and tests.
- `deptry` findings need dependency-owner judgment: remove unused deps, add
  missing direct deps, and avoid relying on transitive deps.
- `xenon` failure means reduce branching or split phases. Raising thresholds
  needs a reason in the final.
- `bandit` findings are security prompts, not automatic rewrites. Prefer explicit
  safe APIs and narrow `# nosec` comments with reasons.
- `pip-audit` failures belong in dependency update work. Do not auto-upgrade
  packages during unrelated code edits.

## Stable Python Defaults

- Put importable package code under `src/` for new package-style projects.
- Keep tests outside package code in `tests/`.
- Keep pure domain logic separate from filesystem, network, env, clock,
  randomness, subprocesses, and database calls.
- Type public boundaries first: CLI inputs, API payloads, adapters, return
  values, and shared domain objects.
- Prefer one explicit data object over repeated parameter chains.
- Prefer no new object when a local variable, existing function, or stdlib call
  keeps the behavior obvious.
- Treat "best practice" as suspect if it adds a layer without removing current
  duplication, risk, or change radius.
- Before final, run a delete pass: unused function, unused branch, unused
  dependency, over-broad wrapper, and speculative abstraction.
