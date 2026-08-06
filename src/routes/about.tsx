import { createFileRoute } from "@tanstack/react-router";
import { Award, Compass, HeartHandshake, Leaf } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { images } from "@/data/site";

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
  { icon: HeartHandshake, title: "Guest First", desc: "Every decision is measured against the guest experience." },
  { icon: Compass, title: "Craft", desc: "Discipline in the kitchen, behind the bar and on the floor." },
  { icon: Leaf, title: "Responsibility", desc: "Sustainable sourcing and fair workplaces across all venues." },
  { icon: Award, title: "Excellence", desc: "We measure ourselves against the world's best operators." },
];

const timeline = [
  { year: "2011", text: "Butlers & Co founded with a single 40-seat dining room." },
  { year: "2014", text: "Launch of our catering division for corporate clients." },
  { year: "2017", text: "Velour opens, redefining the city's cocktail scene." },
  { year: "2020", text: "Consultancy arm established for regional operators." },
  { year: "2023", text: "Portfolio reaches 20 brands and 500 employees." },
  { year: "2026", text: "Expansion into regional markets and hotel partnerships." },
];

const leaders = [
  { name: "Hafez Rahim", role: "Group Managing Director" },
  { name: "Salma Younis", role: "Culinary Director" },
  { name: "Karim Adel", role: "Head of Bars & Mixology" },
  { name: "Dina Mostafa", role: "Director of Events" },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Fifteen years of hospitality craft"
        description="Butlers & Co builds, operates and elevates hospitality brands — from intimate dining rooms to thousand-guest productions."
        image={images.staff}
      />

      <section className="container-site grid gap-12 py-24 md:grid-cols-2 md:items-center">
        <img src={images.hero} alt="Our flagship dining room" loading="lazy" className="rounded-2xl object-cover" />
        <div>
          <SectionHeading eyebrow="Our Story" title="Built table by table" align="left" />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            What began as one dining room has become a group of twenty hospitality brands. We grew by
            hiring well, training relentlessly and refusing to compromise on the details guests notice
            most — the welcome, the timing, the last impression.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="eyebrow">Mission</p>
              <p className="mt-2 text-sm text-muted-foreground">To deliver hospitality that exceeds expectation at every price point we operate.</p>
            </div>
            <div>
              <p className="eyebrow">Vision</p>
              <p className="mt-2 text-sm text-muted-foreground">To be the region's most trusted operator and incubator of hospitality brands.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Core Values" title="What we hold to" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-gold">
                <v.icon className="size-7 text-secondary" />
                <h3 className="mt-5 text-lg">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-24">
        <SectionHeading eyebrow="Timeline" title="Our milestones" />
        <ol className="mt-12 border-l border-border pl-8">
          {timeline.map((t) => (
            <li key={t.year} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[38px] mt-1 size-3 rounded-full bg-gold" />
              <p className="font-display text-xl text-secondary">{t.year}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ink-panel py-24">
        <div className="container-site">
          <p className="eyebrow">Leadership</p>
          <h2 className="mt-3 text-3xl text-warm md:text-4xl">The team behind the group</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((l) => (
              <div key={l.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <h3 className="text-lg text-warm">{l.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-gold">{l.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site grid gap-10 py-24 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Awards" title="Recognition" align="left" />
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li>Restaurant Group of the Year — 2024</li>
            <li>Best Cocktail Bar, Velour — 2023</li>
            <li>Hospitality Employer of Choice — 2022</li>
          </ul>
        </div>
        <div>
          <SectionHeading eyebrow="CSR" title="Corporate social responsibility" align="left" />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            We redistribute surplus food weekly, run a paid apprenticeship for young hospitality
            talent, and have moved 80% of our sourcing to local suppliers.
          </p>
        </div>
      </section>
    </>
  );
}