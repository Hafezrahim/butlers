import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PanelCard, StatusPill } from "@/components/panel/PanelShell";
import { STATUS_LABEL, type ResStatus } from "@/data/panel";
import { CrudFormDialog, DeleteButton, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { usePanelData, type ReservationRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

const RESCHEDULE_FIELDS: CrudField[] = [
  { key: "date", label: "New date", labelAr: "التاريخ الجديد", type: "date", required: true },
  { key: "time", label: "New time", labelAr: "الوقت الجديد", type: "time", required: true },
  { key: "party", label: "Party size", labelAr: "عدد الأفراد", type: "number" },
];

const MY_GUEST = "Hafez Rahim";

export const Route = createFileRoute("/account/reservations")({
  component: MyReservations,
});

const FILTERS: (ResStatus | "all")[] = ["all", "confirmed", "seated", "cancelled"];

function MyReservations() {
  const { t, isAr } = useI18n();
  const { data, update, remove } = usePanelData();
  const [filter, setFilter] = useState<ResStatus | "all">("all");
  const [editing, setEditing] = useState<ReservationRow | null>(null);
  const mine = data.reservations.filter((r) => r.guest === MY_GUEST);
  const rows = mine.filter((r) => filter === "all" || r.status === filter);

  const submitReschedule = (v: RecordValues) => {
    if (!editing) return;
    update("reservations", editing.id, { date: String(v.date), time: String(v.time), party: Number(v.party) || editing.party, status: "pending" });
    toast.success(t("Reservation rescheduled", "تم تغيير موعد الحجز"));
  };

  return (
    <PanelCard title={t("My reservations", "حجوزاتي")}>
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 font-button text-[0.68rem] font-semibold uppercase tracking-[0.1em] transition-colors ${
              filter === f ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-gold"
            }`}
          >
            {f === "all" ? t("All", "الكل") : isAr ? STATUS_LABEL[f].ar : STATUS_LABEL[f].en}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg">{isAr ? r.brandAr : r.brand}</p>
                <p className="text-xs text-muted-foreground">
                  {isAr ? r.branchAr : r.branch} · <span dir="ltr">{r.date}</span> · <span dir="ltr">{r.time}</span> ·{" "}
                  {r.party} {t("guests", "ضيوف")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-button text-xs tracking-[0.1em] text-muted-foreground" dir="ltr">{r.code}</span>
                <StatusPill status={r.status} />
              </div>
            </div>

            {r.addons.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {r.addons.map((a) => (
                  <span key={a.en} className="rounded-full bg-muted px-3 py-1 text-xs">
                    {isAr ? a.ar : a.en}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {r.status !== "cancelled" && (
                <>
                  <button
                    onClick={() => setEditing(r)}
                    className="rounded-xl border border-border px-4 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.1em] transition-colors hover:border-gold"
                  >
                    {t("Reschedule", "تغيير الموعد")}
                  </button>
                  <button
                    onClick={() => {
                      update("reservations", r.id, { status: "cancelled" });
                      toast.success(t("Reservation cancelled", "تم إلغاء الحجز"));
                    }}
                    className="rounded-xl border border-border px-4 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-destructive"
                  >
                    {t("Cancel", "إلغاء")}
                  </button>
                </>
              )}
              <DeleteButton
                name={r.code}
                onConfirm={() => {
                  remove("reservations", r.id);
                  toast.success(t("Reservation removed", "تم حذف الحجز"));
                }}
              />
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">{t("No reservations found", "لا توجد حجوزات")}</p>
        )}
      </div>

      <CrudFormDialog
        open={!!editing}
        onOpenChange={(v) => !v && setEditing(null)}
        title={t("Reschedule reservation", "تغيير موعد الحجز")}
        fields={RESCHEDULE_FIELDS}
        initial={editing ? { date: editing.date, time: editing.time, party: editing.party } : undefined}
        onSubmit={submitReschedule}
        submitLabel={t("Update", "تحديث")}
      />
    </PanelCard>
  );
}