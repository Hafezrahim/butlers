import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { AddButton, CrudFormDialog, DeleteButton, EditButton, ExportButton, RowActions, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { exportToCsv } from "@/lib/utils";
import { usePanelData, type StatRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/stats")({ component: AdminStats });

const FIELDS: CrudField[] = [
  { key: "value", label: "Value", labelAr: "القيمة", required: true },
  { key: "label", label: "Label", labelAr: "الوصف", required: true },
  { key: "labelAr", label: "Label (Arabic)", labelAr: "الوصف (عربي)", required: true },
];

function AdminStats() {
  const { t, isAr } = useI18n();
  const { data, create, update, remove } = usePanelData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<StatRow | null>(null);

  const handleSubmit = (values: RecordValues) => {
    const payload = {
      value: String(values["value"] ?? ""),
      label: String(values["label"] ?? ""),
      labelAr: String(values["labelAr"] ?? ""),
    };
    if (editing) {
      update("stats", editing.id, payload);
      toast.success(t("Stat updated", "تم تحديث الإحصائية"));
    } else {
      create("stats", payload);
      toast.success(t("Stat created", "تم إنشاء الإحصائية"));
    }
  };

  return (
    <PanelCard
      title={t("Homepage stats", "إحصائيات الصفحة الرئيسية")}
      action={
        <div className="flex gap-2">
          <ExportButton onClick={() => exportToCsv(data.stats, "Stats")} />
          <AddButton onClick={() => { setEditing(null); setOpen(true); }} label={t("New stat", "إحصائية جديدة")} />
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.stats.map((s) => (
          <div key={s.id} className="rounded-2xl border border-border bg-card p-5">
            <p className="font-display text-3xl text-gold">{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{isAr ? s.labelAr : s.label}</p>
            <div className="mt-4 flex justify-end">
              <RowActions>
                <EditButton onClick={() => { setEditing(s); setOpen(true); }} />
                <DeleteButton name={isAr ? s.labelAr : s.label} onConfirm={() => { remove("stats", s.id); toast.success(t("Stat deleted", "تم حذف الإحصائية")); }} />
              </RowActions>
            </div>
          </div>
        ))}
      </div>
      <CrudFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? t("Edit stat", "تعديل الإحصائية") : t("New stat", "إحصائية جديدة")}
        fields={FIELDS}
        initial={editing as unknown as RecordValues}
        onSubmit={handleSubmit}
      />
    </PanelCard>
  );
}
