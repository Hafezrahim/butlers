import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { ADMIN_APPLICATIONS } from "@/data/panel";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/careers")({
  component: AdminCareers,
});

const STATUS_STYLE: Record<string, string> = {
  review: "bg-muted text-foreground",
  interview: "bg-gold/20 text-gold",
  hired: "bg-primary/15 text-primary",
};

const STATUS_AR: Record<string, string> = {
  review: "قيد المراجعة",
  interview: "مقابلة",
  hired: "تم التعيين",
};

function AdminCareers() {
  const { t, isAr } = useI18n();

  return (
    <PanelCard
      title={t("Careers & applications", "الوظائف والطلبات")}
      action={
        <button
          onClick={() => toast(t("New opening drafted", "تم إنشاء وظيفة جديدة"))}
          className="rounded-2xl bg-gold px-4 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground"
        >
          {t("New opening", "وظيفة جديدة")}
        </button>
      }
    >
      <div className="divide-y divide-border">
        {ADMIN_APPLICATIONS.map((a) => (
          <div key={a.name} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div>
              <p className="font-display text-lg">{isAr ? a.nameAr : a.name}</p>
              <p className="text-xs text-muted-foreground">
                {isAr ? a.roleAr : a.role} · {isAr ? a.venueAr : a.venue} · <span dir="ltr">{a.date}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${STATUS_STYLE[a.status]}`}>
                {isAr ? STATUS_AR[a.status] : a.status}
              </span>
              <button
                onClick={() => toast(t("CV opened", "تم فتح السيرة الذاتية"))}
                className="rounded-xl border border-border px-3 py-1.5 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em]"
              >
                {t("View CV", "عرض السيرة")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}
