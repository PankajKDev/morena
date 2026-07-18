import Hero from "@/components/shared/Hero";
import { Features } from "@/components/shared/Features";
import { About } from "@/components/shared/About";
import AnalyticsWrapper from "@/components/shared/AnalyticsWrapper";
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
