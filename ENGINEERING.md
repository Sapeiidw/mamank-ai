# ENGINEERING.md

# Engineering Standards

Version: 1.0

---

# Primary Goal

Every line of code should optimize for:

- Readability
- Maintainability
- Simplicity
- Performance
- Scalability
- Type Safety
- Testability

Code is read far more often than it is written.

Always prioritize clarity over cleverness.

---

# Development Philosophy

Write software that can still be understood after five years.

Assume another engineer will maintain every feature.

Favor boring, proven solutions over clever abstractions.

---

# SOLID

Apply SOLID principles where appropriate.

Especially:

- Single Responsibility Principle
- Dependency Inversion
- Interface Segregation

Avoid unnecessary inheritance.

Prefer composition.

---

# KISS

Keep It Simple.

Do not introduce abstraction before it becomes necessary.

Avoid solving problems that do not yet exist.

---

# DRY

Do not repeat business logic.

Extract reusable functions only after duplication becomes obvious.

Do not create abstractions for one-time usage.

---

# YAGNI

Do not build future features.

Implement only current requirements.

Future extensibility should come from good architecture, not unused code.

---

# Functional Programming

Prefer pure functions.

Avoid mutable shared state.

Avoid side effects.

Use immutable data whenever practical.

---

# Component Rules

Components should:

- Have one responsibility.
- Be reusable.
- Remain under approximately 200 lines where practical.
- Receive minimal props.
- Avoid nested conditional rendering.

Split components before they become difficult to understand.

---

# Business Logic

Business logic never belongs inside:

- React Components
- Route Handlers
- Database Repositories

Business logic belongs inside Services.

---

# Repository Rules

Repositories only communicate with the database.

Repositories should never:

- validate requests
- perform authorization
- contain business rules

Repositories perform CRUD only.

---

# Service Rules

Services:

- validate business rules
- orchestrate repositories
- coordinate transactions
- emit events

Services should never know about HTTP.

---

# Route Handlers

Route Handlers should only:

- authenticate
- authorize
- validate request
- call service
- return response

Nothing else.

---

# Server Actions

Server Actions follow identical rules.

Never place business logic inside Server Actions.

---

# Validation

Every external input must be validated.

Always use Zod.

Never trust:

- request body
- params
- query
- cookies
- headers
- AI responses

---

# TypeScript

Always enable strict mode.

Avoid:

any

Prefer:

unknown

Generics

Discriminated unions

Utility types

Inference

Never silence errors.

Never use ts-ignore unless documented.

---

# Naming

Use descriptive names.

Good

createWorkspace()

calculateInventoryValue()

findUserByEmail()

Bad

handle()

process()

temp()

value()

data()

obj()

---

# Functions

Functions should:

Do one thing.

Return early.

Remain small.

Avoid deeply nested conditions.

Prefer:

if (...) return

instead of:

if (...) {
    if (...) {
        if (...) {
        }
    }
}

---

# File Size

Target:

Components

< 200 lines

Services

< 300 lines

Repositories

< 200 lines

Split files before they become difficult to navigate.

---

# Folder Rules

Organize by feature.

Avoid:

components/

with 300 unrelated files.

Prefer:

features/

workspace/

dashboard/

database/

settings/

Each feature owns:

components

hooks

types

schemas

services

---

# Imports

Prefer absolute imports.

Avoid circular dependencies.

Dependencies should flow inward.

---

# Error Handling

Never swallow errors.

Never expose internal stack traces.

Create typed domain errors.

Unexpected errors should be logged.

---

# Logging

Log:

authentication

payments

AI execution

database failures

security events

Do not log:

passwords

tokens

personal information

---

# Async

Prefer async/await.

Avoid promise chains.

Handle rejected promises.

Never ignore async errors.

---

# Performance

Measure first.

Optimize second.

Avoid premature optimization.

---

# React Performance

Prefer:

Server Components

Memoization only when measured

Lazy loading

Dynamic imports

Virtualized tables

Pagination

Streaming

Avoid unnecessary state.

Avoid unnecessary effects.

---

# Database

Always:

Use indexes.

Use transactions.

Paginate large queries.

Select only required columns.

Avoid N+1 queries.

Avoid SELECT *.

Prefer explicit columns.

---

# AI

Never trust AI output.

Always validate.

Always sanitize.

Always verify permissions.

AI generates plans.

Backend executes plans.

---

# Security

Always assume hostile input.

Validate:

body

query

params

cookies

headers

uploads

AI output

Never trust the client.

---

# Accessibility

Every interactive element should support:

keyboard

focus

screen readers

ARIA

color contrast

---

# Anti Patterns

Never:

God Components

God Services

God Classes

Deep nesting

Massive switch statements

Copy-paste programming

Hidden side effects

Magic strings

Magic numbers

Boolean parameter explosion

Global mutable state

Long parameter lists

Callback pyramids

Circular dependencies

Duplicated validation

Business logic in UI

Business logic in repositories

Database queries inside components

Fetching data inside deeply nested children

---

# Code Smells

Refactor when you notice:

Long methods

Large files

Large components

Primitive obsession

Shotgun surgery

Feature envy

Duplicated logic

Excessive comments explaining code

If comments are required to explain logic, improve the code instead.

---

# Comments

Prefer self-documenting code.

Comments should explain:

Why

Not

What

---

# Git

Small commits.

One logical change per commit.

Do not add Co-Authored-By lines.

---

# Branching

Never commit directly to main.

main must always stay working and deployable.

Start every task on a new branch, created from main.

Branch naming:

feat/<short-name>

fix/<short-name>

chore/<short-name>

refactor/<short-name>

One branch = one task.

Workflow:

1. Create branch from main.

2. Commit work on the branch.

3. Push the branch.

4. Human reviews the diff.

5. Human approves the merge into main.

6. Delete the branch after merge.

AI may create branches, commit, and push on its own.

AI must not merge into main. A human reviews and approves every merge.

This mirrors the project principle: AI generates, humans approve.

Delete a merged branch with git branch -d (safe; refuses if unmerged).

Only main is permanent. Never delete main.

---

# Commit Messages

Use Conventional Commits.

Format:

<type>(<scope>): <subject>

Types:

feat

fix

refactor

chore

docs

test

style

perf

build

ci

Rules:

Subject under 50 characters.

Imperative mood ("add" not "added").

No trailing period.

Body wraps at 72 characters.

Body explains why, not what.

Breaking change: append ! after type, or add BREAKING CHANGE footer.

Type maps to changelog and SemVer:

feat -> Added -> MINOR

fix -> Fixed -> PATCH

feat! or breaking -> Changed/Removed -> MAJOR

refactor, chore, docs, test, style -> usually omitted -> none

Examples:

feat(auth): add email and password login

fix(cart): correct order total rounding

refactor(api): extract request validation

---

# Changelog

Every user-facing feature, fix, or behavior change gets an entry in CHANGELOG.md under [Unreleased].

Follow the format, groups, and examples defined in CHANGELOG.md.

Write from the reader's point of view. Lead with impact, not implementation.

Reference the PR or issue with (#123) when one exists.

Pure internal work with no user-visible effect may be skipped.

No user-facing change ships without a changelog entry.

---

# Secrets and Environment

Secrets live in .env only.

Never commit .env or any secret to git.

Never hardcode API keys, tokens, passwords, or connection strings.

Read secrets from environment variables.

Document required variables in .env.example (values blank or fake).

Never print secrets in logs or errors.

If a secret leaks into git history, rotate it immediately.

---

# Dependencies

Prefer the standard library and existing dependencies.

Justify every new dependency before adding it.

Check the dependency is maintained, popular, and license-compatible.

Avoid one-line packages that are trivial to write.

Pin versions. Do not use loose ranges for critical packages.

Never add a dependency to solve a problem existing code already solves.

---

# Definition of Done

A task is done only when all of these are true:

Code compiles.

Lint passes.

Type check passes.

Business rules validated.

Changelog updated for user-facing changes.

Work committed on a task branch.

Branch pushed.

Do not report a task as done until every item above holds.

---

# Testing

Critical business logic should be testable.

Favor integration tests for services.

Favor unit tests for utilities.

Avoid testing implementation details.

---

# Pull Requests

Every change should:

Compile

Pass lint

Maintain type safety

Follow architecture

Avoid duplication

Improve readability

---

# Final Rule

Whenever multiple implementations are possible, choose the solution that is:

- Easiest to understand.
- Easiest to maintain.
- Most type-safe.
- Least coupled.
- Most consistent with the existing architecture.

Consistency across the codebase is more valuable than isolated optimizations.