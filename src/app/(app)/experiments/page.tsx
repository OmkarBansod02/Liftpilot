import { FlaskConical } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ensureDemoPage } from "@/features/demo/server/ensure-demo-page";
import { RunningExperimentCard } from "@/features/experiments/components/running-experiment-card";
import { getRunningExperimentSummary } from "@/features/experiments/server/get-running-experiment-summary";

export const dynamic = "force-dynamic";

const FLOW_STEPS = [
  "System diagnoses a friction point",
  "One improved variant is generated",
  "You review and approve the change",
  "Traffic is split 50/50 between control and variant",
  "Results are compared and the recommended winner can be deployed",
] as const;

export default async function ExperimentsPage() {
  const { pageId } = await ensureDemoPage();
  const runningExperiment = await getRunningExperimentSummary(pageId);

  return (
    <PageContainer>
      <PageHeader
        title="Experiments"
        description="Review, approve, and track A/B tests on your landing page."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {runningExperiment ? (
          <RunningExperimentCard
            experiment={runningExperiment}
            showDeployAction
          />
        ) : (
          <Card className="lg:col-span-2">
            <CardContent className="py-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
                  <FlaskConical className="size-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-semibold">No active experiment</h3>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  An experiment appears here after the system diagnoses a
                  friction point, generates an improved variant, and you
                  approve it from the dashboard.
                </p>
                <Button variant="outline" size="sm" className="mt-6" disabled>
                  Create experiment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>How experiments work</CardTitle>
            <CardDescription>The Liftpilot testing flow</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm text-muted-foreground">
              {FLOW_STEPS.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
