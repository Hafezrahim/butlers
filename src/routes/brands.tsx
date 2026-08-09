import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { brands, images } from "@/data/site";
import { useI18n } from "@/i18n";

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
  const { t, isAr } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("Our Brands", "علاماتنا")}
        title={t("A portfolio with a point of view", "محفظة ذات هوية مميزة")}
        description={t(
          "Each house has its own personality, kitchen and crowd — held together by one standard of service.",
          "لكل بيت شخصيته الخاصة ومطبخه وجمهوره — يجمعهم جميعًا معيار خدمة واحد."
        )}
        image={images.nightlife}
      />

      <section className="container-site py-24">
        <SectionHeading eyebrow={t("Portfolio", "المحفظة")} title={t("Where to find us", "أين تجدنا")} />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {brands.map((b) => (
            <article key={b.name} className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-gold">
              <img src={b.image} alt={isAr ? b.nameAr : b.name} loading="lazy" className="h-64 w-full object-cover" />
              <div className="space-y-4 p-8">
                <div>
                  <h3 className="text-2xl">{isAr ? b.nameAr : b.name}</h3>
                  <p className="eyebrow mt-2">{isAr ? b.cuisineAr : b.cuisine}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(
                    "A signature Butlers & Co destination with a seasonal menu, curated wine list and a room designed for long evenings.",
                    "وجهة مميزة من بتلرز آند كو بقائمة طعام موسمية، وقائمة نبيذ منتقاة بعناية، وأجواء مصممة لأمسيات طويلة."
                  )}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><MapPin className="size-4 text-secondary" /> {isAr ? b.locationAr : b.location}</li>
                  <li className="flex items-center gap-2"><Clock className="size-4 text-secondary" /> {t("Daily · 12:00 — 01:00", "يوميًا · 12:00 — 01:00")}</li>
                </ul>
                <ul className="flex flex-wrap gap-2">
                  {(isAr ? b.tagsAr : b.tags).map((tag) => (
                    <li key={tag} className="rounded-full border border-border bg-muted px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                      {tag}
                    </li>
                  ))}
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
                  {t("Reserve", "احجز الآن")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
