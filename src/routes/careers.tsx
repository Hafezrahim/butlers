import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/site/InquiryForm";
import { images } from "@/data/site";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Butlers & Co — Hospitality Jobs" },
      { name: "description", content: "Open roles across our kitchens, bars, floors and head office. Apply online and grow with a 500-strong hospitality group." },
      { property: "og:title", content: "Careers at Butlers & Co" },
      { property: "og:description", content: "Open hospitality roles across our venues and head office." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: Careers,
});

const jobs = [
  { title: "Head Bartender", titleAr: "رئيس السقاة", dept: "Bars", deptAr: "البارات", type: "Full-time", typeAr: "دوام كامل", reqs: "4+ years in premium cocktail bars, menu development experience.", reqsAr: "خبرة لا تقل عن 4 سنوات في بارات الكوكتيل الراقية، مع خبرة في تطوير القوائم." },
  { title: "Sous Chef", titleAr: "مساعد الشيف", dept: "Kitchen", deptAr: "المطبخ", type: "Full-time", typeAr: "دوام كامل", reqs: "Fine-dining background, strong section and stock control.", reqsAr: "خلفية في المطاعم الراقية، وقدرة قوية على إدارة الأقسام والمخزون." },
  { title: "Restaurant Manager", titleAr: "مدير مطعم", dept: "Operations", deptAr: "العمليات", type: "Full-time", typeAr: "دوام كامل", reqs: "P&L ownership, team of 25+, guest-first mindset.", reqsAr: "مسؤولية الأرباح والخسائر، إدارة فريق يفوق 25 موظفًا، وعقلية تضع الضيف أولاً." },
  { title: "Events Coordinator", titleAr: "منسق فعاليات", dept: "Events", deptAr: "الفعاليات", type: "Full-time", typeAr: "دوام كامل", reqs: "Production experience, supplier network, calm under pressure." , reqsAr: "خبرة في تنفيذ الفعاليات، شبكة موردين، وقدرة على العمل بهدوء تحت الضغط."},
];

const benefits = [
  { en: "Above-market pay", ar: "رواتب أعلى من متوسط السوق" },
  { en: "Paid academy training", ar: "تدريب أكاديمي مدفوع الأجر" },
  { en: "Meals on shift", ar: "وجبات أثناء الدوام" },
  { en: "Group dining discount", ar: "خصم على تناول الطعام في فروع المجموعة" },
  { en: "Career pathway to management", ar: "مسار وظيفي نحو المناصب الإدارية" },
  { en: "Annual performance bonus", ar: "مكافأة أداء سنوية" },
];

function Careers() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("Careers", "الوظائف")}
        title={t("Build a career in hospitality", "ابنِ مسيرتك المهنية في الضيافة")}
        description={t(
          "We hire for attitude and train for craft — then promote from within.",
          "نوظّف بناءً على الموقف والشغف، وندرّب على الحِرفية — ثم نرقّي من الداخل."
        )}
        image={images.staff}
      />

      <section className="container-site py-24">
        <SectionHeading eyebrow={t("Open Roles", "الوظائف الشاغرة")} title={t("Current listings", "القوائم الحالية")} />
        <div className="mt-12 space-y-4">
          {jobs.map((j) => (
            <article key={j.title} className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-gold">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl">{t(j.title, j.titleAr)}</h3>
                <p className="eyebrow">{t(j.dept, j.deptAr)} · {t(j.type, j.typeAr)}</p>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{t(j.reqs, j.reqsAr)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-site grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow={t("Benefits", "المزايا")} title={t("What we offer", "ما نقدّمه")} align="left" />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b.en} className="rounded-xl border border-border bg-card px-5 py-4 text-sm">{t(b.en, b.ar)}</li>
              ))}
            </ul>
            <SectionHeading eyebrow={t("Culture", "الثقافة")} title={t("How it feels to work here", "كيف تشعر عندما تعمل هنا")} align="left" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t(
                "Structured shifts, real feedback, and managers who worked the floor before they ran it.",
                "مناوبات منظمة، تقييم صريح، ومديرون عملوا في الصالة قبل أن يديروها."
              )}
            </p>
          </div>
          <div>
            <SectionHeading eyebrow={t("Apply Online", "التقديم عبر الإنترنت")} title={t("Send your application", "أرسل طلبك")} align="left" />
            <div className="mt-6">
              <InquiryForm label={t("Submit Application", "إرسال الطلب")} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {t(
                "CV uploads require a backend.",
                "يتطلب رفع السيرة الذاتية خادمًا خلفيًا."
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
