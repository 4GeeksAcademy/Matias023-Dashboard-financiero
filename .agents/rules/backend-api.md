# Backend API Rules

## Purpose

Protect API contract stability and backend testability in the FastAPI service.

## Rules

1. Keep API response contracts explicit with typed models.
- Applies to: `backend/app/routes.py`.
- Do: add or update `BaseModel` schemas for response structures when endpoints change.
- Validate: endpoint decorators declare response models and backend tests pass.

2. Update backend tests when endpoints, filters, aggregations, or segmentation logic change.
- Applies to: `backend/app/routes.py`, `backend/tests/test_routes.py`.
- Do: add/adjust pytest cases for changed behavior.
- Command: `docker compose exec -T backend pytest -q`
- Validate: tests pass and new behavior is asserted.

3. Keep health endpoint operational and documented.
- Applies to: `backend/app/routes.py`, `README.md`, `README.es.md`, `context.md`.
- Do: preserve `GET /health` behavior unless intentionally replaced with documented migration.
- Validate: health route exists in code and responds successfully in runtime checks.

4. Do not add endpoints without documenting method, route, parameters, and response format.
- Applies to: `backend/app/routes.py`, `README.md`, `README.es.md`, `context.md`.
- Do: document public API capabilities when introducing/changing routes.
- Validate: docs and route definitions are consistent.

5. Do not present mock financial output as production or real external data.
- Applies to: `backend/app/routes.py`, docs in root markdown files.
- Do: keep explicit wording that movements are simulated when applicable.
- Validate: docs and endpoint descriptions remain clear about mock data.

6. Preserve reproducibility for simulated data paths.
- Applies to: `backend/app/routes.py`, `backend/tests/test_routes.py`.
- Do: maintain deterministic behavior for current mock workflow (seeded generation in endpoints/tests).
- Validate: repeated runs keep stable assertions in tests.

7. Avoid increasing coupling between route handlers and data-generation internals.
- Applies to: `backend/app/routes.py`.
- Do: when evolving logic, move new data-generation complexity to dedicated helpers/modules instead of expanding endpoint bodies.
- Validate: endpoint handlers remain focused on request/response orchestration.

8. Preserve compatibility with frontend-consumed routes unless coordinated changes are documented.
- Applies to: `backend/app/routes.py`, `frontend/src/App.tsx`, `frontend/vite.config.ts`, docs.
- Do: keep `/api/metrics` contract stable or document coordinated update impact.
- Validate: frontend flow still fetches and renders without contract mismatch.

9. Report any frontend-backend contract breaking change explicitly in phase reports.
- Applies to: handover docs and change summaries.
- Do: include old/new fields, endpoints, and required frontend updates.
- Validate: report contains concrete impacted files and symbols.
