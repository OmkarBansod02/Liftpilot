export interface VariantProposal {
  id: string;
  baselinePageId: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  rationale: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}
