export const dynamic = "force-dynamic";

import {
  Activity,
  Eye,
  MousePointerClick,
  FormInput,
  Send,
} from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { MetricCard } from "@/features/analytics/components/metric-card";
import { ConversionFunnel } from "@/features/analytics/components/conversion-funnel";
import { DashboardEmpty } from "@/features/analytics/components/dashboard-empty";
import { DiagnosisSection } from "@/features/analytics/components/diagnosis-section";
import { getDashboardMetrics } from "@/features/analytics/server/get-dashboard-metrics";
import { ensureDemoPage } from "@/features/demo/server/ensure-demo-page";
import { getDemoPageBaseline } from "@/features/demo/server/get-demo-page-baseline";
import { RunningExperimentCard } from "@/features/experiments/components/running-experiment-card";
import { getRunningExperimentSummary } from "@/features/experiments/server/get-running-experiment-summary";
import { VariantSection } from "@/features/variants/components/variant-section";
import { getLatestPendingVariant } from "@/features/variants/server/get-latest-pending-variant";
import { serializeVariantProposal } from "@/features/variants/types";

function formatPercent(value: number): string {
  const boundedValue = Math.min(Math.max(value, 0), 1);
  if (boundedValue === 0) return "0%";
  return `${(boundedValue * 100).toFixed(1)}%`;
}

function formatDepth(value: number): string {
  if (value === 0) return "0%";
  return `${Math.round(value)}%`;
}

export default async function DashboardPage() {
  const { pageId } = await ensureDemoPage();
  const [metrics, runningExperiment, baseline] = await Promise.all([
    getDashboardMetrics(pageId),
    getRunningExperimentSummary(pageId),
    getDemoPageBaseline(pageId),
  ]);
  const existingVariant = runningExperiment
    ? null
    : await getLatestPendingVariant({ pageId });

  const hasData = metrics.totalSessions > 0;
  const diagnosisReady = metrics.diagnosis.status === "ready";
  const serializedVariant = existingVariant
    ? serializeVariantProposal(existingVariant)
    : null;

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Monitor visitor behavior and track conversion performance."
      />

      {!hasData ? (
        <div className="mt-8">
          <DashboardEmpty />
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <MetricCard
              title="Sessions"
              value={metrics.totalSessions.toLocaleString()}
              description="Total tracked sessions"
              icon={Activity}
            />
            <MetricCard
              title="Page Views"
              value={metrics.totalPageViews.toLocaleString()}
              description="Total page view events"
              icon={Eye}
            />
            <MetricCard
              title="CTA Clicks"
              value={metrics.ctaClicks.toLocaleString()}
              description={`${formatPercent(metrics.ctaClickThroughRate)} of sessions clicked`}
              icon={MousePointerClick}
            />
            <MetricCard
              title="Form Starts"
              value={metrics.formStarts.toLocaleString()}
              description={`${formatPercent(metrics.formStartRate)} of sessions started`}
              icon={FormInput}
            />
            <MetricCard
              title="Form Submits"
              value={metrics.formSubmits.toLocaleString()}
              description={`${formatPercent(metrics.formSubmitRate)} of sessions submitted`}
              icon={Send}
            />
          </div>

          <div className="mt-8">
            <DiagnosisSection diagnosis={metrics.diagnosis} />
          </div>

          {runningExperiment && (
            <div className="mt-8">
              <RunningExperimentCard experiment={runningExperiment} />
            </div>
          )}

          {diagnosisReady && !runningExperiment && (
            <div className="mt-8">
              <VariantSection
                pageId={pageId}
                baseline={baseline}
                initialVariant={serializedVariant}
              />
            </div>
          )}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <ConversionFunnel metrics={metrics} />

            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(23,23,23,0.04)]">
                <h3 className="text-sm font-semibold">CTA Click-Through</h3>
                <p className="mt-2 text-3xl font-bold tabular-nums">
                  {formatPercent(metrics.ctaClickThroughRate)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Sessions with a CTA click / total sessions
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(23,23,23,0.04)]">
                <h3 className="text-sm font-semibold">Average Max Scroll</h3>
                <p className="mt-2 text-3xl font-bold tabular-nums">
                  {formatDepth(metrics.scrollDepth.averageMaxScrollDepth)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Deepest scroll milestone averaged across sessions
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(23,23,23,0.04)]">
                <h3 className="text-sm font-semibold">Form Submit Rate</h3>
                <p className="mt-2 text-3xl font-bold tabular-nums">
                  {formatPercent(metrics.formSubmitRate)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Sessions with a form submit / total sessions
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </PageContainer>
  );
}
