import type { DashboardDiagnosis } from "@/features/analytics/types";
import { BottleneckCard } from "@/features/analytics/components/bottleneck-card";
import { SupportingSignals } from "@/features/analytics/components/supporting-signals";
import { RecommendedExperimentCard } from "@/features/analytics/components/recommended-experiment-card";
import { DiagnosisEmptyState } from "@/features/analytics/components/diagnosis-empty-state";

interface DiagnosisSectionProps {
  diagnosis: DashboardDiagnosis;
}

export function DiagnosisSection({ diagnosis }: DiagnosisSectionProps) {
  if (diagnosis.status === "not_enough_data") {
    return <DiagnosisEmptyState diagnosis={diagnosis} />;
  }

  return (
    <div className="space-y-4">
      <BottleneckCard diagnosis={diagnosis} />
      <SupportingSignals signals={diagnosis.supportingSignals} />
      <RecommendedExperimentCard experiment={diagnosis.recommendedExperiment} />
    </div>
  );
}
