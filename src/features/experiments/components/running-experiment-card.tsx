import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RunningExperimentSummary } from "@/features/experiments/server/get-running-experiment-summary";

interface RunningExperimentCardProps {
  experiment: RunningExperimentSummary;
  showPhase6Note?: boolean;
}

function formatPercent(value: number): string {
  if (value === 0) return "0%";
  return `${(Math.min(value, 1) * 100).toFixed(1)}%`;
}

function formatDate(value: Date | null): string {
  if (!value) return "Not started";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
}

function formatTargetArea(area: string): string {
  return area.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function RunningExperimentCard({
  experiment,
  showPhase6Note = false,
}: RunningExperimentCardProps) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>
              {formatTargetArea(experiment.variantTargetArea)} A/B Test
            </CardTitle>
            <CardDescription>
              Testing an improved variant against the baseline on the demo page.
            </CardDescription>
          </div>
          <Badge>Running</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border bg-muted/30 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variant
          </p>
          <p className="mt-1 text-sm font-semibold">
            {experiment.variantHeadline}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            CTA: {experiment.variantCtaLabel}
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Control</h3>
              <Badge variant="outline">control</Badge>
            </div>
            <p className="mt-4 text-3xl font-bold tabular-nums">
              {formatPercent(experiment.arms.control.conversionRate)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {experiment.arms.control.conversions} conversions /{" "}
              {experiment.arms.control.sessions} sessions
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Variant</h3>
              <Badge variant="outline">variant</Badge>
            </div>
            <p className="mt-4 text-3xl font-bold tabular-nums">
              {formatPercent(experiment.arms.variant.conversionRate)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {experiment.arms.variant.conversions} conversions /{" "}
              {experiment.arms.variant.sessions} sessions
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 border-t pt-4 text-xs text-muted-foreground sm:grid-cols-3">
          <p>
            <span className="font-medium text-foreground">Primary event:</span>{" "}
            {experiment.primaryConversionEvent}
          </p>
          <p>
            <span className="font-medium text-foreground">Started:</span>{" "}
            {formatDate(experiment.startedAt)}
          </p>
          <p>
            <span className="font-medium text-foreground">Split:</span> 50/50
            traffic
          </p>
        </div>

        {showPhase6Note && (
          <div className="mt-4 rounded-lg bg-muted/50 px-4 py-3 text-xs text-muted-foreground">
            Detailed results, statistical analysis, and winner deployment will
            be available in Phase 6.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
