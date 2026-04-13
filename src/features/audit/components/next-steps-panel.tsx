import Link from "next/link";
import { ArrowRight, Plug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function NextStepsPanel() {
  return (
    <Card className="border-primary/20 bg-primary/[0.02]">
      <CardContent className="py-6">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Plug className="size-5 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-sm font-semibold">
              Validate with real traffic
            </h3>
            <p className="text-sm text-muted-foreground">
              Connect the Liftpilot snippet to your page to collect visitor
              behavior data and confirm these findings with real signals.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
