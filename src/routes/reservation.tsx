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
import { useI18n } from "@/i18n";

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

const steps = [
  { label: "Brand", labelAr: "العلامة" },
  { label: "Branch", labelAr: "الفرع" },
  { label: "Guests", labelAr: "الضيوف" },
  { label: "Date", labelAr: "التاريخ" },
  { label: "Time", labelAr: "الوقت" },
  { label: "Experience", labelAr: "التجربة" },
  { label: "Details", labelAr: "البيانات" },
  { label: "Requests", labelAr: "الطلبات" },
  { label: "Confirm", labelAr: "التأكيد" },
];

const branchesByBrand: Record<string, { label: string; labelAr: string }[]> = {
  "The Butler Room": [
    { label: "Downtown", labelAr: "وسط البلد" },
    { label: "Zamalek", labelAr: "الزمالك" },
  ],
  Velour: [
    { label: "Riverside", labelAr: "كورنيش النيل" },
    { label: "New Cairo", labelAr: "القاهرة الجديدة" },
  ],
  "Noir Club": [{ label: "Marina Walk", labelAr: "ممشى المارينا" }],
  "Maison Verte": [{ label: "Garden City", labelAr: "جاردن سيتي" }],
};

const times = ["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

const diningOptions = [
  { label: "À la carte", labelAr: "قائمة مفتوحة" },
  { label: "Set tasting menu", labelAr: "قائمة تذوق محددة" },
  { label: "Family style sharing", labelAr: "تقديم مشترك عائلي" },
  { label: "Vegetarian / vegan", labelAr: "نباتي / نباتي صرف" },
  { label: "Halal only", labelAr: "حلال فقط" },
  { label: "Gluten free", labelAr: "خالٍ من الجلوتين" },
];

const drinkOptions = [
  { label: "No alcohol", labelAr: "بدون كحول" },
  { label: "Signature cocktails", labelAr: "كوكتيلات مميزة" },
  { label: "Wine pairing", labelAr: "مصاحبة نبيذ" },
  { label: "Champagne on arrival", labelAr: "شمبانيا عند الوصول" },
  { label: "Mocktails", labelAr: "موكتيل" },
  { label: "Full open bar", labelAr: "بار مفتوح بالكامل" },
];

const extraOptions = [
  { label: "Table decoration", labelAr: "تزيين الطاولة" },
  { label: "Flower arrangement", labelAr: "تنسيق ورد" },
  { label: "Birthday cake", labelAr: "تورتة عيد ميلاد" },
  { label: "Video recording", labelAr: "تصوير فيديو" },
  { label: "Professional photography", labelAr: "تصوير فوتوغرافي احترافي" },
  { label: "Live music", labelAr: "موسيقى حية" },
  { label: "Private area", labelAr: "منطقة خاصة" },
  { label: "Cake / candles service", labelAr: "خدمة تورتة / شموع" },
  { label: "Airport-style pickup", labelAr: "خدمة استقبال VIP" },
];

function makeCode() {
  return `BC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function Reservation() {
  const { t, isAr, dir } = useI18n();
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

  const detailsSchema = z.object({
    name: z.string().trim().min(2, t("Please enter your full name", "الرجاء إدخال اسمك الكامل")).max(100),
    phone: z.string().trim().min(7, t("Enter a valid phone number", "أدخل رقم هاتف صحيح")).max(25),
    email: z.string().trim().email(t("Enter a valid email", "أدخل بريدًا إلكترونيًا صحيحًا")).max(255),
  });

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
      createdAt: new Date().toLocaleString(isAr ? "ar-EG" : "en-GB", { dateStyle: "medium", timeStyle: "short" }),
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
    toast.success(t("Reservation request received. We'll confirm by phone.", "تم استلام طلب الحجز. سنؤكد الحجز عبر الهاتف."));
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

      <section className="container-site max-w-3xl py-20" dir={dir}>
        {confirmed ? (
          <div className="space-y-6">
            <div className="text-center">
              <Check className="mx-auto size-10 text-gold" />
              <h2 className="mt-4 text-3xl">{t("Reservation requested", "تم طلب الحجز")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("Your reference is", "الرقم المرجعي الخاص بك هو")} <span className="text-gold">{confirmed.code}</span> — {t("save or download it below.", "احفظه أو حمّله أدناه.")}
              </p>
            </div>

            <ReservationTicket ref={ticketRef} data={confirmed} />

            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={downloadPng} className={ghostBtn}>
                <Download className="size-4" /> {t("Download PNG", "تحميل PNG")}
              </button>
              <button
                onClick={downloadPdf}
                className="inline-flex items-center gap-2 rounded-2xl bg-gold px-6 py-3 font-button text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-gold-soft"
              >
                <FileText className="size-4" /> {t("Download PDF", "تحميل PDF")}
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              {t("Bookings are not stored yet.", "لا يتم حفظ الحجوزات حاليًا.")}
            </p>
          </div>
        ) : (
        <>
        <ol className="flex flex-wrap items-center gap-2">
          {steps.map((s, i) => (
            <li
              key={s.label}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-button uppercase tracking-wide ${
                i === step ? "bg-secondary text-secondary-foreground" : i < step ? "text-gold" : "text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="size-3.5" /> : <span>{i + 1}</span>}
              {isAr ? s.labelAr : s.label}
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-2xl border border-border bg-card p-8">
              {step === 0 && (
                <div className="flex flex-wrap gap-3">
                  {brands.map((b) => (
                    <button key={b.name} onClick={() => { setBrand(b.name); setBranch(""); }} className={`${pill} ${brand === b.name ? on : off}`}>
                      {isAr ? b.nameAr : b.name}
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="flex flex-wrap gap-3">
                  {(branchesByBrand[brand] ?? []).map((b) => (
                    <button key={b.label} onClick={() => setBranch(b.label)} className={`${pill} ${branch === b.label ? on : off}`}>
                      {isAr ? b.labelAr : b.label}
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
                  <Label htmlFor="date">{t("Choose a date", "اختر تاريخًا")}</Label>
                  <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              )}

              {step === 4 && (
                <div className="flex flex-wrap gap-3">
                  {times.map((tm) => (
                    <button key={tm} onClick={() => setTime(tm)} className={`${pill} ${time === tm ? on : off}`}>
                      {tm}
                    </button>
                  ))}
                </div>
              )}

              {step === 5 && (
                <div className="space-y-7">
                  <div>
                    <p className="eyebrow">{t("Eating preference", "تفضيل الطعام")}</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {diningOptions.map((o) => (
                        <button key={o.label} onClick={() => setDining(o.label)} className={`${pill} ${dining === o.label ? on : off}`}>
                          {isAr ? o.labelAr : o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow">{t("Drinking preference", "تفضيل المشروبات")}</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {drinkOptions.map((o) => (
                        <button key={o.label} onClick={() => setDrinks(o.label)} className={`${pill} ${drinks === o.label ? on : off}`}>
                          {isAr ? o.labelAr : o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow">{t("Add-ons (optional)", "إضافات (اختياري)")}</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {extraOptions.map((o) => (
                        <button
                          key={o.label}
                          onClick={() =>
                            setExtras((prev) => (prev.includes(o.label) ? prev.filter((x) => x !== o.label) : [...prev, o.label]))
                          }
                          className={`${pill} ${extras.includes(o.label) ? on : off}`}
                        >
                          {isAr ? o.labelAr : o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="name">{t("Full name", "الاسم الكامل")}</Label>
                    <Input id="name" value={name} maxLength={100} onChange={(e) => setName(e.target.value)} placeholder={t("Your full name", "اسمك الكامل")} />
                    {errors['name'] && <p className="text-xs text-destructive">{errors['name']}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("Phone", "الهاتف")}</Label>
                    <Input id="phone" type="tel" value={phone} maxLength={25} onChange={(e) => setPhone(e.target.value)} placeholder="+20 100 000 0000" />
                    {errors['phone'] && <p className="text-xs text-destructive">{errors['phone']}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("Email", "البريد الإلكتروني")}</Label>
                    <Input id="email" type="email" value={email} maxLength={255} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
                    {errors['email'] && <p className="text-xs text-destructive">{errors['email']}</p>}
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-2">
                  <Label htmlFor="notes">{t("Special requests", "طلبات خاصة")}</Label>
                  <Textarea id="notes" rows={5} maxLength={500} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t("Allergies, occasion, seating preference", "الحساسية، المناسبة، تفضيل الجلوس")} />
                </div>
              )}

              {step === 8 && (
                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                  {[
                    [t("Brand", "العلامة"), brand],
                    [t("Branch", "الفرع"), branch],
                    [t("Guests", "الضيوف"), String(guests)],
                    [t("Date", "التاريخ"), date],
                    [t("Time", "الوقت"), time],
                    [t("Name", "الاسم"), name],
                    [t("Phone", "الهاتف"), phone],
                    [t("Email", "البريد الإلكتروني"), email],
                    [t("Dining", "الطعام"), dining],
                    [t("Drinks", "المشروبات"), drinks],
                    [t("Add-ons", "الإضافات"), extras.join(", ") || "—"],
                    [t("Requests", "الطلبات"), notes || "—"],
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
                  <ChevronLeft className="size-4" /> {t("Back", "رجوع")}
                </button>
                {step === 8 ? (
                  <button onClick={confirm} className="rounded-2xl bg-gold px-6 py-3 font-button text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-gold-soft">
                    {t("Confirm Reservation", "تأكيد الحجز")}
                  </button>
                ) : (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canNext}
                    className="inline-flex items-center gap-1 rounded-2xl bg-gold px-6 py-3 font-button text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-gold-soft disabled:opacity-40"
                  >
                    {t("Next", "التالي")} <ChevronRight className="size-4" />
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
