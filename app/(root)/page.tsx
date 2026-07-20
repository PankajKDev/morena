import { Hero, Features, About } from "@/components/shared/Home";
import { AnalyticsWrapper } from "@/components/shared/Analytics";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    return (
      <main className="flex flex-col">
        <AnalyticsWrapper userId={userId} />
      </main>
    );
  }
  return (
    <main className="flex flex-col">
      <Hero />
      <Features />
      <About />
    </main>
  );
}
