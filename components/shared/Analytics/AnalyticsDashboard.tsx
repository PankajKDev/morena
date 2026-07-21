"use client";

import { useState, useMemo } from "react";
import { Monitor, Globe, Smartphone, MapPin } from "lucide-react";
import { AnalyticsStats } from "./AnalyticsStats";
import { ClicksChart } from "./ClicksChart";
import { TopLinks } from "./TopLinks";
import { BreakdownChart } from "./BreakdownChart";
import { PieChartModal } from "./PieChartModal";
import { PageSelector } from "./PageSelector";
import { computeDashboardData, computeBreakdown } from "@/lib/analytics-compute";
import type { PageInfo, AnalyticsEvent } from "@/lib/analytics-types";

function AnalyticsDashboard({
  pages,
  analytics,
}: {
  pages: PageInfo[];
  analytics: AnalyticsEvent[];
}) {
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [pieChart, setPieChart] = useState<{
    title: string;
    data: { name: string; value: number }[];
  } | null>(null);

  const filteredAnalytics = useMemo(
    () =>
      selectedPageId
        ? analytics.filter((e) => e.pageId === selectedPageId)
        : analytics,
    [analytics, selectedPageId],
  );

  const data = useMemo(
    () => computeDashboardData(pages, analytics, selectedPageId),
    [pages, analytics, selectedPageId],
  );

  const browserData = useMemo(
    () => computeBreakdown(filteredAnalytics, "browser"),
    [filteredAnalytics],
  );
  const osData = useMemo(
    () => computeBreakdown(filteredAnalytics, "operatingSystem"),
    [filteredAnalytics],
  );
  const platformData = useMemo(
    () => computeBreakdown(filteredAnalytics, "platform"),
    [filteredAnalytics],
  );
  const regionData = useMemo(
    () => computeBreakdown(filteredAnalytics, "region"),
    [filteredAnalytics],
  );

  const bestPageUrl = useMemo(() => {
    if (!data.bestPage) return undefined;
    const page = pages.find((p) => p.name === data.bestPage!.name);
    return page ? `/profile/${page.ownerUsername}/${page.pageUrl}` : undefined;
  }, [data.bestPage, pages]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 space-y-6">
      <PageSelector
        pages={pages}
        selectedPageId={selectedPageId}
        onChange={setSelectedPageId}
      />
      <AnalyticsStats data={data} bestPageUrl={bestPageUrl} />
      {data.dailyClicks.length > 0 && (
        <ClicksChart dailyClicks={data.dailyClicks} />
      )}
      <TopLinks topLinks={data.topLinks} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BreakdownChart
          title="Browser"
          icon={Monitor}
          data={browserData}
          onClick={() =>
            setPieChart({
              title: "Browser",
              data: browserData.map((d) => ({ name: d.name, value: d.value })),
            })
          }
        />
        <BreakdownChart
          title="Operating System"
          icon={Smartphone}
          data={osData}
          onClick={() =>
            setPieChart({
              title: "Operating System",
              data: osData.map((d) => ({ name: d.name, value: d.value })),
            })
          }
        />
        <BreakdownChart
          title="Platform"
          icon={Globe}
          data={platformData}
          onClick={() =>
            setPieChart({
              title: "Platform",
              data: platformData.map((d) => ({ name: d.name, value: d.value })),
            })
          }
        />
        <BreakdownChart
          title="Region"
          icon={MapPin}
          data={regionData}
          onClick={() =>
            setPieChart({
              title: "Region",
              data: regionData.map((d) => ({ name: d.name, value: d.value })),
            })
          }
        />
      </div>

      {pieChart && (
        <PieChartModal
          title={pieChart.title}
          data={pieChart.data}
          onClose={() => setPieChart(null)}
        />
      )}
    </div>
  );
}

export default AnalyticsDashboard;
