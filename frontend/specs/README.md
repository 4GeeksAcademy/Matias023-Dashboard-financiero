# Frontend Data Contract Specification

Este directorio contiene una especificación de frontend. No es una implementación de React, no modifica la app actual y no agrega llamadas reales desde la UI existente.

## Funcionalidades cubiertas

### 1. Filtro de rango de fechas para el dashboard principal

- Endpoint principal: GET /api/metrics
- Endpoint de soporte: GET /api/metrics/facets
- Tipos de request params: DateRangeFilter, MetricsParams
- Tipos de response: MetricsResponse, FacetsResponse

Restricciones válidas:

- GET /api/metrics acepta start_date, end_date, category y operation_type.
- GET /api/metrics no acepta business_type.
- Las fechas deben enviarse como string en formato YYYY-MM-DD.

Edge cases mínimos:

- start_date posterior a end_date.
- Rango válido sin resultados.
- Fecha fuera de min_date o max_date devueltos por facets.

### 2. Tabla de alertas de anomalías

- Endpoint: GET /api/metrics/alerts
- Tipos de request params: AlertsParams
- Tipos de response: AlertsResponse

Restricciones válidas:

- threshold es decimal, con mínimo real de API igual a 0 y default 0.3.
- La UI futura debe restringir threshold al rango 0.01 a 1.0 por requerimiento de producto.
- group_by solo acepta day, week o month.
- start_date, end_date y business_type son opcionales.

Edge cases mínimos:

- La API devuelve lista vacía y la tabla debe permanecer visible.
- threshold fuera del rango de producto antes de enviar.
- group_by=day produce granularidad alta y periodos más largos de leer.

Nota de contrato: la API devuelve baseline_average, no una media móvil exacta de 3 periodos anteriores. La especificación de componentes documenta esa discrepancia.

### 3. Vista comparativa B2B vs B2C

- Endpoints:
  - GET /api/metrics/categories/top?operation_type=income&limit=5&business_type=B2B
  - GET /api/metrics/categories/top?operation_type=income&limit=5&business_type=B2C
- Tipos de request params: TopCategoriesParams
- Tipos de response: TopCategoriesResponse

Restricciones válidas:

- operation_type debe fijarse en income para esta funcionalidad.
- limit tiene default 5, mínimo 1 y máximo 20; para esta vista se debe usar 5.
- Ambas consultas deben compartir start_date y end_date cuando el rango esté activo.

Edge cases mínimos:

- Un segmento falla y el otro responde correctamente.
- Un segmento devuelve cero categorías.
- Una respuesta contiene menos de 5 categorías.

Nota de contrato: el porcentaje por categoría puede calcularse en frontend usando la suma de total_amount del arreglo devuelto. Eso representa porcentaje sobre el subtotal visible retornado por el endpoint, no necesariamente sobre todos los ingresos del segmento.

## Tipos TypeScript incluidos

### Respuestas

- MetricEntry
- MetricsResponse
- FacetsResponse
- AlertEntry
- AlertsResponse
- CategoryEntry
- TopCategoriesResponse

### Parámetros

- OperationType
- BusinessType
- MetricCategory
- AlertGroupBy
- DateRangeFilter
- MetricsParams
- AlertsParams
- TopCategoriesParams

## Diferencias entre requerimiento de producto y API real

- El endpoint correcto de alertas es /api/metrics/alerts.
- GET /api/metrics no acepta business_type.
- La API permite threshold mínimo 0, pero la UI debe restringir 0.01 a 1.0 por requerimiento de producto.

## Fuente de verdad usada para esta especificación

- Router real: backend/app/routes.py
- OpenAPI real expuesto por FastAPI en /openapi.json
- Pruebas del backend: backend/tests/test_routes.py
- Consumo actual del dashboard: frontend/src/App.tsx

## Archivos del directorio

- api-types.ts define contratos estrictos de respuestas.
- param-types.ts define contratos estrictos de query params.
- components.md documenta comportamiento esperado por funcionalidad.