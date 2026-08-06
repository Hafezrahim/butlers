import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { galleryItems, images } from "@/data/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Butlers & Co Venues, Food & Nightlife" },
      { name: "description", content: "Photography from our restaurants, cocktail bars, events and kitchens across the Butlers & Co group." },
      { property: "og:title", content: "Gallery — Butlers & Co" },
      { property: "og:description", content: "Photography from our restaurants, bars and events." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

const filters = ["All", "Restaurants", "Cocktails", "Events", "Food", "Nightlife", "Staff"];

function Gallery() {
  const [active, setActive] = useState("All");
  const items = galleryItems.filter((g) => active === "All" || g.category === active);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Look inside"
        description="Rooms, plates, pours and the people behind them."
        image={images.cocktails}
      />

      <section className="container-site py-20">
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-2xl border px-5 py-2.5 font-button text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                active === f ? "border-gold bg-gold text-foreground" : "border-border text-muted-foreground hover:border-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {items.map((g) => (
            <figure key={g.category} className="group relative overflow-hidden rounded-2xl">
              <img src={g.src} alt={g.alt} loading="lazy" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <figcaption className="absolute bottom-0 w-full bg-linear-to-t from-[oklch(0.15_0_0)]/85 to-transparent p-5 font-button text-xs uppercase tracking-[0.14em] text-warm opacity-0 transition-opacity group-hover:opacity-100">
                {g.category}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}