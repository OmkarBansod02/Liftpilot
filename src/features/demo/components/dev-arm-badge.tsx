import type { ExperimentArm } from "@/features/experiments/types";

interface DevArmBadgeProps {
  arm: ExperimentArm;
  forced?: boolean;
}

export function DevArmBadge({ arm, forced = false }: DevArmBadgeProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-md border bg-background/95 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
      <span className="text-muted-foreground">Arm:</span>{" "}
      <span className="font-semibold">
        {arm}
        {forced ? " (forced)" : ""}
      </span>
    </div>
  );
}
