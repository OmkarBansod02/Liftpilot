import { demoContent } from "@/features/demo/lib/demo-content";

const { socialProof } = demoContent;

export function DemoSocialProof() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-center">
        <p className="text-4xl font-bold tracking-tight">{socialProof.metric}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {socialProof.metricLabel}
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {socialProof.quotes.map((quote) => (
          <div
            key={quote.author}
            className="rounded-xl border bg-card p-6"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">
              &ldquo;{quote.text}&rdquo;
            </p>
            <div className="mt-4">
              <p className="text-sm font-medium">{quote.author}</p>
              <p className="text-xs text-muted-foreground">{quote.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
