import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { AddButton, CrudFormDialog, DeleteButton, EditButton, ExportButton, RowActions, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { exportToCsv } from "@/lib/utils";
import { usePanelData, type OpeningRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/openings")({ component: AdminOpenings });

const FIELDS: CrudField[] = [
  { key: "title", label: "Title", labelAr: "المسمى", required: true },
  { key: "titleAr", label: "Title (Arabic)", labelAr: "المسمى (عربي)", required: true },
  { key: "dept", label: "Department", labelAr: "القسم" },
  { key: "deptAr", label: "Department (Arabic)", labelAr: "القسم (عربي)" },
  { key: "type", label: "Type", labelAr: "نوع الدوام" },
  { key: "typeAr", label: "Type (Arabic)", labelAr: "نوع الدوام (عربي)" },
  { key: "reqs", label: "Requirements", labelAr: "المتطلبات", type: "textarea", full: true },
  { key: "reqsAr", label: "Requirements (Arabic)", labelAr: "المتطلبات (عربي)", type: "textarea", full: true },
  {
    key: "status", label: "Status", labelAr: "الحالة", type: "select",
    options: [
      { value: "open", label: "Open", labelAr: "مفتوحة" },
      { value: "closed", label: "Closed", labelAr: "مغلقة" },
    ],
  },
];

function AdminOpenings() {
  const { t, isAr } = useI18n();
  const { data, create, update, remove } = usePanelData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<OpeningRow | null>(null);

  const handleSubmit = (values: RecordValues) => {
    const payload = {
      title: String(values["title"] ?? ""),
      titleAr: String(values["titleAr"] ?? ""),
      dept: String(values["dept"] ?? ""),
      deptAr: String(values["deptAr"] ?? ""),
      type: String(values["type"] ?? ""),
      typeAr: String(values["typeAr"] ?? ""),
      reqs: String(values["reqs"] ?? ""),
      reqsAr: String(values["reqsAr"] ?? ""),
      status: String(values["status"] ?? "open"),
    };
    if (editing) {
      update("openings", editing.id, payload);
      toast.success(t("Opening updated", "تم تحديث الوظيفة"));
    } else {
      create("openings", payload);
      toast.success(t("Opening created", "تم إنشاء الوظيفة"));
    }
  };

  return (
    <PanelCard
      title={t("Job openings", "الوظائف الشاغرة")}
      action={
        <div className="flex gap-2">
          <ExportButton onClick={() => exportToCsv(data.openings, "Openings")} />
          <AddButton onClick={() => { setEditing(null); setOpen(true); }} label={t("New opening", "وظيفة جديدة")} />
        </div>
      }
    >
      <div className="divide-y divide-border">
        {data.openings.map((o) => (
          <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div className="min-w-0 max-w-xl">
              <p className="font-display text-lg">{isAr ? o.titleAr : o.title}</p>
              <p className="text-xs text-muted-foreground">
                {isAr ? o.deptAr : o.dept} · {isAr ? o.typeAr : o.type}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{isAr ? o.reqsAr : o.reqs}</p>
            </div>
            <RowActions>
              <span className={`rounded-full px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${o.status === "open" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}>
                {o.status === "open" ? t("Open", "مفتوحة") : t("Closed", "مغلقة")}
              </span>
              <EditButton onClick={() => { setEditing(o); setOpen(true); }} />
              <DeleteButton name={isAr ? o.titleAr : o.title} onConfirm={() => { remove("openings", o.id); toast.success(t("Opening deleted", "تم حذف الوظيفة")); }} />
            </RowActions>
          </div>
        ))}
        {data.openings.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">{t("No openings", "لا توجد وظائف")}</p>}
      </div>
      <CrudFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? t("Edit opening", "تعديل الوظيفة") : t("New opening", "وظيفة جديدة")}
        fields={FIELDS}
        initial={editing as unknown as RecordValues}
        onSubmit={handleSubmit}
      />
    </PanelCard>
  );
}
