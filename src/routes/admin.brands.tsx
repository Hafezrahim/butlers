import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { AddButton, CrudFormDialog, DeleteButton, EditButton, ExportButton, RowActions, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { exportToCsv } from "@/lib/utils";
import { usePanelData, type BrandRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/brands")({
  component: AdminBrands,
});

const STATUS_OPTIONS = [
  { value: "live", label: "Live", labelAr: "منشور" },
  { value: "draft", label: "Draft", labelAr: "مسودة" },
];

const FIELDS: CrudField[] = [
  { key: "name", label: "Name", labelAr: "الاسم", required: true },
  { key: "nameAr", label: "Name (Arabic)", labelAr: "الاسم (عربي)", required: true },
  { key: "cuisine", label: "Cuisine", labelAr: "المطبخ" },
  { key: "cuisineAr", label: "Cuisine (Arabic)", labelAr: "المطبخ (عربي)" },
  { key: "location", label: "Location", labelAr: "الموقع" },
  { key: "locationAr", label: "Location (Arabic)", labelAr: "الموقع (عربي)" },
  { key: "tags", label: "Tags (comma separated)", labelAr: "الوسوم (مفصولة بفاصلة)", full: true },
  { key: "tagsAr", label: "Tags Arabic (comma separated)", labelAr: "الوسوم بالعربية (مفصولة بفاصلة)", full: true },
  { key: "image", label: "Image URL", labelAr: "رابط الصورة", full: true },
  { key: "status", label: "Status", labelAr: "الحالة", type: "select", options: STATUS_OPTIONS },
];

function AdminBrands() {
  const { t, isAr } = useI18n();
  const { data, create, update, remove } = usePanelData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BrandRow | null>(null);

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (b: BrandRow) => {
    setEditing(b);
    setOpen(true);
  };

  const handleSubmit = (values: RecordValues) => {
    const payload = {
      name: String(values['name'] ?? ""),
      nameAr: String(values['nameAr'] ?? ""),
      cuisine: String(values['cuisine'] ?? ""),
      cuisineAr: String(values['cuisineAr'] ?? ""),
      location: String(values['location'] ?? ""),
      locationAr: String(values['locationAr'] ?? ""),
      image: String(values['image'] ?? ""),
      tags: String(values['tags'] ?? ""),
      tagsAr: String(values['tagsAr'] ?? ""),
      status: String(values['status'] ?? "live"),
    };
    if (editing) {
      update("brands", editing.id, payload);
      toast.success(t("Brand updated", "تم تحديث العلامة"));
    } else {
      create("brands", payload);
      toast.success(t("Brand created", "تم إنشاء العلامة"));
    }
  };

  return (
    <PanelCard
      title={t("Brands", "العلامات التجارية")}
      action={
        <div className="flex gap-2">
          <ExportButton onClick={() => exportToCsv(data.brands, "Brands")} />
          <AddButton onClick={openCreate} label={t("New brand", "علامة جديدة")} />
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {data.brands.map((b) => (
          <div key={b.id} className="overflow-hidden rounded-2xl border border-border">
            {b.image ? (
              <img src={b.image} alt={isAr ? b.nameAr : b.name} className="h-36 w-full object-cover" loading="lazy" />
            ) : (
              <div className="flex h-36 w-full items-center justify-center bg-muted text-muted-foreground">
                <ImageOff className="size-6" />
              </div>
            )}
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate font-display text-lg">{isAr ? b.nameAr : b.name}</p>
                <p className="text-xs text-muted-foreground">
                  {isAr ? b.cuisineAr : b.cuisine} · {isAr ? b.locationAr : b.location}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {(isAr ? b.tagsAr : b.tags)
                    .split(/[,،]/)
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                    .map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
              <RowActions>
                <EditButton onClick={() => openEdit(b)} />
                <DeleteButton
                  name={isAr ? b.nameAr : b.name}
                  onConfirm={() => {
                    remove("brands", b.id);
                    toast.success(t("Brand deleted", "تم حذف العلامة"));
                  }}
                />
              </RowActions>
            </div>
          </div>
        ))}
      </div>

      <CrudFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? t("Edit brand", "تعديل العلامة") : t("New brand", "علامة جديدة")}
        fields={FIELDS}
        initial={editing as unknown as RecordValues}
        onSubmit={handleSubmit}
      />
    </PanelCard>
  );
}
