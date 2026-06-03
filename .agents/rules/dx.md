# Regla: DX pragmatica y segura

## Alcance

Configuracion, scripts y flujo local.

## Razon

Un flujo local rapido mejora productividad, pero no debe introducir defaults inseguros o friccion innecesaria.

## Regla

- Mantener scripts de desarrollo simples y predecibles.
- Evitar mensajes de error genericos cuando se pueda dar contexto util.
- Diferenciar modo desarrollo y modo produccion cuando aplique.
- Reducir hardcodes evitables en UI y configuracion.

## Checklist de aplicacion

- Los comandos principales siguen funcionando con docker compose y scripts del frontend.
- Los errores nuevos orientan accion (que revisar o siguiente paso).
- No se agregan configuraciones inseguras para produccion por defecto.

## Validacion en este repo

- Aplica porque el backend arranca con opciones de debug pensadas para desarrollo.
- Aplica porque la UI tiene mensajes de error y datos visibles que pueden mejorarse.

## Refinamiento anti-ambiguedad

- "Error util" = incluye causa probable o accion recomendada.
- "Hardcode evitable" = dato que deberia venir de API, env o estado de la pantalla.
