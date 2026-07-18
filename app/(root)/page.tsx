import Hero from "@/components/shared/Hero";
import { Show } from "@clerk/nextjs";
import { Features } from "@/components/shared/Features";
import { About } from "@/components/shared/About";
import AnalyticsWrapper from "@/components/shared/AnalyticsWrapper";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Show when="signed-out">
        <Hero />
        <Features />
        <About />
      </Show>
      <Show when="signed-in">
        <AnalyticsWrapper />
      </Show>
    </main>
  );
}
