import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { images, upcomingEvents } from "@/data/site";

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
  { name: "Wedding", desc: "Full production from ceremony to late-night bar, up to 400 guests.", from: "From $12,000" },
  { name: "Corporate", desc: "Conferences, launches and awards dinners with AV partners included.", from: "From $8,000" },
  { name: "Birthday", desc: "Private rooms, bespoke menus and a dedicated host for the night.", from: "From $2,400" },
  { name: "VIP", desc: "Buy-outs, bottle service and personal butler team on request.", from: "On request" },
];

const past = [
  { title: "Aurum Hotels Gala", year: "2025" },
  { title: "City Fashion Week Afterparty", year: "2025" },
  { title: "Maison Lux Product Launch", year: "2024" },
];

function Events() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Occasions, produced properly"
        description="From a table of twelve to a thousand-guest gala, one team owns every detail."
        image={images.events}
      />

      <section className="container-site py-24">
        <SectionHeading eyebrow="Upcoming" title="This season at our venues" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {upcomingEvents.map((e) => (
            <article key={e.title} className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-gold">
              <img src={e.image} alt={e.title} loading="lazy" className="h-48 w-full object-cover" />
              <div className="space-y-3 p-6">
                <p className="eyebrow">{e.date} · {e.venue}</p>
                <h3 className="text-xl">{e.title}</h3>
                <p className="text-sm text-muted-foreground">{e.desc}</p>
                <Link to="/reservation" className="inline-flex font-button text-xs font-semibold uppercase tracking-[0.14em] text-secondary hover:text-gold">
                  Reserve
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Private Booking" title="Packages" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((p) => (
              <div key={p.name} className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-gold">
                <h3 className="text-xl">{p.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                <p className="mt-5 eyebrow">{p.from}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site grid gap-12 py-24 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Past Events" title="Selected productions" align="left" />
          <ul className="mt-6 divide-y divide-border">
            {past.map((p) => (
              <li key={p.title} className="flex items-center justify-between py-4 text-sm">
                <span>{p.title}</span>
                <span className="text-muted-foreground">{p.year}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border p-8">
          <SectionHeading eyebrow="Booking Calendar" title="Availability" align="left" />
          <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
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
            Request a Date
          </Link>
        </div>
      </section>
    </>
  );
}