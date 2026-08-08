import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { AddButton, CrudFormDialog, DeleteButton, EditButton, ExportButton, RowActions, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { exportToCsv } from "@/lib/utils";
import { usePanelData, type PostRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/news")({
  component: AdminNews,
});

const FIELDS: CrudField[] = [
  { key: "title", label: "Title", labelAr: "العنوان", required: true },
  { key: "titleAr", label: "Title (Arabic)", labelAr: "العنوان (عربي)", required: true },
  { key: "category", label: "Category", labelAr: "التصنيف" },
  { key: "categoryAr", label: "Category (Arabic)", labelAr: "التصنيف (عربي)" },
  { key: "date", label: "Date", labelAr: "التاريخ", type: "date" },
  {
    key: "status",
    label: "Status",
    labelAr: "الحالة",
    type: "select",
    options: [
      { value: "published", label: "Published", labelAr: "منشور" },
      { value: "draft", label: "Draft", labelAr: "مسودة" },
    ],
  },
];

function AdminNews() {
  const { t, isAr } = useI18n();
  const { data, create, update, remove } = usePanelData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PostRow | null>(null);

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (row: PostRow) => {
    setEditing(row);
    setOpen(true);
  };

  const handleSubmit = (values: RecordValues) => {
    const payload = {
      title: String(values["title"]),
      titleAr: String(values["titleAr"]),
      category: String(values["category"]),
      categoryAr: String(values["categoryAr"]),
      date: String(values["date"]),
      status: String(values["status"]),
    };
    if (editing) {
      update("posts", editing.id, payload);
      toast(t("Post updated", "تم تحديث المقال"));
    } else {
      create("posts", payload);
      toast(t("Post created", "تم إنشاء المقال"));
    }
  };

  return (
    <PanelCard
      title={t("News & Updates", "الأخبار والتحديثات")}
      action={
        <div className="flex gap-2">
          <ExportButton onClick={() => exportToCsv(data.posts, "News")} />
          <AddButton onClick={openCreate} label={t("New post", "خبر جديد")} />
        </div>
      }
    >
      <div className="divide-y divide-border">
        {data.posts.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div className="min-w-0">
              <p className="font-display text-lg">{isAr ? p.titleAr : p.title}</p>
              <p className="text-xs text-muted-foreground">
                {isAr ? p.categoryAr : p.category} · <span dir="ltr">{p.date}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${
                  p.status === "published" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                }`}
              >
                {p.status === "published" ? t("Published", "منشور") : t("Draft", "مسودة")}
              </span>
              <RowActions>
                <EditButton onClick={() => openEdit(p)} />
                <DeleteButton
                  name={isAr ? p.titleAr : p.title}
                  onConfirm={() => {
                    remove("posts", p.id);
                    toast(t("Post deleted", "تم حذف المقال"));
                  }}
                />
              </RowActions>
            </div>
          </div>
        ))}
        {data.posts.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">{t("No posts found", "لا توجد مقالات")}</p>
        )}
      </div>

      <CrudFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? t("Edit post", "تعديل المقال") : t("New post", "مقال جديد")}
        fields={FIELDS}
        {...(editing ? { initial: editing } : {})}
        onSubmit={handleSubmit}
      />
    </PanelCard>
  );
}
