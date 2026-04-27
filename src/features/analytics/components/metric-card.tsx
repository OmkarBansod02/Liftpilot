import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  emphasis?: "default" | "primary";
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  emphasis = "default",
}: MetricCardProps) {
  const isPrimary = emphasis === "primary";

  return (
    <Card className="gap-3 px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {title}
        </p>
        <span
          className={
            isPrimary
              ? "flex size-7 items-center justify-center rounded-md bg-accent text-accent-foreground"
              : "flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground"
          }
        >
          <Icon className="size-3.5" />
        </span>
      </div>
      <p className="text-[26px] font-semibold leading-none tabular-nums tracking-tight">
        {value}
      </p>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </Card>
  );
}
