# Product Overview

## Propósito

Este archivo mantiene una descripción estable y compacta de lo que es hoy el producto, para que futuros contribuidores y agentes recuperen contexto rápidamente sin releer todo el repositorio.

## Producto actual

El producto actual es un dashboard financiero compuesto por:

- React frontend.
- FastAPI backend.
- KPI cards.
- Two financial charts.
- Simulated financial data (mock).
- Local execution with Docker Compose.

## Capacidades actuales

Capacidades implementadas observadas en código:

- Obtener movimientos financieros simulados mediante `GET /api/metrics`.
- Filtrar movimientos en API por `start_date`, `end_date`, `category` y `operation_type`.
- Obtener métricas segmentadas para B2B y B2C (`/api/metrics/b2b`, `/api/metrics/b2c`).
- Obtener facetas de filtros (`/api/metrics/facets`).
- Obtener resúmenes agrupados por día/semana/mes (`/api/metrics/summary`).
- Obtener top de categorías (`/api/metrics/categories/top`).
- Obtener comparación de períodos (`/api/metrics/comparison`).
- Obtener alertas de anomalías (`/api/metrics/alerts`).
- Mostrar tarjetas KPI y gráficos frontend basados en la respuesta de `/api/metrics`.

Nota: varias capacidades anteriores son solo de nivel API y actualmente no tienen controles de filtro visibles en la UI.

## Información visible para usuario

Información actualmente visible en el dashboard:

- Header with dashboard title and period badge.
- KPI cards: total income, total outcome, profit, profit margin.
- Income vs outcome chart.
- Profit margin chart.
- Loading state with skeleton placeholders.
- Mensaje de error cuando falla la carga de datos.

## Fuente de datos

- Los datos son simulados en código backend.
- La generación de movimientos usa una semilla reproducible (`seed=42`) en los flujos de endpoints.
- No hay base de datos conectada.
- No existe integración con proveedores financieros externos.
- No hay capa de persistencia implementada.

## Límites de alcance actuales

El proyecto está actualmente acotado como un ejercicio académico de handover con ejecución local basada en Docker, entradas financieras simuladas y progresión por fases guiada por documentación.

## Explícitamente no implementado

Verificado como no implementado en el alcance actual del repositorio:

- Authentication/authorization.
- Real persistence/database storage.
- Real financial integrations.
- Production deployment workflow in repository.
- Visible CI/CD workflow files in repository.

## Flujo principal del producto

```text
Browser
→ React/Vite
→ /api/metrics
→ Vite proxy
→ FastAPI
→ movimientos simulados
→ JSON response
→ cálculos frontend
→ KPI cards and charts
```

## Documentos relacionados

- [README.md](../README.md)
- [README.es.md](../README.es.md)
- [context.md](../context.md)
- [design.md](../design.md)
- [engineering-analysis.md](../engineering-analysis.md)

## Notas de mantenimiento

Actualizar este archivo cuando cambie el comportamiento visible del producto, cuando se agreguen/remuevan capacidades API o cuando se redefinan los límites de alcance en fases futuras.
