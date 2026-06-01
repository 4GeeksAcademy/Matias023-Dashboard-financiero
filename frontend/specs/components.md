# Especificacion de componentes

## Funcionalidad 1 - Filtro de rango de fechas

### Componentes propuestos

1. DateRangeFilterBar
- Props:
  - value: DateRangeFilter
  - availableRange: FacetsResponse | null
  - disabled?: boolean
  - onChange: (next: DateRangeFilter) => void
  - onApply?: () => void
  - onClear?: () => void
- Layout:
  - Contenedor superior del dashboard, junto al encabezado de metricas.
  - Dos inputs de fecha: inicio y fin.
  - Zona de acciones opcionales: aplicar y limpiar.
  - En desktop se muestra en fila; en mobile se apila en columna.

2. AvailableDateRangeHint
- Props:
  - minDate: FacetsResponse["min_date"]
  - maxDate: FacetsResponse["max_date"]
- Layout:
  - Texto auxiliar cercano a los inputs.
  - Formato sugerido: Rango disponible: <min_date> a <max_date>.

### Comportamiento con solo un input relleno

1. Solo start_date con valor:
- Se envia solo start_date.
- end_date no se incluye en query.
- La UI muestra resultados desde esa fecha en adelante.

2. Solo end_date con valor:
- Se envia solo end_date.
- start_date no se incluye en query.
- La UI muestra resultados hasta esa fecha.

### Pista de rango de fechas disponible

- Fuente obligatoria: GET /api/metrics/facets.
- Campos usados: min_date y max_date.
- Si facets esta cargando:
  - Se muestra texto temporal de carga.
- Si facets falla:
  - Se muestra mensaje de error no bloqueante junto al filtro.

## Funcionalidad 2 - Tabla de alertas de anomalias

### Componentes propuestos

1. AlertsThresholdInput
- Props:
  - value: AlertsParams["threshold"]
  - min: number
  - max: number
  - step?: number
  - disabled?: boolean
  - onChange: (nextValue: number) => void
- Layout:
  - Input numerico etiquetado cerca del titulo de la seccion de alertas.

2. AlertsTable
- Props:
  - rows: AlertsResponse
  - loading?: boolean
  - emptyMessage?: string
- Layout:
  - Tabla responsiva dentro de card bajo los graficos.
  - Header fijo con 4 columnas.

### Columnas y tipos de dato

1. Periodo
- Fuente: AlertEntry.period
- Tipo de dato: string

2. Outcome registrado
- Fuente: AlertEntry.outcome_total
- Tipo de dato: number (renderizado como moneda)

3. Media movil de 3 periodos anteriores
- Fuente: AlertEntry.baseline_average
- Tipo de dato: number (renderizado como moneda)
- Nota de contrato:
  - Backend provee baseline_average como referencia historica; la UI la etiqueta como media movil segun requerimiento funcional.

4. Incremento porcentual
- Fuente: AlertEntry.increase_ratio
- Tipo de dato: number (renderizado como porcentaje)

### Estado vacio

- Condicion: rows.length === 0.
- Render obligatorio:
  - Mensaje explicito visible en la card.
  - Texto sugerido: No se detectaron anomalias para el umbral actual.
- La seccion no debe desaparecer.

### Umbral fuera de rango

- Rango permitido en UI: 0.01 a 1.0.
- Comportamiento:
  - Menor que 0.01: normalizar a 0.01.
  - Mayor que 1.0: normalizar a 1.0.
  - Valor invalido o vacio: restaurar ultimo valor valido o 0.3.

## Funcionalidad 3 - Vista comparativa B2B vs B2C

### Componentes propuestos

1. BusinessComparisonPage
- Props:
  - dateRange: DateRangeFilter
  - facets: FacetsResponse | null
  - b2bTop: TopCategoriesResponse
  - b2cTop: TopCategoriesResponse
  - loading?: boolean
  - error?: string | null
- Layout:
  - Cabecera de pagina con filtro de fechas.
  - Dos paneles paralelos (B2B y B2C).
  - Un grafico comparativo unico debajo de ambos paneles.

2. TopFiveIncomePanel
- Props:
  - title: string
  - rows: TopCategoriesResponse
  - totalIncome: number
  - loading?: boolean
  - emptyMessage?: string
- Layout:
  - Card por segmento con tabla top-5.

3. TopFiveIncomeTable
- Props:
  - rows: TopCategoriesResponse
  - totalIncome: number
- Layout:
  - Tabla de 3 columnas:
    - Categoria
    - Total ingresos
    - Porcentaje sobre el total del grupo

4. B2BvsB2CIncomeChart
- Props:
  - b2bIncomeTotal: number
  - b2cIncomeTotal: number
  - loading?: boolean
- Layout:
  - Grafico unico comparativo con dos puntos de datos.

### Estado vacio por panel top-5

- Condicion: rows.length === 0 para el panel.
- Render obligatorio:
  - Mensaje explicito dentro del panel.
  - Texto sugerido: Sin categorias de ingreso para el rango seleccionado.
- Cada panel maneja su vacio de forma independiente.

### Que muestra el grafico comparativo

- Punto 1: ingreso total agregado de B2B para el rango seleccionado.
- Punto 2: ingreso total agregado de B2C para el rango seleccionado.
- Interpretacion:
  - Cada punto representa la magnitud total de ingresos del segmento.
  - El objetivo es comparar rendimiento relativo entre lineas de negocio.
