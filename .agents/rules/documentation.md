# Documentation Rules

## Purpose

Keep project documentation accurate, phase-aligned, and consistent with implemented behavior.

## Rules

1. Update both README versions when public commands, URLs, stack summary, or API capabilities change.
- Applies to: `README.md`, `README.es.md`.
- Do: keep both files aligned in scope and behavior.
- Validate: command and URL sections match across both files.

2. Keep English and Spanish README content consistent without requiring literal translation.
- Applies to: `README.md`, `README.es.md`.
- Do: preserve equivalent technical meaning and coverage.
- Validate: both describe the same implemented features and limitations.

3. Update `context.md` when verified handover scope changes.
- Applies to: `context.md`.
- Do: revise operational status, implemented scope, and boundaries only from evidence.
- Validate: each major claim maps to existing files or executed commands.

4. Update `design.md` when implemented KPIs, charts, UI states, or dashboard layout structure changes.
- Applies to: `design.md`, `frontend/src/App.tsx`, `frontend/src/components/dashboard/`, `frontend/src/lib/financial-utils.ts`.
- Do: document current behavior only.
- Validate: formulas and components in `design.md` match frontend source.

5. Update `engineering-analysis.md` only after a new evidence-based review cycle.
- Applies to: `engineering-analysis.md`.
- Do: include inspected files, executed validations, and classified findings.
- Validate: document contains concrete evidence paths and command outcomes.

6. Do not document features before implementation.
- Applies to: all root markdown documentation.
- Do: avoid future-state statements presented as current behavior.
- Validate: every feature claim is traceable to source files.

7. Distinguish simulated data from real financial data in all public documentation.
- Applies to: `README.md`, `README.es.md`, `context.md`, `engineering-analysis.md`, `design.md`.
- Do: explicitly label mock data workflows.
- Validate: docs do not imply production data integration when absent.

8. Use verifiable commands and repository-valid paths in documentation.
- Applies to: all markdown docs.
- Do: include commands that exist in project scripts/configuration and paths that exist in repository.
- Validate: command and path checks succeed during documentation review.

9. Avoid full-section duplication across documentation files.
- Applies to: `README.md`, `README.es.md`, `context.md`, `engineering-analysis.md`, `design.md`.
- Do: keep README as onboarding, context as baseline state, engineering-analysis as practices/risks, design as functional/visual behavior.
- Validate: each file preserves its purpose without copying large blocks from another.

10. Keep relative links valid after documentation edits.
- Applies to: all markdown docs with internal links.
- Do: verify linked files exist.
- Validate: link targets resolve in repository structure.
