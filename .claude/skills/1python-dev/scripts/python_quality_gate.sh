#!/usr/bin/env bash
set -u

root="${1:-.}"
cd "$root" || exit 2

status=0

run() {
  printf '\n> %s\n' "$*"
  "$@"
  code=$?
  if [ "$code" -ne 0 ]; then
    status="$code"
  fi
}

has() {
  command -v "$1" >/dev/null 2>&1
}

has_file() {
  [ -f "$1" ]
}

has_tests() {
  [ -d tests ] || find . -maxdepth 3 \( -name 'test_*.py' -o -name '*_test.py' \) | grep -q .
}

has_src() {
  [ -d src ]
}

has_pyright_config() {
  has_file pyrightconfig.json || (has_file pyproject.toml && grep -q '^\[tool\.pyright\]' pyproject.toml)
}

has_mypy_config() {
  has_file mypy.ini || has_file .mypy.ini ||
    (has_file setup.cfg && grep -q '^\[mypy\]' setup.cfg) ||
    (has_file pyproject.toml && grep -q '^\[tool\.mypy\]' pyproject.toml)
}

if has ruff; then
  run ruff format --check .
  run ruff check .
fi

if has pyright; then
  if has_pyright_config; then
    run pyright
  else
    printf '\n> skip pyright: no pyright config found\n'
  fi
fi

if has mypy; then
  if has_mypy_config; then
    if has_src; then
      run mypy src
    else
      run mypy .
    fi
  else
    printf '\n> skip mypy: no mypy config found\n'
  fi
fi

if has_tests; then
  if has uv; then
    run uv run --with pytest pytest -q
  elif has pytest; then
    run pytest -q
  fi
fi

if has_tests; then
  if has uv; then
    run uv run --with pytest --with coverage coverage run --branch -m pytest -q
    run uv run --with coverage coverage report
  elif has coverage; then
    run coverage run --branch -m pytest -q
    run coverage report
  fi
fi

if has vulture; then
  if has_src && [ -d tests ]; then
    run vulture src tests --min-confidence 90
  elif has_src; then
    run vulture src --min-confidence 90
  else
    run vulture . --min-confidence 90
  fi
fi

if has deptry && has_file pyproject.toml; then
  run deptry .
fi

if has xenon; then
  if has_src; then
    run xenon --max-absolute B --max-modules A --max-average A src
  else
    run xenon --max-absolute B --max-modules A --max-average A .
  fi
fi

if has bandit && has_src; then
  run bandit -q -r src
fi

if has pip-audit; then
  if has_file requirements.txt; then
    run pip-audit -r requirements.txt
  elif has_file pylock.toml; then
    run pip-audit --locked .
  else
    printf '\n> skip pip-audit: no requirements.txt or supported lock file found\n'
  fi
fi

exit "$status"
