# Changelog

All notable changes to this project are recorded here so that **everyone** can follow along:

- **Users** — see what's new, what got fixed, and what changed in behavior.
- **Developers** — understand the history and reasoning behind changes without digging through Git.
- **AI agents** — know where and how to log every change they make.

This file follows the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) standard and
[Semantic Versioning](https://semver.org/spec/v2.0.0.html) (`MAJOR.MINOR.PATCH`).

---

## How to write an entry

Add every notable change under **`[Unreleased]`** in the correct group. When a version ships,
rename `[Unreleased]` to the version + date and start a fresh `[Unreleased]` above it.

**Groups** (only include ones you use):

| Group        | Use it for                                              |
| ------------ | ------------------------------------------------------- |
| `Added`      | New features or capabilities                            |
| `Changed`    | Changes to existing behavior                            |
| `Fixed`      | Bug fixes                                               |
| `Deprecated` | Features soon to be removed                             |
| `Removed`    | Features taken out                                      |
| `Security`   | Vulnerability fixes                                     |

**Entry format** — write for a human, lead with the impact, keep it one line:

```
- Short description of what changed, from the reader's point of view. (why, if not obvious)
```

**Good:**

```
- Added email + password login so users can access their account. (#12)
- Fixed order totals rounding to the wrong cent on multi-item carts.
```

**Avoid** (too low-level / no context):

```
- Updated auth.ts
- Refactored stuff
```

Reference a PR or issue with `(#123)` when one exists. Keep newest entries at the top of each group.

---

## [Unreleased]

### Added

- Light and dark themes that follow your system preference, with a toggle to switch manually.
- Landing page introducing the product, with clear calls to sign up or sign in.
- Sign-in and sign-up pages with inline validation, a Google button, and error toasts.
- shadcn/ui component library for building the interface.
- Email and password sign-up and sign-in, backed by Better Auth with sessions stored in Postgres.
- Sign in with Google (OAuth), alongside email and password.
- Redirect for unauthenticated visitors to `/login` when they open a protected `/dashboard` page.
- Project changelog to track every change made to the codebase.
- Engineering guidelines for commits, branching, secrets, dependencies, and definition of done (ENGINEERING.md).
- Repo guardrail hook that warns when working on main or committing without a changelog entry.
- Drizzle ORM with a local Postgres connection, SQL migrations, and `db:*` scripts (generate, migrate, push, studio).

### Changed

- Refreshed the visual design with a violet brand color and a cleaner, more consistent look across pages.

### Removed

- Example `users` table, replaced by the Better Auth `user`, `session`, `account`, and `verification` tables.

---

<!--
Template to copy when cutting a release:

## [1.0.0] - YYYY-MM-DD

### Added
### Changed
### Fixed
### Removed
-->
