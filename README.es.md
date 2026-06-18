# Panel de Métricas Financieras

<!-- hide -->

Por [@marcogonzalo](https://github.com/marcogonzalo) y [otros contribuidores](https://github.com/4GeeksAcademy/ai-eng-financial-dashboard-context-project/graphs/contributors) en [4Geeks Academy](https://4geeksacademy.com/)

[![build by developers](https://img.shields.io/badge/build_by-Developers-blue)](https://4geeks.com)
[![4Geeks Academy](https://img.shields.io/twitter/follow/4geeksacademy?style=social&logo=x)](https://x.com/4geeksacademy)

_These instructions are [available in English](./README.md)._

**Antes de empezar**: 📗 [Lee las instrucciones](https://4geeks.com/es/lesson/como-comenzar-un-proyecto-de-codificacion) sobre cómo comenzar un proyecto de programación.

<!-- endhide -->

---

_Dashboard de métricas financieras con frontend en React + TypeScript y backend en FastAPI._

## Resumen del proyecto

Este repositorio contiene un dashboard financiero que actualmente muestra:

- Tarjetas KPI con ingreso total, egreso total, utilidad y margen de utilidad.
- Dos gráficos: evolución mensual de ingreso vs egreso y margen mensual.

Los datos mostrados son **datos financieros simulados (mock)** generados por el backend en cada solicitud. No provienen de una fuente financiera real ni de una base de datos persistente.

Alcance verificable actual:

- El frontend consulta `/api/metrics`.
- El backend expone endpoints de métricas y analítica de solo lectura.
- Docker Compose ejecuta ambos servicios para desarrollo local.

## Resumen tecnológico

- React + TypeScript para la interfaz y el procesamiento en frontend.
- Vite como servidor de desarrollo y herramienta de build del frontend.
- FastAPI + Python para los endpoints del backend.
- Docker Compose para orquestación local de servicios.
- Testing:
   - Frontend: Vitest.
   - Backend: pytest con FastAPI TestClient.

## Estructura del repositorio

```text
.
├─ backend/
│  ├─ app/
│  │  ├─ main.py
│  │  └─ routes.py
│  ├─ tests/
│  │  └─ test_routes.py
│  ├─ Dockerfile
│  └─ requirements.txt
├─ frontend/
│  ├─ src/
│  │  ├─ App.tsx
│  │  ├─ main.tsx
│  │  ├─ components/dashboard/
│  │  └─ lib/financial-utils.ts
│  ├─ Dockerfile
│  ├─ package.json
│  └─ vite.config.ts
├─ docker-compose.yml
├─ README.md
├─ README.es.md
└─ AGENTS.md
```

## Ejecución del proyecto

```bash
docker compose up --build
```

El frontend usa por defecto el proxy de Vite para `/api`, por lo que no necesitas variables de entorno adicionales en la configuración local por defecto.

- Frontend: http://localhost:5173
- Documentación API: http://localhost:8000/docs
- Health endpoint: http://localhost:8000/health

Nota: `http://localhost:8000` puede responder `404 Not Found` porque el backend no define un endpoint `/`.

## Flujo de la aplicación

1. Vite sirve el frontend.
2. React monta la aplicación desde `frontend/src/main.tsx`.
3. `frontend/src/App.tsx` solicita `/api/metrics`.
4. El proxy de Vite reenvía `/api` al backend (`http://backend:8000` dentro de Docker).
5. FastAPI genera y devuelve movimientos financieros simulados.
6. El frontend calcula KPIs y series mensuales en `frontend/src/lib/financial-utils.ts`.
7. Los componentes del dashboard renderizan tarjetas y gráficos.

## Capacidades API disponibles

- Salud:
   - `GET /health`
- Métricas y filtros:
   - `GET /api/metrics`
   - `GET /api/metrics/b2b`
   - `GET /api/metrics/b2c`
   - `GET /api/metrics/facets`
- Agregaciones y analítica:
   - `GET /api/metrics/summary`
   - `GET /api/metrics/categories/top`
   - `GET /api/metrics/comparison`
   - `GET /api/metrics/alerts`

## Testing

- Tests del frontend:

```bash
docker compose exec -T frontend npm run test
```

- Tests del backend:

```bash
docker compose exec -T backend pytest -q
```

## Limitaciones actuales

- Usa datos financieros simulados generados en código backend.
- No tiene capa de persistencia real (sin integración de base de datos).
- No hay workflows de CI visibles actualmente en este repositorio.
- Las dependencias de Python en `backend/requirements.txt` no están fijadas a versiones exactas.
- Los cálculos principales de KPIs y series mensuales se realizan en el frontend.

## Documentación adicional

- Onboarding en inglés: [README.md](./README.md)
- Línea base verificable del handover: [context.md](./context.md)
- Guía para agentes (sin cambios en esta fase): [AGENTS.md](./AGENTS.md)

---

Este y muchos otros proyectos son construidos por estudiantes como parte de los [Coding Bootcamps](https://4geeksacademy.com/) de 4Geeks Academy. Encuentra más acerca de los [cursos](https://4geeksacademy.com/es/comparar-programas) de [Ingeniería de IA](https://4geeksacademy.com/es/coding-bootcamps/ingenieria-ia), [Data Science & Machine Learning](https://4geeksacademy.com/es/coding-bootcamps/curso-datascience-machine-learning), [Ciberseguridad](https://4geeksacademy.com/es/coding-bootcamps/curso-ciberseguridad) y [Full-Stack Software Developer con IA](https://4geeksacademy.com/es/coding-bootcamps/programador-full-stack).
