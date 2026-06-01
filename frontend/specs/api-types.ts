/**
 * Tipo de operacion financiera admitido por la API.
 * Valores validos: "income" | "outcome".
 */
export type OperationType = "income" | "outcome";

/**
 * Categoria financiera admitida por la API.
 * Valores validos: "suppliers" | "sales" | "operational" | "administrative" | "others".
 */
export type Category =
  | "suppliers"
  | "sales"
  | "operational"
  | "administrative"
  | "others";

/**
 * Tipo de negocio admitido por la API.
 * Valores validos: "B2B" | "B2C".
 */
export type BusinessType = "B2B" | "B2C";

/**
 * Fecha serializada como texto en formato YYYY-MM-DD.
 */
export type DateYMD = string;

/**
 * Respuesta de GET /api/metrics/facets.
 * Se usa para poblar filtros y mostrar el rango valido de fechas.
 */
export interface FacetsResponse {
  /**
   * Tipos de operacion disponibles en el dataset actual.
   * Cada valor pertenece al dominio OperationType.
   */
  operation_types: OperationType[];

  /**
   * Tipos de negocio presentes en el dataset actual.
   * Cada valor pertenece al dominio BusinessType.
   */
  business_types: BusinessType[];

  /**
   * Categorias disponibles en el dataset actual.
   * Cada valor pertenece al dominio Category.
   */
  categories: Category[];

  /**
   * Fecha minima disponible en la fuente de datos.
   * Formato: YYYY-MM-DD.
   */
  min_date: DateYMD;

  /**
   * Fecha maxima disponible en la fuente de datos.
   * Formato: YYYY-MM-DD.
   */
  max_date: DateYMD;
}

/**
 * Entrada individual de alerta de anomalia.
 * Corresponde a un elemento de GET /api/metrics/alerts.
 */
export interface AlertEntry {
  /**
   * Periodo agregado donde se detecta la anomalia.
   * Formato depende de group_by en backend:
   * - day: YYYY-MM-DD
   * - week: YYYY-Www
   * - month: YYYY-MM
   */
  period: string;

  /**
   * Total de outcome registrado en el periodo.
   * Unidad: monto monetario absoluto.
   */
  outcome_total: number;

  /**
   * Valor base de comparacion utilizado por backend.
   * Unidad: monto monetario absoluto.
   */
  baseline_average: number;

  /**
   * Ratio de incremento respecto a baseline_average.
   * Ejemplo: 0.3 equivale a 30%.
   */
  increase_ratio: number;
}

/**
 * Respuesta completa de GET /api/metrics/alerts.
 */
export type AlertsResponse = AlertEntry[];

/**
 * Entrada individual de categoria en ranking top.
 * Corresponde a un elemento de GET /api/metrics/categories/top.
 */
export interface CategoryEntry {
  /**
   * Categoria financiera del ranking.
   * Valor perteneciente al dominio Category.
   */
  category: Category;

  /**
   * Tipo de operacion sobre el que se calculo el ranking.
   * Valor perteneciente al dominio OperationType.
   */
  operation_type: OperationType;

  /**
   * Monto total acumulado de la categoria para la consulta actual.
   */
  total_amount: number;
}

/**
 * Respuesta completa de GET /api/metrics/categories/top.
 */
export type TopCategoriesResponse = CategoryEntry[];
