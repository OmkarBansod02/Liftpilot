import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  DashboardDiagnosis,
  DiagnosisConfidence,
} from "@/features/analytics/types";

interface DiagnosisCardProps {
  diagnosis: DashboardDiagnosis;
}

function formatConfidence(confidence: DiagnosisConfidence): string {
  return `${confidence[0].toUpperCase()}${confidence.slice(1)} confidence`;
}

export function DiagnosisCard({ diagnosis }: DiagnosisCardProps) {
  const statusLabel =
    diagnosis.status === "not_enough_data" ? "Needs more data" : "Ready";

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardDescription>Deterministic Diagnosis</CardDescription>
            <CardTitle className="mt-1">{diagnosis.title}</CardTitle>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={
                diagnosis.status === "not_enough_data" ? "outline" : "secondary"
              }
            >
              {statusLabel}
            </Badge>
            <Badge variant="outline">
              {formatConfidence(diagnosis.confidence)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          {diagnosis.summary}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {diagnosis.supportingSignals.map((signal) => (
            <div key={signal.label} className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs font-medium text-muted-foreground">
                {signal.label}
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums">
                {signal.value}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {signal.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg border bg-card p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold">
              {diagnosis.recommendedExperiment.title}
            </h3>
            <Badge variant="outline">
              {diagnosis.recommendedExperiment.targetArea}
            </Badge>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {diagnosis.recommendedExperiment.description}
          </p>
          <p className="mt-3 text-xs font-medium text-muted-foreground">
            Expected impact: {diagnosis.recommendedExperiment.expectedImpact}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
