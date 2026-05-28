# Rule: API Evolution Compatibility

## Scope
Existing FastAPI endpoints under /api/metrics and their response semantics.

## Why
Frontend rendering and backend tests depend on current endpoint behavior. Breaking API changes without coordinated updates create regressions.

## Rule
- Avoid breaking changes to existing endpoints unless the same task updates all affected consumers and tests.
- Prefer additive evolution: new optional fields or new endpoints over incompatible mutations.
- Keep filtering behavior explicit and consistent with query parameters.
- Preserve chronological ordering where routes currently guarantee sorted outputs.

## Validation in this repository
- Endpoint definitions and behavior are in backend/app/routes.py.
- Frontend consumption path begins at frontend/src/App.tsx.
- Compatibility expectations are encoded in backend/tests/test_routes.py.
