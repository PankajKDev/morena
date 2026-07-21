"use client";

import { Area, CartesianGrid, AreaChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const ClicksChart = ({
  dailyClicks,
}: {
  dailyClicks: { date: string; clicks: number }[];
}) => {
  const config = {
    clicks: {
      label: "Clicks",
      color: "hsl(var(--primary))",
    },
  };

  const total = dailyClicks.reduce((s, d) => s + d.clicks, 0);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Clicks over time</CardTitle>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <TrendingUp size={16} />
          <span>{total.toLocaleString()} total</span>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="w-full min-h-40">
          <AreaChart data={dailyClicks} accessibilityLayer margin={{ top: 4 }}>
            <defs>
              <linearGradient id="clicksFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-clicks)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--color-clicks)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(v: string) => v.slice(5)}
            />
            <YAxis
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              allowDecimals={false}
              width={32}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="clicks"
              type="monotone"
              stroke="var(--color-clicks)"
              strokeWidth={2.5}
              fill="url(#clicksFill)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "white" }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export { ClicksChart };
