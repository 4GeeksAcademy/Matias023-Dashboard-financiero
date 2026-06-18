# AGENTS.md

## Purpose

This file defines how AI agents should read project context and apply repository rules before making changes.

## Required reading order

1. `AGENTS.md`
2. `context.md`
3. `README.md` or `README.es.md`
4. `design.md`
5. `engineering-analysis.md`
6. Applicable files in `.agents/rules/`
7. In Phase 4, the documents in `memory-bank/` (when they are created)

## Rule index

- [.agents/rules/quality-gates.md](.agents/rules/quality-gates.md): Minimum validation gates and reporting requirements before completing changes.
- [.agents/rules/frontend.md](.agents/rules/frontend.md): Frontend-specific guardrails for TypeScript, calculations, UI states, and build validation.
- [.agents/rules/backend-api.md](.agents/rules/backend-api.md): Backend API contract, testing, and compatibility rules.
- [.agents/rules/security-dependencies.md](.agents/rules/security-dependencies.md): Security-sensitive configuration and dependency management constraints.
- [.agents/rules/documentation.md](.agents/rules/documentation.md): Documentation consistency and evidence-based update rules.

## Operating principles

- Inspect current repository state before modifying files.
- Base all technical claims on repository evidence.
- Do not invent behaviors, endpoints, or implemented features.
- Respect the requested scope and current exercise phase.
- Run applicable validations and report exact outcomes.
- Report errors and warnings explicitly, even when non-blocking.
- Do not create commits or push without explicit user authorization.
- Do not mix independent phases or tasks in the same commit.

## Current project boundaries

- Frontend built with React and Vite.
- Backend built with FastAPI.
- Local orchestration with Docker Compose.
- Financial data is currently simulated (mock).
- No real persistence layer is implemented.
- Current scope is academic and handover-oriented.
