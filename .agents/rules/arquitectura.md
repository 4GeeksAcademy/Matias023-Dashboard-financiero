# Regla: Arquitectura por responsabilidad

## Alcance

Backend y frontend.

## Razon

Hoy hay logica concentrada en pocos archivos; si no se controla, el mantenimiento se vuelve lento.

## Regla

- Mantener separacion clara entre backend y frontend.
- Evitar meter logica de negocio nueva directamente en handlers/rutas si crece mas de lo razonable.
- Evitar duplicar calculos de negocio entre backend y frontend.
- Preferir que el backend sea la fuente de verdad para metricas de negocio.

## Checklist de aplicacion

- El cambio indica claramente en que capa vive la logica.
- Si hay calculo de negocio nuevo, existe en backend o se justifica por que va en frontend.
- El archivo modificado no mezcla demasiadas responsabilidades nuevas.

## Validacion en este repo

- Aplica porque el backend concentra mucha logica en rutas.
- Aplica porque el frontend calcula KPIs y puede divergir de la API.

## Refinamiento anti-ambiguedad

- "Demasiada logica" = cuando un endpoint empieza a incluir reglas de negocio no relacionadas con su proposito.
- En ese caso, extraer funciones a modulo de servicios de dominio.
