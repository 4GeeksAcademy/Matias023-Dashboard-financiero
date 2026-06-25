---
name: dashboard-metrics-integration
description: Integrar o modificar métricas del dashboard financiero preservando coherencia entre backend/frontend/tests/documentación en este repositorio.
license: MIT
metadata:
  author: repository-agents
  version: "1.0"
---

# Dashboard Metrics Integration

## Nombre de la skill

dashboard-metrics-integration

## Objetivo único

Implementar o modificar métricas financieras en este Dashboard financiero manteniendo consistencia de contratos, cálculos, tests y documentación entre backend, frontend y artefactos de handover.

## Cuándo usarla

Usa esta skill cuando la tarea incluya uno o más de los siguientes casos en este repositorio:

- Agregar, remover o cambiar la definición de un KPI o métrica financiera.
- Cambiar filtros de métricas, agregaciones o lógica de comparación en endpoints API.
- Alinear el renderizado de métricas en frontend con cambios del contrato de respuesta backend.
- Actualizar tests y documentación tras cambios de comportamiento de métricas.

## Cuándo no usarla

No uses esta skill para:

- Restyling visual/UI puro sin cambios de lógica de métricas.
- Cambios solo de infraestructura (Docker, CI, pin de dependencias sin impacto en métricas).
- Tareas de autenticación, persistencia o integración con proveedores externos.
- Debugging genérico no relacionado con el flujo de métricas financieras.

## Inputs requeridos

- Solicitud de cambio de métrica objetivo con comportamiento esperado.
- Endpoints y/o componentes frontend impactados, si se conocen.
- Ejemplos de aceptación (al menos un escenario con resultado esperado).
- Restricciones de alcance de la fase actual (qué rutas pueden o no editarse).

## Pasos de ejecución

1. Leer contexto obligatorio antes de cambios:
- `AGENTS.md`
- `memory-bank/projectbrief.md`
- `memory-bank/techContext.md`
- `memory-bank/current-status.md`
- `.agents/rules/backend-api.md`
- `.agents/rules/frontend.md`
- `.agents/rules/documentation.md`

2. Ubicar fuentes de verdad de métricas:
- Contrato de rutas backend y modelos de respuesta en `backend/app/routes.py`.
- Tipos/utilidades financieras frontend en `frontend/src/lib/financial-types.ts` y `frontend/src/lib/financial-utils.ts`.
- Consumidores UI en `frontend/src/App.tsx` y componentes del dashboard.

3. Planificar actualización coordinada:
- Definir primero el impacto de contrato (campos, filtros, comportamiento de endpoints).
- Definir responsabilidad de cálculo (backend vs frontend) y evitar duplicidad.
- Definir tests y docs que deben cambiar en el mismo ciclo.

4. Implementar cambios de métricas con coherencia:
- Actualizar contrato/lógica backend si cambia el comportamiento API.
- Actualizar tipos/utilidades/componentes frontend para el mismo contrato.
- Mantener una fuente de verdad clara por cada fórmula.

5. Actualizar tests:
- Tests backend de endpoint/contrato en `backend/tests/test_routes.py`.
- Tests frontend de utilidades en `frontend/src/lib/financial-utils.test.ts`.
- Agregar o ajustar aserciones para el nuevo comportamiento de métricas.

6. Actualizar documentación y artefactos de memory-bank cuando cambie alcance o comportamiento:
- `README.md` y `README.es.md` (comportamiento/capacidades públicas).
- `context.md` y/o `design.md` (cambios verificados de comportamiento/diseño).
- `memory-bank/current-status.md` y `memory-bank/progress.md` cuando cambie evidencia de estado.

7. Ejecutar validaciones mínimas y reportar resultados exactos.

## Resultado esperado

- Implementación de métricas coherente entre backend y frontend.
- Tests actualizados que validan comportamiento nuevo/modificado.
- Documentación y entradas de memory-bank actualizadas y alineadas con código.
- Resumen de cambios con archivos impactados, cambios de contrato y evidencia de validación.

## Criterios de aceptación explícitos

- El comportamiento de la métrica está implementado y es trazable a cambios de código.
- El contrato backend y el consumo frontend son compatibles (sin desajuste de esquema).
- No hay fórmulas duplicadas entre capas sin justificación.
- Pasan tests backend y frontend que cubren el cambio de métrica.
- Las afirmaciones de documentación coinciden con el comportamiento implementado.
- Ninguna afirmación implica persistencia real o integración real con proveedor financiero.

## Validaciones mínimas sugeridas

- `docker compose exec -T backend pytest -q`
- `docker compose exec -T frontend npm run test`
- `docker compose exec -T frontend npm run build`
- `git diff --check`
- `git status --short`

## Restricciones

- No inventar endpoints nuevos ni comportamiento de endpoints sin implementación y documentación explícitas.
- No duplicar cálculos KPI/agregación entre backend y frontend sin razón documentada.
- No afirmar persistencia real ni integración de datos productivos; la fuente actual de datos es mock.
- No introducir ni modificar flujos de manejo de datos financieros reales en esta fase del repositorio.
