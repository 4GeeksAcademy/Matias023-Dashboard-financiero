# Regla: Documentacion minima util por cambio

## Alcance

Todo el repositorio.

## Razon

La documentacion actual ayuda a correr el proyecto, pero no siempre refleja decisiones de implementacion nuevas.

## Regla

- Si cambias como correr el proyecto, actualiza README.
- Si agregas endpoint, documenta parametros y respuesta esperada en descripcion corta del PR o archivo de apoyo.
- Si introduces una decision tecnica no obvia, deja una nota breve de por que.

## Checklist de aplicacion

- README actualizado cuando cambian comandos, puertos o variables.
- Endpoints nuevos con explicacion minima de uso.
- No quedan decisiones importantes solo en la cabeza del autor.

## Validacion en este repo

- Aplica porque el README ya es punto de entrada principal.
- Aplica porque el proyecto se usa en contexto educativo y la claridad acelera revisiones.

## Refinamiento anti-ambiguedad

- "Nota breve" = 3 a 6 lineas explicando contexto, alternativa descartada y motivo.
- No hace falta documentacion extensa para cambios pequenos.
