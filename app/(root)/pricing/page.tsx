import PricingHero from "@/components/shared/PricingHero";
import PricingPlans from "@/components/shared/PricingPlans";

function page() {
  return (
    <div className="flex flex-col">
      <PricingHero />
      <PricingPlans />
    </div>
  );
}

export default page;
