# Reglas de frontend

## Propósito

Preservar el comportamiento actual del frontend, los contratos y la mantenibilidad en el dashboard React + TypeScript.

## Reglas

1. Mantener contratos estrictos de TypeScript para datos financieros.
- Aplica a: `frontend/src/lib/financial-types.ts`, `frontend/src/App.tsx`, `frontend/src/lib/financial-utils.ts`.
- Hacer: actualizar interfaces/tipos cuando cambie la forma del payload.
- Validar: `docker compose exec -T frontend npm run build` finaliza sin errores de tipos.

2. Mantener los cálculos financieros como funciones puras utilitarias, no embebidos en componentes visuales.
- Aplica a: `frontend/src/lib/financial-utils.ts`, `frontend/src/components/dashboard/`.
- Hacer: ubicar la lógica de KPI y agregación mensual en `frontend/src/lib/`.
- Validar: los componentes no introducen fórmulas duplicadas y los tests utilitarios cubren la lógica.

3. Actualizar tests frontend cuando cambien fórmulas KPI o lógica de agregación mensual.
- Aplica a: `frontend/src/lib/financial-utils.ts`, `frontend/src/lib/financial-utils.test.ts`.
- Hacer: ajustar casos de test para cualquier cambio de fórmula o agrupación.
- Validar: `docker compose exec -T frontend npm run test` pasa y las aserciones coinciden con las fórmulas actualizadas.

4. Preservar el comportamiento del proxy API de Vite para desarrollo local con Docker.
- Aplica a: `frontend/vite.config.ts`.
- Hacer: mantener configurado el target del proxy `/api` para resolución del servicio backend.
- Validar: el frontend puede consultar `/api/metrics` mediante el flujo de la app en `frontend/src/App.tsx`.

5. Preservar estados visibles de loading y error en el flujo principal del dashboard.
- Aplica a: `frontend/src/App.tsx`, `frontend/src/components/dashboard/kpi-card.tsx`, `frontend/src/components/dashboard/income-outcome-chart.tsx`, `frontend/src/components/dashboard/profit-percent-chart.tsx`.
- Hacer: mantener rutas explícitas de renderizado para loading y error.
- Validar: la revisión de código confirma que ambos estados siguen siendo alcanzables y renderizados.

6. Mantener separadas las responsabilidades de componentes del dashboard.
- Aplica a: `frontend/src/components/dashboard/`.
- Hacer: mantener header, fila/tarjetas KPI y gráficos en componentes dedicados.
- Validar: ningún componente único concentra todo el renderizado y procesamiento de datos del dashboard.

7. Ejecutar build frontend tras cambios en gráficos, componentes del dashboard, tipos utilitarios o consumo API.
- Aplica a: `frontend/src/`, `frontend/vite.config.ts`, `frontend/package.json`.
- Comando: `docker compose exec -T frontend npm run build`
- Validar: build exitosa y advertencias reportadas.

8. No documentar comportamientos UI no implementados como si existieran.
- Aplica a: `README.md`, `README.es.md`, `context.md`, `design.md`.
- Hacer: describir solo estados/funcionalidades presentes en código (por ejemplo filtros, navegación, estado vacío global).
- Validar: cada afirmación se mapea a archivos bajo `frontend/src/`.
