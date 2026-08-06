import { Link } from "@tanstack/react-router";
import { Home, Wine, CalendarDays, Phone, CalendarCheck } from "lucide-react";
import { useI18n } from "@/i18n";

const items = [
  { to: "/", label: "Home", labelAr: "الرئيسية", icon: Home, exact: true },
  { to: "/brands", label: "Brands", labelAr: "علاماتنا", icon: Wine },
  { to: "/reservation", label: "Reserve", labelAr: "احجز", icon: CalendarCheck },
  { to: "/events", label: "Events", labelAr: "الفعاليات", icon: CalendarDays },
  { to: "/contact", label: "Contact", labelAr: "تواصل", icon: Phone },
] as const;

export function MobileNav() {
  const { isAr } = useI18n();
  return (
    <nav className="ink-panel fixed inset-x-0 bottom-0 z-50 border-t border-white/10 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <ul className="grid grid-cols-5">
        {items.map((i) => {
          const Icon = i.icon;
          return (
            <li key={i.to}>
              <Link
                to={i.to}
                activeOptions={{ exact: "exact" in i ? i.exact : false }}
                activeProps={{ className: "text-gold" }}
                className="flex flex-col items-center gap-1 py-2.5 text-white/70 transition-colors"
              >
                <Icon className="size-5 shrink-0" />
                <span className="font-button text-[0.6rem] font-semibold uppercase tracking-[0.1em]">
                  {isAr ? i.labelAr : i.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
