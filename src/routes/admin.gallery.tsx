import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { galleryItems } from "@/data/site";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

function AdminGallery() {
  const { t, isAr } = useI18n();

  return (
    <PanelCard
      title={t("Gallery", "معرض الصور")}
      action={
        <button
          onClick={() => toast(t("Upload started", "بدأ الرفع"))}
          className="rounded-2xl bg-gold px-4 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground"
        >
          {t("Upload media", "رفع صور")}
        </button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((g) => (
          <figure key={g.alt} className="overflow-hidden rounded-2xl border border-border">
            <img src={g.src} alt={isAr ? g.altAr : g.alt} className="h-40 w-full object-cover" loading="lazy" />
            <figcaption className="flex items-center justify-between gap-2 p-3">
              <span className="font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                {isAr ? g.categoryAr : g.category}
              </span>
              <button
                onClick={() => toast(t("Media removed", "تم حذف الصورة"))}
                className="font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-destructive"
              >
                {t("Remove", "حذف")}
              </button>
            </figcaption>
          </figure>
        ))}
      </div>
    </PanelCard>
  );
}
