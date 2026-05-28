# Rule: Deterministic Metrics Testing

## Scope
Changes in financial data generation, filtering, aggregation, and formatting logic.

## Why
This repository generates mock movements with pseudo-random behavior. Stable tests require deterministic inputs and explicit edge-case coverage.

## Rule
- Use deterministic seeded generation for tests that depend on generated backend data.
- Preserve and extend edge-case coverage for date ranges, combined filters, and chronological ordering.
- For frontend utility changes, maintain tests for KPI totals, month grouping, and formatting helpers.
- Do not merge behavior changes in metric logic without corresponding test updates.

## Validation in this repository
- Deterministic generation exists in backend/app/routes.py via generate_mock_movements(seed=42).
- Backend behavior tests live in backend/tests/test_routes.py.
- Frontend utility tests live in frontend/src/lib/financial-utils.test.ts.
