import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/site/InquiryForm";
import { images } from "@/data/site";

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
  { name: "The Butler Room", address: "12 Kasr El Nil St, Downtown", phone: "+20 100 741 9344" },
  { name: "Velour", address: "8 Nile Corniche, Riverside", phone: "+20 100 741 9344" },
  { name: "Noir Club", address: "Marina Walk, Level 3", phone: "+20 100 741 9344" },
  { name: "Maison Verte", address: "31 Simon Bolivar, Garden City", phone: "+20 100 741 9344" },
];

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        description="Reservations, events, press or partnerships — we answer every message."
        image={images.hero}
      />

      <section className="container-site grid gap-12 py-24 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Get in touch" title="Direct lines" align="left" />
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-center gap-3"><Phone className="size-4 text-secondary" /> <a href="tel:+201007419344" className="hover:text-gold">+20 100 741 9344</a></li>
            <li className="flex items-center gap-3"><Mail className="size-4 text-secondary" /> hello@butlersandco.com</li>
            <li className="flex items-center gap-3">
              <MessageCircle className="size-4 text-secondary" />
              <a href="https://wa.me/201007419344" className="hover:text-gold">WhatsApp Business</a>
            </li>
            <li className="flex items-center gap-3"><MapPin className="size-4 text-secondary" /> Downtown District, Cairo</li>
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">Business hours: Daily 10:00 — 02:00</p>

          <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Butlers & Co locations map"
              className="size-full border-0"
              loading="lazy"
              src="https://www.google.com/maps?q=Downtown%20Cairo&output=embed"
            />
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Inquiry" title="Send us a message" align="left" />
          <div className="mt-6">
            <InquiryForm />
          </div>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Branches" title="Find your nearest venue" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {branches.map((b) => (
              <div key={b.name} className="rounded-2xl border border-border bg-card p-7">
                <h3 className="text-lg">{b.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.address}</p>
                <p className="mt-3 text-sm text-secondary">{b.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}