import { fetchAnalyticsData } from "@/lib/analytics";
import AnalyticsEmpty from "./AnalyticsEmpty";
import AnalyticsDashboard from "./AnalyticsDashboard";

async function AnalyticsWrapper({ userId }: { userId: string }) {
  const { pages, analytics } = await fetchAnalyticsData(userId);

  if (pages.length === 0) {
    return <AnalyticsEmpty />;
  }

  return <AnalyticsDashboard pages={pages} analytics={analytics} />;
}

export default AnalyticsWrapper;
