import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { ServiceGrid } from "@/components/site/ServiceGrid";
import { InquiryForm } from "@/components/site/InquiryForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { images } from "@/data/site";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Hospitality Services — Butlers & Co" },
      { name: "description", content: "Restaurant management, nightlife operations, mixology, catering, consultancy, brand development, training and events." },
      { property: "og:title", content: "Hospitality Services — Butlers & Co" },
      { property: "og:description", content: "Full-service hospitality operations, catering and consultancy." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

const process = [
  { step: "01", title: "Discovery", titleAr: "الاستكشاف", desc: "We audit the site, market and numbers before proposing anything.", descAr: "نقيّم الموقع والسوق والأرقام قبل تقديم أي مقترح." },
  { step: "02", title: "Concept", titleAr: "المفهوم", desc: "Positioning, menu architecture, design language and service model.", descAr: "التموضع، هيكلة القائمة، لغة التصميم، ونموذج الخدمة." },
  { step: "03", title: "Build", titleAr: "التأسيس", desc: "Recruitment, training, supplier onboarding and systems setup.", descAr: "التوظيف، التدريب، اعتماد الموردين، وإعداد الأنظمة." },
  { step: "04", title: "Operate", titleAr: "التشغيل", desc: "Daily management, guest analytics and continuous improvement.", descAr: "الإدارة اليومية، تحليلات الضيوف، والتحسين المستمر." },
];

const faqs = [
  { q: "Do you take on single-venue projects?", qAr: "هل تتعاملون مع مشاريع المنشأة الواحدة؟", a: "Yes. We work with independent owners as well as multi-site groups and hotels.", aAr: "نعم. نعمل مع الملاك المستقلين وكذلك المجموعات متعددة المواقع والفنادق." },
  { q: "What is a typical engagement length?", qAr: "ما هي المدة المعتادة للتعاقد؟", a: "Consultancy projects run three to nine months; management contracts are usually multi-year.", aAr: "تستغرق مشاريع الاستشارات من ثلاثة إلى تسعة أشهر؛ أما عقود الإدارة فعادةً ما تمتد لعدة سنوات." },
  { q: "Can you handle catering outside your venues?", qAr: "هل يمكنكم تقديم خدمات التموين خارج منشآتكم؟", a: "We cater private homes, offices and off-site locations with a full mobile kitchen team." , aAr: "نقدّم خدمات التموين في المنازل والمكاتب والمواقع الخارجية بفريق مطبخ متنقل متكامل."},
  { q: "Do you provide staff training only?", qAr: "هل تقدّمون تدريب الموظفين فقط؟", a: "Our academy programmes can be booked independently of any other service.", aAr: "يمكن حجز برامج أكاديميتنا بشكل مستقل عن أي خدمة أخرى." },
];

function Services() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("Services", "الخدمات")}
        title={t("Operators, not just advisors", "مشغّلون، وليس مجرد مستشارين")}
        description={t(
          "Eight disciplines under one roof, delivered by teams who run venues every night of the week.",
          "ثمانية تخصصات تحت سقف واحد، تقدّمها فرق تدير المنشآت كل ليلة من أيام الأسبوع."
        )}
        image={images.food}
      />

      <section className="container-site py-24">
        <SectionHeading eyebrow={t("Overview", "نظرة عامة")} title={t("Service categories", "فئات الخدمات")} />
        <div className="mt-14">
          <ServiceGrid />
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-site">
          <SectionHeading eyebrow={t("Benefits", "المزايا")} title={t("Why groups choose us", "لماذا تختارنا المجموعات")} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { t: "Measurable performance", tAr: "أداء قابل للقياس", d: "Cost, labour and guest metrics reported monthly against agreed targets.", dAr: "تقارير شهرية عن التكلفة والعمالة ومؤشرات الضيوف مقارنة بالأهداف المتفق عليها." },
              { t: "Bench of talent", tAr: "قاعدة من الكفاءات", d: "Access to 500 trained hospitality professionals and a recruitment pipeline.", dAr: "الوصول إلى 500 محترف مدرّب في مجال الضيافة وقناة توظيف جاهزة." },
              { t: "Brand credibility", tAr: "مصداقية العلامة", d: "Our name on a venue signals a standard guests already trust.", dAr: "اسمنا على أي منشأة يعني معيارًا يثق به الضيوف بالفعل." },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border border-border bg-card p-8">
                <h3 className="text-lg">{t(b.t, b.tAr)}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{t(b.d, b.dAr)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-24">
        <SectionHeading eyebrow={t("Process", "المنهجية")} title={t("How we work", "كيف نعمل")} />
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {process.map((p) => (
            <div key={p.step} className="rounded-2xl border border-border p-7">
              <span className="font-display text-3xl text-gold">{p.step}</span>
              <h3 className="mt-4 text-lg">{t(p.title, p.titleAr)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(p.desc, p.descAr)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site grid gap-12 pb-24 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow={t("FAQ", "الأسئلة الشائعة")} title={t("Common questions", "أسئلة متكررة")} align="left" />
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left">{t(f.q, f.qAr)}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{t(f.a, f.aAr)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div>
          <SectionHeading eyebrow={t("Inquiry", "استفسار")} title={t("Tell us about your project", "أخبرنا عن مشروعك")} align="left" />
          <div className="mt-6">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
