import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/site/InquiryForm";
import { images } from "@/data/site";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Butlers & Co — Branches, Phone & Inquiries" },
      { name: "description", content: "Reach Butlers & Co by phone, email or WhatsApp. Branch locations, business hours and an inquiry form." },
      { property: "og:title", content: "Contact Butlers & Co" },
      { property: "og:description", content: "Branches, phone, email, WhatsApp and business hours." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const branches = [
  { name: "The Butler Room", nameAr: "ذا باتلر روم", address: "12 Kasr El Nil St, Downtown", addressAr: "12 شارع قصر النيل، وسط البلد", phone: "+20 100 741 9344" },
  { name: "Velour", nameAr: "فيلور", address: "8 Nile Corniche, Riverside", addressAr: "8 كورنيش النيل", phone: "+20 100 741 9344" },
  { name: "Noir Club", nameAr: "نوار كلوب", address: "Marina Walk, Level 3", addressAr: "ممشى المارينا، الطابق 3", phone: "+20 100 741 9344" },
  { name: "Maison Verte", nameAr: "ميزون فيرت", address: "31 Simon Bolivar, Garden City", addressAr: "31 شارع سيمون بوليفار، جاردن سيتي", phone: "+20 100 741 9344" },
];

function Contact() {
  const { t, isAr } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("Contact", "تواصل معنا")}
        title={t("Let's talk", "لنتحدث")}
        description={t(
          "Reservations, events, press or partnerships — we answer every message.",
          "حجوزات أو فعاليات أو صحافة أو شراكات — نرد على كل رسالة تصلنا.",
        )}
        image={images.hero}
      />

      <section className="container-site grid gap-12 py-24 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow={t("Get in touch", "تواصل معنا")} title={t("Direct lines", "خطوط التواصل المباشر")} align="left" />
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-center gap-3"><Phone className="size-4 text-secondary" /> <a href="tel:+201007419344" className="hover:text-gold">+20 100 741 9344</a></li>
            <li className="flex items-center gap-3"><Mail className="size-4 text-secondary" /> hello@butlersandco.com</li>
            <li className="flex items-center gap-3">
              <MessageCircle className="size-4 text-secondary" />
              <a href="https://wa.me/201007419344" className="hover:text-gold">{t("WhatsApp Business", "واتساب للأعمال")}</a>
            </li>
            <li className="flex items-center gap-3"><MapPin className="size-4 text-secondary" /> {t("Downtown District, Cairo", "منطقة وسط البلد، القاهرة")}</li>
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">{t("Business hours: Daily 10:00 — 02:00", "ساعات العمل: يوميًا من 10:00 صباحًا حتى 02:00 صباحًا")}</p>

          <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-border">
            <iframe
              title={t("Butlers & Co locations map", "خريطة فروع بتلرز آند كو")}
              className="size-full border-0"
              loading="lazy"
              src="https://www.google.com/maps?q=Downtown%20Cairo&output=embed"
            />
          </div>
        </div>

        <div>
          <SectionHeading eyebrow={t("Inquiry", "استفسار")} title={t("Send us a message", "أرسل لنا رسالة")} align="left" />
          <div className="mt-6">
            <InquiryForm />
          </div>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-site">
          <SectionHeading eyebrow={t("Branches", "الفروع")} title={t("Find your nearest venue", "ابحث عن أقرب فرع لك")} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {branches.map((b) => (
              <div key={b.name} className="rounded-2xl border border-border bg-card p-7">
                <h3 className="text-lg">{isAr ? b.nameAr : b.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{isAr ? b.addressAr : b.address}</p>
                <p className="mt-3 text-sm text-secondary">{b.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
