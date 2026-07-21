// PURE computation layer — ZERO server dependencies.
// Safe to import from client components. Never imports Prisma or pg.
// All analytics computations happen here, operating on plain objects.

import type { AnalyticsDashboardData, PageInfo, AnalyticsEvent } from "./analytics-types";

export function computeBreakdown(
  analytics: AnalyticsEvent[],
  key: "browser" | "operatingSystem" | "platform" | "region",
): { name: string; value: number; percentage: number }[] {
  const counts = new Map<string, number>();
  let total = 0;
  for (const event of analytics) {
    const val = event[key];
    if (!val) continue;
    counts.set(val, (counts.get(val) ?? 0) + 1);
    total++;
  }
  return [...counts.entries()]
    .map(([name, value]) => ({
      name,
      value,
      percentage: total > 0 ? Math.round((value / total) * 100) : 0,
    }))
    .sort((a, b) => b.value - a.value);
}

export function computeDashboardData(
  pages: PageInfo[],
  analytics: AnalyticsEvent[],
  pageId?: string | null,
): AnalyticsDashboardData {
  // Filter pages and analytics based on selected page
  const filteredPages = pageId
    ? pages.filter((p) => p.id === pageId)
    : pages;
  const pageIds = new Set(filteredPages.map((p) => p.id));
  const filteredAnalytics = pageId
    ? analytics.filter((e) => pageIds.has(e.pageId))
    : analytics;

  const totalPages = filteredPages.length;
  const totalClicks = filteredAnalytics.length;

  // Build a lookup map for page names (use all pages, not just filtered,
  // so top links can resolve names for any page that has events)
  const pageById = new Map(pages.map((p) => [p.id, p.name]));

  // Daily clicks histogram
  const dailyMap = new Map<string, number>();
  for (const event of filteredAnalytics) {
    const dateKey = event.createdAt.slice(0, 10);
    dailyMap.set(dateKey, (dailyMap.get(dateKey) ?? 0) + 1);
  }
  const dailyClicks = [...dailyMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, clicks]) => ({ date, clicks }));

  // Best performing page
  let bestPage: { name: string; clicks: number } | null = null;
  const pageClickCount = new Map<string, number>();
  for (const event of filteredAnalytics) {
    pageClickCount.set(
      event.pageId,
      (pageClickCount.get(event.pageId) ?? 0) + 1,
    );
  }
  for (const [pid, count] of pageClickCount) {
    const name = pageById.get(pid);
    if (name && (!bestPage || count > bestPage.clicks)) {
      bestPage = { name, clicks: count };
    }
  }

  // Top links ranked by clicks
  const linkClickMap = new Map<
    string,
    { name: string; url: string; pageName: string; clicks: number }
  >();
  for (const event of filteredAnalytics) {
    const pageName = pageById.get(event.pageId);
    if (!pageName) continue;
    const existing = linkClickMap.get(event.linkId);
    if (existing) {
      existing.clicks++;
    } else {
      linkClickMap.set(event.linkId, {
        name: event.link.name,
        url: event.link.url,
        pageName,
        clicks: 1,
      });
    }
  }
  const topLinks = [...linkClickMap.values()]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10);

  return { totalClicks, totalPages, dailyClicks, bestPage, topLinks };
}
