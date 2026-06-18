# Análisis de prácticas de ingeniería

## 1. Propósito

Este documento registra una revisión basada en evidencia del estado actual del repositorio. Su objetivo es servir como insumo para definir reglas aplicables en la Fase 3 dentro de `.agents/rules`.

## 2. Metodología

- Archivos inspeccionados: configuración raíz, frontend, backend, tests y documentación actual.
- Validaciones ejecutadas: estado de Docker Compose, logs, tests de frontend, build de frontend y tests de backend.
- Criterios utilizados: trazabilidad a código, impacto técnico, riesgo operativo, mantenibilidad y verificabilidad.
- Clasificación de hallazgos:
  - Problema confirmado: situación observable y reproducible en el estado actual.
  - Riesgo potencial: condición existente que puede causar fallos o degradación futura.
  - Incógnita: aspecto no confirmable con la evidencia disponible en el repositorio.

## 3. Resumen ejecutivo

El proyecto presenta una base sólida para un ejercicio académico: separación clara entre frontend y backend, contratos de datos tipados, endpoints múltiples para analítica y pruebas automatizadas en ambas capas. Al mismo tiempo, conserva decisiones orientadas a desarrollo/local (datos mock en rutas, CORS abierto, dependencias Python sin fijar, ausencia de CI visible) que aumentan riesgo de regresiones o diferencias entre entornos cuando el proyecto evoluciona.

## 4. Buenas prácticas identificadas

| ID | Categoría | Práctica observada | Evidencia | Beneficio |
| --- | --- | --- | --- | --- |
| BP-01 | Arquitectura | Separación explícita entre frontend y backend con responsabilidades distintas | `frontend/`, `backend/`, `docker-compose.yml` | Facilita evolución independiente de UI y API. |
| BP-02 | API y contratos | Modelos tipados con Pydantic para respuestas de endpoints | `backend/app/routes.py` (`FinancialMovement`, `MetricsSummaryItem`, etc.) | Reduce ambigüedad en contratos JSON y mejora documentación OpenAPI. |
| BP-03 | Testing | Pruebas backend cubren endpoints principales y filtros clave | `backend/tests/test_routes.py` | Disminuye riesgo de regresiones en API y lógica de filtrado/agregación. |
| BP-04 | Testing y lógica de negocio | Funciones financieras del frontend separadas y testeadas de forma unitaria | `frontend/src/lib/financial-utils.ts`, `frontend/src/lib/financial-utils.test.ts` | Permite validar cálculos sin depender de UI ni de red. |
| BP-05 | Experiencia de desarrollo | Proxy de Vite para `/api` configurado por defecto | `frontend/vite.config.ts` | Simplifica integración local y evita acoplar URLs absolutas en componentes. |
| BP-06 | Manejo de estados | Estado de carga y error explícito en la pantalla principal | `frontend/src/App.tsx`, `frontend/src/components/dashboard/kpi-card.tsx`, `frontend/src/components/dashboard/income-outcome-chart.tsx`, `frontend/src/components/dashboard/profit-percent-chart.tsx` | Mejora feedback al usuario durante carga y fallos de API. |
| BP-07 | Reproducibilidad | Seed fija para generación de datos simulados | `backend/app/routes.py` (`generate_mock_movements(seed=42)`) | Hace reproducible el comportamiento de endpoints en desarrollo y pruebas. |
| BP-08 | Entorno reproducible | Servicios Docker definidos con puertos y volúmenes claros | `docker-compose.yml`, `frontend/Dockerfile`, `backend/Dockerfile` | Facilita levantar el entorno sin instalación manual fuera de contenedores. |

## 5. Malas prácticas y riesgos

| ID | Categoría | Tipo | Severidad | Hallazgo | Evidencia | Impacto |
| --- | --- | --- | --- | --- | --- | --- |
| R-01 | Seguridad y dependencias | Riesgo potencial | Alta | Dependencias Python sin versiones fijas | `backend/requirements.txt` | Distintas instalaciones pueden producir comportamientos no deterministas o cambios incompatibles. |
| R-02 | Seguridad | Riesgo potencial | Media | CORS abierto a cualquier origen | `backend/app/main.py` (`allow_origins=["*"]`) | Amplía superficie de exposición si se reutiliza configuración fuera de entorno controlado. |
| R-03 | Arquitectura y mantenibilidad | Riesgo potencial | Media | Datos mock generados dentro de la capa de rutas (acoplamiento transporte/datos) | `backend/app/routes.py` (`generate_mock_movements` y uso directo en endpoints) | Dificulta sustituir la fuente de datos sin tocar endpoints. |
| R-04 | Calidad de producto | Problema confirmado | Media | Dependencia principal del dashboard en un solo endpoint (`/api/metrics`) para construir vista completa | `frontend/src/App.tsx` | Un fallo en ese endpoint degrada casi toda la pantalla principal. |
| R-05 | Contratos y coherencia | Riesgo potencial | Media | Cálculos principales (KPI y series) se realizan en frontend y no en backend | `frontend/src/lib/financial-utils.ts`, `frontend/src/App.tsx` | Puede generar divergencia futura si backend también calcula métricas con reglas distintas. |
| R-06 | Observabilidad | Riesgo potencial | Baja | Logging de aplicación limitado a logs por defecto de Uvicorn/debugpy, sin estructura de eventos de negocio | `backend/Dockerfile` (arranque con uvicorn/debugpy), logs de `docker compose logs` | Reduce capacidad de diagnóstico funcional cuando crezca complejidad. |
| R-07 | API y DX | Problema confirmado | Baja | No existe endpoint raíz (`/`), responde 404 | `backend/app/routes.py` (sin ruta `/`), logs de `docker compose logs` | Puede confundir verificaciones manuales básicas si no se conoce `/docs` o `/health`. |
| R-08 | Testing | Riesgo potencial | Media | Cobertura frontend enfocada en utilidades; no hay pruebas de integración de `App` ni de componentes de dashboard | `frontend/src/lib/financial-utils.test.ts`, ausencia de tests en `frontend/src/components/dashboard/` y `frontend/src/App.tsx` | Mayor probabilidad de regresiones visuales/flujo sin detección automática. |
| R-09 | Tooling y calidad | Incógnita | Media | No hay evidencia de CI versionada para ejecutar pruebas/build automáticamente | ausencia de `.github/workflows/` en estructura inspeccionada | No se puede asegurar enforcement automático de calidad en cada cambio. |
| R-10 | Dependencias de test backend | Problema confirmado | Baja | Warning de deprecación en TestClient/httpx durante pytest | salida de `docker compose exec -T backend pytest -q` | Riesgo de rotura futura al actualizar stack de testing si no se adapta la base. |

## 6. Hallazgos agrupados por categoría

### Arquitectura

La separación frontend/backend está bien definida y favorece escalabilidad de responsabilidades. El principal riesgo observado es que la capa de rutas backend mezcla contrato HTTP con generación de datos simulados, lo que complica migraciones futuras de fuente de datos.

### Calidad de código y naming

El código mantiene nombres descriptivos y funciones pequeñas en utilidades financieras y endpoints auxiliares. Persisten riesgos de coherencia cuando los cálculos centrales quedan en cliente y no existe una fuente única de verdad para métricas agregadas.

### Testing

Hay suites ejecutables y estables en ambas capas (frontend y backend). La cobertura backend se orienta a endpoints y filtros; la cobertura frontend se concentra en utilidades, dejando menor protección para integración visual y flujo de carga/error de la pantalla principal.

### Seguridad y dependencias

La ausencia de versionado estricto en dependencias Python y CORS abierto son decisiones útiles en entorno educativo/local, pero elevan riesgo si el proyecto evoluciona sin control de entorno.

### Documentación

Tras Fase 1, el onboarding y el contexto de handover quedaron documentados y consistentes. Aun así, faltan documentos específicos de prácticas/riesgos y diseño funcional para estandarizar decisiones en etapas siguientes.

### Developer Experience y tooling

El entorno Docker + proxy de Vite permite un ciclo rápido de ejecución local y pruebas. No hay CI visible para automatizar validaciones, por lo que la calidad depende de disciplina manual de ejecución.

### Producto y mantenibilidad

La interfaz actual cumple un alcance concreto y verificable para un dashboard académico con datos simulados. El mantenimiento futuro dependerá de cómo se desacople generación de datos, contratos y cálculos para evitar duplicidad o inconsistencias.

## 7. Reglas propuestas para la Fase 3

| Regla propuesta | Hallazgo que mitiga o práctica que preserva | Aplicación concreta | Validación |
| --- | --- | --- | --- |
| Ejecuta pruebas de frontend y backend antes de crear commits de documentación o código | Mitiga R-08 y preserva BP-03/BP-04 | Ejecutar `docker compose exec -T frontend npm run test` y `docker compose exec -T backend pytest -q` | Evidencia en salida de terminal o CI cuando exista. |
| Ejecuta build de frontend antes de cambios que impacten UI o contratos consumidos por App | Mitiga riesgo de regresiones de bundle asociado a R-08 | `docker compose exec -T frontend npm run build` en cambios de `frontend/src/` | Build exitoso sin errores fatales. |
| Conserva funciones financieras puras en `frontend/src/lib/financial-utils.ts` y acompáñalas con tests en `frontend/src/lib/financial-utils.test.ts` | Preserva BP-04 y reduce R-05 | Cambios de cálculo solo en utilidades, no embebidos en componentes | Dif entre utilidades y tests actualizados en el mismo cambio. |
| Mantén el proxy `/api` de Vite operativo en `frontend/vite.config.ts` para desarrollo local | Preserva BP-05 y reduce fricción DX | No remover ni romper la regla `server.proxy['/api']` | Levantar entorno y verificar consumo de `/api/metrics` desde App. |
| Separa generación de datos mock de la capa de rutas cuando se modifique backend analítico | Mitiga R-03 y mejora mantenibilidad | Extraer funciones de datos a módulo dedicado bajo `backend/app/` | Rutas mantienen contrato HTTP y delegan a capa de datos/servicio. |
| Fija versiones de dependencias Python cuando se actualice `backend/requirements.txt` | Mitiga R-01 | Reemplazar entradas sin pin por versiones explícitas | Archivo contiene versiones exactas y tests ejecutan sin errores. |
| Restringe CORS por entorno al introducir despliegues fuera de desarrollo local | Mitiga R-02 | Ajustar `backend/app/main.py` con orígenes configurables | Configuración de entorno define orígenes permitidos y se verifica en API. |
| Documenta explícitamente limitaciones de alcance (mock, no persistencia, no CI) en documentos de handover | Preserva trazabilidad de contexto de Fase 1 y evita supuestos | Actualizar `README.md`, `README.es.md`, `context.md` cuando cambie alcance | Revisión de docs confirma sección de limitaciones consistente con código. |
| Mantén endpoint de salud funcional y documentado como punto de verificación rápida | Preserva BP-02 y reduce confusión por R-07 | Conservar `GET /health` en `backend/app/routes.py` y referencia en README | Respuesta 200 en `http://localhost:8000/health`. |

## 8. Priorización

### Prioridad alta

- Ejecuta pruebas de frontend y backend antes de crear commits de documentación o código.
- Ejecuta build de frontend antes de cambios que impacten UI o contratos consumidos por App.
- Fija versiones de dependencias Python cuando se actualice `backend/requirements.txt`.
- Restringe CORS por entorno al introducir despliegues fuera de desarrollo local.

### Prioridad media

- Conserva funciones financieras puras en `frontend/src/lib/financial-utils.ts` y acompáñalas con tests en `frontend/src/lib/financial-utils.test.ts`.
- Separa generación de datos mock de la capa de rutas cuando se modifique backend analítico.
- Mantén el proxy `/api` de Vite operativo en `frontend/vite.config.ts` para desarrollo local.
- Mantén endpoint de salud funcional y documentado como punto de verificación rápida.

### Prioridad baja

- Documenta explícitamente limitaciones de alcance (mock, no persistencia, no CI) en documentos de handover.

## 9. Validaciones realizadas

| Validación | Comando | Resultado |
| --- | --- | --- |
| Estado de servicios | `docker compose ps` | Frontend y backend en estado Up con puertos esperados. |
| Logs operativos | `docker compose logs --tail=80` | Vite y Uvicorn activos; warning no bloqueante de debugpy; requests 200 en `/api/metrics`; 404 en `/`. |
| Tests frontend | `docker compose exec -T frontend npm run test` | 1 archivo, 5 tests, 5 aprobados. |
| Build frontend | `docker compose exec -T frontend npm run build` | Build exitosa; warning de chunk mayor a 500 kB. |
| Tests backend | `docker compose exec -T backend pytest -q` | 15 tests aprobados; 1 warning de deprecación Starlette/TestClient-httpx. |

## 10. Límites del análisis

- No se evaluó comportamiento en producción ni hardening de seguridad en despliegue real.
- No hay evidencia de CI/CD dentro del repositorio para validar enforcement automático.
- No se midió cobertura porcentual real de pruebas porque no se ejecutó reporte de coverage en ambas capas.
- No se verificaron requisitos funcionales externos al código y documentación local.

## 11. Próxima fase

La Fase 3 convertirá las reglas propuestas en archivos aplicables dentro de `.agents/rules`, manteniendo trazabilidad entre cada regla y los hallazgos documentados en este análisis.
