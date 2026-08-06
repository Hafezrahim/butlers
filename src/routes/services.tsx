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
  { step: "01", title: "Discovery", desc: "We audit the site, market and numbers before proposing anything." },
  { step: "02", title: "Concept", desc: "Positioning, menu architecture, design language and service model." },
  { step: "03", title: "Build", desc: "Recruitment, training, supplier onboarding and systems setup." },
  { step: "04", title: "Operate", desc: "Daily management, guest analytics and continuous improvement." },
];

const faqs = [
  { q: "Do you take on single-venue projects?", a: "Yes. We work with independent owners as well as multi-site groups and hotels." },
  { q: "What is a typical engagement length?", a: "Consultancy projects run three to nine months; management contracts are usually multi-year." },
  { q: "Can you handle catering outside your venues?", a: "We cater private homes, offices and off-site locations with a full mobile kitchen team." },
  { q: "Do you provide staff training only?", a: "Our academy programmes can be booked independently of any other service." },
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Operators, not just advisors"
        description="Eight disciplines under one roof, delivered by teams who run venues every night of the week."
        image={images.food}
      />

      <section className="container-site py-24">
        <SectionHeading eyebrow="Overview" title="Service categories" />
        <div className="mt-14">
          <ServiceGrid />
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Benefits" title="Why groups choose us" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { t: "Measurable performance", d: "Cost, labour and guest metrics reported monthly against agreed targets." },
              { t: "Bench of talent", d: "Access to 500 trained hospitality professionals and a recruitment pipeline." },
              { t: "Brand credibility", d: "Our name on a venue signals a standard guests already trust." },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border border-border bg-card p-8">
                <h3 className="text-lg">{b.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-24">
        <SectionHeading eyebrow="Process" title="How we work" />
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {process.map((p) => (
            <div key={p.step} className="rounded-2xl border border-border p-7">
              <span className="font-display text-3xl text-gold">{p.step}</span>
              <h3 className="mt-4 text-lg">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site grid gap-12 pb-24 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="FAQ" title="Common questions" align="left" />
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div>
          <SectionHeading eyebrow="Inquiry" title="Tell us about your project" align="left" />
          <div className="mt-6">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}