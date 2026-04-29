import { demoContent } from "@/features/demo/lib/demo-content";
import { Zap, BarChart3, FlaskConical } from "lucide-react";

const icons = [Zap, BarChart3, FlaskConical];

export function DemoFeatures() {
  return (
    <section className="border-t bg-muted/40">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Everything you need to launch and learn
        </h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {demoContent.features.map((feature, i) => {
            const Icon = icons[i];
            return (
              <div
                key={feature.title}
                className="rounded-xl border bg-card p-6 text-center"
              >
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="mt-5 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
