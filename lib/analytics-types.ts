// Shared type definitions — no imports, no runtime code.
// Safe to import from both server and client components.

export interface AnalyticsDashboardData {
  totalClicks: number;
  totalPages: number;
  dailyClicks: { date: string; clicks: number }[];
  bestPage: { name: string; clicks: number } | null;
  topLinks: { name: string; url: string; pageName: string; clicks: number }[];
}

export interface PageInfo {
  id: string;
  name: string;
  ownerUsername: string;
  pageUrl: string;
}

export interface AnalyticsEvent {
  id: string;
  linkId: string;
  pageId: string;
  createdAt: string;
  browser: string | null;
  operatingSystem: string | null;
  platform: string | null;
  region: string | null;
  link: {
    name: string;
    url: string;
  };
}
