import { FlaskConical, Lightbulb, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RecommendedExperiment } from "../types";

interface ExperimentCardProps {
  experiment: RecommendedExperiment;
}

export function ExperimentCard({ experiment }: ExperimentCardProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight">
            Recommended experiment
          </h2>
          <p className="text-[13px] text-muted-foreground">
            The highest-leverage test based on this audit.
          </p>
        </div>
        <Badge
          variant="secondary"
          className="h-6 rounded-full border-border bg-card px-2.5 text-[11px] font-medium text-muted-foreground"
        >
          1 of 1
        </Badge>
      </div>

      <Card className="border-primary/30 shadow-[0_1px_2px_rgba(189,86,34,0.08),0_24px_48px_-32px_rgba(189,86,34,0.18)]">
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_1px_2px_rgba(189,86,34,0.25)]">
              <FlaskConical className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-[15px] font-semibold tracking-tight">
                {experiment.title}
              </CardTitle>
            </div>
            <Badge
              variant="secondary"
              className="h-6 gap-1 rounded-full border border-success/20 bg-success/10 px-2.5 text-[11px] font-medium text-success"
            >
              <TrendingUp className="size-3" />
              {experiment.expectedImpact}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              Hypothesis
            </p>
            <p className="text-[14px] leading-relaxed text-foreground/90">
              {experiment.hypothesis}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              Proposed changes
            </p>
            <ul className="space-y-2">
              {experiment.changes.map((change) => (
                <li
                  key={change}
                  className="flex items-start gap-2.5 rounded-md border border-border bg-surface-muted/60 px-3 py-2"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <span className="text-[13.5px] leading-relaxed text-foreground/90">
                    {change}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex items-start gap-2">
            <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                Rationale
              </p>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted-foreground">
                {experiment.rationale}
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
