export const dynamic = "force-dynamic";

import Link from "next/link";
import { ensureDemoPage } from "@/features/demo/server/ensure-demo-page";
import { DemoPageClient } from "@/features/demo/components/demo-page-client";
import { demoContent } from "@/features/demo/lib/demo-content";

export default async function DemoPage() {
  const { pageId } = await ensureDemoPage();

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
          <span className="text-lg font-semibold tracking-tight">
            {demoContent.brand}
          </span>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#signup" className="hover:text-foreground transition-colors">
              Get started
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <DemoPageClient pageId={pageId} />
      </main>

      <footer className="border-t">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 text-xs text-muted-foreground">
          <span>{demoContent.brand}</span>
          <Link
            href="/dashboard"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            View Liftpilot Dashboard &rarr;
          </Link>
        </div>
      </footer>
    </div>
  );
}
