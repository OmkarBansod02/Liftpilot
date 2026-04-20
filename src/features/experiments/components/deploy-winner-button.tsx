"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ExperimentWinnerRecommendation } from "@/features/experiments/lib/calculate-experiment-results";

interface DeployWinnerButtonProps {
  experimentId: string;
  recommendedWinner: ExperimentWinnerRecommendation;
}

function getDeployLabel(winner: ExperimentWinnerRecommendation): string {
  if (winner === "variant") return "Deploy variant as baseline";
  if (winner === "control") return "Keep control as baseline";
  return "Deploy winner";
}

export function DeployWinnerButton({
  experimentId,
  recommendedWinner,
}: DeployWinnerButtonProps) {
  const router = useRouter();
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canDeploy = recommendedWinner !== "inconclusive";

  async function handleDeploy() {
    if (!canDeploy || isDeploying) return;

    setError(null);
    setIsDeploying(true);

    try {
      const response = await fetch(`/api/experiments/${experimentId}/deploy`, {
        method: "POST",
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(body?.error ?? "Winner deployment failed.");
        return;
      }

      router.refresh();
    } finally {
      setIsDeploying(false);
    }
  }

  return (
    <div className="flex flex-col items-stretch gap-2 sm:items-end">
      <Button
        type="button"
        size="sm"
        className="gap-2"
        disabled={!canDeploy || isDeploying}
        onClick={handleDeploy}
      >
        {isDeploying ? "Deploying…" : getDeployLabel(recommendedWinner)}
        {canDeploy && !isDeploying && <ArrowRight className="size-3.5" />}
      </Button>
      {!canDeploy && (
        <p className="max-w-xs text-xs text-muted-foreground sm:text-right">
          Keep the test running to collect more data before picking a winner.
        </p>
      )}
      {error && (
        <p className="text-xs text-destructive sm:text-right">{error}</p>
      )}
    </div>
  );
}
