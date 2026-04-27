import { Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { RecommendedExperiment } from "@/features/analytics/types";

interface RecommendedExperimentCardProps {
  experiment: RecommendedExperiment;
}

function formatTargetArea(area: string): string {
  return area.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function RecommendedExperimentCard({
  experiment,
}: RecommendedExperimentCardProps) {
  return (
    <Card className="gap-0 border-accent-foreground/15 bg-accent/30 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Lightbulb className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Recommended Experiment
              </p>
              <Badge
                variant="secondary"
                className="bg-accent text-accent-foreground"
              >
                Suggested
              </Badge>
            </div>
            <h3 className="mt-1 text-base font-semibold leading-snug">
              {experiment.title}
            </h3>
          </div>
        </div>
        <Badge variant="outline" className="shrink-0">
          {formatTargetArea(experiment.targetArea)}
        </Badge>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {experiment.description}
      </p>

      <div className="mt-5 border-t border-accent-foreground/15 pt-4">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Expected impact:</span>{" "}
          {experiment.expectedImpact}
        </p>
      </div>
    </Card>
  );
}
