import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BarChart3 } from "lucide-react";
import type { AnalyticsDashboardData } from "@/lib/analytics";

const TopLinks = ({ topLinks }: { topLinks: AnalyticsDashboardData["topLinks"] }) => {
  if (topLinks.length === 0) return null;

  const maxClicks = topLinks[0]?.clicks ?? 1;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Top links</CardTitle>
        <BarChart3 size={16} className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {topLinks.map((link, i) => {
            const rankColors = [
              "bg-amber-500 text-white",
              "bg-slate-400 text-white",
              "bg-orange-700 text-white",
            ];
            const rankColor = rankColors[i] ?? "bg-muted text-muted-foreground";

            return (
              <div
                key={link.url}
                className="group relative rounded-xl p-3 transition-all duration-200 hover:bg-muted/50"
              >
                <div className="flex items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`size-6 shrink-0 rounded-md text-[11px] font-bold flex items-center justify-center ${rankColor}`}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-sm font-semibold truncate leading-tight">
                        {link.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {link.pageName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-bold tabular-nums">
                      {link.clicks.toLocaleString()}
                    </span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
                <div
                  className="absolute bottom-0 left-0 h-0.5 rounded-full bg-primary/20 transition-all duration-500"
                  style={{ width: `${(link.clicks / maxClicks) * 100}%` }}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export { TopLinks };
