import { Activity, MousePointerClick, ScrollText, FormInput } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const metricCards = [
  {
    title: "Sessions",
    value: "—",
    description: "Total tracked sessions",
    icon: Activity,
  },
  {
    title: "CTA Clicks",
    value: "—",
    description: "Click-through rate",
    icon: MousePointerClick,
  },
  {
    title: "Scroll Depth",
    value: "—",
    description: "Avg. scroll milestone",
    icon: ScrollText,
  },
  {
    title: "Form Starts",
    value: "—",
    description: "Form engagement rate",
    icon: FormInput,
  },
] as const;

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Monitor visitor behavior, diagnose friction, and track experiment performance."
      >
        <Badge variant="secondary">Phase 1</Badge>
      </PageHeader>

      {/* Metric cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((metric) => (
          <Card key={metric.title}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardDescription>{metric.title}</CardDescription>
                <metric.icon className="size-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl tabular-nums">
                {metric.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Diagnosis and recommendation */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Diagnosis</CardTitle>
            <CardDescription>
              Likely friction point based on visitor behavior
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-24 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              Install the snippet to start collecting data
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Experiment</CardTitle>
            <CardDescription>
              Suggested improvement based on diagnosis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-24 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              A recommendation will appear after diagnosis
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
