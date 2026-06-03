# Set de Reglas

## Arquitectura

### Buenas practicas

- El proyecto separa frontend y backend.
- La base tecnologica es correcta para este tipo de dashboard.
- Se usan contenedores para levantar todo en local.
- El frontend esta dividido por piezas reutilizables.
- El backend valida estructuras de datos con modelos tipados.

### Malas practicas / riesgos

- Seguridad debil por CORS muy abierto.
- Falta capa de login/permisos en la API.
- Demasiada logica concentrada en rutas.
- Parte de calculos duplicados entre cliente y servidor.

## Naming

### Buenas practicas

- Los nombres de componentes y funciones se entienden rapido.
- Se sigue una convencion razonable entre componentes y funciones.
- Los nombres de tipos comunican bien el dominio financiero.

### Malas practicas / riesgos

- No hay una guia escrita de nombres para el equipo.
- La interfaz mezcla dos idiomas en textos visibles.

## Testing

### Buenas practicas

- Backend con pruebas unitarias funcionales.
- Frontend con pruebas de utilidades importantes.
- Herramientas de testing bien elegidas para cada stack.

### Malas practicas / riesgos

- Falta validar el flujo completo de usuario a API.
- No hay pipeline que ejecute tests en cada cambio.
- No hay objetivo de cobertura minima definido.

## Documentacion

### Buenas practicas

- Existe documentacion base en dos idiomas.
- Correr el proyecto localmente es sencillo.
- El uso de tipado ayuda a entender contratos.

### Malas practicas / riesgos

- Varias funciones no tienen explicacion corta de su objetivo.
- No esta documentada la estructura tecnica esperada por modulos.
- No hay registro de decisiones tecnicas clave.

## Developer Experience (DX)

### Buenas practicas

- Lint y tipado ayudan a detectar errores temprano.
- Hay scripts utiles para tareas comunes del dia a dia.
- La configuracion local reduce friccion para arrancar.
- La estructura general del repo es facil de navegar.

### Malas practicas / riesgos

- Mensaje de error en frontend poco especifico.
- Backend arrancando en modo debug por defecto.
- Dependencias Python sin bloqueo de versiones.
- Datos visibles de UI definidos a mano (hardcodeados).

## Reglas de trabajo recomendadas

- Todo endpoint nuevo debe incluir modelo de datos y prueba.
- El backend define los calculos de negocio finales.
- Dividir rutas por dominio para evitar archivos gigantes.
- Configurar CORS por entorno y cerrar en produccion.
- Implementar autenticacion y autorizacion basica.
- Publicar una mini guia de naming para el equipo.
- Unificar idioma de textos en toda la interfaz.
- Cubrir al menos un flujo E2E principal.
- Ejecutar tests automaticamente en cada PR.
- Fijar versiones de dependencias en Python.
- Evitar datos hardcodeados cuando deben venir de API o config.
- Si cambia la forma de ejecutar el proyecto, actualizar documentacion.
