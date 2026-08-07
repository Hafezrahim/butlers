import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CalendarDays, Mail, Phone, Sparkles, Users } from "lucide-react";
import { toast } from "sonner";
import { PanelCard, StatusPill } from "@/components/panel/PanelShell";
import { ADMIN_RESERVATIONS, STATUS_LABEL, type ResStatus } from "@/data/panel";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/reservations/$code")({
  loader: ({ params }) => {
    const reservation = ADMIN_RESERVATIONS.find((r) => r.code === params.code);
    if (!reservation) throw notFound();
    return { reservation };
  },
  head: ({ params }) => ({
    meta: [
      { title: `Reservation ${params.code} — Butlers & Co Admin` },
      { name: "description", content: `Guest details, reservation info, status and notes for booking ${params.code}.` },
      { name: "robots", content: "noindex" },
    ],
  }),
  notFoundComponent: ReservationMissing,
  component: ReservationDetail,
});

const STATUSES: ResStatus[] = ["pending", "confirmed", "seated", "cancelled"];

type Note = { id: number; author: string; text: string; at: string };

function ReservationMissing() {
  return (
    <PanelCard title="Reservation not found">
      <Link to="/admin/reservations" className="text-sm text-gold underline">
        Back to reservations
      </Link>
    </PanelCard>
  );
}

function ReservationDetail() {
  const { reservation } = Route.useLoaderData();
  const { t, isAr } = useI18n();
  const [status, setStatus] = useState<ResStatus>(reservation.status);
  const [draft, setDraft] = useState("");
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      author: t("Reservations desk", "مكتب الحجوزات"),
      text: t("Guest requested a quiet corner table.", "طلب الضيف طاولة هادئة في الركن."),
      at: "2026-08-05 · 11:20",
    },
  ]);

  const addNote = () => {
    if (!draft.trim()) return;
    setNotes((n) => [
      {
        id: Date.now(),
        author: t("Hafez Rahim", "حافظ رحيم"),
        text: draft.trim(),
        at: new Date().toISOString().slice(0, 16).replace("T", " · "),
      },
      ...n,
    ]);
    setDraft("");
    toast.success(t("Note added", "تمت إضافة الملاحظة"));
  };

  const info = [
    { icon: CalendarDays, label: t("Date & time", "التاريخ والوقت"), value: `${reservation.date} · ${reservation.time}`, ltr: true },
    { icon: Users, label: t("Party size", "عدد الأفراد"), value: String(reservation.party) },
    { icon: Sparkles, label: t("House", "الفرع"), value: `${isAr ? reservation.brandAr : reservation.brand} — ${isAr ? reservation.branchAr : reservation.branch}` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/admin/reservations"
          className="inline-flex items-center gap-2 font-button text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground hover:text-gold"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {t("Back to reservations", "العودة للحجوزات")}
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-button text-sm tracking-[0.1em]" dir="ltr">{reservation.code}</span>
          <StatusPill status={status} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <PanelCard title={t("Client information", "بيانات العميل")}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-full bg-primary/10 font-button text-sm text-primary">
                {(isAr ? reservation.guestAr : reservation.guest).slice(0, 2)}
              </div>
              <div>
                <p className="text-base">{isAr ? reservation.guestAr : reservation.guest}</p>
                <p className="text-xs text-muted-foreground">{t("Guest", "الضيف")}</p>
              </div>
            </div>
            <a href={`tel:${reservation.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm hover:text-gold">
              <Phone className="size-4 text-muted-foreground" />
              <span dir="ltr">{reservation.phone}</span>
            </a>
            <a href={`mailto:${reservation.email}`} className="flex items-center gap-2 text-sm hover:text-gold">
              <Mail className="size-4 text-muted-foreground" />
              <span dir="ltr">{reservation.email}</span>
            </a>
          </div>
        </PanelCard>

        <PanelCard title={t("Reservation details", "تفاصيل الحجز")}>
          <div className="space-y-4">
            {info.map((row) => (
              <div key={row.label} className="flex items-start gap-3">
                <row.icon className="mt-0.5 size-4 text-muted-foreground" />
                <div>
                  <p className="font-button text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{row.label}</p>
                  <p className="text-sm" dir={row.ltr ? "ltr" : undefined}>{row.value}</p>
                </div>
              </div>
            ))}
            <div>
              <p className="font-button text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {t("Add-ons", "الإضافات")}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {reservation.addons.length === 0 && (
                  <span className="text-sm text-muted-foreground">{t("None", "لا يوجد")}</span>
                )}
                {reservation.addons.map((a: { en: string; ar: string }) => (
                  <span key={a.en} className="rounded-full border border-border px-3 py-1 text-xs">
                    {isAr ? a.ar : a.en}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </PanelCard>

        <PanelCard title={t("Status", "الحالة")}>
          <div className="space-y-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStatus(s);
                  toast.success(
                    t(`Status updated to ${STATUS_LABEL[s].en}`, `تم تحديث الحالة إلى ${STATUS_LABEL[s].ar}`),
                  );
                }}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-2.5 text-sm transition-colors ${
                  status === s ? "border-gold bg-gold/10 text-foreground" : "border-border text-muted-foreground hover:border-gold"
                }`}
              >
                {isAr ? STATUS_LABEL[s].ar : STATUS_LABEL[s].en}
                {status === s && <span className="size-2 rounded-full bg-gold" />}
              </button>
            ))}
          </div>
        </PanelCard>
      </div>

      <PanelCard title={t("Internal notes", "ملاحظات داخلية")}>
        <div className="space-y-4">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            placeholder={t("Add a note about this reservation…", "أضف ملاحظة عن هذا الحجز…")}
            className="w-full rounded-2xl border border-border bg-transparent p-4 text-sm outline-none focus:border-gold"
          />
          <button
            onClick={addNote}
            className="rounded-xl bg-primary px-5 py-2 font-button text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-primary-foreground"
          >
            {t("Add note", "إضافة ملاحظة")}
          </button>
          <ul className="divide-y divide-border">
            {notes.map((n) => (
              <li key={n.id} className="py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-button text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{n.author}</p>
                  <span className="text-xs text-muted-foreground" dir="ltr">{n.at}</span>
                </div>
                <p className="mt-1 text-sm">{n.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </PanelCard>
    </div>
  );
}