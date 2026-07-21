"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface BreakdownChartProps {
  title: string;
  icon: LucideIcon;
  data: { name: string; value: number; percentage: number }[];
  onClick?: () => void;
}

const BreakdownChart = ({ title, icon: Icon, data, onClick }: BreakdownChartProps) => {
  if (data.length === 0) return null;

  const maxValue = data[0]?.value ?? 1;

  return (
    <Card
      className={onClick ? "cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg" : undefined}
      onClick={onClick}
    >
      <CardHeader className="flex-row items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
          <Icon size={14} className="text-primary" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          {data.map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="truncate font-medium text-foreground">
                  {item.name}
                </span>
                <span className="shrink-0 tabular-nums text-muted-foreground">
                  {item.value.toLocaleString()}{" "}
                  <span className="text-xs">({item.percentage}%)</span>
                </span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { BreakdownChart };
