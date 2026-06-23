import type {
  BusinessType,
  MetricCategory,
  OperationType,
} from "./param-types";

/**
 * Single movement item returned by GET /api/metrics.
 */
export interface MetricEntry {
  /**
   * Movement creation date as a string in YYYY-MM-DD format.
   */
  create_date: string;

  /**
   * Monetary amount represented as a number.
   */
  amount: number;

  /**
   * Movement operation type.
   */
  operation_type: OperationType;

  /**
   * Movement category.
   */
  category: MetricCategory;

  /**
   * Business segment associated with the movement.
   */
  business_type: BusinessType;
}

/**
 * Full response returned by GET /api/metrics.
 */
export type MetricsResponse = MetricEntry[];

/**
 * Facet payload returned by GET /api/metrics/facets.
 */
export interface FacetsResponse {
  /**
   * Available operation types exposed by the dataset.
   */
  operation_types: OperationType[];

  /**
   * Available business segments exposed by the dataset.
   */
  business_types: BusinessType[];

  /**
   * Available categories exposed by the dataset.
   */
  categories: MetricCategory[];

  /**
   * Earliest available movement date as a string in YYYY-MM-DD format.
   */
  min_date: string;

  /**
   * Latest available movement date as a string in YYYY-MM-DD format.
   */
  max_date: string;
}

/**
 * Single anomaly alert returned by GET /api/metrics/alerts.
 */
export interface AlertEntry {
  /**
   * Aggregated period identifier.
   *
   * Examples by grouping: YYYY-MM-DD for day, YYYY-Www for week, YYYY-MM for month.
   */
  period: string;

  /**
   * Total outcome amount for the flagged period as a number.
   */
  outcome_total: number;

  /**
   * Baseline average returned by the backend as a number.
   */
  baseline_average: number;

  /**
   * Increase ratio expressed as a decimal number, where 0.25 means 25%.
   */
  increase_ratio: number;
}

/**
 * Full response returned by GET /api/metrics/alerts.
 */
export type AlertsResponse = AlertEntry[];

/**
 * Single ranked category item returned by GET /api/metrics/categories/top.
 */
export interface CategoryEntry {
  /**
   * Ranked category name.
   */
  category: MetricCategory;

  /**
   * Operation type used to compute the ranking.
   */
  operation_type: OperationType;

  /**
   * Aggregated total amount for the category as a number.
   */
  total_amount: number;
}

/**
 * Full response returned by GET /api/metrics/categories/top.
 */
export type TopCategoriesResponse = CategoryEntry[];