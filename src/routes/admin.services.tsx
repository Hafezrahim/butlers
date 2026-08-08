import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { AddButton, CrudFormDialog, DeleteButton, EditButton, ExportButton, RowActions, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { exportToCsv } from "@/lib/utils";
import { usePanelData, type ServiceRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/services")({
  component: AdminServices,
});

const STATUS_OPTIONS = [
  { value: "live", label: "Live", labelAr: "منشور" },
  { value: "draft", label: "Draft", labelAr: "مسودة" },
];

const FIELDS: CrudField[] = [
  { key: "name", label: "Name", labelAr: "الاسم", required: true },
  { key: "nameAr", label: "Name (Arabic)", labelAr: "الاسم (عربي)", required: true },
  { key: "slug", label: "Slug", labelAr: "المعرّف", required: true },
  { key: "desc", label: "Description", labelAr: "الوصف", type: "textarea", full: true },
  { key: "descAr", label: "Description (Arabic)", labelAr: "الوصف (عربي)", type: "textarea", full: true },
  { key: "status", label: "Status", labelAr: "الحالة", type: "select", options: STATUS_OPTIONS },
];

function AdminServices() {
  const { t, isAr } = useI18n();
  const { data, create, update, remove } = usePanelData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceRow | null>(null);

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (s: ServiceRow) => {
    setEditing(s);
    setOpen(true);
  };

  const handleSubmit = (values: RecordValues) => {
    const payload = {
      name: String(values['name'] ?? ""),
      nameAr: String(values['nameAr'] ?? ""),
      slug: String(values['slug'] ?? ""),
      desc: String(values['desc'] ?? ""),
      descAr: String(values['descAr'] ?? ""),
      status: String(values['status'] ?? "live"),
    };
    if (editing) {
      update("services", editing.id, payload);
      toast.success(t("Service updated", "تم تحديث الخدمة"));
    } else {
      create("services", payload);
      toast.success(t("Service created", "تم إنشاء الخدمة"));
    }
  };

  return (
    <PanelCard
      title={t("Services", "الخدمات")}
      action={
        <div className="flex gap-2">
          <ExportButton onClick={() => exportToCsv(data.services, "Services")} />
          <AddButton onClick={openCreate} label={t("New service", "خدمة جديدة")} />
        </div>
      }
    >
      <div className="divide-y divide-border">
        {data.services.map((s) => (
          <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div className="min-w-0 max-w-xl">
              <p className="font-display text-lg">{isAr ? s.nameAr : s.name}</p>
              <p className="text-xs text-muted-foreground">{isAr ? s.descAr : s.desc}</p>
            </div>
            <RowActions>
              <span
                className={`rounded-full px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${
                  s.status === "live" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                }`}
              >
                {s.status === "live" ? t("Live", "منشور") : t("Draft", "مسودة")}
              </span>
              <EditButton onClick={() => openEdit(s)} />
              <DeleteButton
                name={isAr ? s.nameAr : s.name}
                onConfirm={() => {
                  remove("services", s.id);
                  toast.success(t("Service deleted", "تم حذف الخدمة"));
                }}
              />
            </RowActions>
          </div>
        ))}
      </div>

      <CrudFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? t("Edit service", "تعديل الخدمة") : t("New service", "خدمة جديدة")}
        fields={FIELDS}
        initial={editing as unknown as RecordValues}
        onSubmit={handleSubmit}
      />
    </PanelCard>
  );
}
