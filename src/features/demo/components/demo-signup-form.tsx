"use client";

import { useState, useCallback } from "react";
import { useTracker } from "@/features/snippet/client/tracker-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoContent } from "@/features/demo/lib/demo-content";
import { CheckCircle2 } from "lucide-react";

interface DemoSignupFormProps {
  ctaLabel: string;
}

export function DemoSignupForm({ ctaLabel }: DemoSignupFormProps) {
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
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {demoContent.formHeadline}
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          {demoContent.formDescription}
        </p>

        {submitted ? (
          <div className="mt-10 flex flex-col items-center gap-3">
            <CheckCircle2 className="size-10 text-primary" />
            <p className="text-base font-semibold">You&apos;re on the list!</p>
            <p className="text-sm text-muted-foreground">
              We&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex gap-3">
            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleFocus}
              required
              className="h-11 flex-1 px-4 text-base"
            />
            <Button type="submit" className="h-11 px-5 text-base shadow-md">
              {ctaLabel}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
