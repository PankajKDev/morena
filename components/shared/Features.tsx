import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  Palette,
  Globe,
  CalendarClock,
  Puzzle,
  ShoppingBag,
  Users,
  Music,
  Video,
  Gamepad2,
  BookHeart,
  Mail,
} from "lucide-react";

interface Feature {
  title: string;
  icon: LucideIcon;
  span?: "col" | "row" | "both";
}

const features: Feature[] = [
  { title: "Themes", icon: Palette, span: "col" },
  { title: "Custom Domains", icon: Globe, span: "row" },
  { title: "Scheduling", icon: CalendarClock },
  { title: "Embeds", icon: Puzzle },
  { title: "Store", icon: ShoppingBag, span: "col" },
  { title: "Social Icons", icon: Users },
  { title: "Music", icon: Music },
  { title: "Videos", icon: Video },
  { title: "Discord Presence", icon: Gamepad2, span: "both" },
  { title: "Guestbook", icon: BookHeart },
  { title: "Email Collection", icon: Mail, span: "col" },
];

const FeatureCard = ({ title, icon: Icon, span }: Feature) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30",
        span === "col" && "sm:col-span-2",
        span === "row" && "sm:row-span-2",
        span === "both" && "sm:col-span-2 sm:row-span-2",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">
          <Icon className="size-5" strokeWidth={1.5} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-lg tracking-tight">{title}</h3>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
            <span>⚡ Everything you need</span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Packed with <span className="text-primary">dopamine</span> features
          </h2>
          <p className="max-w-xl text-muted-foreground text-lg">
            All the tools to flex your vibe across the web.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4 auto-rows-30 md:auto-rows-35">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
