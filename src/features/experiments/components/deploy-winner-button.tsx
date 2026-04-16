"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ExperimentWinnerRecommendation } from "@/features/experiments/lib/calculate-experiment-results";

interface DeployWinnerButtonProps {
  experimentId: string;
  recommendedWinner: ExperimentWinnerRecommendation;
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
    <div className="flex flex-col items-start gap-2">
      <Button
        type="button"
        size="sm"
        disabled={!canDeploy || isDeploying}
        onClick={handleDeploy}
      >
        {isDeploying ? "Deploying..." : "Deploy winner"}
      </Button>
      {!canDeploy && (
        <p className="text-xs text-muted-foreground">
          Deployment is disabled until the result has a clear winner.
        </p>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
