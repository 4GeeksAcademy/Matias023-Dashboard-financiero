# Product Overview

## Purpose

This file keeps a stable and compact description of what the product is today, so future contributors and agents can recover context quickly without re-reading the full repository.

## Current Product

The current product is a financial dashboard composed of:

- React frontend.
- FastAPI backend.
- KPI cards.
- Two financial charts.
- Simulated financial data (mock).
- Local execution with Docker Compose.

## Current Capabilities

Implemented capabilities observed in code:

- Retrieve simulated financial movements through `GET /api/metrics`.
- Filter movements in API by `start_date`, `end_date`, `category`, and `operation_type`.
- Retrieve segmented metrics for B2B and B2C (`/api/metrics/b2b`, `/api/metrics/b2c`).
- Retrieve filter facets (`/api/metrics/facets`).
- Retrieve summaries grouped by day/week/month (`/api/metrics/summary`).
- Retrieve top categories (`/api/metrics/categories/top`).
- Retrieve period comparison (`/api/metrics/comparison`).
- Retrieve anomaly alerts (`/api/metrics/alerts`).
- Display frontend KPI cards and charts based on `/api/metrics` response.

Note: several capabilities above are API-level only and do not currently have visible filter controls in the UI.

## User-Visible Information

Current visible dashboard information:

- Header with dashboard title and period badge.
- KPI cards: total income, total outcome, profit, profit margin.
- Income vs outcome chart.
- Profit margin chart.
- Loading state with skeleton placeholders.
- Error message when data fetch fails.

## Data Source

- Data is simulated in backend code.
- Movement generation uses a reproducible seed (`seed=42`) in endpoint flows.
- No database is connected.
- No external financial provider integration is present.
- No persistence layer is implemented.

## Current Scope Boundaries

The project is currently scoped as an academic handover exercise with local Docker-based execution, simulated financial inputs, and documentation-driven phase progression.

## Explicitly Not Implemented

Verified as not implemented in current repository scope:

- Authentication/authorization.
- Real persistence/database storage.
- Real financial integrations.
- Production deployment workflow in repository.
- Visible CI/CD workflow files in repository.

## Main Product Flow

```text
Browser
→ React/Vite
→ /api/metrics
→ Vite proxy
→ FastAPI
→ simulated movements
→ JSON response
→ frontend calculations
→ KPI cards and charts
```

## Related Documents

- [README.md](../README.md)
- [README.es.md](../README.es.md)
- [context.md](../context.md)
- [design.md](../design.md)
- [engineering-analysis.md](../engineering-analysis.md)

## Maintenance Notes

Update this file when product-visible behavior changes, when API capabilities are added/removed, or when scope boundaries are redefined in future phases.
