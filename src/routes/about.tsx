import { createFileRoute } from "@tanstack/react-router";
import { Award, Compass, HeartHandshake, Leaf } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { images } from "@/data/site";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Butlers & Co — Our Story & Leadership" },
      { name: "description", content: "Fifteen years of building hospitality brands: our story, mission, values, timeline, leadership team and awards." },
      { property: "og:title", content: "About Butlers & Co" },
      { property: "og:description", content: "Our story, mission, values, leadership and awards." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  { icon: HeartHandshake, title: "Guest First", titleAr: "الضيف أولاً", desc: "Every decision is measured against the guest experience.", descAr: "كل قرار نتخذه يُقاس بأثره على تجربة الضيف." },
  { icon: Compass, title: "Craft", titleAr: "الحِرفية", desc: "Discipline in the kitchen, behind the bar and on the floor.", descAr: "انضباط في المطبخ، خلف البار، وعلى أرض الصالة." },
  { icon: Leaf, title: "Responsibility", titleAr: "المسؤولية", desc: "Sustainable sourcing and fair workplaces across all venues.", descAr: "توريد مستدام وبيئة عمل عادلة في جميع منشآتنا." },
  { icon: Award, title: "Excellence", titleAr: "التميّز", desc: "We measure ourselves against the world's best operators.", descAr: "نقيس أنفسنا بمعايير أفضل المشغلين في العالم." },
];

const timeline = [
  { year: "2011", text: "Butlers & Co founded with a single 40-seat dining room.", textAr: "تأسست بتلرز آند كو بصالة طعام واحدة تتسع لأربعين ضيفًا." },
  { year: "2014", text: "Launch of our catering division for corporate clients.", textAr: "إطلاق قسم خدمات التموين لعملاء الشركات." },
  { year: "2017", text: "Velour opens, redefining the city's cocktail scene.", textAr: "افتتاح فيلور، ليعيد تعريف مشهد الكوكتيلات في المدينة." },
  { year: "2020", text: "Consultancy arm established for regional operators.", textAr: "تأسيس ذراع الاستشارات لخدمة المشغلين الإقليميين." },
  { year: "2023", text: "Portfolio reaches 20 brands and 500 employees.", textAr: "تصل المحفظة إلى 20 علامة تجارية و500 موظف." },
  { year: "2026", text: "Expansion into regional markets and hotel partnerships.", textAr: "التوسع في الأسواق الإقليمية وشراكات الفنادق." },
];

const leaders = [
  { name: "Hafez Rahim", role: "Group Managing Director", roleAr: "المدير الإداري للمجموعة" },
  { name: "Salma Younis", role: "Culinary Director", roleAr: "مديرة الشؤون الطهوية" },
  { name: "Karim Adel", role: "Head of Bars & Mixology", roleAr: "رئيس قسم البارات والمشروبات" },
  { name: "Dina Mostafa", role: "Director of Events", roleAr: "مديرة الفعاليات" },
];

function About() {
  const { t, isAr } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("About Us", "من نحن")}
        title={t("Fifteen years of hospitality craft", "خمسة عشر عامًا من حِرفية الضيافة")}
        description={t(
          "Butlers & Co builds, operates and elevates hospitality brands — from intimate dining rooms to thousand-guest productions.",
          "تبني بتلرز آند كو وتدير وترتقي بعلامات الضيافة — من صالات الطعام الحميمة إلى الفعاليات التي تستضيف الآلاف."
        )}
        image={images.staff}
      />

      <section className="container-site grid gap-12 py-24 md:grid-cols-2 md:items-center">
        <img src={images.hero} alt={t("Our flagship dining room", "صالة الطعام الرئيسية لدينا")} loading="lazy" className="rounded-2xl object-cover" />
        <div>
          <SectionHeading eyebrow={t("Our Story", "قصتنا")} title={t("Built table by table", "بُنيت طاولة تلو الأخرى")} align="left" />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {t(
              "What began as one dining room has become a group of twenty hospitality brands. We grew by hiring well, training relentlessly and refusing to compromise on the details guests notice most — the welcome, the timing, the last impression.",
              "ما بدأ كصالة طعام واحدة أصبح اليوم مجموعة من عشرين علامة ضيافة. نمونا عبر التوظيف الجيد، والتدريب المستمر، ورفض التهاون في التفاصيل التي يلاحظها الضيف أكثر من غيرها — الترحيب، التوقيت، والانطباع الأخير."
            )}
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="eyebrow">{t("Mission", "الرسالة")}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t("To deliver hospitality that exceeds expectation at every price point we operate.", "تقديم ضيافة تفوق التوقعات في كل فئة سعرية نعمل بها.")}</p>
            </div>
            <div>
              <p className="eyebrow">{t("Vision", "الرؤية")}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t("To be the region's most trusted operator and incubator of hospitality brands.", "أن نكون المشغل والحاضنة الأكثر ثقة لعلامات الضيافة في المنطقة.")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-site">
          <SectionHeading eyebrow={t("Core Values", "قيمنا الأساسية")} title={t("What we hold to", "ما نلتزم به")} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-gold">
                <v.icon className="size-7 text-secondary" />
                <h3 className="mt-5 text-lg">{isAr ? v.titleAr : v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{isAr ? v.descAr : v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-24">
        <SectionHeading eyebrow={t("Timeline", "المسيرة الزمنية")} title={t("Our milestones", "محطاتنا")} />
        <ol className="mt-12 border-l border-border pl-8">
          {timeline.map((tl) => (
            <li key={tl.year} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[38px] mt-1 size-3 rounded-full bg-gold" />
              <p className="font-display text-xl text-secondary">{tl.year}</p>
              <p className="mt-1 text-sm text-muted-foreground">{isAr ? tl.textAr : tl.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ink-panel py-24">
        <div className="container-site">
          <p className="eyebrow">{t("Leadership", "القيادة")}</p>
          <h2 className="mt-3 text-3xl text-warm md:text-4xl">{t("The team behind the group", "الفريق وراء المجموعة")}</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((l) => (
              <div key={l.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <h3 className="text-lg text-warm">{l.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-gold">{isAr ? l.roleAr : l.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site grid gap-10 py-24 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow={t("Awards", "الجوائز")} title={t("Recognition", "التكريمات")} align="left" />
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li>{t("Restaurant Group of the Year — 2024", "مجموعة المطاعم لعام — 2024")}</li>
            <li>{t("Best Cocktail Bar, Velour — 2023", "أفضل بار كوكتيل، فيلور — 2023")}</li>
            <li>{t("Hospitality Employer of Choice — 2022", "جهة العمل المفضلة في قطاع الضيافة — 2022")}</li>
          </ul>
        </div>
        <div>
          <SectionHeading eyebrow={t("CSR", "المسؤولية المجتمعية")} title={t("Corporate social responsibility", "المسؤولية الاجتماعية للشركات")} align="left" />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {t(
              "We redistribute surplus food weekly, run a paid apprenticeship for young hospitality talent, and have moved 80% of our sourcing to local suppliers.",
              "نعيد توزيع فائض الطعام أسبوعيًا، وندير برنامج تدريب مهني مدفوع الأجر للمواهب الشابة في مجال الضيافة، وقد حوّلنا 80% من مصادر توريدنا إلى موردين محليين."
            )}
          </p>
        </div>
      </section>
    </>
  );
}
