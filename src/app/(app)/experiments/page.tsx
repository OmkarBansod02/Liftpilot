import { ArrowRight, FlaskConical } from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ensureDemoPage } from "@/features/demo/server/ensure-demo-page";
import { RunningExperimentCard } from "@/features/experiments/components/running-experiment-card";
import { getLatestPageExperiment } from "@/features/experiments/server/get-running-experiment-summary";

export const dynamic = "force-dynamic";

const FLOW_STEPS = [
  "System diagnoses a friction point",
  "One improved variant is generated",
  "You review and approve the change",
  "Traffic is split 50/50 between control and variant",
  "Results are compared and the winner can be deployed",
] as const;

export default async function ExperimentsPage() {
  const { pageId } = await ensureDemoPage();
  const experiment = await getLatestPageExperiment(pageId);
  const isRunning = experiment?.status === "running";

  return (
    <PageContainer>
      <PageHeader
        title="Experiments"
        description="Review, approve, and track A/B tests on your landing page."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {experiment ? (
          <RunningExperimentCard
            experiment={experiment}
            showDeployAction={isRunning}
          />
        ) : (
          <EmptyExperimentState />
        )}

        <Card>
          <CardHeader>
            <CardTitle>How it works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm text-muted-foreground">
              {FLOW_STEPS.map((step, index) => (
                <li key={index} className="flex gap-3 leading-relaxed">
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

function EmptyExperimentState() {
  return (
    <Card className="lg:col-span-2">
      <CardContent className="py-6">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
            <FlaskConical className="size-6 text-muted-foreground" />
          </div>
          <h3 className="mt-5 text-base font-semibold">
            No experiment yet
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Experiments appear here once a variant is approved from the
            dashboard. The system will split traffic, track conversions, and
            recommend a winner.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Go to dashboard
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
