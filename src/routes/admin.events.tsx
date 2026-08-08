import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { AddButton, CrudFormDialog, DeleteButton, EditButton, RowActions, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { usePanelData, type EventRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/events")({
  component: AdminEvents,
});

const STATUS_STYLE: Record<string, string> = {
  published: "bg-primary/15 text-primary",
  "sold out": "bg-gold/20 text-gold",
  draft: "bg-muted text-muted-foreground",
};

const STATUS_AR: Record<string, string> = {
  published: "منشور",
  "sold out": "نفدت التذاكر",
  draft: "مسودة",
};

const FIELDS: CrudField[] = [
  { key: "title", label: "Title", labelAr: "العنوان", required: true },
  { key: "titleAr", label: "Title (Arabic)", labelAr: "العنوان (عربي)", required: true },
  { key: "venue", label: "Venue", labelAr: "المكان", required: true },
  { key: "venueAr", label: "Venue (Arabic)", labelAr: "المكان (عربي)", required: true },
  { key: "date", label: "Date", labelAr: "التاريخ", type: "date", required: true },
  { key: "seats", label: "Seats", labelAr: "المقاعد", type: "number" },
  { key: "booked", label: "Booked", labelAr: "المحجوز", type: "number" },
  {
    key: "status",
    label: "Status",
    labelAr: "الحالة",
    type: "select",
    options: [
      { value: "published", label: "Published", labelAr: "منشور" },
      { value: "draft", label: "Draft", labelAr: "مسودة" },
      { value: "sold out", label: "Sold out", labelAr: "نفدت التذاكر" },
    ],
  },
];

function AdminEvents() {
  const { t, isAr } = useI18n();
  const { data, create, update, remove } = usePanelData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<EventRow | null>(null);

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (row: EventRow) => {
    setEditing(row);
    setOpen(true);
  };

  const handleSubmit = (values: RecordValues) => {
    const payload = {
      title: String(values["title"]),
      titleAr: String(values["titleAr"]),
      venue: String(values["venue"]),
      venueAr: String(values["venueAr"]),
      date: String(values["date"]),
      seats: Number(values["seats"]),
      booked: Number(values["booked"]),
      status: String(values["status"]),
    };
    if (editing) {
      update("events", editing.id, payload);
      toast(t("Event updated", "تم تحديث الفعالية"));
    } else {
      create("events", payload);
      toast(t("Event created", "تم إنشاء الفعالية"));
    }
  };

  return (
    <PanelCard
      title={t("Events", "الفعاليات")}
      action={<AddButton onClick={openCreate} label={t("New event", "فعالية جديدة")} />}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {data.events.map((e) => {
          const pct = e.seats > 0 ? Math.round((e.booked / e.seats) * 100) : 0;
          return (
            <div key={e.id} className="rounded-2xl border border-border p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg">{isAr ? e.titleAr : e.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {isAr ? e.venueAr : e.venue} · <span dir="ltr">{e.date}</span>
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${STATUS_STYLE[e.status]}`}>
                  {isAr ? STATUS_AR[e.status] : e.status}
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {e.booked}/{e.seats} {t("seats booked", "مقعد محجوز")} · {pct}%
              </p>

              <div className="mt-4">
                <RowActions>
                  <EditButton onClick={() => openEdit(e)} />
                  <DeleteButton
                    name={isAr ? e.titleAr : e.title}
                    onConfirm={() => {
                      remove("events", e.id);
                      toast(t("Event deleted", "تم حذف الفعالية"));
                    }}
                  />
                </RowActions>
              </div>
            </div>
          );
        })}
        {data.events.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-muted-foreground">{t("No events found", "لا توجد فعاليات")}</p>
        )}
      </div>

      <CrudFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? t("Edit event", "تعديل الفعالية") : t("New event", "فعالية جديدة")}
        fields={FIELDS}
        {...(editing ? { initial: editing } : {})}
        onSubmit={handleSubmit}
      />
    </PanelCard>
  );
}
