import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { images } from "@/data/site";

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
  { title: "Velour named Best Cocktail Bar of the Year", date: "18 Jul 2026", tag: "Press", image: images.cocktails, excerpt: "Our riverside lounge takes the top spot for its seasonal cocktail programme." },
  { title: "Butlers & Co opens its 20th venue", date: "02 Jun 2026", tag: "Announcement", image: images.hero, excerpt: "Maison Verte brings contemporary Levantine cooking to Garden City." },
  { title: "Inside our hospitality academy", date: "11 Apr 2026", tag: "Blog", image: images.staff, excerpt: "How we train 120 new team members every year without losing our standards." },
  { title: "Catering division doubles corporate portfolio", date: "27 Feb 2026", tag: "Press Release", image: images.events, excerpt: "New partnerships with four multinational clients across the region." },
];

function News() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="Latest from the group"
        description="Openings, awards, press coverage and notes from our kitchens and bars."
        image={images.food}
      />

      <section className="container-site py-24">
        <SectionHeading eyebrow="Newsroom" title="Recent stories" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <article key={p.title} className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-gold">
              <img src={p.image} alt={p.title} loading="lazy" className="h-56 w-full object-cover" />
              <div className="space-y-3 p-7">
                <p className="eyebrow">{p.tag} · {p.date}</p>
                <h3 className="text-xl">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}