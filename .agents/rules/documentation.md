# Reglas de documentación

## Propósito

Mantener la documentación del proyecto precisa, alineada por fase y consistente con el comportamiento implementado.

## Reglas

1. Actualizar ambas versiones de README cuando cambien comandos públicos, URLs, resumen del stack o capacidades API.
- Aplica a: `README.md`, `README.es.md`.
- Hacer: mantener ambos archivos alineados en alcance y comportamiento.
- Validar: las secciones de comandos y URLs coinciden en ambos archivos.

2. Mantener consistencia entre README en inglés y español sin exigir traducción literal.
- Aplica a: `README.md`, `README.es.md`.
- Hacer: preservar significado técnico y cobertura equivalentes.
- Validar: ambos describen las mismas funcionalidades implementadas y limitaciones.

3. Actualizar `context.md` cuando cambie el alcance de handover verificado.
- Aplica a: `context.md`.
- Hacer: revisar estado operativo, alcance implementado y límites solo con base en evidencia.
- Validar: cada afirmación principal se mapea a archivos existentes o comandos ejecutados.

4. Actualizar `design.md` cuando cambien KPIs, gráficos, estados UI o estructura de layout del dashboard implementados.
- Aplica a: `design.md`, `frontend/src/App.tsx`, `frontend/src/components/dashboard/`, `frontend/src/lib/financial-utils.ts`.
- Hacer: documentar solo comportamiento actual.
- Validar: fórmulas y componentes en `design.md` coinciden con el código frontend.

5. Actualizar `engineering-analysis.md` solo después de un nuevo ciclo de revisión basado en evidencia.
- Aplica a: `engineering-analysis.md`.
- Hacer: incluir archivos inspeccionados, validaciones ejecutadas y hallazgos clasificados.
- Validar: el documento contiene rutas de evidencia concretas y resultados de comandos.

6. No documentar funcionalidades antes de su implementación.
- Aplica a: toda la documentación markdown de raíz.
- Hacer: evitar afirmaciones de estado futuro presentadas como comportamiento actual.
- Validar: cada afirmación de funcionalidad es trazable a archivos fuente.

7. Distinguir datos simulados de datos financieros reales en toda la documentación pública.
- Aplica a: `README.md`, `README.es.md`, `context.md`, `engineering-analysis.md`, `design.md`.
- Hacer: etiquetar explícitamente los flujos con datos mock.
- Validar: la documentación no implica integración de datos productivos cuando no existe.

8. Usar comandos verificables y rutas válidas del repositorio en documentación.
- Aplica a: todos los docs markdown.
- Hacer: incluir comandos que existan en scripts/configuración del proyecto y rutas existentes en el repositorio.
- Validar: verificaciones de comandos y rutas exitosas durante revisión documental.

9. Evitar duplicación de secciones completas entre archivos de documentación.
- Aplica a: `README.md`, `README.es.md`, `context.md`, `engineering-analysis.md`, `design.md`.
- Hacer: mantener README como onboarding, context como línea base de estado, engineering-analysis como prácticas/riesgos y design como comportamiento funcional/visual.
- Validar: cada archivo preserva su propósito sin copiar grandes bloques de otro.

10. Mantener enlaces relativos válidos tras editar documentación.
- Aplica a: todos los docs markdown con enlaces internos.
- Hacer: verificar que existan los archivos enlazados.
- Validar: los destinos de enlaces resuelven dentro de la estructura del repositorio.
