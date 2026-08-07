import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { services } from "@/data/site";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/services")({
  component: AdminServices,
});

function AdminServices() {
  const { t, isAr } = useI18n();

  return (
    <PanelCard
      title={t("Services", "الخدمات")}
      action={
        <button
          onClick={() => toast(t("New service draft created", "تم إنشاء مسودة خدمة"))}
          className="rounded-2xl bg-gold px-4 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground"
        >
          {t("New service", "خدمة جديدة")}
        </button>
      }
    >
      <div className="divide-y divide-border">
        {services.map((s) => (
          <div key={s.slug} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div className="min-w-0 max-w-xl">
              <p className="font-display text-lg">{isAr ? s.nameAr : s.name}</p>
              <p className="text-xs text-muted-foreground">{isAr ? s.descAr : s.desc}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/15 px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-primary">
                {t("Live", "منشور")}
              </span>
              <button
                onClick={() => toast(t(`Editing ${s.name}`, `تعديل ${s.nameAr}`))}
                className="rounded-xl border border-border px-3 py-1.5 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em]"
              >
                {t("Edit", "تعديل")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}
