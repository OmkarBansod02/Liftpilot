import { Search, ArrowRight, BarChart3, FlaskConical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Search,
    label: "Page screenshot & structure analysis",
  },
  {
    icon: BarChart3,
    label: "Prioritized conversion issues",
  },
  {
    icon: FlaskConical,
    label: "One recommended experiment",
  },
  {
    icon: ArrowRight,
    label: "Clear next steps to improve",
  },
] as const;

export function AuditEmpty() {
  return (
    <Card>
      <CardContent className="py-10">
        <div className="mx-auto max-w-sm text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-muted">
            <Search className="size-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-base font-semibold">
            Paste a URL to get started
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter any public landing page URL and get a conversion audit in
            seconds.
          </p>
          <div className="mt-6 space-y-3 text-left">
            {benefits.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <b.icon className="size-4 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
