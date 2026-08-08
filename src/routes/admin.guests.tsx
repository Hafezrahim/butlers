import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { AddButton, CrudFormDialog, DeleteButton, EditButton, RowActions, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { usePanelData, type GuestRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/guests")({
  component: AdminGuests,
});

const FIELDS: CrudField[] = [
  { key: "name", label: "Name", labelAr: "الاسم", required: true },
  { key: "nameAr", label: "Name (Arabic)", labelAr: "الاسم (عربي)", required: true },
  { key: "phone", label: "Phone", labelAr: "الهاتف", required: true },
  { key: "email", label: "Email", labelAr: "البريد الإلكتروني" },
  { key: "visits", label: "Visits", labelAr: "الزيارات", type: "number" },
  { key: "spend", label: "Spend", labelAr: "الإنفاق" },
  {
    key: "tier",
    label: "Tier",
    labelAr: "الفئة",
    type: "select",
    options: [
      { value: "Gold", label: "Gold", labelAr: "ذهبي" },
      { value: "Silver", label: "Silver", labelAr: "فضي" },
      { value: "Platinum", label: "Platinum", labelAr: "بلاتيني" },
    ],
  },
  { key: "tierAr", label: "Tier (Arabic label)", labelAr: "الفئة (عربي)" },
];

function AdminGuests() {
  const { t, isAr } = useI18n();
  const { data, create, update, remove } = usePanelData();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GuestRow | null>(null);

  const rows = data.guests.filter((g) =>
    `${g.name} ${g.nameAr} ${g.phone}`.toLowerCase().includes(q.trim().toLowerCase()),
  );

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (row: GuestRow) => {
    setEditing(row);
    setOpen(true);
  };

  const handleSubmit = (values: RecordValues) => {
    const payload = {
      name: String(values.name),
      nameAr: String(values.nameAr),
      phone: String(values.phone),
      email: String(values.email),
      visits: Number(values.visits),
      spend: String(values.spend),
      tier: String(values.tier),
      tierAr: String(values.tierAr),
    };
    if (editing) {
      update("guests", editing.id, payload);
      toast(t("Guest updated", "تم تحديث الضيف"));
    } else {
      create("guests", payload);
      toast(t("Guest added", "تمت إضافة الضيف"));
    }
  };

  return (
    <PanelCard title={t("Guest directory", "دليل الضيوف")} action={<AddButton onClick={openCreate} label={t("Add guest", "إضافة ضيف")} />}>
      <div className="mb-5 flex items-center gap-2 rounded-2xl border border-border px-4 py-2">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("Search guests", "ابحث عن ضيف")}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {rows.map((g) => (
          <div key={g.id} className="flex items-center justify-between gap-4 rounded-2xl border border-border p-4">
            <div className="min-w-0">
              <p className="truncate font-display text-lg">{isAr ? g.nameAr : g.name}</p>
              <p className="text-xs text-muted-foreground" dir="ltr">{g.phone}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {g.visits} {t("visits", "زيارة")} · {g.spend}
              </p>
              <div className="mt-3">
                <RowActions>
                  <EditButton onClick={() => openEdit(g)} />
                  <DeleteButton
                    name={isAr ? g.nameAr : g.name}
                    onConfirm={() => {
                      remove("guests", g.id);
                      toast(t("Guest removed", "تم حذف الضيف"));
                    }}
                  />
                </RowActions>
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-gold/20 px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-gold">
              {isAr ? g.tierAr : g.tier}
            </span>
          </div>
        ))}
      </div>
      {rows.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">{t("No guests found", "لا يوجد ضيوف")}</p>
      )}

      <CrudFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? t("Edit guest", "تعديل الضيف") : t("Add guest", "إضافة ضيف")}
        fields={FIELDS}
        initial={editing ?? undefined}
        onSubmit={handleSubmit}
      />
    </PanelCard>
  );
}
