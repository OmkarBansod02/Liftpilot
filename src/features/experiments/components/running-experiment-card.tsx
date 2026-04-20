import { CheckCircle2 } from "lucide-react";
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
import { cn } from "@/lib/utils";

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
  if (value === null) return "—";
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

function formatTargetArea(area: string): string {
  return area.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

type WinnerCopy = {
  label: string;
  caption: string;
};

function getWinnerCopy(
  winner: RunningExperimentSummary["recommendedWinner"],
  isCompleted: boolean,
): WinnerCopy {
  if (winner === "variant") {
    return {
      label: "Variant",
      caption: isCompleted
        ? "Variant was deployed as the new baseline."
        : "The variant is outperforming the baseline so far.",
    };
  }
  if (winner === "control") {
    return {
      label: "Control (baseline)",
      caption: isCompleted
        ? "Baseline was kept. Variant did not outperform."
        : "The baseline is holding up against the variant so far.",
    };
  }
  return {
    label: "Inconclusive — needs more data",
    caption: "Keep the test running to collect more sessions on both arms.",
  };
}

export function RunningExperimentCard({
  experiment,
  showDeployAction = false,
}: RunningExperimentCardProps) {
  const isCompleted = experiment.status === "completed";
  const winner = experiment.recommendedWinner;
  const winnerCopy = getWinnerCopy(winner, isCompleted);
  const controlHighlighted = winner === "control";
  const variantHighlighted = winner === "variant";

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>
              {formatTargetArea(experiment.variantTargetArea)} A/B test
            </CardTitle>
            <CardDescription>
              Comparing the generated variant against the current baseline on
              the demo page.
            </CardDescription>
          </div>
          <Badge variant={isCompleted ? "secondary" : "default"}>
            {isCompleted ? "Completed" : "Running"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border bg-muted/30 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Proposed variant
          </p>
          <p className="mt-1 text-sm font-semibold">
            {experiment.variantHeadline}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            CTA: {experiment.variantCtaLabel}
          </p>
        </div>

        <div className="mt-5 rounded-xl border p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Recommended winner
          </p>
          <p className="mt-1 text-2xl font-semibold">{winnerCopy.label}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {winnerCopy.caption}
          </p>

          <div className="mt-4 grid gap-4 border-t pt-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Relative lift
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums">
                {formatRelativeLift(experiment.lift.relativeLiftPercent)}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Variant vs. control conversion rate
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Absolute change
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums">
                {formatSignedPercentagePoints(
                  experiment.lift.absoluteDifference,
                )}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Difference in conversion rate
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Based on current traffic. This is a simple comparison, not a
            statistical significance test.
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div
            className={cn(
              "rounded-xl border p-4 transition-colors",
              controlHighlighted && "border-foreground/40 bg-muted/30",
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Control</h3>
              {controlHighlighted ? (
                <Badge variant="secondary">Recommended</Badge>
              ) : (
                <Badge variant="outline">Baseline</Badge>
              )}
            </div>
            <p className="mt-4 text-3xl font-bold tabular-nums">
              {formatPercent(experiment.arms.control.conversionRate)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {experiment.arms.control.conversions} conversions /{" "}
              {experiment.arms.control.sessions} sessions
            </p>
          </div>

          <div
            className={cn(
              "rounded-xl border p-4 transition-colors",
              variantHighlighted && "border-foreground/40 bg-muted/30",
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Variant</h3>
              {variantHighlighted ? (
                <Badge variant="secondary">Recommended</Badge>
              ) : (
                <Badge variant="outline">Challenger</Badge>
              )}
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
            <span className="font-medium text-foreground">
              {isCompleted ? "Completed:" : "Started:"}
            </span>{" "}
            {formatDate(
              isCompleted ? experiment.completedAt : experiment.startedAt,
            )}
          </p>
          <p>
            <span className="font-medium text-foreground">Split:</span> 50/50
            traffic
          </p>
        </div>

        {showDeployAction && !isCompleted && (
          <div className="mt-6 rounded-xl border bg-muted/20 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold">Ship the winner</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Promote the recommended winner to the new baseline and close
                  the loop.
                </p>
              </div>
              <DeployWinnerButton
                experimentId={experiment.id}
                recommendedWinner={experiment.recommendedWinner}
              />
            </div>
          </div>
        )}

        {isCompleted && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-foreground" />
            <div>
              <p className="text-sm font-semibold">Winner deployed</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {winner === "variant"
                  ? "The variant is now the baseline for this page."
                  : "The baseline was kept. The variant was not deployed."}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
