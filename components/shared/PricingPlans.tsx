"use client";

import PlanCard from "./PlanCard";
import { Feature } from "@/types";

const freeFeatures: Feature[] = [
  { text: "Unlimited links", included: true },
  { text: "Basic themes", included: true },
  { text: "Social icons", included: true },
  { text: "Music embeds", included: true },
  { text: "Video embeds", included: true },
  { text: "Guestbook", included: true },
  { text: "Email collection", included: true },
  { text: "Basic analytics", included: true },
  { text: "Custom domains", included: false },
  { text: "Scheduling", included: false },
  { text: "Store", included: false },
  { text: "Discord presence", included: false },
  { text: "Priority support", included: false },
];

const proFeatures: Feature[] = [
  { text: "Unlimited links", included: true },
  { text: "Advanced themes", included: true },
  { text: "Social icons", included: true },
  { text: "Music & video embeds", included: true },
  { text: "Guestbook", included: true },
  { text: "Email collection", included: true },
  { text: "Advanced analytics", included: true },
  { text: "Custom domains", included: true },
  { text: "Scheduling", included: true },
  { text: "Store", included: true },
  { text: "Discord presence", included: true },
  { text: "Priority support", included: true },
  { text: "No Morena branding", included: true },
  { text: "API access", included: true },
];

const PricingPlans = () => {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto grid gap-8 md:grid-cols-2 max-w-3xl">
          <PlanCard
            title="Free"
            badge="🆓 Free forever"
            price="$0"
            description="Everything you need to get started"
            features={freeFeatures}
            active={true}
          />
          <PlanCard
            title="Pro"
            badge="🔒 Coming soon"
            price="$9/mo"
            description="Beta users get grandfathered pricing"
            features={proFeatures}
            active={false}
            locked={true}
          />
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
