# Tech Context

## Propósito

Documentar el contexto técnico que los agentes deben usar antes de planificar o editar trabajo.

## Resumen del stack

- Frontend: React, TypeScript, Vite, Recharts, Tailwind CSS.
- Backend: Python, FastAPI, Uvicorn, Pydantic, pytest.
- Orquestación: Docker Compose con servicios `frontend` y `backend`.

## Topología de runtime

- Frontend servido en el puerto 5173.
- API backend servida en el puerto 8000.
- El frontend solicita `/api` y el proxy de Vite enruta a `http://backend:8000`.
- Puerto de debug backend 5678 expuesto para debugpy.

## Comandos verificados

- Levantar stack: `docker compose up --build`
- Estado de servicios: `docker compose ps`
- Tests frontend: `docker compose exec -T frontend npm run test`
- Build frontend: `docker compose exec -T frontend npm run build`
- Tests backend: `docker compose exec -T backend pytest -q`
- Verificación de alcance: `git status --short`
- Verificación de espacios: `git diff --check`

## Restricciones técnicas actuales

- Las dependencias backend en `backend/requirements.txt` actualmente no están fijadas.
- La configuración CORS está abierta (`allow_origins=["*"]`) y se considera orientada a desarrollo.
- Los datos financieros se generan en lógica mock del backend, sin persistencia.
- La lógica principal de KPI y agregación mensual está implementada actualmente en utilidades del frontend.

## Contratos clave de compatibilidad

- `GET /api/metrics` es el contrato principal consumido por el frontend.
- La forma de la respuesta debe mantenerse compatible con los tipos financieros y cálculos utilitarios del frontend.
- El endpoint de salud `GET /health` debe seguir disponible para verificaciones rápidas.

## Fuentes de evidencia

- `memory-bank/tech-stack.md`
- `memory-bank/current-status.md`
- `frontend/vite.config.ts`
- `frontend/src/App.tsx`
- `frontend/src/lib/financial-utils.ts`
- `backend/app/main.py`
- `backend/app/routes.py`
- `.agents/rules/quality-gates.md`
- `.agents/rules/frontend.md`
- `.agents/rules/backend-api.md`
- `.agents/rules/security-dependencies.md`
