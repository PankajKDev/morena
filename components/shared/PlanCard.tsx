import { Feature } from "@/types";
import { Check } from "lucide-react";

interface PlanCardProps {
  title: string;
  badge: string;
  price: string;
  description: string;
  features: Feature[];
  active: boolean;
  locked?: boolean;
}

const PlanCard = ({
  title,
  badge,
  price,
  description,
  features,
  active,
  locked,
}: PlanCardProps) => (
  <div
    className={`relative flex flex-col rounded-2xl border p-6 ${
      active
        ? "border-primary/40 bg-card shadow-md"
        : "border border-dashed border-muted-foreground/20 bg-card/50"
    }`}
  >
    {active && (
      <div className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
        Currently active
      </div>
    )}
    <div className="space-y-1 mb-6">
      <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary">
        {badge}
      </span>
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      <p className="text-3xl font-extrabold">{price}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>

    {locked && (
      <div className="mb-4 rounded-xl bg-muted/50 p-3 text-center text-xs text-muted-foreground">
        ⏳ Locked during open beta
      </div>
    )}

    <ul className="space-y-2.5">
      {features.map((f) => (
        <li key={f.text} className="flex items-center gap-3 text-sm">
          <span
            className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
              f.included
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground/40"
            }`}
          >
            <Check className="size-3.5" strokeWidth={2.5} />
          </span>
          <span
            className={
              f.included ? "" : "text-muted-foreground/50 line-through"
            }
          >
            {f.text}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default PlanCard;
