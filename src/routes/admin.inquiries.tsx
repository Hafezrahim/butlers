import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { AddButton, CrudFormDialog, DeleteButton, EditButton, ExportButton, RowActions, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { exportToCsv } from "@/lib/utils";
import { usePanelData, type InquiryRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/inquiries")({ component: AdminInquiries });

const STATUS_STYLE: Record<string, string> = {
  new: "bg-gold/20 text-gold",
  "in progress": "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  closed: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
};
const STATUS_AR: Record<string, string> = { new: "جديد", "in progress": "قيد المعالجة", closed: "مغلق" };

const FIELDS: CrudField[] = [
  { key: "name", label: "Name", labelAr: "الاسم", required: true },
  { key: "email", label: "Email", labelAr: "البريد الإلكتروني" },
  { key: "phone", label: "Phone", labelAr: "الهاتف" },
  { key: "topic", label: "Topic", labelAr: "الموضوع" },
  { key: "topicAr", label: "Topic (Arabic)", labelAr: "الموضوع (عربي)" },
  { key: "message", label: "Message", labelAr: "الرسالة", type: "textarea", full: true },
  { key: "date", label: "Date", labelAr: "التاريخ", type: "date" },
  {
    key: "status", label: "Status", labelAr: "الحالة", type: "select",
    options: [
      { value: "new", label: "New", labelAr: "جديد" },
      { value: "in progress", label: "In progress", labelAr: "قيد المعالجة" },
      { value: "closed", label: "Closed", labelAr: "مغلق" },
    ],
  },
];

function AdminInquiries() {
  const { t, isAr } = useI18n();
  const { data, create, update, remove } = usePanelData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<InquiryRow | null>(null);

  const handleSubmit = (values: RecordValues) => {
    const payload = {
      name: String(values["name"] ?? ""),
      email: String(values["email"] ?? ""),
      phone: String(values["phone"] ?? ""),
      topic: String(values["topic"] ?? ""),
      topicAr: String(values["topicAr"] ?? ""),
      message: String(values["message"] ?? ""),
      date: String(values["date"] ?? ""),
      status: String(values["status"] ?? "new"),
    };
    if (editing) {
      update("inquiries", editing.id, payload);
      toast.success(t("Inquiry updated", "تم تحديث الطلب"));
    } else {
      create("inquiries", payload);
      toast.success(t("Inquiry created", "تم إنشاء الطلب"));
    }
  };

  return (
    <PanelCard
      title={t("Contact inquiries", "طلبات التواصل")}
      action={
        <div className="flex gap-2">
          <ExportButton onClick={() => exportToCsv(data.inquiries, "Inquiries")} />
          <AddButton onClick={() => { setEditing(null); setOpen(true); }} label={t("New inquiry", "طلب جديد")} />
        </div>
      }
    >
      <div className="divide-y divide-border">
        {data.inquiries.map((q) => (
          <div key={q.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div className="min-w-0 max-w-xl">
              <p className="font-display text-lg">{q.name}</p>
              <p className="text-xs text-muted-foreground">
                {isAr ? q.topicAr : q.topic} · <span dir="ltr">{q.email}</span> · <span dir="ltr">{q.phone}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{q.message}</p>
            </div>
            <RowActions>
              <span className="text-xs text-muted-foreground" dir="ltr">{q.date}</span>
              <span className={`rounded-full px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${STATUS_STYLE[q.status] ?? "bg-muted text-muted-foreground"}`}>
                {isAr ? STATUS_AR[q.status] ?? q.status : q.status}
              </span>
              <EditButton onClick={() => { setEditing(q); setOpen(true); }} />
              <DeleteButton name={q.name} onConfirm={() => { remove("inquiries", q.id); toast.success(t("Inquiry deleted", "تم حذف الطلب")); }} />
            </RowActions>
          </div>
        ))}
        {data.inquiries.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">{t("No inquiries", "لا توجد طلبات")}</p>}
      </div>
      <CrudFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? t("Edit inquiry", "تعديل الطلب") : t("New inquiry", "طلب جديد")}
        fields={FIELDS}
        initial={editing as unknown as RecordValues}
        onSubmit={handleSubmit}
      />
    </PanelCard>
  );
}
