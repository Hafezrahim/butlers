import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import { NAV_LINKS } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="ink-panel mt-24 border-t border-white/10">
      <div className="container-site grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="text-2xl">Butlers &amp; Co</h3>
          <div className="gold-rule my-4" />
          <p className="max-w-sm text-sm leading-relaxed text-white/65">
            A premium hospitality group crafting restaurants, nightlife, catering and
            consultancy experiences that guests remember.
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
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-2.5">
            {NAV_LINKS.slice(1).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-warm/80 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-5 space-y-3 text-sm text-warm/80">
            <li className="flex gap-2"><Phone className="size-4 text-gold" /> +20 100 000 0000</li>
            <li className="flex gap-2"><Mail className="size-4 text-gold" /> hello@butlersandco.com</li>
            <li className="flex gap-2"><MapPin className="size-4 text-gold" /> Downtown District, Cairo</li>
          </ul>
          <p className="mt-5 text-sm text-white/50">Daily · 10:00 — 02:00</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Butlers &amp; Co. All rights reserved.</p>
          <p>Developed by Mr. Hafez Rahim</p>
        </div>
      </div>
    </footer>
  );
}