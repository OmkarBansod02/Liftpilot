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
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/features/analytics/components/metric-card";
import { ConversionFunnel } from "@/features/analytics/components/conversion-funnel";
import { DashboardEmpty } from "@/features/analytics/components/dashboard-empty";
import { getDashboardMetrics } from "@/features/analytics/server/get-dashboard-metrics";
import { ensureDemoPage } from "@/features/demo/server/ensure-demo-page";

function formatPercent(value: number): string {
  if (value === 0) return "0%";
  return `${(value * 100).toFixed(1)}%`;
}

export default async function DashboardPage() {
  const { pageId } = await ensureDemoPage();
  const metrics = await getDashboardMetrics(pageId);

  const hasData = metrics.totalSessions > 0;

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Monitor visitor behavior and track conversion performance."
      >
        <Badge variant="secondary">Phase 2</Badge>
      </PageHeader>

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
              description={`${formatPercent(metrics.ctaClickRate)} click-through`}
              icon={MousePointerClick}
            />
            <MetricCard
              title="Form Starts"
              value={metrics.formStarts.toLocaleString()}
              description={`${formatPercent(metrics.formStartRate)} engagement`}
              icon={FormInput}
            />
            <MetricCard
              title="Form Submits"
              value={metrics.formSubmits.toLocaleString()}
              description={`${formatPercent(metrics.conversionRate)} conversion`}
              icon={Send}
            />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <ConversionFunnel metrics={metrics} />

            <div className="flex flex-col gap-4">
              <div className="rounded-xl border bg-card p-6">
                <h3 className="text-sm font-semibold">Conversion Rate</h3>
                <p className="mt-2 text-3xl font-bold tabular-nums">
                  {formatPercent(metrics.conversionRate)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Form submits / total sessions
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="text-sm font-semibold">Form Completion</h3>
                <p className="mt-2 text-3xl font-bold tabular-nums">
                  {formatPercent(metrics.formCompletionRate)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Form submits / form starts
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </PageContainer>
  );
}
