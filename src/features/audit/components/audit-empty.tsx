import {
  ArrowRight,
  BarChart3,
  Camera,
  FlaskConical,
  Search,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Camera,
    title: "Page screenshot & structure",
    description: "We render your page and extract real headings, CTAs, and trust signals.",
  },
  {
    icon: BarChart3,
    title: "Prioritized conversion issues",
    description: "Heuristic checks flag likely friction, ranked by probable impact.",
  },
  {
    icon: FlaskConical,
    title: "One recommended experiment",
    description: "A single, focused experiment with a hypothesis and rationale.",
  },
  {
    icon: ArrowRight,
    title: "Clear next step",
    description: "Send the experiment forward, or connect the snippet to validate.",
  },
] as const;

export function AuditEmpty() {
  return (
    <Card>
      <CardContent className="py-10">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-accent">
              <Search className="size-6 text-accent-foreground" />
            </div>
            <h3 className="mt-4 text-base font-semibold tracking-tight">
              Paste a URL to get started
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Enter any public landing page URL and get a structured conversion
              audit in seconds.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-surface-muted/60 p-3"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-card text-primary shadow-[0_1px_2px_rgba(23,23,23,0.04)]">
                  <b.icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-medium leading-snug">
                    {b.title}
                  </p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted-foreground">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
