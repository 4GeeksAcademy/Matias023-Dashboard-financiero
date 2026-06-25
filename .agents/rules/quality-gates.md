# Quality Gates

## Propósito

Definir puertas mínimas de validación antes de considerar un cambio como completo en este repositorio.

## Reglas

1. Ejecutar tests frontend cuando un cambio afecte código frontend, docs frontend que afirmen resultados de test o cálculos de datos frontend.
- Aplica a: `frontend/`, `README.md`, `README.es.md`, `context.md`, `design.md`, `engineering-analysis.md`.
- Comando: `docker compose exec -T frontend npm run test`
- Validación: el comando finaliza con éxito y el reporte incluye conteos de tests.

2. Ejecutar build frontend cuando un cambio toque UI, tipos TypeScript, componentes del dashboard, comportamiento de gráficos o consumo API desde frontend.
- Aplica a: `frontend/src/`, `frontend/package.json`, `frontend/tsconfig*.json`, `frontend/vite.config.ts`.
- Comando: `docker compose exec -T frontend npm run build`
- Validación: el build finaliza con éxito e incluye advertencias no bloqueantes en el reporte.

3. Ejecutar tests backend cuando un cambio toque rutas, filtros, modelos de respuesta, lógica de generación mock o docs backend que afirmen estado de tests backend.
- Aplica a: `backend/app/`, `backend/tests/`, `README.md`, `README.es.md`, `context.md`, `engineering-analysis.md`.
- Comando: `docker compose exec -T backend pytest -q`
- Validación: el comando finaliza con éxito y el reporte incluye conteos de éxito/fallo más advertencias.

4. Verificar integridad de whitespace antes de finalizar un conjunto de cambios.
- Aplica a: todos los archivos rastreados.
- Comando: `git diff --check`
- Validación: sin salida del comando.

5. Revisar alcance pendiente antes de commit.
- Aplica a: todos los cambios.
- Comando: `git status --short`
- Validación: los archivos pendientes coinciden solo con el alcance de fase intencionado.

6. No afirmar que una validación pasó si no fue ejecutada en la sesión actual.
- Aplica a: todos los reportes y salidas de handover.
- Validación: cada resultado afirmado debe referenciar un comando ejecutado en salida de terminal.

7. Reportar siempre advertencias, incluso cuando los comandos terminan exitosamente.
- Aplica a: verificaciones de test/build/logs.
- Validación: el reporte incluye advertencias como deprecaciones pytest, warnings de chunks en Vite o warnings de debug cuando existan.

## Notas

- Existe un comando lint en `frontend/package.json` (`npm run lint`), pero este archivo de gates incluye solo los comandos requeridos explícitamente para esta fase del proyecto.
