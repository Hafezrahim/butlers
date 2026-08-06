import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/site/InquiryForm";
import { images } from "@/data/site";

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
  { title: "Head Bartender", dept: "Bars", type: "Full-time", reqs: "4+ years in premium cocktail bars, menu development experience." },
  { title: "Sous Chef", dept: "Kitchen", type: "Full-time", reqs: "Fine-dining background, strong section and stock control." },
  { title: "Restaurant Manager", dept: "Operations", type: "Full-time", reqs: "P&L ownership, team of 25+, guest-first mindset." },
  { title: "Events Coordinator", dept: "Events", type: "Full-time", reqs: "Production experience, supplier network, calm under pressure." },
];

const benefits = ["Above-market pay", "Paid academy training", "Meals on shift", "Group dining discount", "Career pathway to management", "Annual performance bonus"];

function Careers() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build a career in hospitality"
        description="We hire for attitude and train for craft — then promote from within."
        image={images.staff}
      />

      <section className="container-site py-24">
        <SectionHeading eyebrow="Open Roles" title="Current listings" />
        <div className="mt-12 space-y-4">
          {jobs.map((j) => (
            <article key={j.title} className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-gold">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl">{j.title}</h3>
                <p className="eyebrow">{j.dept} · {j.type}</p>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{j.reqs}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-site grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Benefits" title="What we offer" align="left" />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b} className="rounded-xl border border-border bg-card px-5 py-4 text-sm">{b}</li>
              ))}
            </ul>
            <SectionHeading eyebrow="Culture" title="How it feels to work here" align="left" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Structured shifts, real feedback, and managers who worked the floor before they ran it.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Apply Online" title="Send your application" align="left" />
            <div className="mt-6">
              <InquiryForm label="Submit Application" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              CV uploads require a backend — enable Lovable Cloud to store applications and files.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}