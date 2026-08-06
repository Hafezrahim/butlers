import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { ADMIN_EVENTS } from "@/data/panel";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/events")({
  component: AdminEvents,
});

const STATUS_STYLE: Record<string, string> = {
  published: "bg-primary/15 text-primary",
  "sold out": "bg-gold/20 text-gold",
  draft: "bg-muted text-muted-foreground",
};

const STATUS_AR: Record<string, string> = {
  published: "منشور",
  "sold out": "نفدت التذاكر",
  draft: "مسودة",
};

function AdminEvents() {
  const { t, isAr } = useI18n();

  return (
    <PanelCard
      title={t("Events", "الفعاليات")}
      action={
        <button
          onClick={() => toast(t("Event draft created", "تم إنشاء مسودة فعالية"))}
          className="rounded-2xl bg-gold px-4 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground"
        >
          {t("New event", "فعالية جديدة")}
        </button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {ADMIN_EVENTS.map((e) => {
          const pct = Math.round((e.booked / e.seats) * 100);
          return (
            <div key={e.title} className="rounded-2xl border border-border p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg">{isAr ? e.titleAr : e.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {isAr ? e.venueAr : e.venue} · <span dir="ltr">{e.date}</span>
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${STATUS_STYLE[e.status]}`}>
                  {isAr ? STATUS_AR[e.status] : e.status}
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {e.booked}/{e.seats} {t("seats booked", "مقعد محجوز")} · {pct}%
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => toast(t("Opening editor", "جارٍ فتح المحرر"))}
                  className="rounded-xl border border-border px-4 py-2 font-button text-[0.65rem] font-semibold uppercase tracking-[0.1em]"
                >
                  {t("Edit", "تعديل")}
                </button>
                <button
                  onClick={() => toast(t("Guest list exported", "تم تصدير قائمة الضيوف"))}
                  className="rounded-xl border border-border px-4 py-2 font-button text-[0.65rem] font-semibold uppercase tracking-[0.1em]"
                >
                  {t("Guest list", "قائمة الضيوف")}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </PanelCard>
  );
}