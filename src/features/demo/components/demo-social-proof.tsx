import { demoContent } from "@/features/demo/lib/demo-content";

const { socialProof } = demoContent;

export function DemoSocialProof() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="text-center">
        <p className="text-5xl font-extrabold tracking-tight text-primary">
          {socialProof.metric}
        </p>
        <p className="mt-2 text-sm font-medium text-muted-foreground">
          {socialProof.metricLabel}
        </p>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {socialProof.quotes.map((quote) => (
          <div
            key={quote.author}
            className="rounded-xl border border-l-4 border-l-primary/30 bg-card p-6"
          >
            <p className="text-sm leading-relaxed text-muted-foreground italic">
              &ldquo;{quote.text}&rdquo;
            </p>
            <div className="mt-4">
              <p className="text-sm font-semibold">{quote.author}</p>
              <p className="text-xs text-muted-foreground">{quote.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
