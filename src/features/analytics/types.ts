export interface PageMetrics {
  totalSessions: number;
  ctaClickRate: number;
  formStartRate: number;
  formCompletionRate: number;
  avgScrollDepth: number;
}

export interface DiagnosisSummary {
  frictionPoint: string;
  confidence: "high" | "medium" | "low";
  description: string;
  recommendedAction: string;
}
