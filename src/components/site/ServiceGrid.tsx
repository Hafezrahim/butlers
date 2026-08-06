import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChefHat,
  Disc3,
  GraduationCap,
  LineChart,
  Martini,
  PartyPopper,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/site";

const icons: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Disc3,
  Martini,
  ChefHat,
  LineChart,
  PartyPopper,
  GraduationCap,
  Sparkles,
};

export function ServiceGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => {
        const Icon = icons[s.icon] ?? Sparkles;
        return (
          <article
            key={s.slug}
            className="group rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold"
          >
            <Icon className="size-7 text-secondary" />
            <h3 className="mt-5 text-lg">{s.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            <Link
              to="/services"
              className="mt-5 inline-flex items-center gap-2 font-button text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-gold"
            >
              Learn More <ArrowRight className="size-4" />
            </Link>
          </article>
        );
      })}
    </div>
  );
}