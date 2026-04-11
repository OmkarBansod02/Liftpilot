import { FlaskConical } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ExperimentsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Experiments"
        description="Review, approve, and track A/B tests on your landing page."
      >
        <Badge variant="secondary">Phase 1</Badge>
      </PageHeader>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Empty state */}
        <Card className="lg:col-span-2">
          <CardContent className="py-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
                <FlaskConical className="size-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold">No experiments yet</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Experiments are created after the system diagnoses a friction
                point and generates an improved variant for your approval.
              </p>
              <Button variant="outline" size="sm" className="mt-6" disabled>
                Create experiment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* How it works */}
        <Card>
          <CardHeader>
            <CardTitle>How experiments work</CardTitle>
            <CardDescription>The Liftpilot testing flow</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  1
                </span>
                System diagnoses a friction point
              </li>
              <li className="flex gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  2
                </span>
                One improved variant is generated
              </li>
              <li className="flex gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  3
                </span>
                You review and approve the change
              </li>
              <li className="flex gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  4
                </span>
                Traffic is split 50/50 for testing
              </li>
              <li className="flex gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  5
                </span>
                Deploy the winner
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
