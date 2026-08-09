import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/site/PageHero";
import { ServiceGrid } from "@/components/site/ServiceGrid";
import { brands, images, stats, upcomingEvents, galleryItems } from "@/data/site";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Butlers & Co — Premium Hospitality Group" },
      {
        name: "description",
        content:
          "Restaurants, nightlife, mixology, catering and consultancy. Experience hospitality beyond expectations with Butlers & Co.",
      },
      { property: "og:title", content: "Butlers & Co — Premium Hospitality Group" },
      {
        property: "og:description",
        content: "Restaurants, nightlife, catering and consultancy by Butlers & Co.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const experiences = [
  { title: "Luxury Dining", titleAr: "تجربة طعام فاخرة", image: images.food },
  { title: "Nightlife", titleAr: "سهرات الليل", image: images.nightlife },
  { title: "Private Events", titleAr: "المناسبات الخاصة", image: images.events },
  { title: "Corporate Events", titleAr: "فعاليات الشركات", image: images.staff },
  { title: "Cocktail Experiences", titleAr: "تجارب المشروبات", image: images.cocktails },
];

const partners = [
  { name: "Aurum Hotels", nameAr: "فنادق أوروم" },
  { name: "Maison Lux", nameAr: "ميزون لوكس" },
  { name: "Northline Group", nameAr: "مجموعة نورث لاين" },
  { name: "Caspia Resorts", nameAr: "منتجعات كاسبيا" },
  { name: "Verde Events", nameAr: "فيردي للفعاليات" },
  { name: "Atlas Corporate", nameAr: "أطلس للشركات" },
];

const testimonials = [
  { name: "Layla H.", nameAr: "ليلى ح.", text: "The most polished service in the city. Every detail, from the greeting to the last pour, felt intentional.", textAr: "أرقى خدمة في المدينة. كل تفصيلة، من الاستقبال حتى آخر كأس، مدروسة بعناية." },
  { name: "Omar S.", nameAr: "عمر س.", text: "They produced our corporate gala for 400 guests and it ran flawlessly. A genuine partner, not a vendor.", textAr: "نظّموا حفل شركتنا لأربعمائة ضيف وسار كل شيء بلا أي خلل. شريك حقيقي وليس مجرد مورّد." },
  { name: "Nadia F.", nameAr: "نادية ف.", text: "Velour's cocktail programme is world class. We now bring every visiting client there.", textAr: "قائمة مشروبات فيلور بمستوى عالمي. صرنا نصطحب كل عميل زائر إلى هناك." },
];

function Index() {
  const { t, isAr } = useI18n();
  return (
    <>
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <img
          src={images.hero}
          alt={t("Butlers & Co fine dining room at night", "قاعة الطعام الفاخرة في باتلرز آند كو ليلًا")}
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[oklch(0.15_0_0)]/70" />
        <div className="container-site relative flex min-h-[88vh] flex-col items-center justify-center py-28 text-center">
          <p className="eyebrow reveal">Butlers &amp; Co</p>
          <h1 className="reveal mt-5 max-w-4xl text-4xl leading-tight text-warm md:text-7xl">
            {t("Experience Hospitality Beyond Expectations", "تجربة ضيافة تفوق التوقعات")}
          </h1>
          <p className="reveal mt-6 font-button text-xs uppercase tracking-[0.28em] text-white/70 md:text-sm">
            {t("Restaurants • Nightlife • Catering • Consultancy", "مطاعم • سهرات • ضيافة • استشارات")}
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/reservation"
              className="rounded-2xl bg-gold px-7 py-3.5 font-button text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-gold-soft"
            >
              {t("Reserve Now", "احجز الآن")}
            </Link>
            <Link
              to="/brands"
              className="rounded-2xl border border-white/30 px-7 py-3.5 font-button text-xs font-semibold uppercase tracking-[0.14em] text-warm transition-colors hover:border-gold hover:text-gold"
            >
              {t("Explore Brands", "تصفح علاماتنا")}
            </Link>
            <button className="inline-flex items-center gap-2 rounded-2xl px-4 py-3.5 font-button text-xs font-semibold uppercase tracking-[0.14em] text-warm transition-colors hover:text-gold">
              <Play className="size-4" /> {t("Watch Video", "شاهد الفيديو")}
            </button>
          </div>
        </div>
      </section>

      <section className="ink-panel border-y border-white/10">
        <div className="container-site grid grid-cols-2 gap-8 py-14 md:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl text-gold md:text-4xl">{s.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/55">{isAr ? s.labelAr : s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site py-24">
        <SectionHeading
          eyebrow={t("Our Services", "خدماتنا")}
          title={t("Every discipline of modern hospitality", "كل تخصصات الضيافة الحديثة")}
          description={t(
            "From concept to opening night and every service thereafter, our teams operate venues that perform commercially and delight guests.",
            "من الفكرة حتى ليلة الافتتاح وكل خدمة بعدها، تدير فرقنا وجهات ناجحة تجاريًا وتُبهر الضيوف.",
          )}
        />
        <div className="mt-14">
          <ServiceGrid />
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-site">
          <SectionHeading eyebrow={t("Featured Brands", "علاماتنا المميزة")} title={t("Our houses", "بيوتنا")} align="left" />
          <div className="mt-12 space-y-6">
            {brands.map((b, i) => (
              <article
                key={b.name}
                className={`group grid overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-gold ${
                  i % 2 === 0 ? "md:grid-cols-[320px_1fr]" : "md:grid-cols-[1fr_320px]"
                }`}
              >
                <img
                  src={b.image}
                  alt={isAr ? b.nameAr : b.name}
                  loading="lazy"
                  className={`h-56 w-full object-cover md:h-full ${i % 2 === 0 ? "" : "md:order-2"}`}
                />
                <div className={`flex flex-col justify-center gap-3 p-8 ${i % 2 === 0 ? "" : "md:order-1"}`}>
                  <h3 className="text-2xl">{isAr ? b.nameAr : b.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {isAr ? b.cuisineAr : b.cuisine} · {isAr ? b.locationAr : b.location}
                  </p>
                  <ul className="mt-1 flex flex-wrap gap-2">
                    {(isAr ? b.tagsAr : b.tags).map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border bg-muted px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/brands"
                    className="mt-2 inline-flex w-fit items-center gap-2 font-button text-xs font-semibold uppercase tracking-[0.14em] text-secondary transition-colors group-hover:text-gold"
                  >
                    {t("Visit Brand", "زيارة العلامة")} <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-24">
        <SectionHeading eyebrow={t("Signature Experiences", "تجارب مميزة")} title={t("Moments engineered to be remembered", "لحظات مصمَّمة لتبقى في الذاكرة")} />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {experiences.map((e, i) => (
            <div
              key={e.title}
              className={`group relative isolate overflow-hidden rounded-2xl ${i < 2 ? "md:col-span-1 md:row-span-1" : ""}`}
            >
              <img
                src={e.image}
                alt={isAr ? e.titleAr : e.title}
                loading="lazy"
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[oklch(0.15_0_0)]/85 to-transparent" />
              <h3 className="absolute bottom-5 start-6 text-xl text-warm">{isAr ? e.titleAr : e.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="ink-panel py-24">
        <div className="container-site">
          <p className="eyebrow">{t("Upcoming Events", "الفعاليات القادمة")}</p>
          <h2 className="mt-3 text-3xl text-warm md:text-4xl">{t("What's on this season", "أبرز فعاليات هذا الموسم")}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {upcomingEvents.map((e) => (
              <article key={e.title} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <img src={e.image} alt={isAr ? e.titleAr : e.title} loading="lazy" className="h-48 w-full object-cover" />
                <div className="space-y-3 p-6">
                  <p className="eyebrow">{isAr ? e.dateAr : e.date} · {isAr ? e.venueAr : e.venue}</p>
                  <h3 className="text-xl text-warm">{isAr ? e.titleAr : e.title}</h3>
                  <p className="text-sm text-white/60">{isAr ? e.descAr : e.desc}</p>
                  <Link
                    to="/reservation"
                    className="inline-flex items-center gap-2 font-button text-xs font-semibold uppercase tracking-[0.14em] text-gold"
                  >
                    {t("Reserve", "احجز")} <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-24">
        <SectionHeading eyebrow={t("Gallery", "معرض الصور")} title={t("Inside our venues", "من داخل وجهاتنا")} />
        <div className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {galleryItems.map((g) => (
            <img
              key={g.category}
              src={g.src}
              alt={isAr ? g.altAr : g.alt}
              loading="lazy"
              className="w-full rounded-2xl object-cover transition-opacity hover:opacity-90"
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 rounded-2xl border border-border px-6 py-3 font-button text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-gold hover:text-gold"
          >
            {t("View Full Gallery", "شاهد المعرض كاملًا")} <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-site">
          <SectionHeading eyebrow={t("Testimonials", "آراء الضيوف")} title={t("What our guests say", "ماذا يقول ضيوفنا")} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="rounded-2xl border border-border bg-card p-8">
                <Quote className="size-6 text-gold" />
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">{isAr ? item.textAr : item.text}</blockquote>
                <figcaption className="mt-6 flex items-center justify-between">
                  <span className="font-button text-xs font-semibold uppercase tracking-[0.14em]">{isAr ? item.nameAr : item.name}</span>
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-gold text-gold" />
                    ))}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-20">
        <p className="eyebrow text-center">{t("Partners", "شركاؤنا")}</p>
        <div className="marquee mt-8">
          <div className="marquee-track">
            {[...partners, ...partners].map((p, i) => (
              <span
                key={`${p.name}-${i}`}
                aria-hidden={i >= partners.length}
                className="shrink-0 px-8 font-display text-lg whitespace-nowrap text-muted-foreground/70 transition-colors hover:text-gold"
              >
                {isAr ? p.nameAr : p.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="ink-panel">
        <div className="container-site py-24 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl text-warm md:text-5xl">
            {t("Ready to create your next experience?", "جاهز لصناعة تجربتك القادمة؟")}
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/reservation"
              className="rounded-2xl bg-gold px-7 py-3.5 font-button text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-gold-soft"
            >
              {t("Reserve Table", "احجز طاولة")}
            </Link>
            <Link
              to="/events"
              className="rounded-2xl border border-white/30 px-7 py-3.5 font-button text-xs font-semibold uppercase tracking-[0.14em] text-warm transition-colors hover:border-gold hover:text-gold"
            >
              {t("Book Event", "احجز فعالية")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
