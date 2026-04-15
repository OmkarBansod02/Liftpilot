import { getDashboardMetrics } from "@/features/analytics/server/get-dashboard-metrics";
import { buildDemoPageBaseline } from "@/features/variants/lib/build-demo-baseline";
import { generateFallbackVariant } from "@/features/variants/lib/generate-fallback-variant";
import { mapVariantRow } from "@/features/variants/lib/map-variant-row";
import { VariantError } from "@/features/variants/lib/variant-errors";
import {
  variantProposalSchema,
  type CreateVariantInput,
} from "@/features/variants/schemas/variant-input";
import type { VariantProposal } from "@/features/variants/types";
import { generateVariantWithAi } from "@/features/variants/server/generate-variant-with-ai";
import { db } from "@/lib/db";
import { pages, variants } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function assertPageExists(pageId: string): Promise<void> {
  const existingPage = await db
    .select({ id: pages.id })
    .from(pages)
    .where(eq(pages.id, pageId))
    .limit(1);

  if (existingPage.length === 0) {
    throw new VariantError(
      "page_not_found",
      "Cannot generate a variant for an unknown page.",
      404,
    );
  }
}

export async function generateVariantProposalForPage(
  input: CreateVariantInput,
): Promise<VariantProposal> {
  await assertPageExists(input.pageId);

  const metrics = await getDashboardMetrics(input.pageId);

  if (metrics.diagnosis.status !== "ready") {
    throw new VariantError(
      "diagnosis_not_ready",
      "Collect more behavior data before generating a variant.",
      409,
    );
  }

  const baseline = buildDemoPageBaseline();
  const context = {
    pageId: input.pageId,
    baseline,
    metrics,
    diagnosis: metrics.diagnosis,
  };

  const aiProposal = await generateVariantWithAi(context);
  const rawProposal =
    aiProposal ??
    generateFallbackVariant({ baseline, diagnosis: metrics.diagnosis });
  const parsedProposal = variantProposalSchema.safeParse(rawProposal);

  if (!parsedProposal.success) {
    throw new VariantError(
      "proposal_validation_failed",
      "Generated variant proposal did not match the required schema.",
      500,
    );
  }

  const { rationale, ...content } = parsedProposal.data;
  const [insertedVariant] = await db
    .insert(variants)
    .values({
      pageId: input.pageId,
      status: "pending_approval",
      content,
      rationale,
    })
    .returning();

  return mapVariantRow(insertedVariant);
}
