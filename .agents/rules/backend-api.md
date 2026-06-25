# Reglas de API Backend

## Propósito

Proteger la estabilidad de los contratos API y la capacidad de testeo del backend en el servicio FastAPI.

## Reglas

1. Mantener explícitos los contratos de respuesta API con modelos tipados.
- Aplica a: `backend/app/routes.py`.
- Hacer: agregar o actualizar esquemas `BaseModel` para estructuras de respuesta cuando cambien endpoints.
- Validar: los decoradores de endpoint declaran response models y los tests backend pasan.

2. Actualizar tests backend cuando cambien endpoints, filtros, agregaciones o lógica de segmentación.
- Aplica a: `backend/app/routes.py`, `backend/tests/test_routes.py`.
- Hacer: agregar/ajustar casos pytest para comportamiento modificado.
- Comando: `docker compose exec -T backend pytest -q`
- Validar: los tests pasan y el nuevo comportamiento queda validado.

3. Mantener el endpoint de salud operativo y documentado.
- Aplica a: `backend/app/routes.py`, `README.md`, `README.es.md`, `context.md`.
- Hacer: preservar el comportamiento de `GET /health`, salvo reemplazo intencional con migración documentada.
- Validar: la ruta de salud existe en código y responde correctamente en verificaciones de runtime.

4. No agregar endpoints sin documentar método, ruta, parámetros y formato de respuesta.
- Aplica a: `backend/app/routes.py`, `README.md`, `README.es.md`, `context.md`.
- Hacer: documentar capacidades API públicas al introducir/cambiar rutas.
- Validar: documentación y definiciones de rutas son consistentes.

5. No presentar salida financiera mock como datos de producción o datos externos reales.
- Aplica a: `backend/app/routes.py`, documentación en markdown de raíz.
- Hacer: mantener redacción explícita de que los movimientos son simulados cuando corresponda.
- Validar: docs y descripciones de endpoints permanecen claras sobre el uso de datos mock.

6. Preservar reproducibilidad en rutas de datos simulados.
- Aplica a: `backend/app/routes.py`, `backend/tests/test_routes.py`.
- Hacer: mantener comportamiento determinístico del flujo mock actual (generación con semilla en endpoints/tests).
- Validar: ejecuciones repetidas mantienen aserciones estables en tests.

7. Evitar aumentar el acoplamiento entre handlers de rutas e internos de generación de datos.
- Aplica a: `backend/app/routes.py`.
- Hacer: al evolucionar lógica, mover nueva complejidad de generación de datos a helpers/módulos dedicados en lugar de expandir cuerpos de endpoints.
- Validar: los handlers de endpoints permanecen enfocados en la orquestación request/response.

8. Preservar compatibilidad con rutas consumidas por frontend salvo que los cambios coordinados estén documentados.
- Aplica a: `backend/app/routes.py`, `frontend/src/App.tsx`, `frontend/vite.config.ts`, documentación.
- Hacer: mantener estable el contrato de `/api/metrics` o documentar el impacto de actualización coordinada.
- Validar: el flujo frontend sigue consultando y renderizando sin desajuste de contrato.

9. Reportar explícitamente cualquier cambio rompiente de contrato frontend-backend en reportes de fase.
- Aplica a: docs de handover y resúmenes de cambios.
- Hacer: incluir campos viejos/nuevos, endpoints y actualizaciones frontend requeridas.
- Validar: el reporte contiene archivos y símbolos concretos impactados.
