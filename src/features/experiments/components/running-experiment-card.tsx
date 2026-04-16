import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeployWinnerButton } from "@/features/experiments/components/deploy-winner-button";
import type { RunningExperimentSummary } from "@/features/experiments/server/get-running-experiment-summary";

interface RunningExperimentCardProps {
  experiment: RunningExperimentSummary;
  showDeployAction?: boolean;
}

function formatPercent(value: number): string {
  if (value === 0) return "0%";
  return `${(Math.min(value, 1) * 100).toFixed(1)}%`;
}

function formatSignedPercentagePoints(value: number): string {
  if (value === 0) return "0 pts";
  const sign = value > 0 ? "+" : "";
  return `${sign}${(value * 100).toFixed(1)} pts`;
}

function formatRelativeLift(value: number | null): string {
  if (value === null) return "Not available";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
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

function formatRecommendation(winner: RunningExperimentSummary["recommendedWinner"]) {
  if (winner === "inconclusive") return "Inconclusive";
  return winner === "variant" ? "Deploy variant" : "Keep control";
}

function formatTargetArea(area: string): string {
  return area.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function RunningExperimentCard({
  experiment,
  showDeployAction = false,
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

        <div className="mt-5 grid gap-4 rounded-xl border bg-muted/30 p-4 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Absolute lift
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {formatSignedPercentagePoints(experiment.lift.absoluteDifference)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Relative lift
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {formatRelativeLift(experiment.lift.relativeLiftPercent)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Recommendation
            </p>
            <p className="mt-1 text-lg font-semibold">
              {formatRecommendation(experiment.recommendedWinner)}
            </p>
          </div>
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

        {showDeployAction && (
          <div className="mt-5 border-t pt-4">
            <DeployWinnerButton
              experimentId={experiment.id}
              recommendedWinner={experiment.recommendedWinner}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
