import { BarChart3 } from "lucide-react";
import type { DashboardDiagnosis } from "@/features/analytics/types";

interface DiagnosisEmptyStateProps {
  diagnosis: DashboardDiagnosis;
}

export function DiagnosisEmptyState({ diagnosis }: DiagnosisEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <BarChart3 className="size-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-sm font-semibold">{diagnosis.title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {diagnosis.summary}
      </p>
      {diagnosis.supportingSignals.length > 0 && (
        <p className="mt-3 text-xs text-muted-foreground">
          {diagnosis.supportingSignals[0].label}:{" "}
          <span className="font-medium">{diagnosis.supportingSignals[0].value}</span>
        </p>
      )}
    </div>
  );
}
