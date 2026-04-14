"use client";

import { useState, useCallback } from "react";
import { useTracker } from "@/features/snippet/client/tracker-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoContent } from "@/features/demo/lib/demo-content";
import { CheckCircle2 } from "lucide-react";

export function DemoSignupForm() {
  const { track } = useTracker();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  const handleFocus = useCallback(() => {
    if (formStarted) return;
    setFormStarted(true);
    track("form_start", { formId: "demo-signup", field: "email" });
  }, [formStarted, track]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;
      track("form_submit", { formId: "demo-signup" });
      setSubmitted(true);
    },
    [email, track],
  );

  return (
    <section id="signup" className="border-t bg-muted/40">
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          {demoContent.formHeadline}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {demoContent.formDescription}
        </p>

        {submitted ? (
          <div className="mt-8 flex flex-col items-center gap-2">
            <CheckCircle2 className="size-8 text-primary" />
            <p className="text-sm font-medium">You&apos;re on the list!</p>
            <p className="text-xs text-muted-foreground">
              We&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleFocus}
              required
              className="flex-1"
            />
            <Button type="submit">{demoContent.ctaLabel}</Button>
          </form>
        )}
      </div>
    </section>
  );
}
