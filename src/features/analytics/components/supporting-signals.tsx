import type { DiagnosisSignal } from "@/features/analytics/types";

interface SupportingSignalsProps {
  signals: DiagnosisSignal[];
}

export function SupportingSignals({ signals }: SupportingSignalsProps) {
  if (signals.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Supporting Signals
      </h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {signals.map((signal) => (
          <div
            key={signal.label}
            className="rounded-lg border bg-muted/30 p-3"
          >
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
    </div>
  );
}
