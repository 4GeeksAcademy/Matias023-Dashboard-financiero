# Regla: Testing orientado a cambios de logica

## Alcance

Backend y frontend.

## Razon

El repo tiene buena base de tests unitarios, pero faltan pruebas de flujo completo.

## Regla

- Si cambias logica de negocio, agrega o ajusta pruebas en la misma capa.
- Si cambias contrato de API, actualizar pruebas de backend.
- Si cambias utilidades de calculo en frontend, actualizar pruebas de utilidades.
- Priorizar al menos un escenario feliz y uno de error relevante.

## Checklist de aplicacion

- Existe prueba nueva o modificada junto al cambio de logica.
- El test falla sin el cambio y pasa con el cambio.
- Si no se agrego prueba, queda justificacion explicita en PR.

## Validacion en este repo

- Aplica porque ya existen tests unitarios backend y tests de utilidades frontend.
- Aplica porque no hay E2E integrado, por lo que cada cambio necesita cobertura local minima.

## Refinamiento anti-ambiguedad

- "Cambio de logica" incluye filtros, calculos de metricas, mapeos y formateos de datos.
- Cambios solo cosmeticos (estilos/texto) no obligan test nuevo.
