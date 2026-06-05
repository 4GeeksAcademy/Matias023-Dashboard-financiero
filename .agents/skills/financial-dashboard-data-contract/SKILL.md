---
name: financial-dashboard-data-contract
description: Define y valida reglas de contrato de datos, agregacion mensual y formateo financiero especificas del dashboard.
license: MIT
metadata:
  author: project-local
  version: "1.0.0"
---

# Financial Dashboard Data Contract

## Objetivo Claro
Garantizar que cualquier cambio en tipos, utilidades o componentes preserve el contrato financiero del dashboard en cuatro ejes:
1. Dominio de datos consistente entre API, tipos y UI.
2. Calculo correcto de KPIs.
3. Agregacion mensual cronologica estable.
4. Formateo uniforme de moneda y porcentaje.

## Inputs Definidos
1. Movimiento financiero con contrato cerrado:
   - create_date: string ISO (YYYY-MM-DD)
   - amount: number
   - operation_type: income | outcome
   - category: suppliers | sales | operational | administrative | others
   - business_type: B2B | B2C
2. Archivos a evaluar:
   - frontend/src/lib/financial-types.ts
   - frontend/src/lib/financial-utils.ts
   - frontend/src/lib/financial-utils.test.ts
   - frontend/src/App.tsx
3. Contexto funcional del producto:
   - docs/especificacion-frontend.md

## Output Esperado
La skill debe generar una guia accionable con:
1. Estado del contrato:
   - Si los dominios de operation_type, category y business_type se respetan.
   - Si create_date se mantiene como string ISO.
2. Estado de calculo KPI:
   - totalIncome suma solo income.
   - totalOutcome suma solo outcome.
   - profit = totalIncome - totalOutcome.
   - profitPercent usa guardia de division por cero cuando totalIncome = 0.
3. Estado de agregacion mensual:
   - Agrupacion por clave YYYY-MM.
   - Orden cronologico ascendente, incluyendo cambios de anio.
   - month como etiqueta Mes corto + anio en locale en-US.
4. Estado de formateo:
   - Moneda USD sin decimales.
   - Porcentaje con una cifra decimal y simbolo %.
5. Acciones recomendadas:
   - Lista de cambios minimos por archivo para corregir desviaciones.
   - Casos de prueba que faltan o deben actualizarse.

## Criterios de Aceptacion
1. Cobertura minima validada por pruebas:
   - Caso sin income con profitPercent = 0.
   - Caso cross-year desordenado con salida cronologica.
   - Formato currency sin decimales.
   - Formato percent con una cifra decimal.
2. Coherencia de contrato:
   - Cualquier cambio en tipos exige actualizacion coordinada en utilidades, UI y tests.
3. Calidad de salida de la skill:
   - Debe incluir hallazgos concretos por archivo.
   - Debe listar riesgo funcional si hay ruptura de contrato.
   - Debe proponer pasos verificables antes de merge.

## Como Aplicarla
Usar esta skill cuando se modifiquen calculos financieros, tipos compartidos o transformaciones de series mensuales. Es complementaria a reglas genericas de performance o accesibilidad.
