import { Search } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AuditPage() {
  return (
    <PageContainer>
      <PageHeader
        title="URL Audit"
        description="Paste a public URL to get a fast conversion audit with actionable findings."
      >
        <Badge variant="secondary">Phase 1</Badge>
      </PageHeader>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Input panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Analyze a landing page</CardTitle>
            <CardDescription>
              Enter a URL to capture a screenshot, extract page signals, and
              identify conversion issues.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="flex h-9 flex-1 items-center rounded-lg border bg-muted/50 px-3 text-sm text-muted-foreground">
                https://example.com
              </div>
              <Button disabled>
                <Search className="size-4" />
                Audit
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Audit functionality will be connected in Phase 1.
            </p>
          </CardContent>
        </Card>

        {/* Info panel */}
        <Card>
          <CardHeader>
            <CardTitle>What you&apos;ll get</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                Page screenshot
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                Key structure summary
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                Prioritized conversion issues
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                One recommended experiment
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
