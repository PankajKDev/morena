import { getDashboardData } from "@/lib/analytics";
import AnalyticsEmpty from "./AnalyticsEmpty";
import { AnalyticsStats } from "./AnalyticsStats";
import { ClicksChart } from "./ClicksChart";
import { TopLinks } from "./TopLinks";

async function AnalyticsWrapper({ userId }: { userId: string }) {
  const data = await getDashboardData(userId);
  if (!data) {
    return <AnalyticsEmpty />;
  }
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 space-y-6">
      <AnalyticsStats data={data} />
      {data.dailyClicks.length > 0 && (
        <ClicksChart dailyClicks={data.dailyClicks} />
      )}
      <TopLinks topLinks={data.topLinks} />
    </div>
  );
}

export default AnalyticsWrapper;
