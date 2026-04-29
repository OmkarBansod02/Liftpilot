export const dynamic = "force-dynamic";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ensureDemoPage } from "@/features/demo/server/ensure-demo-page";
import { getDemoPageBaseline } from "@/features/demo/server/get-demo-page-baseline";
import { getDemoExperimentRuntime } from "@/features/demo/server/get-demo-experiment-runtime";
import { DemoPageClient } from "@/features/demo/components/demo-page-client";
import type { ExperimentArm } from "@/features/experiments/types";

interface DemoPageProps {
  searchParams?: Promise<{
    arm?: string | string[] | undefined;
  }>;
}

function parseForcedArm(
  value: string | string[] | undefined,
): ExperimentArm | null {
  const rawArm = Array.isArray(value) ? value[0] : value;

  if (rawArm !== "control" && rawArm !== "variant") return null;

  return rawArm;
}

export default async function DemoPage({ searchParams }: DemoPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const forcedArm =
    process.env.NODE_ENV === "development"
      ? parseForcedArm(params?.arm)
      : null;
  const { pageId } = await ensureDemoPage();
  const [baseline, experimentRuntime] = await Promise.all([
    getDemoPageBaseline(pageId),
    getDemoExperimentRuntime(pageId),
  ]);

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
          <span className="text-[15px] font-semibold tracking-tight">
            {baseline.brand}
          </span>
          <nav className="flex items-center gap-4">
            <Button size="sm" asChild>
              <a href="#signup">Get started</a>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <DemoPageClient
          pageId={pageId}
          baseline={baseline}
          experimentRuntime={experimentRuntime}
          forcedArm={forcedArm}
        />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 text-xs text-muted-foreground">
          <span>&copy; {baseline.brand}</span>
          <Link
            href="/dashboard"
            className="font-medium underline underline-offset-2 hover:text-foreground transition-colors"
          >
            View Liftpilot Dashboard &rarr;
          </Link>
        </div>
      </footer>
    </div>
  );
}
