import { CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ExperimentStartedCardProps {
  variantHeadline: string;
  primaryConversionEvent: string;
}

export function ExperimentStartedCard({
  variantHeadline,
  primaryConversionEvent,
}: ExperimentStartedCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <CheckCircle2 className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle>Experiment started</CardTitle>
              <CardDescription>
                Your A/B test is now live on the demo page.
              </CardDescription>
            </div>
          </div>
          <Badge>Running</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="flex items-baseline justify-between">
            <span className="text-muted-foreground">Variant</span>
            <span className="font-medium">{variantHeadline}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-muted-foreground">Split</span>
            <span className="font-medium">50 / 50</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-muted-foreground">Primary metric</span>
            <span className="font-medium">{primaryConversionEvent}</span>
          </div>
        </div>

        <div className="mt-5">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href="/experiments">
              View experiment details
              <ArrowRight className="size-3.5" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
