# Reglas propuestas para mitigar riesgos y preservar buenas prácticas

## Arquitectura
- Limita los orígenes permitidos en CORS a los dominios usados por el frontend en producción. En desarrollo, documenta el uso de `*` y asegúrate de cambiarlo antes de desplegar.
- No uses datos simulados (mock) en endpoints productivos. Implementa persistencia real usando una base de datos (por ejemplo, SQLite o PostgreSQL) y asegúrate de que los endpoints permitan operaciones CRUD reales.
- Los contenedores Docker deben definir un usuario no privilegiado (`USER appuser`) y nunca ejecutarse como root. Añade la creación y uso de este usuario en el Dockerfile.
- Mantén la lógica de negocio en archivos separados de las rutas y utilidades. Por ejemplo, en backend, usa `/app/services/` para lógica y `/app/routes.py` solo para endpoints.

## Naming y Localización
- No hardcodees formatos de fecha, moneda o idioma. Usa variables de entorno (`process.env` en frontend, `os.environ` en backend) o un archivo de configuración para definir localización y formato.
- Los nombres de variables, funciones y componentes deben ser descriptivos y seguir camelCase en JS/TS y snake_case en Python. Evita abreviaturas poco claras.

## Testing
- Todo módulo de lógica debe tener pruebas unitarias. Apunta a una cobertura mínima del 80% y revisa la cobertura con herramientas como `pytest-cov` o `vitest --coverage`.
- Los tests deben cubrir casos de éxito, error y bordes. Por ejemplo, prueba respuestas a datos inválidos y errores de red en frontend.
- Elimina cualquier código de test o debug (como `debugpy` o mocks) antes de hacer deploy a producción.

## Documentación
- Toda función pública y endpoint debe tener docstring o comentario explicativo sobre su propósito y parámetros.
- Mantén actualizada la documentación de la API generada por FastAPI (Swagger/OpenAPI) y revisa que los modelos reflejen los datos reales.

## Developer Experience (DX)
- Gestiona los errores mostrando mensajes claros y diferenciando tipos (404, 500, error de red, validación, etc.). Usa componentes de alerta o notificación en frontend para mostrar estos mensajes.
- Usa alias de importación (`@/`) en frontend para evitar rutas largas y mejorar la legibilidad. Documenta su uso en el README.
- Mantén la consistencia visual usando Tailwind CSS y los componentes de Shadcn/UI. No mezcles estilos inline o librerías distintas sin justificación.
- Revisa y actualiza dependencias al menos una vez por release. Usa herramientas como `npm audit` y `pip list --outdated` para detectar vulnerabilidades.

---

Estas reglas están adaptadas al flujo y tecnologías reales del proyecto, y ayudan a reducir riesgos de seguridad, mejorar la mantenibilidad y asegurar una experiencia de desarrollo y usuario consistente.