import { getRunningExperimentForPage } from "@/features/experiments/server/get-running-experiment";
import type { ExperimentArm } from "@/features/experiments/types";
import { db } from "@/lib/db";
import { conversions, sessions } from "@/lib/db/schema";
import { count, countDistinct, eq } from "drizzle-orm";

interface ArmTotals {
  sessions: number;
  conversions: number;
  conversionRate: number;
}

export interface RunningExperimentSummary {
  id: string;
  pageId: string;
  variantId: string;
  status: "running";
  primaryConversionEvent: string;
  variantHeadline: string;
  variantCtaLabel: string;
  variantTargetArea: string;
  startedAt: Date | null;
  arms: Record<ExperimentArm, ArmTotals>;
}

function emptyArmTotals(): Record<ExperimentArm, ArmTotals> {
  return {
    control: { sessions: 0, conversions: 0, conversionRate: 0 },
    variant: { sessions: 0, conversions: 0, conversionRate: 0 },
  };
}

function calculateRate(conversionsTotal: number, sessionsTotal: number): number {
  if (sessionsTotal === 0) return 0;
  return Math.min(conversionsTotal / sessionsTotal, 1);
}

export async function getRunningExperimentSummary(
  pageId: string,
): Promise<RunningExperimentSummary | null> {
  const experiment = await getRunningExperimentForPage(pageId);

  if (!experiment) return null;

  const [sessionRows, conversionRows] = await Promise.all([
    db
      .select({
        arm: sessions.experimentArm,
        total: count(),
      })
      .from(sessions)
      .where(eq(sessions.experimentId, experiment.id))
      .groupBy(sessions.experimentArm),
    db
      .select({
        arm: conversions.arm,
        total: countDistinct(conversions.sessionId),
      })
      .from(conversions)
      .where(eq(conversions.experimentId, experiment.id))
      .groupBy(conversions.arm),
  ]);

  const arms = emptyArmTotals();

  for (const row of sessionRows) {
    if (row.arm === "control" || row.arm === "variant") {
      arms[row.arm].sessions = row.total;
    }
  }

  for (const row of conversionRows) {
    arms[row.arm].conversions = row.total;
  }

  arms.control.conversionRate = calculateRate(
    arms.control.conversions,
    arms.control.sessions,
  );
  arms.variant.conversionRate = calculateRate(
    arms.variant.conversions,
    arms.variant.sessions,
  );

  return {
    id: experiment.id,
    pageId: experiment.pageId,
    variantId: experiment.variantId,
    status: "running",
    primaryConversionEvent: experiment.primaryConversionEvent,
    variantHeadline: experiment.variant.headline,
    variantCtaLabel: experiment.variant.primaryCtaLabel,
    variantTargetArea: experiment.variant.targetArea,
    startedAt: experiment.startedAt,
    arms,
  };
}
