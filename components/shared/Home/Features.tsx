import { Check } from "lucide-react";

const features = [
  "Custom link-in-bio profile pages",
  "Live preview while editing",
  "Custom themes — colors, fonts, backgrounds",
  "Background images with blur and opacity controls",
  "Custom avatar upload",
  "Audio / music integration with volume control",
  "Multiple links with individual styling",
  "Responsive profile cards",
  "Analytics dashboard",
];

const Features = () => {
  return (
    <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Features
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to build and share your link-in-bio page.
          </p>
        </div>

        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check size={20} className="text-primary shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export { Features };
