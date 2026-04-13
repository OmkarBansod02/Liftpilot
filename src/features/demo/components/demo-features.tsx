import { demoContent } from "@/features/demo/lib/demo-content";
import { Zap, BarChart3, FlaskConical } from "lucide-react";

const icons = [Zap, BarChart3, FlaskConical];

export function DemoFeatures() {
  return (
    <section className="border-t bg-muted/40">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center text-2xl font-semibold tracking-tight">
          Everything you need to launch and learn
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {demoContent.features.map((feature, i) => {
            const Icon = icons[i];
            return (
              <div key={feature.title} className="text-center">
                <div className="mx-auto flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
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
