import type { SerializedVariantProposal } from "@/features/variants/types";

export interface DemoExperimentRuntime {
  experimentId: string;
  variant: SerializedVariantProposal;
}
