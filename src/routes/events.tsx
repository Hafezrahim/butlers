import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { images, upcomingEvents } from "@/data/site";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Private Booking — Butlers & Co" },
      { name: "description", content: "Upcoming events, private bookings, wedding, corporate, birthday and VIP packages by Butlers & Co." },
      { property: "og:title", content: "Events & Private Booking — Butlers & Co" },
      { property: "og:description", content: "Weddings, corporate events, birthdays and VIP experiences." },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: Events,
});

const packages = [
  { name: "Wedding", nameAr: "الأفراح", desc: "Full production from ceremony to late-night bar, up to 400 guests.", descAr: "تنفيذ متكامل من حفل الزفاف حتى بار السهرة، لعدد يصل إلى 400 ضيف.", from: "From $12,000", fromAr: "يبدأ من 12,000 دولار" },
  { name: "Corporate", nameAr: "فعاليات الشركات", desc: "Conferences, launches and awards dinners with AV partners included.", descAr: "مؤتمرات وحفلات إطلاق وحفلات توزيع جوائز مع شركاء الصوت والصورة.", from: "From $8,000", fromAr: "يبدأ من 8,000 دولار" },
  { name: "Birthday", nameAr: "أعياد الميلاد", desc: "Private rooms, bespoke menus and a dedicated host for the night.", descAr: "غرف خاصة وقوائم طعام مخصصة ومضيف مخصص طوال الليلة.", from: "From $2,400", fromAr: "يبدأ من 2,400 دولار" },
  { name: "VIP", nameAr: "كبار الشخصيات", desc: "Buy-outs, bottle service and personal butler team on request.", descAr: "حجز كامل وخدمة زجاجات وفريق خدمة شخصي عند الطلب.", from: "On request", fromAr: "عند الطلب" },
];

const past = [
  { title: "Aurum Hotels Gala", titleAr: "حفل أوروم للفنادق", year: "2025" },
  { title: "City Fashion Week Afterparty", titleAr: "حفلة ما بعد أسبوع الموضة", year: "2025" },
  { title: "Maison Lux Product Launch", titleAr: "إطلاق منتج ميزون لوكس", year: "2024" },
];

function Events() {
  const { t, isAr } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("Events", "الفعاليات")}
        title={t("Occasions, produced properly", "مناسبات تُنفَّذ باحترافية")}
        description={t(
          "From a table of twelve to a thousand-guest gala, one team owns every detail.",
          "من طاولة اثني عشر ضيفًا إلى حفل لألف ضيف، فريق واحد يتولى كل التفاصيل.",
        )}
        image={images.events}
      />

      <section className="container-site py-24">
        <SectionHeading eyebrow={t("Upcoming", "قريبًا")} title={t("This season at our venues", "هذا الموسم في وجهاتنا")} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {upcomingEvents.map((e) => (
            <article key={e.title} className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-gold">
              <img src={e.image} alt={isAr ? e.titleAr : e.title} loading="lazy" className="h-48 w-full object-cover" />
              <div className="space-y-3 p-6">
                <p className="eyebrow">{isAr ? e.dateAr : e.date} · {isAr ? e.venueAr : e.venue}</p>
                <h3 className="text-xl">{isAr ? e.titleAr : e.title}</h3>
                <p className="text-sm text-muted-foreground">{isAr ? e.descAr : e.desc}</p>
                <Link to="/reservation" className="inline-flex font-button text-xs font-semibold uppercase tracking-[0.14em] text-secondary hover:text-gold">
                  {t("Reserve", "احجز الآن")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-site">
          <SectionHeading eyebrow={t("Private Booking", "الحجز الخاص")} title={t("Packages", "الباقات")} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((p) => (
              <div key={p.name} className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-gold">
                <h3 className="text-xl">{isAr ? p.nameAr : p.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{isAr ? p.descAr : p.desc}</p>
                <p className="mt-5 eyebrow">{isAr ? p.fromAr : p.from}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site grid gap-12 py-24 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow={t("Past Events", "فعاليات سابقة")} title={t("Selected productions", "أبرز التنظيمات")} align="left" />
          <ul className="mt-6 divide-y divide-border">
            {past.map((p) => (
              <li key={p.title} className="flex items-center justify-between py-4 text-sm">
                <span>{isAr ? p.titleAr : p.title}</span>
                <span className="text-muted-foreground">{p.year}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border p-8">
          <SectionHeading eyebrow={t("Booking Calendar", "تقويم الحجز")} title={t("Availability", "الأوقات المتاحة")} align="left" />
          <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs">
            {(isAr ? ["ن", "ث", "أ", "خ", "ج", "س", "ح"] : ["M", "T", "W", "T", "F", "S", "S"]).map((d, i) => (
              <span key={i} className="font-button uppercase text-muted-foreground">{d}</span>
            ))}
            {Array.from({ length: 30 }).map((_, i) => {
              const busy = [3, 8, 9, 15, 21, 22, 27].includes(i);
              return (
                <span
                  key={i}
                  className={`rounded-lg py-2 ${busy ? "bg-muted text-muted-foreground line-through" : "border border-border hover:border-gold"}`}
                >
                  {i + 1}
                </span>
              );
            })}
          </div>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-2xl bg-gold px-6 py-3 font-button text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-gold-soft"
          >
            {t("Request a Date", "اطلب موعدًا")}
          </Link>
        </div>
      </section>
    </>
  );
}
