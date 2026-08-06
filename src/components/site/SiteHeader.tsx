import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/brands", label: "Brands" },
  { to: "/services", label: "Services" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/careers", label: "Careers" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 ink-panel border-b border-white/10 backdrop-blur">
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-wide">Butlers &amp; Co</span>
          <span className="eyebrow mt-1 text-[0.6rem]">Premium Hospitality</span>
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
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/reservation"
            className="hidden rounded-2xl bg-gold px-5 py-2.5 font-button text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-gold-soft sm:inline-flex"
          >
            Reserve
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-xl border border-white/15 p-2 text-white lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 lg:hidden">
          <div className="container-site grid grid-cols-2 gap-1 py-4">
            {[...NAV_LINKS, { to: "/reservation", label: "Reservation" } as const].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-gold" }}
                className="rounded-xl px-3 py-2 font-button text-sm uppercase tracking-wide text-white/80"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}