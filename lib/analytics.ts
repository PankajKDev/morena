// SERVER-ONLY layer. Fetches data from cache + Prisma.
// Re-exports types + compute from the pure files so existing
// consumers (AnalyticsStats, TopLinks, getDashboardData)
// still work without updating their import paths.

import { prisma } from "@/lib/prisma";
import { getCachedPages } from "@/lib/data";
import { computeDashboardData } from "./analytics-compute";
import type { AnalyticsDashboardData, PageInfo, AnalyticsEvent } from "./analytics-types";

// Re-export types + compute for existing consumers
export type { AnalyticsDashboardData, PageInfo, AnalyticsEvent };
export { computeDashboardData };

export async function fetchAnalyticsData(userId: string) {
  const pages = await getCachedPages(userId);
  const analytics = await prisma.analytics.findMany({
    where: { page: { ownerId: userId } },
    include: { link: true },
  });

  return {
    pages: pages.map((p) => ({ id: p.id, name: p.linkPagename, ownerUsername: p.ownerUsername ?? "", pageUrl: p.pageUrl })),
    analytics: analytics.map((e) => ({
      id: e.id,
      linkId: e.linkId,
      pageId: e.pageId,
      createdAt: e.createdAt.toISOString(),
      browser: e.browser,
      operatingSystem: e.operatingSystem,
      platform: e.platform,
      region: e.region,
      link: { name: e.link.name, url: e.link.url },
    })),
  };
}

export async function getDashboardData(
  userId: string,
): Promise<AnalyticsDashboardData> {
  const { pages, analytics } = await fetchAnalyticsData(userId);
  return computeDashboardData(pages, analytics);
}
