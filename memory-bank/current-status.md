# Current Status

## Snapshot Metadata

- Snapshot date (`date -I`): `2026-06-18`
- Branch: `main`
- HEAD commit: `38c9c04`
- Last 5 commits (`git log -5 --oneline`):
  - `38c9c04 docs(agents): add repository-specific rules and agent guide`
  - `9425bc4 docs(engineering): document current design and engineering practices`
  - `76011ac docs(handover): document verified project context and onboarding`
  - `954f812 Merge pull request #1 from deimianvasquez/main`
  - `eeece05 feat: use Vite API proxy and document frontend env setup`

## Scope Baseline

Current repository baseline:

- Frontend + backend running with Docker Compose.
- Backend serves simulated data and analytics endpoints.
- Frontend renders KPI cards and charts from backend metrics.
- Documentation set now includes phase-oriented handover and agent rules.

## Docker Services Status

Command used: `docker compose ps`

Observed status at snapshot time:

- `frontend`: `Up` (port `5173` exposed).
- `backend`: `Up` (ports `8000` and `5678` exposed).

## Validation Results (Fresh Run)

All validations below were rerun on `2026-06-18`.

### Frontend tests

- Command: `docker compose exec -T frontend npm run test`
- Result: pass.
- Evidence summary:
  - `Test Files  1 passed (1)`
  - `Tests  5 passed (5)`

### Frontend build

- Command: `docker compose exec -T frontend npm run build`
- Result: pass.
- Evidence summary:
  - TypeScript build + Vite build completed.
  - Output artifact generated under `dist/`.
  - Warning present: Vite chunk size warning (`Some chunks are larger than 500 kB after minification`).

### Backend tests

- Command: `docker compose exec -T backend pytest -q`
- Result: pass with warning.
- Evidence summary:
  - `15 passed, 1 warning in 0.67s`
  - Warning type: `StarletteDeprecationWarning` from test stack (`httpx` with `starlette.testclient` deprecation guidance).

## Runtime Warnings Observed in Logs

Command used: `docker compose logs --tail=80`

Observed non-blocking warnings:

- `debugpy` frozen modules warning in backend startup logs.

Observed non-blocking runtime informational output:

- Vite optimizer activity during frontend dev runtime.

These warnings do not currently block startup, local testing, or local build.

## Known Risks and Constraints

Current known constraints remain:

- Data source is simulated; no real persistence.
- Backend dependency versions are not pinned in `requirements.txt`.
- Frontend build reports chunk-size warning.
- Backend test stack emits deprecation warning.
- Backend root route (`/`) returns `404` by design.

## Functional Availability

Confirmed available endpoints and interfaces:

- API docs: `/docs` responds (`200`).
- OpenAPI schema: `/openapi.json` responds (`200`).
- Metrics endpoint: `/api/metrics` responds (`200`).
- Health endpoint: `/health` responds (`200`).
- Frontend is reachable at `http://localhost:5173` while containers are up.

## Working Tree Status (Phase 4)

Phase 4 expected pending files (not committed in this phase):

- `memory-bank/product-overview.md`
- `memory-bank/tech-stack.md`
- `memory-bank/current-status.md`
- `AGENTS.md` (reading-order/index update for memory-bank inclusion)

## Next Review Triggers

Refresh this file whenever any of the following changes occur:

- New commit on `main` affecting behavior or docs.
- Dependency version changes in frontend/backend.
- Docker topology or port mappings change.
- Validation commands produce different pass/fail counts or new warnings.
- API contracts/endpoints are added, changed, or removed.
