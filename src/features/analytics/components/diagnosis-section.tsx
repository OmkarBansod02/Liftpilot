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
    return (
      <section className="space-y-3">
        <SectionLabel>Diagnosis</SectionLabel>
        <DiagnosisEmptyState diagnosis={diagnosis} />
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <SectionLabel>Diagnosis</SectionLabel>
      <div className="space-y-4">
        <BottleneckCard diagnosis={diagnosis} />
        <SupportingSignals signals={diagnosis.supportingSignals} />
        <RecommendedExperimentCard experiment={diagnosis.recommendedExperiment} />
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
      <span className="h-4 w-0.5 rounded-full bg-primary/40" />
      {children}
    </h2>
  );
}
