# Rule: Fullstack Workflow Validation

## Scope
Tasks that modify frontend, backend, or integration behavior between both layers.

## Why
This project is a React + TypeScript frontend with a FastAPI backend. A change is only reliable when validated in the affected layer and, when needed, in cross-layer behavior.

## Rule
- Frontend-only changes must run frontend quality checks before completion.
- Backend-only changes must run backend tests before completion.
- API contract or integration changes must validate both frontend and backend.
- Local integration baseline is docker compose startup from the repository root.

## Required checks
- Frontend: npm run lint and npm run test in frontend.
- Backend: pytest in backend.
- Integration sanity: docker compose up --build from repository root when contract or runtime wiring changes.

## Validation in this repository
- Frontend scripts exist in frontend/package.json.
- Backend test stack exists in backend/requirements.txt and backend/tests.
- Canonical local startup is documented in README.md and configured in docker-compose.yml.
