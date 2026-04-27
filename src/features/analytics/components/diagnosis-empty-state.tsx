import { BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { DashboardDiagnosis } from "@/features/analytics/types";

interface DiagnosisEmptyStateProps {
  diagnosis: DashboardDiagnosis;
}

export function DiagnosisEmptyState({ diagnosis }: DiagnosisEmptyStateProps) {
  return (
    <Card className="items-center gap-0 px-8 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <BarChart3 className="size-6" />
      </div>
      <h3 className="mt-5 text-base font-semibold">{diagnosis.title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {diagnosis.summary}
      </p>
      {diagnosis.supportingSignals.length > 0 && (
        <p className="mt-4 text-xs text-muted-foreground">
          {diagnosis.supportingSignals[0].label}:{" "}
          <span className="font-medium text-foreground">
            {diagnosis.supportingSignals[0].value}
          </span>
        </p>
      )}
    </Card>
  );
}
