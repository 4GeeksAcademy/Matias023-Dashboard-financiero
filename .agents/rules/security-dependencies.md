# Reglas de seguridad y dependencias

## Propósito

Definir guardrails prácticos para configuración sensible de seguridad y gestión de dependencias en el alcance actual del proyecto.

## Reglas

1. Tratar CORS abierto como comportamiento orientado a desarrollo y no expandirlo sin justificación explícita de entorno.
- Aplica a: `backend/app/main.py`.
- Hacer: mantener cualquier cambio de CORS atado a una necesidad de entorno documentada.
- Validar: la revisión de configuración CORS se incluye en el resumen de cambios cuando se modifica.

2. No presentar `allow_origins=["*"]` como seguro para producción por defecto.
- Aplica a: docs y reportes (`README.md`, `README.es.md`, `context.md`, `engineering-analysis.md`).
- Hacer: describirlo como configuración actual, no como garantía de seguridad.
- Validar: la redacción evita afirmaciones de seguridad en producción sin evaluación dedicada.

3. Fijar versiones de dependencias Python al actualizar requirements backend.
- Aplica a: `backend/requirements.txt`.
- Hacer: reemplazar entradas sin fijar por versiones explícitas durante actualizaciones de dependencias.
- Validar: el archivo muestra versiones fijadas y `docker compose exec -T backend pytest -q` pasa.

4. Revisar y reportar advertencias/deprecaciones al cambiar dependencias relacionadas con FastAPI, Starlette, httpx o pytest.
- Aplica a: `backend/requirements.txt`, salida de ejecución de tests backend.
- Hacer: ejecutar tests backend e incluir advertencias en el reporte.
- Validar: la salida del comando incluye revisión explícita de advertencias.

5. Nunca commitear secretos, tokens ni credenciales.
- Aplica a: todos los archivos y manejo de entorno.
- Hacer: mantener valores sensibles fuera de archivos del repositorio.
- Validar: usar configuración basada en variables de entorno cuando aparezcan valores sensibles en fases futuras.

6. Usar variables de entorno para configuraciones sensibles cuando se introduzca nueva configuración sensible.
- Aplica a: futuras adiciones de configuración en frontend/backend.
- Hacer: evitar hardcodear secretos en código fuente o markdown.
- Validar: valores sensibles de configuración provienen del entorno, no de literales en archivos rastreados.

7. No afirmar que el sistema es seguro o listo para producción sin una fase dedicada de validación de seguridad.
- Aplica a: toda la documentación del proyecto y reportes de estado.
- Hacer: mantener afirmaciones de readiness alineadas con alcance verificado.
- Validar: no aparecen afirmaciones de seguridad en producción sin evidencia explícita de soporte.
