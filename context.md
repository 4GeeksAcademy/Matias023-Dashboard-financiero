# Contexto del proyecto

## 1. Propósito del documento

Este documento registra la comprensión verificable del repositorio durante el handover técnico. Su objetivo es dejar una línea base factual del estado actual de la aplicación, sustentada en código y evidencias de ejecución observadas durante el análisis.

## 2. Descripción actual del producto

La aplicación es un dashboard financiero con frontend y backend separados, ejecutados en conjunto con Docker Compose.

Hoy muestra:

- KPIs de ingreso total, egreso total, utilidad y margen de utilidad.
- Gráfico de evolución mensual de ingreso vs egreso.
- Gráfico de evolución mensual del margen de utilidad.

Los datos financieros mostrados son simulados (mock), generados por el backend en cada solicitud. No son datos contables reales.

## 3. Alcance implementado

Funcionalidades comprobadas en el código:

- API de salud (`GET /health`).
- API principal de movimientos (`GET /api/metrics`) con filtros por fecha, categoría y tipo de operación.
- Endpoints segmentados por tipo de negocio (`/api/metrics/b2b`, `/api/metrics/b2c`).
- Endpoint de facetas para filtros (`/api/metrics/facets`).
- Resumen por período (`/api/metrics/summary`) con agrupación por día, semana o mes.
- Top de categorías (`/api/metrics/categories/top`).
- Comparación período actual vs período previo (`/api/metrics/comparison`).
- Alertas por incremento relativo de egresos (`/api/metrics/alerts`).
- Cálculo de KPIs y series mensuales en frontend para renderizar tarjetas y gráficos.

## 4. Fuera del alcance actual

Aspectos no implementados y cuya ausencia fue verificada:

- Base de datos real para almacenamiento financiero.
- Persistencia de movimientos en backend.
- Autenticación/autorización de usuarios.
- Integración con proveedores financieros externos.
- Despliegue productivo definido dentro del repositorio.
- CI/CD versionado en workflows visibles del repositorio.

## 5. Arquitectura resumida

1. El navegador accede al frontend servido por Vite.
2. El frontend en React solicita datos a rutas `/api`.
3. El proxy de Vite redirige esas rutas al backend FastAPI.
4. El backend genera datos mock, los filtra/agrega según el endpoint y devuelve JSON.
5. El frontend calcula KPIs/series y renderiza tarjetas y gráficos.

## 6. Flujo de datos verificado

Recorrido principal para `/api/metrics`:

1. `frontend/src/main.tsx` monta la aplicación React.
2. `frontend/src/App.tsx` ejecuta la solicitud HTTP a `/api/metrics` en el efecto inicial.
3. `frontend/vite.config.ts` configura el proxy de `/api` hacia `http://backend:8000`.
4. `backend/app/main.py` crea la instancia de FastAPI e incluye el router de endpoints.
5. `backend/app/routes.py` atiende `GET /api/metrics`, genera movimientos simulados con seed fija y aplica filtros.
6. `frontend/src/lib/financial-utils.ts` calcula KPIs y agregaciones mensuales con la respuesta JSON.
7. Componentes de dashboard muestran resultados en tarjetas y gráficos.

## 7. Estado operativo verificado

Estado observado durante el análisis (puede cambiar con el tiempo):

- Frontend accesible en `http://localhost:5173`.
- OpenAPI del backend accesible en `http://localhost:8000/docs`.
- Health endpoint disponible en `http://localhost:8000/health`.
- Raíz del backend (`http://localhost:8000`) puede devolver `404 Not Found` porque no existe ruta `/`.
- Contenedores de `frontend` y `backend` en estado `Up` bajo Docker Compose.
- Tests backend: 15 pruebas aprobadas.
- Tests frontend: 5 pruebas aprobadas.
- Warning no bloqueante de debugpy sobre frozen modules en logs del backend.

## 8. Decisiones técnicas observadas

- Separación explícita entre frontend y backend.
- Uso de proxy de Vite para desacoplar URL de backend en desarrollo.
- Seed fija (`seed=42`) en la generación de datos mock para reproducibilidad.
- Cálculos principales de KPIs y series mensuales realizados en frontend.
- Composición de UI con componentes de dashboard separados por responsabilidad.
- FastAPI como capa de API y documentación OpenAPI automática en `/docs`.

## 9. Riesgos e incógnitas pendientes

### Riesgos confirmados

- Dependencias Python sin fijar versión exacta en `backend/requirements.txt`.
- Ausencia de persistencia real y uso exclusivo de datos simulados.

### Riesgos potenciales

- Posibles diferencias de resultado si en el futuro se duplican cálculos entre frontend y backend.
- Configuración CORS abierta (`allow_origins=["*"]`) no restringida por entorno.

### Información aún no definida

- Estrategia formal de despliegue productivo.
- Pipeline de CI/CD dentro del repositorio.
- Requisitos funcionales adicionales fuera de los endpoints y vistas actuales.

## 10. Fuentes de evidencia

| Tema | Archivo o evidencia |
| ---- | ------------------- |
| Orquestación y puertos | `docker-compose.yml` |
| Backend runtime y comando de arranque | `backend/Dockerfile` |
| Frontend runtime y comando de arranque | `frontend/Dockerfile` |
| App FastAPI y middleware | `backend/app/main.py` |
| Endpoints y generación de datos mock | `backend/app/routes.py` |
| Dependencias backend | `backend/requirements.txt` |
| Entrada del frontend | `frontend/src/main.tsx` |
| Solicitud de datos y composición UI | `frontend/src/App.tsx` |
| Proxy `/api` | `frontend/vite.config.ts` |
| Cálculos de KPIs y series | `frontend/src/lib/financial-utils.ts` |
| Componentes del dashboard | `frontend/src/components/dashboard/` |
| Scripts de test frontend | `frontend/package.json` |
| Tests frontend | `frontend/src/lib/financial-utils.test.ts` |
| Tests backend | `backend/tests/test_routes.py` |
| Estado de contenedores, logs y pruebas ejecutadas | verificación por comandos de Docker Compose y test durante el análisis |

## 11. Próxima fase

La siguiente fase será el análisis de prácticas de ingeniería, identificando al menos cinco buenas prácticas y cinco malas prácticas o riesgos, agrupadas por categorías.