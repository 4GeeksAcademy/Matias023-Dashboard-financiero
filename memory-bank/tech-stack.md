# Technical Stack

## Propósito

Este archivo registra una instantánea verificable del stack técnico usado por el proyecto, incluyendo dónde se declaran las versiones y cómo se resuelven actualmente en runtime local.

## Runtime e infraestructura

- Orquestación: Docker Compose (`docker-compose.yml`).
- Services:
  - `frontend` construido desde `frontend/Dockerfile`.
  - `backend` construido desde `backend/Dockerfile`.
- Red de contenedores:
  - El frontend llega al backend mediante el nombre de servicio Docker (`http://backend:8000`) a través del proxy de Vite.
- Volumes:
  - `./frontend:/app`
  - `/app/node_modules`
  - `./backend:/app`
- Puertos expuestos:
  - Frontend: `5173`
  - Backend API: `8000`
  - Backend debugpy: `5678`

## Frontend

| Tecnología | Versión verificada | Propósito | Fuente |
| --- | --- | --- | --- |
| Node (container image) | `24-alpine` | Runtime dentro del contenedor frontend | `frontend/Dockerfile` |
| React | declarado `^19.2.4`, resuelto `19.2.5` | Renderizado de UI | `frontend/package.json`, `frontend/package-lock.json` |
| React DOM | declarado `^19.2.4`, resuelto `19.2.5` | Objetivo de renderizado en navegador | `frontend/package.json`, `frontend/package-lock.json` |
| TypeScript | declarado `~6.0.2`, resuelto `6.0.2` | Tipado estático y chequeos de compilación | `frontend/package.json`, `frontend/package-lock.json` |
| Vite | declarado `^8.0.4`, resuelto `8.0.8` | Servidor dev y build de producción | `frontend/package.json`, `frontend/package-lock.json` |
| Recharts | declarado `^3.8.1`, resuelto `3.8.1` | Renderizado de gráficos financieros | `frontend/package.json`, `frontend/package-lock.json` |
| Tailwind CSS | declarado `^4.2.2`, resuelto `4.2.2` | Estilos utility-first y tokens | `frontend/package.json`, `frontend/package-lock.json`, `frontend/src/index.css` |
| Vitest | declarado `^4.1.4`, resuelto `4.1.4` | Tests frontend | `frontend/package.json`, `frontend/package-lock.json` |

## Backend

| Tecnología | Versión verificada | Propósito | Fuente |
| --- | --- | --- | --- |
| Python (container image) | `3.13-slim` | Runtime dentro del contenedor backend | `backend/Dockerfile` |
| FastAPI | dependencias sin fijar; observado `0.137.1` en contenedor actual | Framework API y generación OpenAPI | `backend/requirements.txt`, verificación de metadatos del contenedor |
| Uvicorn | dependencias sin fijar; observado `0.49.0` | Servidor ASGI | `backend/requirements.txt`, `backend/Dockerfile`, verificación de metadatos del contenedor |
| debugpy | dependencias sin fijar; observado `1.8.21` | Depuración remota | `backend/requirements.txt`, `backend/Dockerfile`, verificación de metadatos del contenedor |
| pytest | dependencias sin fijar; observado `9.1.0` | Runner de tests backend | `backend/requirements.txt`, verificación de metadatos del contenedor |
| httpx | dependencias sin fijar; observado `0.28.1` | Dependencia cliente HTTP en stack de tests | `backend/requirements.txt`, verificación de metadatos del contenedor |

Nota: las versiones de dependencias backend no están fijadas en `backend/requirements.txt`; las versiones observadas corresponden al contenedor actualmente construido y no están garantizadas por restricciones del repositorio.

## Testing

- Tests frontend:
  - Ubicación: `frontend/src/lib/financial-utils.test.ts`
  - Herramienta: Vitest
  - Comando: `docker compose exec -T frontend npm run test`
- Tests backend:
  - Ubicación: `backend/tests/test_routes.py`
  - Herramienta: pytest + FastAPI TestClient
  - Comando: `docker compose exec -T backend pytest -q`
- Resultados validados más recientes (2026-06-18):
  - Frontend: `5 passed`.
  - Backend: `15 passed`, `1 warning`.

## Puertos y URLs de desarrollo

- Frontend: `http://localhost:5173`
- Backend API docs: `http://localhost:8000/docs`
- Backend health: `http://localhost:8000/health`
- Backend debug port: `5678`
- Nota: la raíz backend `http://localhost:8000` devuelve `404` porque no existe una ruta `/` definida.

## Comandos principales

- `docker compose up --build`: construir y arrancar servicios frontend/backend.
- `docker compose ps`: revisar estado de contenedores y puertos expuestos.
- `docker compose logs --tail=80`: inspeccionar logs recientes de servicios y advertencias.
- `docker compose exec -T frontend npm run test`: ejecutar tests frontend.
- `docker compose exec -T frontend npm run build`: ejecutar build de producción frontend.
- `docker compose exec -T backend pytest -q`: ejecutar tests backend.
- `git diff --check`: detectar errores de whitespace en cambios pendientes.
- `git status --short`: inspeccionar alcance pendiente antes de commits.

## Gestión de dependencias

- Declaraciones de dependencias frontend: `frontend/package.json`.
- Lockfile frontend con versiones resueltas: `frontend/package-lock.json`.
- Declaraciones de dependencias backend: `backend/requirements.txt`.
- Riesgo actual: dependencias backend sin fijar, aumentando riesgo de reproducibilidad entre reconstrucciones.

## Límites técnicos

- Configuración orientada a desarrollo local.
- Fuente de datos financieros simulada.
- Sin capa de persistencia/base de datos.
- CORS abierto configurado actualmente en backend (`allow_origins=["*"]`) como configuración de desarrollo observada.
- No hay archivos de workflow CI visibles en el repositorio.
- El stack no está validado como listo para producción.

## Fuentes de verdad

- `docker-compose.yml`
- `frontend/Dockerfile`
- `backend/Dockerfile`
- `frontend/package.json`
- `frontend/package-lock.json`
- `backend/requirements.txt`
- `frontend/vite.config.ts`
- `backend/app/main.py`
- `backend/app/routes.py`

## Notas de mantenimiento

Actualizar este archivo cuando cambien imágenes de runtime, declaraciones/resolución de dependencias, comandos base, puertos o tooling de validación.
