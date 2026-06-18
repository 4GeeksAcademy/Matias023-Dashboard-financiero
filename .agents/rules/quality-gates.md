# Quality Gates

## Purpose

Define minimum validation gates before considering a change complete in this repository.

## Rules

1. Run frontend tests when a change affects frontend code, frontend docs that claim test outcomes, or frontend data calculations.
- Applies to: `frontend/`, `README.md`, `README.es.md`, `context.md`, `design.md`, `engineering-analysis.md`.
- Command: `docker compose exec -T frontend npm run test`
- Validation: Command exits with success and reported test counts are included in the report.

2. Run frontend build when a change touches UI, TypeScript types, dashboard components, chart behavior, or API consumption from the frontend.
- Applies to: `frontend/src/`, `frontend/package.json`, `frontend/tsconfig*.json`, `frontend/vite.config.ts`.
- Command: `docker compose exec -T frontend npm run build`
- Validation: Build exits with success; include any non-blocking warnings in the report.

3. Run backend tests when a change touches routes, filters, response models, mock generation logic, or backend docs that claim backend test status.
- Applies to: `backend/app/`, `backend/tests/`, `README.md`, `README.es.md`, `context.md`, `engineering-analysis.md`.
- Command: `docker compose exec -T backend pytest -q`
- Validation: Command exits with success and report includes passed/failed counts plus warnings.

4. Check whitespace integrity before finalizing a change set.
- Applies to: all tracked files.
- Command: `git diff --check`
- Validation: No output from the command.

5. Review pending scope before commit.
- Applies to: all changes.
- Command: `git status --short`
- Validation: Pending files match the intended phase scope only.

6. Do not claim a validation passed if it was not executed in the current session.
- Applies to: all reports and handover outputs.
- Validation: Every claimed result must reference a command executed in terminal output.

7. Always report warnings, even when commands exit successfully.
- Applies to: test/build/log checks.
- Validation: Report includes warnings such as pytest deprecations, Vite chunk warnings, or debug warnings when present.

## Notes

- A lint command exists in `frontend/package.json` (`npm run lint`), but this gate file includes only the commands explicitly required for this project phase.
