import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DashboardEmpty() {
  return (
    <Card className="items-center gap-0 px-8 py-14 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Activity className="size-6" />
      </div>
      <h3 className="mt-5 text-base font-semibold">Waiting for traffic</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        Liftpilot will start surfacing diagnosis, recommendations, and a
        proposed variant as soon as your demo landing page records its first
        sessions.
      </p>
      <ul className="mt-5 space-y-1.5 text-xs text-muted-foreground">
        <li>1. Open the demo page and interact with the hero</li>
        <li>2. Trigger a CTA click or a form start</li>
        <li>3. Return here — the dashboard updates automatically</li>
      </ul>
      <Button size="sm" className="mt-6 gap-2" asChild>
        <Link href="/demo">
          Open demo page
          <ArrowRight className="size-3.5" />
        </Link>
      </Button>
    </Card>
  );
}
