import Link from "next/link";
import {
  ArrowRight,
  Search,
  FlaskConical,
  Eye,
  Telescope,
  Activity,
  Stethoscope,
  Sparkles,
  ShieldCheck,
  SplitSquareHorizontal,
  Rocket,
  RotateCw,
  CircleDot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const loopSteps = [
  {
    number: "01",
    label: "Audit",
    description: "Analyze the page for likely conversion issues.",
    icon: Telescope,
  },
  {
    number: "02",
    label: "Observe",
    description: "Collect real visitor behavior signals.",
    icon: Activity,
  },
  {
    number: "03",
    label: "Diagnose",
    description: "Identify the most likely friction point.",
    icon: Stethoscope,
  },
  {
    number: "04",
    label: "Generate",
    description: "Draft one improved page variant.",
    icon: Sparkles,
  },
  {
    number: "05",
    label: "Approve",
    description: "Human review before anything ships.",
    icon: ShieldCheck,
  },
  {
    number: "06",
    label: "Test",
    description: "Run a clean 50/50 split on real traffic.",
    icon: SplitSquareHorizontal,
  },
  {
    number: "07",
    label: "Ship",
    description: "Promote the winner. Repeat the loop.",
    icon: Rocket,
  },
] as const;

const principles = [
  { label: "Deterministic core", icon: ShieldCheck },
  { label: "AI where it counts", icon: Sparkles },
  { label: "Human-approved", icon: Eye },
] as const;

const entryPoints = [
  {
    eyebrow: "Step 1",
    title: "Run a URL audit",
    description:
      "Paste a public URL. Get a fast conversion audit with prioritized issues and one recommended experiment.",
    href: "/audit",
    cta: "Start an audit",
    icon: Search,
  },
  {
    eyebrow: "See it live",
    title: "Visit the demo page",
    description:
      "A realistic tracked landing page. Your interactions are recorded and feed straight into the dashboard.",
    href: "/demo",
    cta: "Open demo page",
    icon: Eye,
  },
  {
    eyebrow: "Step 2",
    title: "Generate & test a variant",
    description:
      "Review behavior, approve a generated variant, run a clean A/B test, and deploy the winner.",
    href: "/experiments",
    cta: "View experiments",
    icon: FlaskConical,
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="size-2 rounded-full bg-primary shadow-[0_0_0_3px_var(--accent)]"
          />
          <span className="text-[15px] font-semibold tracking-tight">
            Liftpilot
          </span>
          <Badge
            variant="secondary"
            className="ml-1 h-[18px] px-1.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase"
          >
            MVP
          </Badge>
        </Link>
        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/audit">Audit</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/experiments">Experiments</Link>
          </Button>
          <Button size="sm" className="ml-1" asChild>
            <Link href="/audit">
              Run audit
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,var(--accent)_0%,transparent_70%)] opacity-80"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent"
          />

          <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-28">
            <div className="mx-auto max-w-2xl text-center">
              <Badge
                variant="secondary"
                className="h-7 rounded-full border-border bg-card/80 px-3 text-[12px] font-medium text-muted-foreground backdrop-blur"
              >
                <CircleDot className="size-3 text-primary" />
                Self-improving landing pages
              </Badge>

              <h1 className="mt-5 font-heading text-4xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-[56px]">
                Landing pages that{" "}
                <span className="text-primary">improve themselves.</span>
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                Liftpilot audits your page, watches real visitor behavior,
                and turns it into one approved experiment — then ships the
                winner.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-11 px-5 text-[15px] shadow-[0_1px_2px_rgba(189,86,34,0.25),0_8px_24px_-12px_rgba(189,86,34,0.45)]"
                  asChild
                >
                  <Link href="/audit">
                    <Search className="size-4" />
                    Run an Audit
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-11 px-4 text-[15px]"
                  asChild
                >
                  <Link href="/demo">See the live demo</Link>
                </Button>
              </div>

              <p className="mt-4 text-[12.5px] text-muted-foreground/90">
                No signup · Open MVP demo · ~30s to your first audit
              </p>
            </div>

            {/* Principles strip */}
            <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {principles.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center gap-2 text-[13px] text-muted-foreground"
                >
                  <span className="flex size-6 items-center justify-center rounded-full border border-border bg-card text-primary shadow-[0_1px_2px_rgba(23,23,23,0.04)]">
                    <p.icon className="size-3.5" />
                  </span>
                  <span className="font-medium text-foreground/80">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Loop */}
        <section className="border-t border-border bg-surface-muted">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Badge
                variant="accent"
                className="rounded-full px-2.5 text-[11px] tracking-wide uppercase"
              >
                The loop
              </Badge>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                One feedback loop.
                <span className="text-muted-foreground"> Repeated until your page wins.</span>
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                A clear, measurable, human-approved cycle. Behavior becomes a
                hypothesis. A hypothesis becomes a test. A test becomes a
                winner.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {loopSteps.map((step) => (
                <div
                  key={step.number}
                  className="group relative flex flex-col rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(23,23,23,0.04)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_24px_-12px_rgba(23,23,23,0.12)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-8 items-center justify-center rounded-md bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <step.icon className="size-4" />
                    </span>
                    <span className="font-mono text-[11px] tracking-wider text-muted-foreground/70">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold tracking-tight">
                    {step.label}
                  </h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}

              {/* Loop closer cell */}
              <div className="relative flex flex-col justify-between rounded-xl border border-dashed border-primary/40 bg-accent/40 p-5">
                <div className="flex items-center justify-between">
                  <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <RotateCw className="size-4" />
                  </span>
                  <span className="font-mono text-[11px] tracking-wider text-primary/80">
                    LOOP
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                    Then repeat
                  </h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                    Each cycle leaves you with a better baseline — and a
                    sharper next experiment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Entry-point cards */}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="accent"
              className="rounded-full px-2.5 text-[11px] tracking-wide uppercase"
            >
              Get started
            </Badge>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Three ways to see the loop in motion.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Start with an audit, watch the demo page collect real behavior,
              then approve and ship a variant.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {entryPoints.map((entry) => (
              <Link
                key={entry.href}
                href={entry.href}
                className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(23,23,23,0.04)] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_12px_32px_-16px_rgba(23,23,23,0.18)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <entry.icon className="size-5" />
                  </span>
                  <span className="rounded-full border border-border bg-surface-muted px-2 py-0.5 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                    {entry.eyebrow}
                  </span>
                </div>
                <h3 className="mt-5 text-[17px] font-semibold tracking-tight">
                  {entry.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-[13px] font-medium text-primary">
                  {entry.cta}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface-muted/60">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="size-2 rounded-full bg-primary shadow-[0_0_0_3px_var(--accent)]"
                />
                <span className="text-[15px] font-semibold tracking-tight">
                  Liftpilot
                </span>
              </Link>
              <p className="mt-3 max-w-xs text-[13.5px] leading-relaxed text-muted-foreground">
                A narrow, founder-ready wedge for self-improving landing
                pages.
              </p>
            </div>

            <div>
              <p className="text-[12px] font-semibold tracking-wider text-foreground/70 uppercase">
                Product
              </p>
              <ul className="mt-3 space-y-2 text-[13.5px]">
                <li>
                  <Link
                    href="/audit"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    URL Audit
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/demo"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Demo Page
                  </Link>
                </li>
                <li>
                  <Link
                    href="/experiments"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Experiments
                  </Link>
                </li>
              </ul>
            </div>

            <div className="sm:text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1 text-[12px] text-muted-foreground">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-success"
                />
                MVP demo · v0.1
              </div>
              <p className="mt-3 text-[13px] text-muted-foreground sm:ml-auto">
                Built for founders & growth engineers.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-[12.5px] text-muted-foreground sm:flex-row">
            <span>© {new Date().getFullYear()} Liftpilot</span>
            <span>Self-improving landing pages.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
