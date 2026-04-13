export type AuditStatus = "idle" | "loading" | "success" | "error";

export type AuditCategory =
  | "headline"
  | "cta"
  | "trust"
  | "layout"
  | "form"
  | "copy"
  | "performance";

export type FindingSeverity = "high" | "medium" | "low";

export interface PageMetadata {
  title: string;
  description: string | null;
  ogImage: string | null;
}

export interface AuditFinding {
  id: string;
  title: string;
  severity: FindingSeverity;
  category: AuditCategory;
  description: string;
}

export interface AuditIssue {
  id: string;
  title: string;
  severity: FindingSeverity;
  category: AuditCategory;
  description: string;
  conversionImpact: string;
}

export interface RecommendedExperiment {
  title: string;
  hypothesis: string;
  expectedImpact: string;
  changes: string[];
  rationale: string;
}

export interface AuditResult {
  id: string;
  url: string;
  screenshotUrl: string | null;
  pageMetadata: PageMetadata;
  overallScore: number;
  summary: string;
  findings: AuditFinding[];
  issues: AuditIssue[];
  recommendedExperiment: RecommendedExperiment;
  createdAt: Date;
}
