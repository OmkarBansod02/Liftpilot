import { Monitor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AuditScreenshotProps {
  screenshotUrl: string | null;
  url: string;
}

export function AuditScreenshot({ screenshotUrl, url }: AuditScreenshotProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {screenshotUrl ? (
          <img
            src={screenshotUrl}
            alt={`Screenshot of ${url}`}
            className="aspect-[16/10] w-full object-cover object-top"
          />
        ) : (
          <div className="flex aspect-[16/10] w-full flex-col items-center justify-center bg-muted/50">
            <Monitor className="size-10 text-muted-foreground/40" />
            <span className="mt-2 text-xs text-muted-foreground">
              Screenshot preview
            </span>
            <span className="mt-1 max-w-[200px] truncate text-xs text-muted-foreground/60">
              {url}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
