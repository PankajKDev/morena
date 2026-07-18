import { prisma } from "@/lib/prisma";

export interface AnalyticsDashboardData {
  totalClicks: number;
  totalPages: number;
  dailyClicks: { date: string; clicks: number }[];
  bestPage: { name: string; clicks: number } | null;
  topLinks: { name: string; url: string; pageName: string; clicks: number }[];
}

export async function getDashboardData(
  userId: string,
): Promise<AnalyticsDashboardData> {
  const pages = await prisma.pagelink.findMany({
    where: { ownerId: userId },
    include: {
      userlinks: true,
      analytics: true,
    },
  });

  let totalClicks = 0;
  for (const page of pages) {
    totalClicks += page.analytics.length;
  }

  const totalPages = pages.length;

  const dailyMap = new Map<string, number>();
  for (const page of pages) {
    for (const event of page.analytics) {
      const dateKey = event.createdAt.toISOString().slice(0, 10);
      dailyMap.set(dateKey, (dailyMap.get(dateKey) ?? 0) + 1);
    }
  }

  const dailyClicks = [...dailyMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, clicks]) => ({ date, clicks }));

  let bestPage: { name: string; clicks: number } | null = null;
  for (const page of pages) {
    const count = page.analytics.length;
    if (count > 0 && (!bestPage || count > bestPage.clicks)) {
      bestPage = { name: page.linkPagename, clicks: count };
    }
  }

  const linkClickMap = new Map<
    string,
    { name: string; url: string; pageName: string; clicks: number }
  >();

  for (const page of pages) {
    for (const link of page.userlinks) {
      const count = page.analytics.filter((e) => e.linkId === link.id).length;
      if (count > 0) {
        linkClickMap.set(link.id, {
          name: link.name,
          url: link.url,
          pageName: page.linkPagename,
          clicks: count,
        });
      }
    }
  }

  const topLinks = [...linkClickMap.values()]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10);

  return { totalClicks, totalPages, dailyClicks, bestPage, topLinks };
}
