import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PanelCard, StatusPill } from "@/components/panel/PanelShell";
import { MY_RESERVATIONS, STATUS_LABEL, type ResStatus } from "@/data/panel";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/account/reservations")({
  component: MyReservations,
});

const FILTERS: (ResStatus | "all")[] = ["all", "confirmed", "seated", "cancelled"];

function MyReservations() {
  const { t, isAr } = useI18n();
  const [filter, setFilter] = useState<ResStatus | "all">("all");
  const rows = MY_RESERVATIONS.filter((r) => filter === "all" || r.status === filter);

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
          <div key={r.code} className="rounded-2xl border border-border p-4">
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

            {r.status !== "cancelled" && (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => toast(t("Reschedule request sent", "تم إرسال طلب تغيير الموعد"))}
                  className="rounded-xl border border-border px-4 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.1em]"
                >
                  {t("Reschedule", "تغيير الموعد")}
                </button>
                <button
                  onClick={() => toast(t("Cancellation request sent", "تم إرسال طلب الإلغاء"))}
                  className="rounded-xl border border-border px-4 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-destructive"
                >
                  {t("Cancel", "إلغاء")}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </PanelCard>
  );
}