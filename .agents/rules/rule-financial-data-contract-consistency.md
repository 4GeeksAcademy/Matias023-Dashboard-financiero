# Rule: Financial Data Contract Consistency

## Scope
Changes affecting financial movement payloads, metric endpoints, shared TypeScript types, or dashboard calculations.

## Why
The dashboard and utility calculations depend on a stable data shape across backend and frontend. Contract drift causes runtime failures or incorrect KPI values.

## Rule
- Keep field names and semantics aligned across layers: create_date, amount, operation_type, category, business_type.
- Preserve allowed value domains for operation_type, category, and business_type.
- Keep create_date as an ISO-compatible date string in API responses.
- If contract changes are unavoidable, update backend models/routes, frontend shared types, and related tests in the same task.

## Validation in this repository
- Backend contract sources: backend/app/routes.py models and response_model declarations.
- Frontend contract source: frontend/src/lib/financial-types.ts.
- Frontend contract consumers: frontend/src/App.tsx and frontend/src/lib/financial-utils.ts.
- Existing endpoint expectations: backend/tests/test_routes.py.
