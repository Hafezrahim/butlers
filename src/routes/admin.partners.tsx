import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { AddButton, CrudFormDialog, DeleteButton, EditButton, ExportButton, RowActions, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { exportToCsv } from "@/lib/utils";
import { usePanelData, type PartnerRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/partners")({ component: AdminPartners });

const FIELDS: CrudField[] = [
  { key: "name", label: "Name", labelAr: "الاسم", required: true },
  { key: "nameAr", label: "Name (Arabic)", labelAr: "الاسم (عربي)", required: true },
  { key: "category", label: "Category", labelAr: "الفئة" },
  { key: "categoryAr", label: "Category (Arabic)", labelAr: "الفئة (عربي)" },
  {
    key: "status", label: "Status", labelAr: "الحالة", type: "select",
    options: [
      { value: "active", label: "Active", labelAr: "نشط" },
      { value: "paused", label: "Paused", labelAr: "متوقف" },
    ],
  },
];

function AdminPartners() {
  const { t, isAr } = useI18n();
  const { data, create, update, remove } = usePanelData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PartnerRow | null>(null);

  const handleSubmit = (values: RecordValues) => {
    const payload = {
      name: String(values["name"] ?? ""),
      nameAr: String(values["nameAr"] ?? ""),
      category: String(values["category"] ?? ""),
      categoryAr: String(values["categoryAr"] ?? ""),
      status: String(values["status"] ?? "active"),
    };
    if (editing) {
      update("partners", editing.id, payload);
      toast.success(t("Partner updated", "تم تحديث الشريك"));
    } else {
      create("partners", payload);
      toast.success(t("Partner created", "تم إنشاء الشريك"));
    }
  };

  return (
    <PanelCard
      title={t("Partners", "الشركاء")}
      action={
        <div className="flex gap-2">
          <ExportButton onClick={() => exportToCsv(data.partners, "Partners")} />
          <AddButton onClick={() => { setEditing(null); setOpen(true); }} label={t("New partner", "شريك جديد")} />
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.partners.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg">{isAr ? p.nameAr : p.name}</p>
                <p className="text-xs text-muted-foreground">{isAr ? p.categoryAr : p.category}</p>
              </div>
              <span className={`rounded-full px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${p.status === "active" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}>
                {p.status === "active" ? t("Active", "نشط") : t("Paused", "متوقف")}
              </span>
            </div>
            <div className="mt-4 flex justify-end">
              <RowActions>
                <EditButton onClick={() => { setEditing(p); setOpen(true); }} />
                <DeleteButton name={isAr ? p.nameAr : p.name} onConfirm={() => { remove("partners", p.id); toast.success(t("Partner deleted", "تم حذف الشريك")); }} />
              </RowActions>
            </div>
          </div>
        ))}
      </div>
      <CrudFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? t("Edit partner", "تعديل الشريك") : t("New partner", "شريك جديد")}
        fields={FIELDS}
        initial={editing as unknown as RecordValues}
        onSubmit={handleSubmit}
      />
    </PanelCard>
  );
}
