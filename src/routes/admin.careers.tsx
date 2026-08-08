import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { AddButton, CrudFormDialog, DeleteButton, EditButton, ExportButton, RowActions, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { exportToCsv } from "@/lib/utils";
import { usePanelData, type ApplicationRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/careers")({
  component: AdminCareers,
});

const STATUS_STYLE: Record<string, string> = {
  review: "bg-muted text-foreground",
  interview: "bg-gold/20 text-gold",
  hired: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  rejected: "bg-destructive/15 text-destructive",
};

const STATUS_AR: Record<string, string> = {
  review: "قيد المراجعة",
  interview: "مقابلة",
  hired: "تم التعيين",
  rejected: "مرفوض",
};

const FIELDS: CrudField[] = [
  { key: "name", label: "Name", labelAr: "الاسم", required: true },
  { key: "nameAr", label: "Name (Arabic)", labelAr: "الاسم (عربي)", required: true },
  { key: "role", label: "Role", labelAr: "الوظيفة", required: true },
  { key: "roleAr", label: "Role (Arabic)", labelAr: "الوظيفة (عربي)", required: true },
  { key: "venue", label: "Venue", labelAr: "المكان" },
  { key: "venueAr", label: "Venue (Arabic)", labelAr: "المكان (عربي)" },
  { key: "date", label: "Date", labelAr: "التاريخ", type: "date" },
  {
    key: "status",
    label: "Status",
    labelAr: "الحالة",
    type: "select",
    options: [
      { value: "review", label: "Review", labelAr: "قيد المراجعة" },
      { value: "interview", label: "Interview", labelAr: "مقابلة" },
      { value: "hired", label: "Hired", labelAr: "تم التعيين" },
      { value: "rejected", label: "Rejected", labelAr: "مرفوض" },
    ],
  },
];

function AdminCareers() {
  const { t, isAr } = useI18n();
  const { data, create, update, remove } = usePanelData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ApplicationRow | null>(null);

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (row: ApplicationRow) => {
    setEditing(row);
    setOpen(true);
  };

  const handleSubmit = (values: RecordValues) => {
    const payload = {
      name: String(values["name"]),
      nameAr: String(values["nameAr"]),
      role: String(values["role"]),
      roleAr: String(values["roleAr"]),
      venue: String(values["venue"]),
      venueAr: String(values["venueAr"]),
      date: String(values["date"]),
      status: String(values["status"]),
    };
    if (editing) {
      update("applications", editing.id, payload);
      toast(t("Application updated", "تم تحديث الطلب"));
    } else {
      create("applications", payload);
      toast(t("Application created", "تم إنشاء الطلب"));
    }
  };

  return (
    <PanelCard
      title={t("Applications", "طلبات التوظيف")}
      action={
        <div className="flex gap-2">
          <ExportButton onClick={() => exportToCsv(data.applications, "Applications")} />
          <AddButton onClick={openCreate} label={t("New application", "طلب توظيف جديد")} />
        </div>
      }
    >
      <div className="divide-y divide-border">
        {data.applications.map((a) => (
          <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
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
              <RowActions>
                <EditButton onClick={() => openEdit(a)} />
                <DeleteButton
                  name={isAr ? a.nameAr : a.name}
                  onConfirm={() => {
                    remove("applications", a.id);
                    toast(t("Application deleted", "تم حذف الطلب"));
                  }}
                />
              </RowActions>
            </div>
          </div>
        ))}
        {data.applications.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">{t("No applications found", "لا توجد طلبات")}</p>
        )}
      </div>

      <CrudFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? t("Edit application", "تعديل الطلب") : t("New opening", "وظيفة جديدة")}
        fields={FIELDS}
        {...(editing ? { initial: editing } : {})}
        onSubmit={handleSubmit}
      />
    </PanelCard>
  );
}
