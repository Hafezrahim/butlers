import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { brands, images } from "@/data/site";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Reserve a Table — Butlers & Co" },
      { name: "description", content: "Book a table at any Butlers & Co venue in seven quick steps: brand, branch, guests, date, time and special requests." },
      { property: "og:title", content: "Reserve a Table — Butlers & Co" },
      { property: "og:description", content: "Book a table at any Butlers & Co venue in a few steps." },
      { property: "og:url", content: "/reservation" },
    ],
    links: [{ rel: "canonical", href: "/reservation" }],
  }),
  component: Reservation,
});

const steps = ["Brand", "Branch", "Guests", "Date", "Time", "Requests", "Confirm"];
const branchesByBrand: Record<string, string[]> = {
  "The Butler Room": ["Downtown", "Zamalek"],
  Velour: ["Riverside", "New Cairo"],
  "Noir Club": ["Marina Walk"],
  "Maison Verte": ["Garden City"],
};
const times = ["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

function Reservation() {
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState("");
  const [branch, setBranch] = useState("");
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  const canNext =
    (step === 0 && brand) ||
    (step === 1 && branch) ||
    step === 2 ||
    (step === 3 && date) ||
    (step === 4 && time) ||
    step === 5 ||
    step === 6;

  function confirm() {
    setDone(true);
    toast.success("Reservation request received. We'll confirm by phone.");
  }

  const pill = "rounded-2xl border px-5 py-3 font-button text-xs font-semibold uppercase tracking-[0.12em] transition-colors";
  const on = "border-gold bg-gold text-foreground";
  const off = "border-border text-muted-foreground hover:border-gold";

  return (
    <>
      <PageHero
        eyebrow="Reservation"
        title="Reserve your table"
        description="Seven short steps. We confirm every booking personally."
        image={images.events}
      />

      <section className="container-site max-w-3xl py-20">
        <ol className="flex flex-wrap items-center gap-2">
          {steps.map((s, i) => (
            <li
              key={s}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-button uppercase tracking-wide ${
                i === step ? "bg-secondary text-secondary-foreground" : i < step ? "text-gold" : "text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="size-3.5" /> : <span>{i + 1}</span>}
              {s}
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-2xl border border-border bg-card p-8">
          {done ? (
            <div className="text-center">
              <Check className="mx-auto size-10 text-gold" />
              <h2 className="mt-4 text-2xl">Reservation requested</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {brand} · {branch} · {guests} guests · {date} at {time}
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                Bookings are not stored yet — enable Lovable Cloud to save reservations to a database.
              </p>
            </div>
          ) : (
            <>
              {step === 0 && (
                <div className="flex flex-wrap gap-3">
                  {brands.map((b) => (
                    <button key={b.name} onClick={() => { setBrand(b.name); setBranch(""); }} className={`${pill} ${brand === b.name ? on : off}`}>
                      {b.name}
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="flex flex-wrap gap-3">
                  {(branchesByBrand[brand] ?? []).map((b) => (
                    <button key={b} onClick={() => setBranch(b)} className={`${pill} ${branch === b ? on : off}`}>
                      {b}
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((g) => (
                    <button key={g} onClick={() => setGuests(g)} className={`${pill} ${guests === g ? on : off}`}>
                      {g}
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-2">
                  <Label htmlFor="date">Choose a date</Label>
                  <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              )}

              {step === 4 && (
                <div className="flex flex-wrap gap-3">
                  {times.map((t) => (
                    <button key={t} onClick={() => setTime(t)} className={`${pill} ${time === t ? on : off}`}>
                      {t}
                    </button>
                  ))}
                </div>
              )}

              {step === 5 && (
                <div className="space-y-2">
                  <Label htmlFor="notes">Special requests</Label>
                  <Textarea id="notes" rows={5} maxLength={500} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Allergies, occasion, seating preference" />
                </div>
              )}

              {step === 6 && (
                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                  {[
                    ["Brand", brand],
                    ["Branch", branch],
                    ["Guests", String(guests)],
                    ["Date", date],
                    ["Time", time],
                    ["Requests", notes || "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl border border-border p-4">
                      <dt className="eyebrow">{k}</dt>
                      <dd className="mt-1">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1 font-button text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground disabled:opacity-40"
                >
                  <ChevronLeft className="size-4" /> Back
                </button>
                {step === 6 ? (
                  <button onClick={confirm} className="rounded-2xl bg-gold px-6 py-3 font-button text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-gold-soft">
                    Confirm Reservation
                  </button>
                ) : (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canNext}
                    className="inline-flex items-center gap-1 rounded-2xl bg-gold px-6 py-3 font-button text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-gold-soft disabled:opacity-40"
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}