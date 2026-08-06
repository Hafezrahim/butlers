import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { images } from "@/data/site";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Press — Butlers & Co" },
      { name: "description", content: "Announcements, press releases and media coverage from the Butlers & Co hospitality group." },
      { property: "og:title", content: "News & Press — Butlers & Co" },
      { property: "og:description", content: "Announcements, press releases and media coverage." },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: News,
});

const posts = [
  {
    title: "Velour named Best Cocktail Bar of the Year",
    titleAr: "فيلور يُتوَّج بجائزة أفضل بار كوكتيل لهذا العام",
    date: "18 Jul 2026",
    dateAr: "١٨ يوليو ٢٠٢٦",
    tag: "Press",
    tagAr: "صحافة",
    image: images.cocktails,
    excerpt: "Our riverside lounge takes the top spot for its seasonal cocktail programme.",
    excerptAr: "صالتنا المطلة على النيل تتصدر الترتيب بفضل قائمة مشروباتها الموسمية.",
  },
  {
    title: "Butlers & Co opens its 20th venue",
    titleAr: "بتلرز آند كو تفتتح وجهتها العشرين",
    date: "02 Jun 2026",
    dateAr: "٢ يونيو ٢٠٢٦",
    tag: "Announcement",
    tagAr: "إعلان",
    image: images.hero,
    excerpt: "Maison Verte brings contemporary Levantine cooking to Garden City.",
    excerptAr: "ميزون فيرت يقدّم المطبخ الشامي المعاصر إلى جاردن سيتي.",
  },
  {
    title: "Inside our hospitality academy",
    titleAr: "نظرة داخل أكاديميتنا للضيافة",
    date: "11 Apr 2026",
    dateAr: "١١ أبريل ٢٠٢٦",
    tag: "Blog",
    tagAr: "مدونة",
    image: images.staff,
    excerpt: "How we train 120 new team members every year without losing our standards.",
    excerptAr: "كيف ندرّب 120 عضو فريق جديد سنويًا دون التنازل عن معاييرنا.",
  },
  {
    title: "Catering division doubles corporate portfolio",
    titleAr: "قسم خدمات الضيافة يضاعف محفظة عملاء الشركات",
    date: "27 Feb 2026",
    dateAr: "٢٧ فبراير ٢٠٢٦",
    tag: "Press Release",
    tagAr: "بيان صحفي",
    image: images.events,
    excerpt: "New partnerships with four multinational clients across the region.",
    excerptAr: "شراكات جديدة مع أربع شركات متعددة الجنسيات في المنطقة.",
  },
];

function News() {
  const { t, isAr } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("News", "الأخبار")}
        title={t("Latest from the group", "أحدث أخبار المجموعة")}
        description={t(
          "Openings, awards, press coverage and notes from our kitchens and bars.",
          "افتتاحات وجوائز وتغطيات صحفية وأخبار من مطابخنا وبارتنا.",
        )}
        image={images.food}
      />

      <section className="container-site py-24">
        <SectionHeading eyebrow={t("Newsroom", "غرفة الأخبار")} title={t("Recent stories", "أحدث الأخبار")} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <article key={p.title} className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-gold">
              <img src={p.image} alt={isAr ? p.titleAr : p.title} loading="lazy" className="h-56 w-full object-cover" />
              <div className="space-y-3 p-7">
                <p className="eyebrow">{isAr ? p.tagAr : p.tag} · {isAr ? p.dateAr : p.date}</p>
                <h3 className="text-xl">{isAr ? p.titleAr : p.title}</h3>
                <p className="text-sm text-muted-foreground">{isAr ? p.excerptAr : p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
