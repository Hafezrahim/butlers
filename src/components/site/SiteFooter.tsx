import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import { NAV_LINKS } from "./SiteHeader";
import { useI18n } from "@/i18n";

export function SiteFooter() {
  const { t, isAr } = useI18n();
  return (
    <footer className="ink-panel mt-24 border-t border-white/10">
      <div className="container-site grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="text-2xl">Butlers &amp; Co</h3>
          <div className="gold-rule my-4" />
          <p className="max-w-sm text-sm leading-relaxed text-white/65">
            {t(
              "A premium hospitality group crafting restaurants, nightlife, catering and consultancy experiences that guests remember.",
              "مجموعة ضيافة راقية تصنع تجارب مطاعم وسهرات وضيافة واستشارات يتذكرها الضيوف.",
            )}
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-xl border border-white/15 p-2.5 text-warm transition-colors hover:border-gold hover:text-gold">
              <Instagram className="size-4" />
            </a>
            <a href="#" aria-label="Facebook" className="rounded-xl border border-white/15 p-2.5 text-warm transition-colors hover:border-gold hover:text-gold">
              <Facebook className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow">{t("Explore", "استكشف")}</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {NAV_LINKS.slice(1).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-warm/80 transition-colors hover:text-gold">
                  {isAr ? l.labelAr : l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">{t("Contact", "تواصل معنا")}</p>
          <ul className="mt-5 space-y-3 text-sm text-warm/80">
            <li className="flex gap-2"><Phone className="size-4 text-gold" /> <a href="tel:+201007419344" className="hover:text-gold">+20 100 741 9344</a></li>
            <li className="flex gap-2"><Mail className="size-4 text-gold" /> hello@butlersandco.com</li>
            <li className="flex gap-2"><MapPin className="size-4 text-gold" /> {t("Downtown District, Cairo", "وسط البلد، القاهرة")}</li>
          </ul>
          <p className="mt-5 text-sm text-white/50">{t("Daily · 10:00 — 02:00", "يوميًا · ١٠:٠٠ — ٠٢:٠٠")}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Butlers &amp; Co. {t("All rights reserved.", "جميع الحقوق محفوظة.")}</p>
          <p>{t("Developed by Mr. Hafez Rahim", "تطوير: الأستاذ حافظ رحيم")}</p>
        </div>
      </div>
    </footer>
  );
}