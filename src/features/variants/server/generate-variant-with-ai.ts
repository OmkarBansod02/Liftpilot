import type { VariantGenerationContext } from "@/features/variants/types";
import { env } from "@/lib/env";

interface VariantAiPrompt {
  system: string;
  user: string;
}

function buildVariantAiPrompt(context: VariantGenerationContext): VariantAiPrompt {
  return {
    system:
      "Generate exactly one landing-page variant proposal as strict JSON. Do not include experiment setup, traffic splitting, deployment, or arbitrary page edits.",
    user: JSON.stringify(
      {
        baseline: context.baseline,
        diagnosis: {
          primaryBottleneck: context.diagnosis.primaryBottleneck,
          title: context.diagnosis.title,
          summary: context.diagnosis.summary,
          recommendedExperiment: context.diagnosis.recommendedExperiment,
        },
        metrics: {
          totalSessions: context.metrics.totalSessions,
          ctaClickThroughRate: context.metrics.ctaClickThroughRate,
          formStartRate: context.metrics.formStartRate,
          formSubmitRate: context.metrics.formSubmitRate,
          averageMaxScrollDepth:
            context.metrics.scrollDepth.averageMaxScrollDepth,
        },
        requiredFields: [
          "headline",
          "subheadline",
          "primaryCtaLabel",
          "trustProofRow",
          "rationale",
          "targetArea",
          "expectedImpact",
          "sourceDiagnosis",
          "source",
        ],
      },
      null,
      2,
    ),
  };
}

export async function generateVariantWithAi(
  context: VariantGenerationContext,
): Promise<unknown | null> {
  if (!env.OPENAI_API_KEY) {
    return null;
  }

  const prompt = buildVariantAiPrompt(context);
  void prompt;

  return null;
}
