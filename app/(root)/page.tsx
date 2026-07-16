import AnalyticsEmpty from "@/components/shared/AnalyticsEmpty";
import Features from "@/components/shared/Features";
import Hero from "@/components/shared/Hero";
import { Show } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Show when="signed-out">
        <Hero />
        <Features />
      </Show>
      <Show when="signed-in">
        <AnalyticsEmpty />
      </Show>
    </main>
  );
}
