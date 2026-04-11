export interface AuditResult {
  id: string;
  url: string;
  screenshotUrl: string | null;
  summary: string;
  findings: AuditFinding[];
  recommendedExperiment: string | null;
  createdAt: Date;
}

export interface AuditFinding {
  severity: "high" | "medium" | "low";
  category: string;
  description: string;
}
