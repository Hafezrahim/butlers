import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/site/PageHero";
import { ReservationTicket, type ReservationData } from "@/components/site/ReservationTicket";
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

const steps = ["Brand", "Branch", "Guests", "Date", "Time", "Experience", "Details", "Requests", "Confirm"];
const branchesByBrand: Record<string, string[]> = {
  "The Butler Room": ["Downtown", "Zamalek"],
  Velour: ["Riverside", "New Cairo"],
  "Noir Club": ["Marina Walk"],
  "Maison Verte": ["Garden City"],
};
const times = ["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
const diningOptions = ["À la carte", "Set tasting menu", "Family style sharing", "Vegetarian / vegan", "Halal only", "Gluten free"];
const drinkOptions = ["No alcohol", "Signature cocktails", "Wine pairing", "Champagne on arrival", "Mocktails", "Full open bar"];
const extraOptions = [
  "Table decoration",
  "Flower arrangement",
  "Birthday cake",
  "Video recording",
  "Professional photography",
  "Live music",
  "Private area",
  "Cake / candles service",
  "Airport-style pickup",
];

const detailsSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(25),
  email: z.string().trim().email("Enter a valid email").max(255),
});

function makeCode() {
  return `BC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function Reservation() {
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState("");
  const [branch, setBranch] = useState("");
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [dining, setDining] = useState("");
  const [drinks, setDrinks] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<ReservationData | null>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  const detailsValid = detailsSchema.safeParse({ name, phone, email }).success;

  const canNext =
    (step === 0 && brand) ||
    (step === 1 && branch) ||
    step === 2 ||
    (step === 3 && date) ||
    (step === 4 && time) ||
    (step === 5 && Boolean(dining && drinks)) ||
    (step === 6 && detailsValid) ||
    step === 7 ||
    step === 8;

  function confirm() {
    const parsed = detailsSchema.safeParse({ name, phone, email });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      setStep(6);
      return;
    }
    setConfirmed({
      code: makeCode(),
      createdAt: new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }),
      brand,
      branch,
      guests,
      date,
      time,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      dining,
      drinks,
      extras,
      notes,
    });
    toast.success("Reservation request received. We'll confirm by phone.");
  }

  async function downloadPng() {
    if (!ticketRef.current || !confirmed) return;
    const { default: html2canvas } = await import("html2canvas-pro");
    const canvas = await html2canvas(ticketRef.current, { scale: 2, backgroundColor: null });
    const link = document.createElement("a");
    link.download = `${confirmed.code}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  async function downloadPdf() {
    if (!ticketRef.current || !confirmed) return;
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import("html2canvas-pro"),
      import("jspdf"),
    ]);
    const canvas = await html2canvas(ticketRef.current, { scale: 2 });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 28;
    const width = pageWidth - margin * 2;
    const height = (canvas.height / canvas.width) * width;
    pdf.addImage(img, "PNG", margin, margin, width, height);
    pdf.save(`${confirmed.code}.pdf`);
  }

  const pill = "rounded-2xl border px-5 py-3 font-button text-xs font-semibold uppercase tracking-[0.12em] transition-colors";
  const on = "border-gold bg-gold text-foreground";
  const off = "border-border text-muted-foreground hover:border-gold";
  const ghostBtn =
    "inline-flex items-center gap-2 rounded-2xl border border-border px-6 py-3 font-button text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:border-gold";

  return (
    <>
      <PageHero
        eyebrow="Reservation"
        title="Reserve your table"
        description="A few short steps. We confirm every booking personally."
        image={images.events}
      />

      <section className="container-site max-w-3xl py-20">
        {confirmed ? (
          <div className="space-y-6">
            <div className="text-center">
              <Check className="mx-auto size-10 text-gold" />
              <h2 className="mt-4 text-3xl">Reservation requested</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your reference is <span className="text-gold">{confirmed.code}</span> — save or download it below.
              </p>
            </div>

            <ReservationTicket ref={ticketRef} data={confirmed} />

            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={downloadPng} className={ghostBtn}>
                <Download className="size-4" /> Download PNG
              </button>
              <button
                onClick={downloadPdf}
                className="inline-flex items-center gap-2 rounded-2xl bg-gold px-6 py-3 font-button text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-gold-soft"
              >
                <FileText className="size-4" /> Download PDF
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Bookings are not stored yet — enable Lovable Cloud to save reservations to a database.
            </p>
          </div>
        ) : (
        <>
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
                <div className="space-y-7">
                  <div>
                    <p className="eyebrow">Eating preference</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {diningOptions.map((o) => (
                        <button key={o} onClick={() => setDining(o)} className={`${pill} ${dining === o ? on : off}`}>
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow">Drinking preference</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {drinkOptions.map((o) => (
                        <button key={o} onClick={() => setDrinks(o)} className={`${pill} ${drinks === o ? on : off}`}>
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow">Add-ons (optional)</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {extraOptions.map((o) => (
                        <button
                          key={o}
                          onClick={() =>
                            setExtras((prev) => (prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]))
                          }
                          className={`${pill} ${extras.includes(o) ? on : off}`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" value={name} maxLength={100} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                    {errors['name'] && <p className="text-xs text-destructive">{errors['name']}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" value={phone} maxLength={25} onChange={(e) => setPhone(e.target.value)} placeholder="+20 100 000 0000" />
                    {errors['phone'] && <p className="text-xs text-destructive">{errors['phone']}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} maxLength={255} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
                    {errors['email'] && <p className="text-xs text-destructive">{errors['email']}</p>}
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-2">
                  <Label htmlFor="notes">Special requests</Label>
                  <Textarea id="notes" rows={5} maxLength={500} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Allergies, occasion, seating preference" />
                </div>
              )}

              {step === 8 && (
                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                  {[
                    ["Brand", brand],
                    ["Branch", branch],
                    ["Guests", String(guests)],
                    ["Date", date],
                    ["Time", time],
                    ["Name", name],
                    ["Phone", phone],
                    ["Email", email],
                    ["Dining", dining],
                    ["Drinks", drinks],
                    ["Add-ons", extras.join(", ") || "—"],
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
                {step === 8 ? (
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
        </div>
        </>
        )}
      </section>
    </>
  );
}