# Frontend Component Specifications

Este directorio documenta contratos y comportamientos esperados para futuras funcionalidades de frontend. No describe implementación existente ni agrega llamadas nuevas desde la UI actual.

## A. Filtro de rango de fechas en dashboard principal

### Objetivo del usuario

Permitir acotar los KPIs y gráficos del dashboard principal a un rango de fechas válido sin cambiar el endpoint base ya existente.

### Ubicación sugerida en la UI

Ubicar el filtro junto al encabezado del dashboard, por encima de los KPIs, para que afecte de forma visible al conjunto de métricas principales.

### Componentes necesarios

- Contenedor de filtro de fechas.
- Campo de fecha inicial.
- Campo de fecha final.
- Botón de aplicar.
- Botón de limpiar o restablecer al rango completo disponible.
- Mensaje inline de validación.

### Props propuestas

- facets: FacetsResponse | null
- value: DateRangeFilter
- onChange: (nextValue: DateRangeFilter) => void
- onApply: () => void
- onReset: () => void
- disabled?: boolean
- loading?: boolean
- errorMessage?: string | null

### Datos que consume desde GET /api/metrics/facets

- min_date para inicializar el límite inferior seleccionable.
- max_date para inicializar el límite superior seleccionable.
- categories y operation_types no son necesarios para el filtro de fechas, pero forman parte del contrato disponible si el mismo bloque de filtros se amplía en el futuro.

### Parámetros enviados a GET /api/metrics

- start_date
- end_date

Nota: GET /api/metrics también acepta category y operation_type, pero esta funcionalidad solo requiere rango de fechas. No debe enviarse business_type porque el endpoint real no lo admite.

### Validaciones de fecha

- Ambas fechas deben serializarse como string en formato YYYY-MM-DD.
- start_date no debe ser posterior a end_date.
- start_date no debe ser menor que min_date recibido desde facets.
- end_date no debe ser mayor que max_date recibido desde facets.
- Si el usuario informa solo una fecha, el frontend debe decidir entre bloquear el envío o completar el extremo faltante con el límite disponible. La decisión debe quedar explícita en implementación; esta especificación recomienda bloquear y mostrar validación.
- Si el backend devuelve min_date mayor que max_date, la vista debe entrar en estado de error de contrato y deshabilitar el filtro.

### Loading

- Mientras se carga facets por primera vez, los campos deben mostrarse deshabilitados o en skeleton.
- Mientras se solicita GET /api/metrics con un nuevo rango, el dashboard principal debe conservar contexto visual y mostrar estado de recarga sin colapsar la página.

### Error

- Si falla GET /api/metrics/facets, mostrar mensaje explicando que no se pudieron obtener los límites de fecha.
- Si falla GET /api/metrics al aplicar un rango válido, mantener visible el filtro con los valores del usuario y mostrar error no bloqueante en el área principal.

### Sin datos

- Si GET /api/metrics devuelve una lista vacía para el rango seleccionado, no ocultar KPIs ni gráficos sin contexto.
- Mostrar estado vacío explícito indicando que no existen movimientos para el intervalo seleccionado.

### Edge cases

- Rango de un solo día: start_date igual a end_date debe ser válido.
- Rango fuera de límites: una fecha fuera de min_date o max_date debe prevenir el envío.
- Cambio rápido de rango: la implementación futura debe evitar que una respuesta antigua sobreescriba una selección más reciente.
- Reinicio del filtro: al limpiar, la vista debe volver al rango completo soportado por facets.

## B. Tabla de alertas de anomalías

### Objetivo del usuario

Permitir detectar incrementos anómalos de egresos sin abandonar el dashboard y con control explícito sobre el umbral de sensibilidad.

### Endpoint

GET /api/metrics/alerts

### Parámetro threshold

- Tipo: number decimal.
- Contrato real de API: mínimo 0, default 0.3.
- Regla de producto para futura UI: restringir captura a 0.01-1.0 antes de enviar.
- Interpretación: 0.25 representa 25% de incremento.

### Parámetro group_by

- Valores válidos: day, week, month.
- Default real: month.
- El selector debe reflejar exactamente esos tres valores.

### Filtro por fecha si está activo

- Si el dashboard principal ya expone rango de fechas, la tabla de alertas debe reutilizar start_date y end_date en la misma consulta.
- Si no existe filtro activo, usar solo threshold y group_by.

### Columnas requeridas

- Periodo.
- Outcome registrado.
- Media móvil de los 3 periodos anteriores.
- Incremento porcentual.

### Nota de contrato real

El backend actual no devuelve una media móvil de 3 periodos. Devuelve baseline_average, calculado en backend como promedio histórico de todos los periodos previos dentro del conjunto resumido evaluado. Sin agregar nuevas llamadas ni recalcular con otra fuente, la UI solo puede representar de forma fiel ese baseline_average. Si producto exige exactamente 3 periodos anteriores, el contrato actual es insuficiente y requiere ajuste de API o redefinición del copy de la columna.

### Comportamiento cuando no hay alertas

- La tabla no debe desaparecer.
- Debe mostrarse un estado vacío explícito, por ejemplo indicando que no se detectaron anomalías para el umbral y rango seleccionados.

### Loading

- Mostrar skeleton o filas placeholder manteniendo encabezados visibles.
- Si cambia threshold o group_by, conservar la estructura de la tabla mientras llega la nueva respuesta.

### Error

- Si falla la consulta, mantener la tabla montada con encabezados y mostrar mensaje de error accionable.
- El error debe conservar los últimos controles seleccionados por el usuario para permitir reintento.

### Edge cases

- Lista vacía: es un estado válido y debe mostrarse como vacío explícito.
- threshold fuera de rango de producto: no enviar la consulta y mostrar validación antes del request.
- group_by=day puede producir muchos periodos y etiquetas largas; la tabla debe soportar densidad mayor sin truncar la semántica del periodo.
- baseline_average igual a 0 no debería ocurrir en un item ya emitido por la API actual, pero si ocurre la UI debe mostrar el valor devuelto sin intentar recalcular ratios.

## C. Vista comparativa B2B vs B2C

### Objetivo del usuario

Comparar rápidamente las principales categorías de ingreso entre segmentos B2B y B2C usando el mismo rango temporal.

### Nueva página o vista

La funcionalidad se especifica como una vista dedicada o una sección navegable separada del dashboard principal para evitar mezclar una comparación segmentada con los KPIs generales existentes.

### Estructura principal

- Dos secciones paralelas: B2B y B2C.
- Ambas secciones deben compartir el mismo rango de fechas activo.
- Cada sección muestra hasta 5 categorías ordenadas por total_amount descendente.

### Endpoints consumidos

- GET /api/metrics/categories/top?operation_type=income&limit=5&business_type=B2B
- GET /api/metrics/categories/top?operation_type=income&limit=5&business_type=B2C

Ambas consultas deben incluir start_date y end_date cuando exista un rango activo compartido.

### Datos mostrados por fila

- category
- total_amount como ingreso total
- porcentaje sobre el total del grupo mostrado

### Cálculo del porcentaje en frontend

La API no devuelve porcentaje. El frontend puede calcularlo dividiendo total_amount de cada fila entre la suma de total_amount de la respuesta recibida para ese grupo, y multiplicando por 100 para presentación. Esa operación describe porcentaje sobre el subtotal visible retornado por el endpoint.

Nota de alcance: si producto necesita porcentaje sobre el total completo de ingresos del grupo y no solo sobre el top retornado, el endpoint actual no entrega un denominador suficiente y haría falta ajustar la API.

### Loading

- Ambas columnas pueden cargar en paralelo.
- La vista debe permitir skeleton independiente por segmento para no bloquear una columna por la otra.

### Error parcial

- Si falla solo B2B, la columna B2C debe seguir visible con su contenido.
- Si falla solo B2C, la columna B2B debe seguir visible con su contenido.
- Cada columna debe poder mostrar su propio mensaje de error y acción de reintento.

### Sin datos

- Si una respuesta llega vacía, mantener el panel del segmento visible con estado vacío.
- Si ambas respuestas llegan vacías para el mismo rango, mostrar dos estados vacíos paralelos y conservar el contexto del filtro compartido.

### Edge cases

- Respuesta con menos de 5 categorías: renderizar solo las filas disponibles sin completar artificialmente.
- Respuesta vacía en un solo segmento: no colapsar el layout de dos columnas.
- Empates en total_amount: la UI no debe asumir orden secundario distinto al entregado por API.
- Rango de fechas compartido inválido: bloquear ambas consultas hasta corregirlo.