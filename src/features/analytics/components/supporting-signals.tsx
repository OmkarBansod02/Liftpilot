import { Card } from "@/components/ui/card";
import type { DiagnosisSignal } from "@/features/analytics/types";

interface SupportingSignalsProps {
  signals: DiagnosisSignal[];
}

export function SupportingSignals({ signals }: SupportingSignalsProps) {
  if (signals.length === 0) return null;

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Supporting signals
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {signals.map((signal) => (
          <Card key={signal.label} className="gap-1.5 px-4 py-3.5">
            <p className="text-xs font-medium text-muted-foreground">
              {signal.label}
            </p>
            <p className="text-lg font-semibold tabular-nums leading-none">
              {signal.value}
            </p>
            <p className="text-xs leading-5 text-muted-foreground">
              {signal.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
