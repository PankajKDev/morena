import { getDashboardData } from "@/lib/analytics";
import { currentUser } from "@clerk/nextjs/server";
import AnalyticsEmpty from "./AnalyticsEmpty";
import { AnalyticsStats } from "./AnalyticsStats";
import { ClicksChart } from "./ClicksChart";
import { TopLinks } from "./TopLinks";

async function AnalyticsWrapper() {
  const user = await currentUser();
  if (!user) {
    return (
      <div className="flex justify-center items-center">User not logged in</div>
    );
  }
  const data = await getDashboardData(user?.id);
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
