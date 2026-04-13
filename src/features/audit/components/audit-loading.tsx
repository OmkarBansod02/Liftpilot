"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { AUDIT_LOADING_STEPS } from "../lib/mock-audit-data";

interface AuditLoadingProps {
  onComplete: () => void;
}

export function AuditLoading({ onComplete }: AuditLoadingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = AUDIT_LOADING_STEPS.length;

  useEffect(() => {
    if (currentStep >= totalSteps) {
      const timeout = setTimeout(onComplete, 400);
      return () => clearTimeout(timeout);
    }

    const step = AUDIT_LOADING_STEPS[currentStep];
    const timeout = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, step.duration);

    return () => clearTimeout(timeout);
  }, [currentStep, totalSteps, onComplete]);

  const progressPercent =
    currentStep >= totalSteps ? 100 : (currentStep / totalSteps) * 100;

  return (
    <Card>
      <CardContent className="py-8">
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Analyzing page…</span>
              <span className="text-muted-foreground">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          <div className="space-y-3">
            {AUDIT_LOADING_STEPS.map((step, index) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="flex size-5 shrink-0 items-center justify-center">
                  {index < currentStep ? (
                    <Check className="size-4 text-primary" />
                  ) : index === currentStep ? (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  ) : (
                    <div className="size-1.5 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
                <span
                  className={
                    index < currentStep
                      ? "text-sm text-foreground"
                      : index === currentStep
                        ? "text-sm text-foreground"
                        : "text-sm text-muted-foreground"
                  }
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
