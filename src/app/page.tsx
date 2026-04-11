import Link from "next/link";
import { ArrowRight, Search, BarChart3, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";

const loopSteps = [
  { number: "1", label: "Audit", description: "Analyze your page for conversion issues" },
  { number: "2", label: "Observe", description: "Collect real visitor behavior signals" },
  { number: "3", label: "Diagnose", description: "Identify the most likely friction point" },
  { number: "4", label: "Generate", description: "Create one improved page variant" },
  { number: "5", label: "Approve", description: "Review and approve before going live" },
  { number: "6", label: "Test", description: "Run a simple A/B test on real traffic" },
  { number: "7", label: "Ship", description: "Deploy the winning version" },
] as const;

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        <span className="text-lg font-semibold tracking-tight">Liftpilot</span>
        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/audit">Audit</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-24 sm:pt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Landing pages that
              <br />
              improve themselves
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Liftpilot audits your page, collects real visitor signals, and
              generates a better variant — then tests it for you.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/audit">
                  <Search className="size-4" />
                  Run an Audit
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Core Loop */}
        <section className="border-t bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold tracking-tight">
                The self-improvement loop
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                A clear, measurable, human-approved feedback loop for your
                landing page.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {loopSteps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-xl border bg-card p-5"
                >
                  <div className="flex size-8 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
                    {step.number}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{step.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Surfaces */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              Two ways to start
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Get instant signal from a URL audit, or go deeper with
              snippet-powered optimization.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="rounded-xl border bg-card p-6">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <Search className="size-5 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold">URL Audit</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Paste a URL and get a fast conversion audit with prioritized
                issues and one recommended experiment.
              </p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/audit">
                  Try it
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <FlaskConical className="size-5 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold">Snippet Optimizer</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Install a lightweight snippet, collect behavior data, and let
                the system generate and test an improved variant.
              </p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/dashboard">
                  View dashboard
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 text-sm text-muted-foreground">
          <span>Liftpilot</span>
          <span>Phase 0 — Foundation</span>
        </div>
      </footer>
    </div>
  );
}
