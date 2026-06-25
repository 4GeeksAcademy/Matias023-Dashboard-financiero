# Current Status

## Metadatos de la instantánea

- Fecha de instantánea (`date -I`): `2026-06-18`
- Branch: `main`
- HEAD commit: `38c9c04`
- Últimos 5 commits (`git log -5 --oneline`):
  - `38c9c04 docs(agents): add repository-specific rules and agent guide`
  - `9425bc4 docs(engineering): document current design and engineering practices`
  - `76011ac docs(handover): document verified project context and onboarding`
  - `954f812 Merge pull request #1 from deimianvasquez/main`
  - `eeece05 feat: use Vite API proxy and document frontend env setup`

## Línea base de alcance

Línea base actual del repositorio:

- Frontend + backend ejecutándose con Docker Compose.
- El backend sirve datos simulados y endpoints de analítica.
- El frontend renderiza tarjetas KPI y gráficos desde métricas backend.
- El set de documentación ahora incluye handover orientado por fases y reglas de agentes.

## Estado de servicios Docker

Comando usado: `docker compose ps`

Estado observado al momento de la instantánea:

- `frontend`: `Up` (port `5173` exposed).
- `backend`: `Up` (ports `8000` and `5678` exposed).

## Resultados de validación (ejecución reciente)

Todas las validaciones siguientes se volvieron a ejecutar el `2026-06-18`.

### Tests frontend

- Comando: `docker compose exec -T frontend npm run test`
- Resultado: pasa.
- Resumen de evidencia:
  - `Test Files  1 passed (1)`
  - `Tests  5 passed (5)`

### Build frontend

- Comando: `docker compose exec -T frontend npm run build`
- Resultado: pasa.
- Resumen de evidencia:
  - Build de TypeScript + Vite completado.
  - Artefacto de salida generado en `dist/`.
  - Advertencia presente: warning de tamaño de chunks en Vite (`Some chunks are larger than 500 kB after minification`).

### Tests backend

- Comando: `docker compose exec -T backend pytest -q`
- Resultado: pasa con advertencia.
- Resumen de evidencia:
  - `15 passed, 1 warning in 0.67s`
  - Tipo de advertencia: `StarletteDeprecationWarning` del stack de tests (`httpx` con guía de deprecación de `starlette.testclient`).

## Advertencias de runtime observadas en logs

Comando usado: `docker compose logs --tail=80`

Advertencias no bloqueantes observadas:

- `debugpy` frozen modules warning in backend startup logs.

Salida informativa de runtime no bloqueante observada:

- Vite optimizer activity during frontend dev runtime.

Estas advertencias no bloquean actualmente el arranque, testing local ni build local.

## Riesgos y restricciones conocidos

Las restricciones conocidas actuales se mantienen:

- La fuente de datos es simulada; no hay persistencia real.
- Las versiones de dependencias backend no están fijadas en `requirements.txt`.
- El build frontend reporta advertencia de tamaño de chunk.
- El stack de tests backend emite advertencia de deprecación.
- La ruta raíz backend (`/`) devuelve `404` por diseño.

## Disponibilidad funcional

Endpoints e interfaces disponibles confirmados:

- Docs API: `/docs` responde (`200`).
- Esquema OpenAPI: `/openapi.json` responde (`200`).
- Endpoint de métricas: `/api/metrics` responde (`200`).
- Endpoint de salud: `/health` responde (`200`).
- El frontend es accesible en `http://localhost:5173` mientras los contenedores estén activos.

## Estado del working tree (Fase 4)

Archivos pendientes esperados en Fase 4 (no commiteados en esta fase):

- `memory-bank/product-overview.md`
- `memory-bank/tech-stack.md`
- `memory-bank/current-status.md`
- `AGENTS.md` (actualización de orden de lectura/índice para inclusión de memory-bank)

## Disparadores de próxima revisión

Actualizar este archivo cuando ocurra cualquiera de los siguientes cambios:

- Nuevo commit en `main` que afecte comportamiento o documentación.
- Cambios de versiones de dependencias en frontend/backend.
- Cambios en topología Docker o mapeos de puertos.
- Comandos de validación que produzcan conteos distintos de éxito/fallo o nuevas advertencias.
- Contratos/endpoints API agregados, modificados o removidos.
