import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { PanelCard } from "@/components/panel/PanelShell";
import { AddButton, CrudFormDialog, DeleteButton, EditButton, ExportButton, RowActions, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { exportToCsv } from "@/lib/utils";
import { usePanelData, type TestimonialRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/testimonials")({ component: AdminTestimonials });

const FIELDS: CrudField[] = [
  { key: "name", label: "Guest name", labelAr: "اسم الضيف", required: true },
  { key: "nameAr", label: "Guest name (Arabic)", labelAr: "اسم الضيف (عربي)", required: true },
  { key: "text", label: "Quote", labelAr: "الاقتباس", type: "textarea", full: true },
  { key: "textAr", label: "Quote (Arabic)", labelAr: "الاقتباس (عربي)", type: "textarea", full: true },
  { key: "rating", label: "Rating", labelAr: "التقييم", type: "number" },
  {
    key: "status", label: "Status", labelAr: "الحالة", type: "select",
    options: [
      { value: "published", label: "Published", labelAr: "منشور" },
      { value: "draft", label: "Draft", labelAr: "مسودة" },
    ],
  },
];

function AdminTestimonials() {
  const { t, isAr } = useI18n();
  const { data, create, update, remove } = usePanelData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TestimonialRow | null>(null);

  const handleSubmit = (values: RecordValues) => {
    const payload = {
      name: String(values["name"] ?? ""),
      nameAr: String(values["nameAr"] ?? ""),
      text: String(values["text"] ?? ""),
      textAr: String(values["textAr"] ?? ""),
      rating: Number(values["rating"] ?? 5),
      status: String(values["status"] ?? "published"),
    };
    if (editing) {
      update("testimonials", editing.id, payload);
      toast.success(t("Testimonial updated", "تم تحديث الرأي"));
    } else {
      create("testimonials", payload);
      toast.success(t("Testimonial created", "تم إنشاء الرأي"));
    }
  };

  return (
    <PanelCard
      title={t("Testimonials", "آراء الضيوف")}
      action={
        <div className="flex gap-2">
          <ExportButton onClick={() => exportToCsv(data.testimonials, "Testimonials")} />
          <AddButton onClick={() => { setEditing(null); setOpen(true); }} label={t("New testimonial", "رأي جديد")} />
        </div>
      }
    >
      <div className="divide-y divide-border">
        {data.testimonials.map((s) => (
          <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div className="min-w-0 max-w-xl">
              <p className="font-display text-lg">{isAr ? s.nameAr : s.name}</p>
              <div className="mt-1 flex gap-0.5 text-gold">
                {Array.from({ length: Math.max(0, Math.min(5, s.rating)) }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">“{isAr ? s.textAr : s.text}”</p>
            </div>
            <RowActions>
              <span className={`rounded-full px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${s.status === "published" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}>
                {s.status === "published" ? t("Published", "منشور") : t("Draft", "مسودة")}
              </span>
              <EditButton onClick={() => { setEditing(s); setOpen(true); }} />
              <DeleteButton name={isAr ? s.nameAr : s.name} onConfirm={() => { remove("testimonials", s.id); toast.success(t("Testimonial deleted", "تم حذف الرأي")); }} />
            </RowActions>
          </div>
        ))}
        {data.testimonials.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">{t("No testimonials", "لا توجد آراء")}</p>}
      </div>
      <CrudFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? t("Edit testimonial", "تعديل الرأي") : t("New testimonial", "رأي جديد")}
        fields={FIELDS}
        initial={editing as unknown as RecordValues}
        onSubmit={handleSubmit}
      />
    </PanelCard>
  );
}
