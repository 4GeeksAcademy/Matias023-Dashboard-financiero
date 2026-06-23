/**
 * Allowed operation type values exposed by the backend API.
 */
export type OperationType = "income" | "outcome";

/**
 * Allowed business segment values exposed by the backend API.
 */
export type BusinessType = "B2B" | "B2C";

/**
 * Allowed metric category values exposed by the backend API.
 */
export type MetricCategory =
  | "suppliers"
  | "sales"
  | "operational"
  | "administrative"
  | "others";

/**
 * Allowed grouping values exposed by the alerts endpoint.
 */
export type AlertGroupBy = "day" | "week" | "month";

/**
 * Shared optional date filter for endpoints that accept a closed date range.
 */
export interface DateRangeFilter {
  /**
   * Inclusive range start as a string in YYYY-MM-DD format.
   */
  start_date?: string;

  /**
   * Inclusive range end as a string in YYYY-MM-DD format.
   */
  end_date?: string;
}

/**
 * Query parameters accepted by GET /api/metrics.
 *
 * The real API does not accept business_type on this endpoint.
 */
export interface MetricsParams extends DateRangeFilter {
  /**
   * Optional category filter using one of the backend enum values.
   */
  category?: MetricCategory;

  /**
   * Optional operation type filter using one of the backend enum values.
   */
  operation_type?: OperationType;
}

/**
 * Query parameters accepted by GET /api/metrics/alerts.
 */
export interface AlertsParams extends DateRangeFilter {
  /**
   * Decimal ratio threshold used by the API to flag anomalies.
   *
   * Backend contract: minimum 0, default 0.3.
   * Product/UI constraint for future implementation: validate 0.01 to 1.0 before sending.
   */
  threshold?: number;

  /**
   * Period grouping used by the backend when evaluating anomalies.
   */
  group_by?: AlertGroupBy;

  /**
   * Optional business segment filter accepted by the alerts endpoint.
   */
  business_type?: BusinessType;
}

/**
 * Query parameters accepted by GET /api/metrics/categories/top.
 */
export interface TopCategoriesParams extends DateRangeFilter {
  /**
   * Operation type whose top categories should be ranked.
   */
  operation_type?: OperationType;

  /**
   * Maximum number of ranked categories returned by the API.
   *
   * Backend contract: default 5, minimum 1, maximum 20.
   * Product rule for the B2B vs B2C comparison view: use 5.
   */
  limit?: number;

  /**
   * Optional business segment filter accepted by the top categories endpoint.
   */
  business_type?: BusinessType;
}