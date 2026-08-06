import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { brands, images } from "@/data/site";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Our Brands — Butlers & Co Restaurants & Bars" },
      { name: "description", content: "Explore the Butlers & Co portfolio: fine dining, cocktail lounges, nightlife and contemporary kitchens across the city." },
      { property: "og:title", content: "Our Brands — Butlers & Co" },
      { property: "og:description", content: "Restaurants, lounges and clubs in the Butlers & Co portfolio." },
      { property: "og:url", content: "/brands" },
    ],
    links: [{ rel: "canonical", href: "/brands" }],
  }),
  component: Brands,
});

function Brands() {
  return (
    <>
      <PageHero
        eyebrow="Our Brands"
        title="A portfolio with a point of view"
        description="Each house has its own personality, kitchen and crowd — held together by one standard of service."
        image={images.nightlife}
      />

      <section className="container-site py-24">
        <SectionHeading eyebrow="Portfolio" title="Where to find us" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {brands.map((b) => (
            <article key={b.name} className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-gold">
              <img src={b.image} alt={b.name} loading="lazy" className="h-64 w-full object-cover" />
              <div className="space-y-4 p-8">
                <div>
                  <h3 className="text-2xl">{b.name}</h3>
                  <p className="eyebrow mt-2">{b.cuisine}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  A signature Butlers &amp; Co destination with a seasonal menu, curated wine list and a
                  room designed for long evenings.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><MapPin className="size-4 text-secondary" /> {b.location}</li>
                  <li className="flex items-center gap-2"><Clock className="size-4 text-secondary" /> Daily · 12:00 — 01:00</li>
                </ul>
                <div className="aspect-[16/7] w-full overflow-hidden rounded-xl bg-muted">
                  <iframe
                    title={`Map of ${b.name}`}
                    className="size-full border-0"
                    loading="lazy"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(b.location)}&output=embed`}
                  />
                </div>
                <Link
                  to="/reservation"
                  className="inline-flex rounded-2xl bg-gold px-6 py-3 font-button text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-gold-soft"
                >
                  Reserve
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}