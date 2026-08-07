import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { ADMIN_POSTS } from "@/data/panel";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/news")({
  component: AdminNews,
});

function AdminNews() {
  const { t, isAr } = useI18n();

  return (
    <PanelCard
      title={t("News & stories", "الأخبار والمقالات")}
      action={
        <button
          onClick={() => toast(t("New post drafted", "تم إنشاء مسودة مقال"))}
          className="rounded-2xl bg-gold px-4 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground"
        >
          {t("New post", "مقال جديد")}
        </button>
      }
    >
      <div className="divide-y divide-border">
        {ADMIN_POSTS.map((p) => (
          <div key={p.title} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div className="min-w-0">
              <p className="font-display text-lg">{isAr ? p.titleAr : p.title}</p>
              <p className="text-xs text-muted-foreground">
                {isAr ? p.categoryAr : p.category} · <span dir="ltr">{p.date}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${
                  p.status === "published" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                {p.status === "published" ? t("Published", "منشور") : t("Draft", "مسودة")}
              </span>
              <button
                onClick={() => toast(t("Post opened", "تم فتح المقال"))}
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
