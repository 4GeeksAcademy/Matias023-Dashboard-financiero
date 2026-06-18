# Frontend Rules

## Purpose

Preserve current frontend behavior, contracts, and maintainability in the React + TypeScript dashboard.

## Rules

1. Keep strict TypeScript contracts for financial data.
- Applies to: `frontend/src/lib/financial-types.ts`, `frontend/src/App.tsx`, `frontend/src/lib/financial-utils.ts`.
- Do: update interfaces/types when payload shape changes.
- Validate: `docker compose exec -T frontend npm run build` succeeds without type errors.

2. Keep financial calculations as pure utility functions, not embedded in visual components.
- Applies to: `frontend/src/lib/financial-utils.ts`, `frontend/src/components/dashboard/`.
- Do: place KPI and monthly aggregation logic in `frontend/src/lib/`.
- Validate: component files do not introduce duplicated formulas; utility tests cover logic.

3. Update frontend tests when KPI formulas or monthly aggregation logic change.
- Applies to: `frontend/src/lib/financial-utils.ts`, `frontend/src/lib/financial-utils.test.ts`.
- Do: adjust test cases for any formula or grouping change.
- Validate: `docker compose exec -T frontend npm run test` passes and assertions match updated formulas.

4. Preserve Vite API proxy behavior for local Docker development.
- Applies to: `frontend/vite.config.ts`.
- Do: keep `/api` proxy target configured for backend service resolution.
- Validate: frontend can fetch `/api/metrics` through app flow in `frontend/src/App.tsx`.

5. Preserve visible loading and error states in the main dashboard flow.
- Applies to: `frontend/src/App.tsx`, `frontend/src/components/dashboard/kpi-card.tsx`, `frontend/src/components/dashboard/income-outcome-chart.tsx`, `frontend/src/components/dashboard/profit-percent-chart.tsx`.
- Do: keep explicit loading and error rendering paths.
- Validate: code review confirms both states remain reachable and rendered.

6. Keep dashboard component responsibilities separated.
- Applies to: `frontend/src/components/dashboard/`.
- Do: keep header, KPI row/cards, and charts in dedicated components.
- Validate: no single component consolidates all dashboard rendering and data processing logic.

7. Run frontend build after changes in charts, dashboard components, utility types, or API consumption code.
- Applies to: `frontend/src/`, `frontend/vite.config.ts`, `frontend/package.json`.
- Command: `docker compose exec -T frontend npm run build`
- Validate: build success and warnings reported.

8. Do not document non-implemented UI behaviors as existing.
- Applies to: `README.md`, `README.es.md`, `context.md`, `design.md`.
- Do: describe only states/features present in code (for example filters, navigation, global empty page state).
- Validate: each claim maps to files under `frontend/src/`.
