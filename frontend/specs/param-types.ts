import type { OperationType } from "./api-types";

/**
 * Filtro de rango de fechas compartido entre funcionalidades.
 * Ambos campos son opcionales.
 */
export interface DateRangeFilter {
  /**
   * Limite inferior inclusivo del rango.
   * Formato esperado: YYYY-MM-DD.
   */
  start_date?: string;

  /**
   * Limite superior inclusivo del rango.
   * Formato esperado: YYYY-MM-DD.
   */
  end_date?: string;
}

/**
 * Parametros de consulta para GET /api/metrics/alerts.
 */
export interface AlertsParams extends DateRangeFilter {
  /**
   * Umbral de deteccion como ratio decimal.
   * Rango funcional de UI: 0.01 a 1.0.
   * Restriccion de backend: valor mayor o igual a 0.
   * Valor por defecto en backend: 0.3.
   */
  threshold: number;
}

/**
 * Parametros de consulta para GET /api/metrics/categories/top.
 */
export interface TopCategoriesParams extends DateRangeFilter {
  /**
   * Tipo de operacion para construir el ranking.
   * Valores validos: "income" | "outcome".
   */
  operation_type: OperationType;

  /**
   * Cantidad maxima de categorias a devolver.
   * Restriccion backend: entero entre 1 y 20.
   */
  limit: number;
}
