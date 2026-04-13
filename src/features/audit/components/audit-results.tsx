import type { AuditResult } from "../types";
import { AuditScreenshot } from "./audit-screenshot";
import { AuditSummaryCard } from "./audit-summary-card";
import { FindingsGrid } from "./findings-grid";
import { IssueList } from "./issue-list";
import { ExperimentCard } from "./experiment-card";
import { NextStepsPanel } from "./next-steps-panel";

interface AuditResultsProps {
  result: AuditResult;
}

export function AuditResults({ result }: AuditResultsProps) {
  return (
    <div className="space-y-8">
      {/* Top row: screenshot + summary */}
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <AuditScreenshot
            screenshotUrl={result.screenshotUrl}
            url={result.url}
          />
        </div>
        <div className="lg:col-span-3">
          <AuditSummaryCard result={result} />
        </div>
      </div>

      {/* Key findings */}
      <FindingsGrid findings={result.findings} />

      {/* Prioritized issues with impact */}
      <IssueList issues={result.issues} />

      {/* Recommended experiment */}
      <ExperimentCard experiment={result.recommendedExperiment} />

      {/* Next steps CTA */}
      <NextStepsPanel />
    </div>
  );
}
