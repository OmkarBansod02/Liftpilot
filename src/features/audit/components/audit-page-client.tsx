"use client";

import { useCallback, useState } from "react";
import type { AuditResult, AuditStatus } from "../types";
import { MOCK_AUDIT_RESULT } from "../lib/mock-audit-data";
import { AuditForm } from "./audit-form";
import { AuditLoading } from "./audit-loading";
import { AuditResults } from "./audit-results";
import { AuditEmpty } from "./audit-empty";
import { AuditError } from "./audit-error";

export function AuditPageClient() {
  const [status, setStatus] = useState<AuditStatus>("idle");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [submittedUrl, setSubmittedUrl] = useState("");

  function handleSubmit(url: string) {
    setSubmittedUrl(url);
    setResult(null);
    setStatus("loading");
  }

  const handleLoadingComplete = useCallback(() => {
    setResult({ ...MOCK_AUDIT_RESULT, url: submittedUrl });
    setStatus("success");
  }, [submittedUrl]);

  function handleRetry() {
    setStatus("idle");
    setResult(null);
  }

  return (
    <div className="space-y-6">
      <AuditForm
        onSubmit={handleSubmit}
        isLoading={status === "loading"}
        defaultUrl={submittedUrl}
      />

      {status === "idle" && <AuditEmpty />}
      {status === "loading" && <AuditLoading onComplete={handleLoadingComplete} />}
      {status === "error" && <AuditError onRetry={handleRetry} />}
      {status === "success" && result && <AuditResults result={result} />}
    </div>
  );
}
