import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { RecommendedExperiment } from "@/features/analytics/types";

interface RecommendedExperimentCardProps {
  experiment: RecommendedExperiment;
}

export function RecommendedExperimentCard({
  experiment,
}: RecommendedExperimentCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6 ring-1 ring-foreground/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Recommended Experiment
          </p>
          <h3 className="mt-1 text-base font-semibold leading-snug">
            {experiment.title}
          </h3>
        </div>
        <Badge variant="outline">{experiment.targetArea}</Badge>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {experiment.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-4 border-t pt-4">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Expected impact:</span>{" "}
          {experiment.expectedImpact}
        </p>
        <Button variant="outline" size="sm" disabled className="shrink-0 gap-2">
          <Sparkles className="size-3.5" />
          Generate variant
        </Button>
      </div>
    </div>
  );
}
