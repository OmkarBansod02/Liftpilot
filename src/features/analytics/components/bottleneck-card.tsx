import { AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type {
  DashboardDiagnosis,
  DiagnosisConfidence,
} from "@/features/analytics/types";

interface BottleneckCardProps {
  diagnosis: DashboardDiagnosis;
}

const confidenceConfig: Record<
  DiagnosisConfidence,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  high: { label: "High confidence", variant: "default" },
  medium: { label: "Medium confidence", variant: "secondary" },
  low: { label: "Low confidence", variant: "outline" },
};

function BottleneckIcon({ bottleneck }: { bottleneck: string }) {
  if (bottleneck === "healthy_funnel") {
    return <CheckCircle className="size-5 text-foreground/70" />;
  }
  if (bottleneck === "insufficient_data") {
    return <HelpCircle className="size-5 text-muted-foreground" />;
  }
  return <AlertTriangle className="size-5 text-foreground/70" />;
}

export function BottleneckCard({ diagnosis }: BottleneckCardProps) {
  const conf = confidenceConfig[diagnosis.confidence];

  return (
    <div className="rounded-xl border bg-card p-6 ring-1 ring-foreground/10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <BottleneckIcon bottleneck={diagnosis.primaryBottleneck} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Primary Bottleneck
            </p>
            <h2 className="mt-1 text-lg font-semibold leading-snug">
              {diagnosis.title}
            </h2>
          </div>
        </div>
        <Badge variant={conf.variant} className="shrink-0">
          {conf.label}
        </Badge>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {diagnosis.summary}
      </p>
    </div>
  );
}
