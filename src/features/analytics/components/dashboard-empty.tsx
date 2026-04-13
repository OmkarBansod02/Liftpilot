import Link from "next/link";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Activity className="size-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-sm font-semibold">No data yet</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        Visit the demo landing page to start generating tracked events. The
        dashboard will update automatically.
      </p>
      <Button variant="outline" size="sm" className="mt-6" asChild>
        <Link href="/demo">Open demo page</Link>
      </Button>
    </div>
  );
}
