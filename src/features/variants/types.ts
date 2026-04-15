import type {
  DashboardDiagnosis,
  DashboardMetrics,
} from "@/features/analytics/types";
import type {
  VariantGenerationSource,
  VariantSourceDiagnosis,
  VariantTargetArea,
} from "@/features/variants/schemas/variant-input";

export type VariantStatus =
  | "draft"
  | "pending_approval"
  | "approved"
  | "rejected";

export interface DemoPageBaseline {
  brand: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  trustProofRow: string[];
  formHeadline: string;
  formDescription: string;
}

export interface VariantProposal {
  id: string;
  pageId: string;
  auditId: string | null;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  trustProofRow: string[];
  rationale: string;
  targetArea: VariantTargetArea;
  expectedImpact: string;
  sourceDiagnosis: VariantSourceDiagnosis;
  source: VariantGenerationSource;
  status: VariantStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface VariantGenerationContext {
  pageId: string;
  baseline: DemoPageBaseline;
  metrics: DashboardMetrics;
  diagnosis: DashboardDiagnosis;
}
