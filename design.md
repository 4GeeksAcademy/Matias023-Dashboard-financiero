# Diseño funcional y visual

## 1. Propósito

Este documento describe las decisiones funcionales y visuales observables en el dashboard actual, basadas en la implementación existente.

## 2. Objetivo de la interfaz

La interfaz permite consultar, en una sola pantalla, un resumen financiero agregado a partir de movimientos simulados:

- KPIs principales de resultado económico.
- Evolución mensual de ingresos y egresos.
- Evolución mensual del margen de utilidad.

No se observan flujos de edición de datos, navegación multipágina ni formularios de captura.

## 3. Estructura de la pantalla

Bloques visibles y componentes responsables:

- Encabezado:
  - Componente: `DashboardHeader`.
  - Archivo: `frontend/src/components/dashboard/dashboard-header.tsx`.
- Fila de KPIs:
  - Componentes: `KPIRow` y `KPICard`.
  - Archivos: `frontend/src/components/dashboard/kpi-row.tsx`, `frontend/src/components/dashboard/kpi-card.tsx`.
- Gráfico de ingresos y egresos:
  - Componente: `IncomeOutcomeChart`.
  - Archivo: `frontend/src/components/dashboard/income-outcome-chart.tsx`.
- Gráfico de margen:
  - Componente: `ProfitPercentChart`.
  - Archivo: `frontend/src/components/dashboard/profit-percent-chart.tsx`.
- Estados de carga:
  - Uso de `Skeleton` en tarjetas y gráficos.
  - Archivo base: `frontend/src/components/ui/skeleton.tsx`.
- Estado de error:
  - Mensaje visible en `App` cuando falla la carga de datos.
  - Archivo: `frontend/src/App.tsx`.

## 4. Indicadores financieros

| Indicador | Cálculo observado | Fuente del cálculo | Componente que lo muestra |
| --- | --- | --- | --- |
| Total Income | Suma de `amount` donde `operation_type === income` | `computeKPIs` en `frontend/src/lib/financial-utils.ts` | `KPICard` vía `KPIRow` en `frontend/src/components/dashboard/kpi-row.tsx` |
| Total Outcome | Suma de `amount` donde `operation_type === outcome` | `computeKPIs` en `frontend/src/lib/financial-utils.ts` | `KPICard` vía `KPIRow` en `frontend/src/components/dashboard/kpi-row.tsx` |
| Profit | `totalIncome - totalOutcome` | `computeKPIs` en `frontend/src/lib/financial-utils.ts` | `KPICard` vía `KPIRow` en `frontend/src/components/dashboard/kpi-row.tsx` |
| Profit Margin | Si `totalIncome > 0`, `(profit / totalIncome) * 100`, si no `0` | `computeKPIs` en `frontend/src/lib/financial-utils.ts` | `KPICard` vía `KPIRow` en `frontend/src/components/dashboard/kpi-row.tsx` |

## 5. Visualizaciones

- Gráfico Income vs Outcome:
  - Representa evolución mensual de ingresos y egresos.
  - Datos usados: `MonthlyDataPoint[]` con campos `month`, `income`, `outcome`.
  - Agrupación: por mes, construida en `computeMonthlyData`.
  - Componente: `frontend/src/components/dashboard/income-outcome-chart.tsx`.
  - Librería: Recharts (`LineChart`, `Line`, `XAxis`, `YAxis`, etc.).

- Gráfico Profit Margin %:
  - Representa evolución mensual de `profitPercent`.
  - Datos usados: `MonthlyDataPoint[]` con campo `profitPercent`.
  - Agrupación: por mes, construida en `computeMonthlyData`.
  - Componente: `frontend/src/components/dashboard/profit-percent-chart.tsx`.
  - Librería: Recharts.

## 6. Flujo de interacción actual

1. Carga inicial:
   - `main.tsx` monta la app en el nodo root.
2. Solicitud de métricas:
   - `App.tsx` ejecuta fetch a `/api/metrics` en `useEffect`.
3. Estado loading:
   - `loading=true` al inicio; tarjetas y gráficos renderizan skeletons.
4. Respuesta exitosa:
   - Se reciben movimientos financieros en formato JSON.
5. Cálculo de KPIs y series:
   - `computeKPIs` y `computeMonthlyData` procesan los movimientos.
6. Renderizado:
   - `KPIRow`, `IncomeOutcomeChart` y `ProfitPercentChart` muestran resultados.
7. Comportamiento ante error:
   - Se muestra alerta textual en pantalla y se desactiva loading.

## 7. Sistema visual observado

- Variables CSS:
  - Definidas en `:root` y `.dark` con tokens de color y radios.
  - Archivo: `frontend/src/index.css`.
- Uso de Tailwind:
  - Clases utilitarias en componentes y `@import "tailwindcss"`.
  - Archivos: `frontend/src/index.css`, componentes de dashboard y UI.
- Componentes base:
  - `Card` y `Skeleton` como primitives de composición.
  - Archivos: `frontend/src/components/ui/card.tsx`, `frontend/src/components/ui/skeleton.tsx`.
- Espaciado y layout:
  - Contenedor principal con `max-w-7xl`, padding y grid responsive.
  - Archivo: `frontend/src/App.tsx`.
- Tipografía:
  - Font sans definida en theme inline (`Inter`, fallback sans-serif).
  - Archivo: `frontend/src/index.css`.
- Tarjetas:
  - Superficie con borde, sombra ligera y variantes por tipo KPI.
  - Archivo: `frontend/src/components/dashboard/kpi-card.tsx`.
- Colores semánticos:
  - Tokens específicos para ingreso, egreso y utilidad.
  - Archivo: `frontend/src/index.css`.
- Diseño responsivo:
  - Header y grids con clases responsivas (`sm`, `xl`).
  - Archivos: `frontend/src/components/dashboard/dashboard-header.tsx`, `frontend/src/components/dashboard/kpi-row.tsx`, `frontend/src/App.tsx`.

## 8. Estados y feedback

- Loading:
  - Implementado con skeletons en KPIs y gráficos.
- Error:
  - Implementado con bloque de alerta textual en `App`.
- Estado con datos:
  - Implementado: tarjetas y gráficos muestran información calculada.
- Estado vacío:
  - Implementado en gráficos con mensaje cuando no hay datos graficables.
  - No existe un estado vacío específico para toda la página más allá de placeholders y mensajes de gráficos.

## 9. Decisiones y limitaciones actuales

- Los KPIs y la serie mensual se calculan en cliente.
- La fuente de datos es simulada (mock) desde backend.
- No hay filtros visibles en la interfaz actual.
- No hay navegación entre múltiples vistas/páginas dentro del dashboard observado.
- No existe persistencia de datos en backend.
- La pantalla depende principalmente de la disponibilidad de `/api/metrics` para construir KPIs y gráficos.

## 10. Evidencia

| Elemento documentado | Archivo o componente |
| --- | --- |
| Montaje de app | `frontend/src/main.tsx` |
| Carga de datos y estados | `frontend/src/App.tsx` |
| Cálculo de KPIs y series | `frontend/src/lib/financial-utils.ts` |
| Tests de cálculos | `frontend/src/lib/financial-utils.test.ts` |
| Header | `frontend/src/components/dashboard/dashboard-header.tsx` |
| Fila de KPIs | `frontend/src/components/dashboard/kpi-row.tsx` |
| Tarjeta KPI | `frontend/src/components/dashboard/kpi-card.tsx` |
| Gráfico ingreso/egreso | `frontend/src/components/dashboard/income-outcome-chart.tsx` |
| Gráfico margen | `frontend/src/components/dashboard/profit-percent-chart.tsx` |
| Primitives UI | `frontend/src/components/ui/card.tsx`, `frontend/src/components/ui/skeleton.tsx` |
| Sistema visual y tokens | `frontend/src/index.css` |
| Proxy de API | `frontend/vite.config.ts` |

## 11. Relación con otros documentos

- `README.md` y `README.es.md`: onboarding rápido y ejecución del proyecto.
- `context.md`: contexto verificable del handover y estado operativo de línea base.
- `engineering-analysis.md`: evaluación de prácticas de ingeniería, riesgos y reglas propuestas.
- `design.md`: comportamiento funcional y diseño visual actualmente implementado.
