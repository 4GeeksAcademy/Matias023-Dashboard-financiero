# Frontend Specs - Contrato de datos y comportamiento UI

Este documento describe la capa de especificacion frontend para tres funcionalidades nuevas.
No incluye implementacion de componentes ni llamadas reales a la API.

## Funcionalidad 1 - Filtro de rango de fechas

### Endpoints consumidos

1. GET /api/metrics/facets
- Proposito:
  - Obtener min_date y max_date para mostrar el rango valido.

2. GET /api/metrics/categories/top
- Query principal esperada:
  - operation_type=income
  - limit=5
  - start_date (opcional)
  - end_date (opcional)
- Proposito:
  - Obtener ranking top para la vista comparativa y usar el mismo filtro de fechas compartido.

### Tipos TypeScript usados

- Request:
  - DateRangeFilter
  - TopCategoriesParams
- Response:
  - FacetsResponse
  - CategoryEntry
  - TopCategoriesResponse

### Valores validos y restricciones de parametros

1. start_date
- Tipo: string
- Formato: YYYY-MM-DD
- Restriccion: opcional

2. end_date
- Tipo: string
- Formato: YYYY-MM-DD
- Restriccion: opcional

3. operation_type
- Tipo: OperationType
- Valores validos: income, outcome
- Para este flujo: income

4. limit
- Tipo: number
- Restriccion backend: entero entre 1 y 20
- Valor de uso en la funcionalidad: 5

### Edge cases y comportamiento UI

1. Ambos campos de fecha vacios
- UI esperada:
  - Mostrar datos sin recorte por fecha.

2. Solo start_date con valor
- UI esperada:
  - Aplicar filtro inferior inclusivo.
  - Mantener todo lo posterior.

3. Solo end_date con valor
- UI esperada:
  - Aplicar filtro superior inclusivo.
  - Mantener todo lo anterior.

4. start_date mayor que end_date
- UI esperada:
  - Mostrar validacion y no ejecutar consulta hasta corregir rango.

## Funcionalidad 2 - Tabla de alertas de anomalias

### Endpoint consumido

1. GET /api/metrics/alerts
- Query admitida por contrato:
  - threshold (default 0.3, ge=0)
  - start_date (opcional)
  - end_date (opcional)
  - group_by (opcional, default month)
  - business_type (opcional)

### Tipos TypeScript usados

- Request:
  - AlertsParams
  - DateRangeFilter
- Response:
  - AlertEntry
  - AlertsResponse

### Valores validos y restricciones de parametros

1. threshold
- Tipo: number
- Restriccion backend: mayor o igual a 0
- Restriccion funcional de UI: 0.01 a 1.0
- Valor por defecto UX recomendado: 0.3

2. start_date
- Tipo: string
- Formato: YYYY-MM-DD
- Restriccion: opcional

3. end_date
- Tipo: string
- Formato: YYYY-MM-DD
- Restriccion: opcional

### Edge cases y comportamiento UI

1. Lista de alertas vacia
- UI esperada:
  - Renderizar estado vacio explicito dentro de la tabla.
  - No ocultar la seccion.

2. threshold menor a 0.01 o mayor a 1.0
- UI esperada:
  - Normalizar al limite correspondiente.

3. threshold invalido (NaN, vacio)
- UI esperada:
  - Restaurar valor por defecto 0.3 o ultimo valor valido.

4. Rango de fechas sin datos
- UI esperada:
  - Mostrar estado vacio sin errores de render.

## Funcionalidad 3 - Vista comparativa B2B vs B2C

### Endpoints consumidos

1. GET /api/metrics/facets
- Proposito:
  - Obtener valores disponibles de negocio y rango de fechas.

2. GET /api/metrics/categories/top
- Query por panel B2B:
  - operation_type=income
  - limit=5
  - business_type=B2B
  - start_date (opcional)
  - end_date (opcional)
- Query por panel B2C:
  - operation_type=income
  - limit=5
  - business_type=B2C
  - start_date (opcional)
  - end_date (opcional)

### Tipos TypeScript usados

- Request:
  - DateRangeFilter
  - TopCategoriesParams
- Response:
  - FacetsResponse
  - CategoryEntry
  - TopCategoriesResponse

### Valores validos y restricciones de parametros

1. business_type
- Valores validos: B2B, B2C
- Uso: un valor por panel comparativo

2. operation_type
- Valores validos: income, outcome
- Uso requerido: income

3. limit
- Restriccion backend: entero entre 1 y 20
- Uso requerido: 5

4. start_date y end_date
- Formato: YYYY-MM-DD
- Ambos opcionales

### Edge cases y comportamiento UI

1. B2B vacio y B2C con datos
- UI esperada:
  - Panel B2B muestra estado vacio.
  - Panel B2C muestra su top-5 normal.
  - Grafico compara valor 0 contra valor positivo.

2. Ambos paneles vacios
- UI esperada:
  - Ambos paneles muestran estado vacio.
  - Grafico muestra dos puntos en 0 o estado vacio equivalente.

3. Solo una fecha informada
- UI esperada:
  - Aplicar filtro parcial sin bloquear la vista.

4. Facets sin business_types esperados
- UI esperada:
  - Mostrar aviso de datos incompletos y deshabilitar comparativa si aplica.
