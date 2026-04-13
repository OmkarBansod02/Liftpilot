export interface DashboardMetrics {
  totalSessions: number;
  totalPageViews: number;
  ctaClicks: number;
  formStarts: number;
  formSubmits: number;
  ctaClickRate: number;
  formStartRate: number;
  formCompletionRate: number;
  conversionRate: number;
}

export interface DiagnosisSummary {
  frictionPoint: string;
  confidence: "high" | "medium" | "low";
  description: string;
  recommendedAction: string;
}
