export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[oklch(0.15_0_0)]/78" />
      <div className="container-site relative py-28 text-center md:py-36">
        <p className="eyebrow reveal">{eyebrow}</p>
        <h1 className="reveal mt-4 text-4xl text-warm md:text-6xl">{title}</h1>
        <p className="reveal mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}