import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { AddButton, CrudFormDialog, DeleteButton, EditButton, RowActions, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { usePanelData, type GalleryRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

const FIELDS: CrudField[] = [
  { key: "src", label: "Image URL", labelAr: "رابط الصورة", full: true, required: true },
  { key: "category", label: "Category", labelAr: "التصنيف" },
  { key: "categoryAr", label: "Category (Arabic)", labelAr: "التصنيف (عربي)" },
  { key: "alt", label: "Alt text", labelAr: "النص البديل" },
  { key: "altAr", label: "Alt text (Arabic)", labelAr: "النص البديل (عربي)" },
];

function AdminGallery() {
  const { t, isAr } = useI18n();
  const { data, create, update, remove } = usePanelData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryRow | null>(null);

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (g: GalleryRow) => {
    setEditing(g);
    setOpen(true);
  };

  const handleSubmit = (values: RecordValues) => {
    const payload = {
      src: String(values['src'] ?? ""),
      category: String(values['category'] ?? ""),
      categoryAr: String(values['categoryAr'] ?? ""),
      alt: String(values['alt'] ?? ""),
      altAr: String(values['altAr'] ?? ""),
    };
    if (editing) {
      update("gallery", editing.id, payload);
      toast.success(t("Media updated", "تم تحديث الصورة"));
    } else {
      create("gallery", payload);
      toast.success(t("Media added", "تمت إضافة الصورة"));
    }
  };

  return (
    <PanelCard title={t("Gallery", "معرض الصور")} action={<AddButton onClick={openCreate} label={t("Add media", "إضافة صورة")} />}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.gallery.map((g) => (
          <figure key={g.id} className="overflow-hidden rounded-2xl border border-border">
            {g.src ? (
              <img src={g.src} alt={isAr ? g.altAr : g.alt} className="h-40 w-full object-cover" loading="lazy" />
            ) : (
              <div className="flex h-40 w-full items-center justify-center bg-muted text-muted-foreground">
                <ImageOff className="size-6" />
              </div>
            )}
            <figcaption className="flex items-center justify-between gap-2 p-3">
              <span className="font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                {isAr ? g.categoryAr : g.category}
              </span>
              <RowActions>
                <EditButton onClick={() => openEdit(g)} />
                <DeleteButton
                  name={isAr ? g.altAr : g.alt}
                  onConfirm={() => {
                    remove("gallery", g.id);
                    toast.success(t("Media removed", "تم حذف الصورة"));
                  }}
                />
              </RowActions>
            </figcaption>
          </figure>
        ))}
      </div>

      <CrudFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? t("Edit media", "تعديل الصورة") : t("Add media", "إضافة صورة")}
        fields={FIELDS}
        initial={editing as unknown as RecordValues}
        onSubmit={handleSubmit}
      />
    </PanelCard>
  );
}
