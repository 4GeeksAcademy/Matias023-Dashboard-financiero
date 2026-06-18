# Technical Stack

## Purpose

This file records a verifiable snapshot of the technical stack used by the project, including where versions are declared and how they are currently resolved in local runtime.

## Runtime and Infrastructure

- Orchestration: Docker Compose (`docker-compose.yml`).
- Services:
  - `frontend` built from `frontend/Dockerfile`.
  - `backend` built from `backend/Dockerfile`.
- Container networking:
  - Frontend reaches backend via Docker service name (`http://backend:8000`) through Vite proxy.
- Volumes:
  - `./frontend:/app`
  - `/app/node_modules`
  - `./backend:/app`
- Exposed ports:
  - Frontend: `5173`
  - Backend API: `8000`
  - Backend debugpy: `5678`

## Frontend

| Technology | Verified version | Purpose | Source |
| --- | --- | --- | --- |
| Node (container image) | `24-alpine` | Runtime inside frontend container | `frontend/Dockerfile` |
| React | declared `^19.2.4`, resolved `19.2.5` | UI rendering | `frontend/package.json`, `frontend/package-lock.json` |
| React DOM | declared `^19.2.4`, resolved `19.2.5` | Browser rendering target | `frontend/package.json`, `frontend/package-lock.json` |
| TypeScript | declared `~6.0.2`, resolved `6.0.2` | Static typing and compile checks | `frontend/package.json`, `frontend/package-lock.json` |
| Vite | declared `^8.0.4`, resolved `8.0.8` | Dev server and production build | `frontend/package.json`, `frontend/package-lock.json` |
| Recharts | declared `^3.8.1`, resolved `3.8.1` | Financial chart rendering | `frontend/package.json`, `frontend/package-lock.json` |
| Tailwind CSS | declared `^4.2.2`, resolved `4.2.2` | Utility-first styling and tokens | `frontend/package.json`, `frontend/package-lock.json`, `frontend/src/index.css` |
| Vitest | declared `^4.1.4`, resolved `4.1.4` | Frontend tests | `frontend/package.json`, `frontend/package-lock.json` |

## Backend

| Technology | Verified version | Purpose | Source |
| --- | --- | --- | --- |
| Python (container image) | `3.13-slim` | Runtime inside backend container | `backend/Dockerfile` |
| FastAPI | requirement unpinned; observed `0.137.1` in current container | API framework and OpenAPI generation | `backend/requirements.txt`, container metadata check |
| Uvicorn | requirement unpinned; observed `0.49.0` | ASGI server | `backend/requirements.txt`, `backend/Dockerfile`, container metadata check |
| debugpy | requirement unpinned; observed `1.8.21` | Remote debugging | `backend/requirements.txt`, `backend/Dockerfile`, container metadata check |
| pytest | requirement unpinned; observed `9.1.0` | Backend test runner | `backend/requirements.txt`, container metadata check |
| httpx | requirement unpinned; observed `0.28.1` | HTTP client dependency in test stack | `backend/requirements.txt`, container metadata check |

Note: backend dependency versions are not pinned in `backend/requirements.txt`; observed versions correspond to the current built container and are not guaranteed by repository constraints.

## Testing

- Frontend tests:
  - Location: `frontend/src/lib/financial-utils.test.ts`
  - Tool: Vitest
  - Command: `docker compose exec -T frontend npm run test`
- Backend tests:
  - Location: `backend/tests/test_routes.py`
  - Tool: pytest + FastAPI TestClient
  - Command: `docker compose exec -T backend pytest -q`
- Most recent validated results (2026-06-18):
  - Frontend: `5 passed`.
  - Backend: `15 passed`, `1 warning`.

## Development Ports and URLs

- Frontend: `http://localhost:5173`
- Backend API docs: `http://localhost:8000/docs`
- Backend health: `http://localhost:8000/health`
- Backend debug port: `5678`
- Note: backend root `http://localhost:8000` returns `404` because no `/` route is defined.

## Main Commands

- `docker compose up --build`: build and start frontend/backend services.
- `docker compose ps`: check container status and exposed ports.
- `docker compose logs --tail=80`: inspect recent service logs and warnings.
- `docker compose exec -T frontend npm run test`: run frontend tests.
- `docker compose exec -T frontend npm run build`: run frontend production build.
- `docker compose exec -T backend pytest -q`: run backend tests.
- `git diff --check`: detect whitespace errors in pending changes.
- `git status --short`: inspect pending scope before commits.

## Dependency Management

- Frontend dependency declarations: `frontend/package.json`.
- Frontend lockfile with resolved versions: `frontend/package-lock.json`.
- Backend dependency declarations: `backend/requirements.txt`.
- Current risk: backend dependencies are unpinned, increasing reproducibility risk across rebuilds.

## Technical Boundaries

- Local development oriented setup.
- Simulated financial data source.
- No persistence/database layer.
- Open CORS currently configured in backend (`allow_origins=["*"]`) as observed development setup.
- No CI workflow files visible in repository.
- Stack is not validated as production-ready.

## Sources of Truth

- `docker-compose.yml`
- `frontend/Dockerfile`
- `backend/Dockerfile`
- `frontend/package.json`
- `frontend/package-lock.json`
- `backend/requirements.txt`
- `frontend/vite.config.ts`
- `backend/app/main.py`
- `backend/app/routes.py`

## Maintenance Notes

Update this file whenever runtime images, dependency declarations/resolutions, core commands, ports, or validation tooling change.
