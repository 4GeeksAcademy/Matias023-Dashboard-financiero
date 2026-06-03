# Regla: Naming consistente y legible

## Alcance

Backend y frontend.

## Razon

Nombres consistentes reducen errores y facilitan onboarding.

## Regla

- Componentes: PascalCase.
- Funciones y variables: camelCase.
- Tipos y modelos: nombres descriptivos del dominio financiero.
- Evitar mezclar idiomas en textos visibles de la UI dentro de la misma vista.

## Checklist de aplicacion

- Los nuevos nombres describen intencion, no implementacion.
- No se introducen abreviaturas confusas.
- La UI nueva mantiene un unico idioma en etiquetas y mensajes.

## Validacion en este repo

- Aplica porque la base de nombres tecnicos ya es buena.
- Aplica porque hay mezcla de idioma en textos de UI.

## Refinamiento anti-ambiguedad

- "Descriptivo" = alguien nuevo entiende el rol de la funcion sin abrir 5 archivos.
- Si hay duda de idioma, seguir el idioma principal de la pantalla modificada.
