# Project Brief

## Propósito

Proporcionar una definición compacta y basada en evidencia de este repositorio para que los agentes inicien cada sesión con el alcance correcto del producto.

## Identidad del proyecto

- Nombre del proyecto: Financial Metrics Dashboard.
- Tipo de repositorio: proyecto educativo de handover.
- Arquitectura principal: frontend React + Vite, backend FastAPI, orquestación con Docker Compose.
- Fuente de datos: movimientos financieros simulados (mock) generados en código backend.
- Persistencia actual: ninguna (sin integración de base de datos).

## Problema que resuelve

Ofrecer un dashboard de una sola pantalla que resume la actividad financiera mediante KPIs y gráficos de tendencia mensual, usando un dataset mock reproducible con fines de aprendizaje y handover.

## Alcance implementado actual

- Tarjetas KPI de ingreso total, egreso total, utilidad y margen de utilidad.
- Gráfico mensual de ingreso vs egreso.
- Gráfico mensual de margen de utilidad.
- Endpoints backend de métricas y analítica de solo lectura bajo `/api/metrics*`.
- Endpoint de salud (`GET /health`) y documentación OpenAPI (`/docs`).

## Fuera de alcance (verificado)

- Integraciones reales contables o bancarias.
- Autenticación y autorización de usuarios.
- Almacenamiento persistente de movimientos financieros.
- Pipeline de despliegue productivo definido en el repositorio.
- Workflows de CI visibles en los archivos del repositorio.

## Restricciones principales

- No presentar datos mock como datos financieros reales.
- No afirmar comportamientos implementados sin evidencia en el repositorio.
- Mantener la documentación de handover alineada con el estado actual del código.

## Documentos fuente

- `context.md`
- `README.md`
- `README.es.md`
- `design.md`
- `engineering-analysis.md`
- `memory-bank/current-status.md`
- `memory-bank/product-overview.md`
- `memory-bank/tech-stack.md`
