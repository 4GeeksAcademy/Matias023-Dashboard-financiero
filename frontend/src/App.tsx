import { lazy, Suspense, useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { KPIRow } from "@/components/dashboard/kpi-row";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type FinancialMovement,
  type KPIMetrics,
  type MonthlyDataPoint,
} from "@/lib/financial-types";
import { computeKPIs, computeMonthlyData } from "@/lib/financial-utils";

const IncomeOutcomeChart = lazy(async () => {
  const module = await import("@/components/dashboard/income-outcome-chart");
  return { default: module.IncomeOutcomeChart };
});

const ProfitPercentChart = lazy(async () => {
  const module = await import("@/components/dashboard/profit-percent-chart");
  return { default: module.ProfitPercentChart };
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

function ChartLoadingFallback({ label }: { label: string }) {
  return (
    <Card
      className="border-border/60"
      role="status"
      aria-live="polite"
      aria-label={`Loading ${label}`}
    >
      <CardHeader className="pb-4">
        <Skeleton className="h-5 w-52" />
        <Skeleton className="mt-1 h-3 w-64" />
      </CardHeader>
      <CardContent>
        <span className="sr-only">Loading {label}</span>
        <Skeleton className="h-[280px] w-full rounded-lg" />
      </CardContent>
    </Card>
  );
}

async function fetchFinancialData(
  signal?: AbortSignal,
): Promise<FinancialMovement[]> {
  const response = await fetch(`${API_BASE_URL}/api/metrics`, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch financial data: ${response.status}`);
  }
  return response.json();
}

function App() {
  const [metrics, setMetrics] = useState<KPIMetrics | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchFinancialData(controller.signal)
      .then((movements) => {
        setMetrics(computeKPIs(movements));
        setMonthlyData(computeMonthlyData(movements));
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setError(
          "No se pudo cargar la informacion financiera. Revisa la API de backend.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main
      className="dark min-h-screen bg-background text-foreground"
      aria-busy={loading}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <DashboardHeader period="2024 - Full Year" />

          {loading ? (
            <p className="sr-only" role="status" aria-live="polite">
              Loading financial dashboard data.
            </p>
          ) : null}

          {error ? (
            <div
              className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive-foreground"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          ) : null}

          <section aria-label="Key performance indicators" aria-busy={loading}>
            <KPIRow metrics={metrics} loading={loading} />
          </section>

          <section
            aria-label="Financial charts"
            aria-busy={loading}
            className="grid grid-cols-1 gap-4 xl:grid-cols-2"
          >
            <Suspense
              fallback={<ChartLoadingFallback label="income versus outcome chart" />}
            >
              <IncomeOutcomeChart data={monthlyData} loading={loading} />
            </Suspense>
            <Suspense
              fallback={<ChartLoadingFallback label="profit margin chart" />}
            >
              <ProfitPercentChart data={monthlyData} loading={loading} />
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
