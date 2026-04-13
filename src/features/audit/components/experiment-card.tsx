import { FlaskConical, Lightbulb, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import type { RecommendedExperiment } from "../types";

interface ExperimentCardProps {
  experiment: RecommendedExperiment;
}

export function ExperimentCard({ experiment }: ExperimentCardProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-base font-semibold">Recommended Experiment</h2>
        <p className="text-sm text-muted-foreground">
          The highest-leverage test based on this audit
        </p>
      </div>
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FlaskConical className="size-4" />
            </div>
            <div className="flex-1">
              <CardTitle>{experiment.title}</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              <TrendingUp className="size-3" />
              {experiment.expectedImpact}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Hypothesis */}
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Hypothesis
            </p>
            <p className="text-sm leading-relaxed">{experiment.hypothesis}</p>
          </div>

          {/* Proposed changes */}
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Proposed Changes
            </p>
            <ul className="space-y-1.5">
              {experiment.changes.map((change) => (
                <li key={change} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{change}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-start gap-2">
            <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              {experiment.rationale}
            </p>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
