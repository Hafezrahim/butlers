import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { AddButton, CrudFormDialog, DeleteButton, EditButton, RowActions, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { usePanelData, type TicketRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/support")({
  component: AdminSupport,
});

const FILTERS = ["all", "open", "pending", "resolved"] as const;

const LABEL: Record<string, { en: string; ar: string }> = {
  all: { en: "All", ar: "الكل" },
  open: { en: "Open", ar: "مفتوح" },
  pending: { en: "Pending", ar: "قيد الانتظار" },
  resolved: { en: "Resolved", ar: "تم الحل" },
  high: { en: "High", ar: "عالية" },
  medium: { en: "Medium", ar: "متوسطة" },
  low: { en: "Low", ar: "منخفضة" },
};

const STATUS_STYLE: Record<string, string> = {
  open: "bg-destructive/15 text-destructive",
  pending: "bg-gold/20 text-gold",
  resolved: "bg-primary/15 text-primary",
};

const FIELDS: CrudField[] = [
  { key: "subject", label: "Subject", labelAr: "الموضوع", required: true },
  { key: "subjectAr", label: "Subject (Arabic)", labelAr: "الموضوع (عربي)", required: true },
  { key: "guest", label: "Guest", labelAr: "الضيف", required: true },
  { key: "guestAr", label: "Guest (Arabic)", labelAr: "الضيف (عربي)", required: true },
  { key: "channel", label: "Channel", labelAr: "القناة" },
  { key: "channelAr", label: "Channel (Arabic)", labelAr: "القناة (عربي)" },
  { key: "updated", label: "Updated", labelAr: "آخر تحديث" },
  {
    key: "priority",
    label: "Priority",
    labelAr: "الأولوية",
    type: "select",
    options: [
      { value: "high", label: "High", labelAr: "عالية" },
      { value: "medium", label: "Medium", labelAr: "متوسطة" },
      { value: "low", label: "Low", labelAr: "منخفضة" },
    ],
  },
  {
    key: "status",
    label: "Status",
    labelAr: "الحالة",
    type: "select",
    options: [
      { value: "open", label: "Open", labelAr: "مفتوح" },
      { value: "pending", label: "Pending", labelAr: "قيد الانتظار" },
      { value: "resolved", label: "Resolved", labelAr: "تم الحل" },
    ],
  },
];

function AdminSupport() {
  const { t, isAr } = useI18n();
  const { data, create, update, remove } = usePanelData();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TicketRow | null>(null);

  const rows = data.tickets.filter((x) => filter === "all" || x.status === filter);

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (row: TicketRow) => {
    setEditing(row);
    setOpen(true);
  };

  const handleSubmit = (values: RecordValues) => {
    const payload = {
      ref: editing?.ref ?? String(values.subject).slice(0, 6).toUpperCase(),
      subject: String(values.subject),
      subjectAr: String(values.subjectAr),
      guest: String(values.guest),
      guestAr: String(values.guestAr),
      channel: String(values.channel),
      channelAr: String(values.channelAr),
      priority: String(values.priority),
      status: String(values.status),
      updated: String(values.updated) || new Date().toISOString().slice(0, 10),
    };
    if (editing) {
      update("tickets", editing.id, payload);
      toast(t("Ticket updated", "تم تحديث التذكرة"));
    } else {
      create("tickets", payload);
      toast(t("Ticket created", "تم إنشاء التذكرة"));
    }
  };

  return (
    <PanelCard title={t("Support tickets", "تذاكر الدعم")} action={<AddButton onClick={openCreate} label={t("New ticket", "تذكرة جديدة")} />}>
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 font-button text-[0.68rem] font-semibold uppercase tracking-[0.1em] transition-colors ${
              filter === f ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-gold"
            }`}
          >
            {isAr ? LABEL[f]!.ar : LABEL[f]!.en}
          </button>
        ))}
      </div>

      <div className="divide-y divide-border">
        {rows.map((x) => (
          <div key={x.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div className="min-w-0">
              <p className="font-display text-lg">{isAr ? x.subjectAr : x.subject}</p>
              <p className="text-xs text-muted-foreground">
                <span dir="ltr">{x.ref}</span> · {isAr ? x.guestAr : x.guest} · {isAr ? x.channelAr : x.channel} ·{" "}
                <span dir="ltr">{x.updated}</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                {isAr ? LABEL[x.priority]!.ar : LABEL[x.priority]!.en}
              </span>
              <span className={`rounded-full px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${STATUS_STYLE[x.status]}`}>
                {isAr ? LABEL[x.status]!.ar : LABEL[x.status]!.en}
              </span>
              {x.status !== "resolved" && (
                <button
                  onClick={() => {
                    update("tickets", x.id, { status: "resolved", updated: new Date().toISOString().slice(0, 10) });
                    toast(t(`Ticket ${x.ref} resolved`, `تم حل التذكرة ${x.ref}`));
                  }}
                  className="rounded-xl border border-border px-3 py-1.5 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em]"
                >
                  {t("Resolve", "حل")}
                </button>
              )}
              <RowActions>
                <EditButton onClick={() => openEdit(x)} />
                <DeleteButton
                  name={isAr ? x.subjectAr : x.subject}
                  onConfirm={() => {
                    remove("tickets", x.id);
                    toast(t("Ticket deleted", "تم حذف التذكرة"));
                  }}
                />
              </RowActions>
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">{t("No tickets found", "لا توجد تذاكر")}</p>
        )}
      </div>

      <CrudFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? t("Edit ticket", "تعديل التذكرة") : t("New ticket", "تذكرة جديدة")}
        fields={FIELDS}
        initial={editing ?? undefined}
        onSubmit={handleSubmit}
      />
    </PanelCard>
  );
}
