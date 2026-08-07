import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { brands } from "@/data/site";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/brands")({
  component: AdminBrands,
});

function AdminBrands() {
  const { t, isAr } = useI18n();

  return (
    <PanelCard
      title={t("Brands", "العلامات")}
      action={
        <button
          onClick={() => toast(t("New brand draft created", "تم إنشاء مسودة علامة"))}
          className="rounded-2xl bg-gold px-4 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground"
        >
          {t("New brand", "علامة جديدة")}
        </button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {brands.map((b) => (
          <div key={b.name} className="overflow-hidden rounded-2xl border border-border">
            <img src={b.image} alt={isAr ? b.nameAr : b.name} className="h-36 w-full object-cover" loading="lazy" />
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate font-display text-lg">{isAr ? b.nameAr : b.name}</p>
                <p className="text-xs text-muted-foreground">
                  {isAr ? b.cuisineAr : b.cuisine} · {isAr ? b.locationAr : b.location}
                </p>
              </div>
              <button
                onClick={() => toast(t(`Editing ${b.name}`, `تعديل ${b.nameAr}`))}
                className="shrink-0 rounded-xl border border-border px-3 py-1.5 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em]"
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
