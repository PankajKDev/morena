import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MousePointerClick, Layout, Trophy, Zap } from "lucide-react";
import type { AnalyticsDashboardData } from "@/lib/analytics";

const cards = [
  {
    label: "Total clicks",
    getValue: (d: AnalyticsDashboardData) => d.totalClicks.toLocaleString(),
    icon: MousePointerClick,
    gradient: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-600",
  },
  {
    label: "Total pages",
    getValue: (d: AnalyticsDashboardData) => d.totalPages.toString(),
    icon: Layout,
    gradient: "from-violet-500/20 to-violet-600/5",
    iconColor: "text-violet-600",
  },
  {
    label: "Best page",
    getValue: (d: AnalyticsDashboardData) => d.bestPage?.name ?? "—",
    icon: Trophy,
    gradient: "from-amber-500/20 to-amber-600/5",
    iconColor: "text-amber-600",
  },
  {
    label: "Today",
    getValue: (d: AnalyticsDashboardData) =>
      d.dailyClicks.length > 0
        ? d.dailyClicks[d.dailyClicks.length - 1].clicks.toLocaleString()
        : "0",
    icon: Zap,
    gradient: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-emerald-600",
  },
];

const AnalyticsStats = ({
  data,
  bestPageUrl,
}: {
  data: AnalyticsDashboardData;
  bestPageUrl?: string;
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const href = card.label === "Total pages" ? "/userpages" : card.label === "Best page" ? bestPageUrl : undefined;
        const content = (
          <Card
            key={card.label}
            size="sm"
            className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${card.gradient}`}
            />
            <CardContent className="relative z-10 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {card.label}
                </span>
                <div
                  className={`size-8 rounded-lg flex items-center justify-center ${card.iconColor} bg-background/60`}
                >
                  <Icon size={16} />
                </div>
              </div>
              <p className="text-3xl font-extrabold tracking-tight">
                {card.getValue(data)}
              </p>
            </CardContent>
          </Card>
        );
        return href ? (
          <Link key={card.label} href={href}>
            {content}
          </Link>
        ) : (
          content
        );
      })}
    </div>
  );
};

export { AnalyticsStats };
