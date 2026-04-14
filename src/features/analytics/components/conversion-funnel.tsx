import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DashboardMetrics } from "@/features/analytics/types";

interface FunnelStep {
  label: string;
  count: number;
  rate: string;
}

function buildFunnelSteps(metrics: DashboardMetrics): FunnelStep[] {
  return [
    {
      label: "Page Views",
      count: metrics.totalPageViews,
      rate: "100%",
    },
    {
      label: "CTA Clicks",
      count: metrics.ctaClicks,
      rate: formatPercent(metrics.ctaClickThroughRate),
    },
    {
      label: "Form Starts",
      count: metrics.formStarts,
      rate: formatPercent(metrics.formStartRate),
    },
    {
      label: "Form Submits",
      count: metrics.formSubmits,
      rate: formatPercent(metrics.formSubmitRate),
    },
  ];
}

function formatPercent(value: number): string {
  if (value === 0) return "0%";
  return `${(value * 100).toFixed(1)}%`;
}

interface ConversionFunnelProps {
  metrics: DashboardMetrics;
}

export function ConversionFunnel({ metrics }: ConversionFunnelProps) {
  const steps = buildFunnelSteps(metrics);
  const maxCount = Math.max(...steps.map((s) => s.count), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
        <CardDescription>
          How visitors move through the page
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((step) => {
            const width = Math.max((step.count / maxCount) * 100, 2);
            return (
              <div key={step.label}>
                <div className="mb-1 flex items-baseline justify-between text-sm">
                  <span className="font-medium">{step.label}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {step.count.toLocaleString()} · {step.rate}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
