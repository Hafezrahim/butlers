import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { TopBar } from "./TopBar";
import { useI18n } from "@/i18n";

export const NAV_LINKS = [
  { to: "/", label: "Home", labelAr: "الرئيسية" },
  { to: "/about", label: "About", labelAr: "من نحن" },
  { to: "/brands", label: "Brands", labelAr: "علاماتنا" },
  { to: "/services", label: "Services", labelAr: "خدماتنا" },
  { to: "/events", label: "Events", labelAr: "الفعاليات" },
  { to: "/gallery", label: "Gallery", labelAr: "معرض الصور" },
  { to: "/contact", label: "Contact", labelAr: "تواصل معنا" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t, isAr } = useI18n();

  return (
    <header className="sticky top-0 z-50 ink-panel border-b border-white/10 backdrop-blur">
      <TopBar />
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-wide">Butlers &amp; Co</span>
          <span className="eyebrow mt-1 text-[0.6rem]">{t("Premium Hospitality", "ضيافة استثنائية")}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-gold" }}
              className="font-button text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/75 transition-colors hover:text-gold"
            >
              {isAr ? l.labelAr : l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/reservation"
            className="hidden rounded-2xl bg-gold px-5 py-2.5 font-button text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-gold-soft sm:inline-flex"
          >
            {t("Reserve", "احجز الآن")}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={t("Toggle menu", "فتح القائمة")}
            className="rounded-xl border border-white/15 p-2 text-white lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 lg:hidden">
          <div className="container-site grid grid-cols-2 gap-1 py-4">
            {[...NAV_LINKS, { to: "/reservation", label: "Reservation", labelAr: "الحجز" } as const].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-gold" }}
                className="rounded-xl px-3 py-2 font-button text-sm uppercase tracking-wide text-white/80"
              >
                {isAr ? l.labelAr : l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}