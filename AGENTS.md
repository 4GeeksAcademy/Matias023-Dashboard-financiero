# AGENTS.md

## Propósito

Este archivo define cómo los agentes de IA deben leer el contexto del proyecto y aplicar las reglas del repositorio antes de realizar cambios.

## Inicio obligatorio de sesión

Antes de proponer, editar o validar cualquier cambio, el agente debe leer estos archivos en orden al inicio de cada sesión.

1. `AGENTS.md`
2. `memory-bank/projectbrief.md`
3. `memory-bank/product-overview.md`
4. `memory-bank/techContext.md`
5. `memory-bank/tech-stack.md`
6. `memory-bank/current-status.md`
7. `memory-bank/progress.md`
8. `context.md`
9. `README.md` y `README.es.md`
10. `design.md`
11. `engineering-analysis.md`
12. Archivos aplicables en `.agents/rules/`
13. Archivos aplicables en `.agents/skills/` cuando existan skills específicas para la tarea

## Orden de lectura requerido (mínimo legado)

1. `AGENTS.md`
2. `memory-bank/current-status.md`
3. `memory-bank/product-overview.md`
4. `memory-bank/tech-stack.md`
5. `context.md`
6. `README.md` o `README.es.md`
7. `design.md`
8. `engineering-analysis.md`
9. Archivos aplicables en `.agents/rules/`

## Índice de reglas

- [memory-bank/current-status.md](memory-bank/current-status.md): Instantánea operativa con fecha, contexto de commit, resultados de validación y advertencias/riesgos actuales.
- [memory-bank/projectbrief.md](memory-bank/projectbrief.md): Misión estable del proyecto, alcance verificado y no-objetivos explícitos.
- [memory-bank/product-overview.md](memory-bank/product-overview.md): Resumen estable del propósito del producto, capacidades actuales y límites de alcance.
- [memory-bank/techContext.md](memory-bank/techContext.md): Contexto técnico operativo, contratos y comandos requeridos.
- [memory-bank/tech-stack.md](memory-bank/tech-stack.md): Stack verificado, versiones, infraestructura y restricciones técnicas clave.
- [memory-bank/progress.md](memory-bank/progress.md): Seguimiento de progreso por hitos, trabajo completado y pendientes.
- [.agents/rules/quality-gates.md](.agents/rules/quality-gates.md): Puertas mínimas de validación y requisitos de reporte antes de completar cambios.
- [.agents/rules/frontend.md](.agents/rules/frontend.md): Guardrails específicos de frontend para TypeScript, cálculos, estados de UI y validación de build.
- [.agents/rules/backend-api.md](.agents/rules/backend-api.md): Reglas de contrato API backend, testing y compatibilidad.
- [.agents/rules/security-dependencies.md](.agents/rules/security-dependencies.md): Restricciones de configuración sensible y gestión de dependencias.
- [.agents/rules/documentation.md](.agents/rules/documentation.md): Reglas de consistencia documental y actualización basada en evidencia.
- [.agents/skills/dashboard-metrics-integration/SKILL.md](.agents/skills/dashboard-metrics-integration/SKILL.md): Flujo de trabajo para integrar métricas financieras de forma coherente entre backend, frontend, tests y documentación.

## Principios operativos

- Inspeccionar el estado actual del repositorio antes de modificar archivos.
- Basar todas las afirmaciones técnicas en evidencia del repositorio.
- No inventar comportamientos, endpoints ni funcionalidades implementadas.
- No inventar fuentes de datos, capas de persistencia, integraciones, pipelines de despliegue ni estado de CI.
- No afirmar validaciones ejecutadas si no se ejecutaron en la sesión actual.
- Respetar el alcance solicitado y la fase actual del ejercicio.
- Ejecutar validaciones aplicables y reportar resultados exactos.
- Reportar errores y advertencias explícitamente, incluso cuando no bloquean.
- No crear commits ni hacer push sin autorización explícita del usuario.
- No mezclar fases o tareas independientes en un mismo commit.

## Rutas protegidas (requieren confirmación explícita del desarrollador)

El agente debe pedir confirmación explícita del desarrollador antes de modificar cualquiera de estas rutas.

- `frontend/`
- `backend/`
- `docker-compose.yml`
- `frontend/Dockerfile`
- `backend/Dockerfile`
- `backend/requirements.txt`
- `.agents/rules/`
- `skills-lock.json`

## Flujo obligatorio antes de cada commit

El siguiente flujo es obligatorio y debe ejecutarse en orden antes de crear un commit.

1. Verificación de alcance:
- Ejecutar `git status --short` y verificar que solo estén incluidos los archivos previstos para la fase actual.
2. Verificación de consistencia documental:
- Verificar coherencia entre `context.md`, `memory-bank/*.md` y `README.md`/`README.es.md` para cualquier afirmación modificada.
3. Validaciones requeridas:
- Ejecutar los quality gates aplicables de `.agents/rules/quality-gates.md` y registrar resultados exactos.
4. Reporte de advertencias y riesgos:
- Registrar advertencias no bloqueantes, riesgos conocidos y supuestos no resueltos en el resumen de handover.
5. Integridad de espacios y diff:
- Ejecutar `git diff --check` y asegurar que no existan errores de whitespace.
6. Puerta final de autorización:
- Solicitar/confirmar autorización explícita del desarrollador antes de ejecutar `git commit`.

## Reglas anti-invención

- Nunca describir funcionalidades no implementadas como comportamiento actual.
- Nunca implicar persistencia real, integraciones externas o autenticación si no están implementadas.
- Nunca crear endpoints no documentados ni alterar contratos sin actualizar documentación basada en evidencia.
- Etiquetar siempre los datos financieros como simulados/mock, salvo que exista una fuente real implementada y verificada.

## Reglas de coherencia documental

- Mantener `context.md` como línea base del estado sustentado en evidencia.
- Mantener `memory-bank/projectbrief.md` y `memory-bank/product-overview.md` alineados con el alcance actualmente implementado.
- Mantener `memory-bank/techContext.md` y `memory-bank/tech-stack.md` alineados con stack/runtime/comandos reales.
- Mantener `memory-bank/progress.md` alineado con la fase de hito vigente y las tareas completadas/pendientes.
- Mantener `README.md` y `README.es.md` semánticamente alineados entre sí y con el comportamiento implementado.
- Si una fuente de verdad cambia afirmaciones de alcance, actualizar la documentación relacionada en el mismo ciclo o reportar explícitamente el desajuste.

## Límites actuales del proyecto

- Frontend construido con React y Vite.
- Backend construido con FastAPI.
- Orquestación local con Docker Compose.
- Los datos financieros actualmente son simulados (mock).
- No existe una capa de persistencia real implementada.
- El alcance actual es académico y orientado a handover.
