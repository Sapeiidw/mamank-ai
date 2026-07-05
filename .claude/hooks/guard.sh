#!/usr/bin/env bash
# Stop hook: soft guardrails for an AI-heavy repo.
# Warns (does not hard-block) when repo rules look violated, so the agent
# self-corrects before reporting a task done.
#
# Checks:
#   1. Working on `main` with changes  -> should be on a task branch.
#   2. Commits made without touching CHANGELOG.md -> possible missing changelog.
#
# Exit 0 = allow stop. We emit advice to stderr with exit 2 only when a
# warning fires, which feeds the message back to the agent.

set -euo pipefail

# Locate the repo root; bail quietly if not a git repo.
cd "$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0

branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '')"
warnings=""

# --- Check 1: uncommitted work directly on main ---
if [ "$branch" = "main" ]; then
  if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
    warnings+="- You are on 'main' with uncommitted changes. Per ENGINEERING.md, start a task branch (feat/… fix/… chore/…) and never commit directly to main.\n"
  fi
fi

# --- Check 2: commits ahead of main that never touched the changelog ---
# Only meaningful when on a task branch that has commits main doesn't.
if [ "$branch" != "main" ] && [ -n "$branch" ]; then
  if git rev-parse --verify main >/dev/null 2>&1; then
    range="main..HEAD"
    commit_count="$(git rev-list --count "$range" 2>/dev/null || echo 0)"
    if [ "$commit_count" -gt 0 ]; then
      if ! git diff --name-only "$range" 2>/dev/null | grep -q '^CHANGELOG\.md$'; then
        warnings+="- This branch has $commit_count commit(s) but none touched CHANGELOG.md. If any change is user-facing, add an entry under [Unreleased] per ENGINEERING.md.\n"
      fi
    fi
  fi
fi

if [ -n "$warnings" ]; then
  printf 'Repo guardrails flagged issues before finishing:\n%b' "$warnings" >&2
  exit 2
fi

exit 0
