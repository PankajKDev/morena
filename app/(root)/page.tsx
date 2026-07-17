import AnalyticsEmpty from "@/components/shared/AnalyticsEmpty";
import Hero from "@/components/shared/Hero";
import { Show } from "@clerk/nextjs";
import { Features } from "@/components/shared/Features";
import { About } from "@/components/shared/About";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Show when="signed-out">
        <Hero />
        <Features />
        <About />
      </Show>
      <Show when="signed-in">
        <AnalyticsEmpty />
      </Show>
    </main>
  );
}
