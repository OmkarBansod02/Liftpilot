"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createAuditInputSchema } from "../schemas/audit-input";

interface AuditFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  defaultUrl?: string;
}

export function AuditForm({ onSubmit, isLoading, defaultUrl }: AuditFormProps) {
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const prefixed = url.match(/^https?:\/\//) ? url : `https://${url}`;
    const result = createAuditInputSchema.safeParse({ url: prefixed });

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Please enter a valid URL.");
      return;
    }

    setUrl(result.data.url);
    onSubmit(result.data.url);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError(null);
            }}
            disabled={isLoading}
            aria-invalid={!!error}
            className="h-10 pr-3 pl-3 text-sm"
          />
        </div>
        <Button type="submit" size="lg" disabled={isLoading || !url.trim()}>
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )}
          {isLoading ? "Auditing…" : "Run Audit"}
        </Button>
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </form>
  );
}
