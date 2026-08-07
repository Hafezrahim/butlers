import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { ADMIN_TICKETS } from "@/data/panel";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/support")({
  component: AdminSupport,
});

const FILTERS = ["all", "open", "pending", "resolved"] as const;

const LABEL: Record<string, { en: string; ar: string }> = {
  all: { en: "All", ar: "الكل" },
  open: { en: "Open", ar: "مفتوح" },
  pending: { en: "Pending", ar: "قيد الانتظار" },
  resolved: { en: "Resolved", ar: "تم الحل" },
  high: { en: "High", ar: "عالية" },
  medium: { en: "Medium", ar: "متوسطة" },
  low: { en: "Low", ar: "منخفضة" },
};

const STATUS_STYLE: Record<string, string> = {
  open: "bg-destructive/15 text-destructive",
  pending: "bg-gold/20 text-gold",
  resolved: "bg-primary/15 text-primary",
};

function AdminSupport() {
  const { t, isAr } = useI18n();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const rows = ADMIN_TICKETS.filter((x) => filter === "all" || x.status === filter);

  return (
    <PanelCard title={t("Support tickets", "تذاكر الدعم")}>
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 font-button text-[0.68rem] font-semibold uppercase tracking-[0.1em] transition-colors ${
              filter === f ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-gold"
            }`}
          >
            {isAr ? LABEL[f].ar : LABEL[f].en}
          </button>
        ))}
      </div>

      <div className="divide-y divide-border">
        {rows.map((x) => (
          <div key={x.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div className="min-w-0">
              <p className="font-display text-lg">{isAr ? x.subjectAr : x.subject}</p>
              <p className="text-xs text-muted-foreground">
                <span dir="ltr">{x.id}</span> · {isAr ? x.guestAr : x.guest} · {isAr ? x.channelAr : x.channel} ·{" "}
                <span dir="ltr">{x.updated}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-border px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                {isAr ? LABEL[x.priority].ar : LABEL[x.priority].en}
              </span>
              <span className={`rounded-full px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${STATUS_STYLE[x.status]}`}>
                {isAr ? LABEL[x.status].ar : LABEL[x.status].en}
              </span>
              <button
                onClick={() => toast(t(`Ticket ${x.id} opened`, `تم فتح التذكرة ${x.id}`))}
                className="rounded-xl border border-border px-3 py-1.5 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em]"
              >
                {t("Open", "فتح")}
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">{t("No tickets found", "لا توجد تذاكر")}</p>
        )}
      </div>
    </PanelCard>
  );
}
