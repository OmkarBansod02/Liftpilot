export interface DashboardMetrics {
  totalSessions: number;
  totalPageViews: number;
  ctaClicks: number;
  formStarts: number;
  formSubmits: number;
  ctaClickThroughRate: number;
  formStartRate: number;
  formSubmitRate: number;
}

export interface DiagnosisSummary {
  frictionPoint: string;
  confidence: "high" | "medium" | "low";
  description: string;
  recommendedAction: string;
}
