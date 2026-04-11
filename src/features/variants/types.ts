export interface VariantProposal {
  id: string;
  baselinePageId: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  rationale: string;
  status: "draft" | "pending_approval" | "approved" | "rejected";
  createdAt: Date;
}
