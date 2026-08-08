import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { toast } from "sonner";
import { PanelCard, StatusPill } from "@/components/panel/PanelShell";
import { AddButton, CrudFormDialog, DeleteButton, EditButton, RowActions, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { STATUS_LABEL, type ResStatus } from "@/data/panel";
import { usePanelData, type ReservationRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/reservations/")({
  component: AdminReservations,
});

const FILTERS: (ResStatus | "all")[] = ["all", "pending", "confirmed", "seated", "cancelled"];

const FIELDS: CrudField[] = [
  { key: "code", label: "Reservation code", labelAr: "كود الحجز", required: true },
  { key: "status", label: "Status", labelAr: "الحالة", type: "select", options: [
    { value: "pending", label: "Pending", labelAr: "قيد المراجعة" },
    { value: "confirmed", label: "Confirmed", labelAr: "مؤكد" },
    { value: "seated", label: "Seated", labelAr: "تم الجلوس" },
    { value: "cancelled", label: "Cancelled", labelAr: "ملغي" },
  ] },
  { key: "guest", label: "Guest name (EN)", labelAr: "اسم الضيف (EN)", required: true },
  { key: "guestAr", label: "Guest name (AR)", labelAr: "اسم الضيف (AR)" },
  { key: "phone", label: "Phone", labelAr: "الهاتف", required: true },
  { key: "email", label: "Email", labelAr: "البريد الإلكتروني" },
  { key: "brand", label: "House (EN)", labelAr: "العلامة (EN)", required: true },
  { key: "brandAr", label: "House (AR)", labelAr: "العلامة (AR)" },
  { key: "branch", label: "Branch (EN)", labelAr: "الفرع (EN)" },
  { key: "branchAr", label: "Branch (AR)", labelAr: "الفرع (AR)" },
  { key: "date", label: "Date", labelAr: "التاريخ", type: "date", required: true },
  { key: "time", label: "Time", labelAr: "الوقت", type: "time", required: true },
  { key: "party", label: "Party size", labelAr: "عدد الأفراد", type: "number" },
];

function AdminReservations() {
  const { t, isAr } = useI18n();
  const navigate = useNavigate();
  const { data, create, update, remove } = usePanelData();
  const [filter, setFilter] = useState<ResStatus | "all">("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ReservationRow | null>(null);

  const rows = useMemo(
    () =>
      data.reservations.filter(
        (r) =>
          (filter === "all" || r.status === filter) &&
          (q.trim() === "" ||
            `${r.guest} ${r.guestAr} ${r.code} ${r.phone}`.toLowerCase().includes(q.trim().toLowerCase())),
      ),
    [data.reservations, filter, q],
  );

  const openNew = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (r: ReservationRow) => {
    setEditing(r);
    setOpen(true);
  };

  const submit = (v: RecordValues) => {
    const payload = {
      code: String(v.code),
      guest: String(v.guest),
      guestAr: String(v.guestAr || v.guest),
      phone: String(v.phone),
      email: String(v.email),
      brand: String(v.brand),
      brandAr: String(v.brandAr || v.brand),
      branch: String(v.branch),
      branchAr: String(v.branchAr || v.branch),
      date: String(v.date),
      time: String(v.time),
      party: Number(v.party) || 1,
      status: String(v.status) as ResStatus,
    };
    if (editing) {
      update("reservations", editing.id, payload);
      toast.success(t("Reservation updated", "تم تحديث الحجز"));
    } else {
      create("reservations", { ...payload, addons: [] });
      toast.success(t("Reservation created", "تم إنشاء الحجز"));
    }
  };

  return (
    <PanelCard title={t("Reservations", "الحجوزات")} action={<AddButton onClick={openNew} label={t("New reservation", "حجز جديد")} />}>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-border px-4 py-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("Search guest, code or phone", "ابحث بالاسم أو الكود أو الهاتف")}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 font-button text-[0.68rem] font-semibold uppercase tracking-[0.1em] transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-gold"
              }`}
            >
              {f === "all" ? t("All", "الكل") : isAr ? STATUS_LABEL[f].ar : STATUS_LABEL[f].en}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-start text-sm">
          <thead>
            <tr className="border-b border-border text-start">
              {[
                t("Code", "الكود"),
                t("Guest", "الضيف"),
                t("House", "الفرع"),
                t("Date", "التاريخ"),
                t("Pax", "الأفراد"),
                t("Status", "الحالة"),
                t("Actions", "إجراءات"),
              ].map((h, i) => (
                <th
                  key={h}
                  className={`py-3 text-start font-button text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground ${
                    i === 4 ? "pr-6" : i === 5 ? "pl-6" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr
                key={r.id}
                onClick={() => navigate({ to: "/admin/reservations/$code", params: { code: r.code } })}
                className="cursor-pointer transition-colors hover:bg-muted/50"
              >
                <td className="py-3 font-button text-xs" dir="ltr">{r.code}</td>
                <td className="py-3">
                  <p>{isAr ? r.guestAr : r.guest}</p>
                  <p className="text-xs text-muted-foreground" dir="ltr">{r.phone}</p>
                </td>
                <td className="py-3">
                  <p>{isAr ? r.brandAr : r.brand}</p>
                  <p className="text-xs text-muted-foreground">{isAr ? r.branchAr : r.branch}</p>
                </td>
                <td className="py-3" dir="ltr">
                  <p>{r.date}</p>
                  <p className="text-xs text-muted-foreground">{r.time}</p>
                </td>
                <td className="py-3 pr-6">{r.party}</td>
                <td className="py-3 pl-6"><StatusPill status={r.status} /></td>
                <td className="py-3">
                  <div onClick={(e) => e.stopPropagation()}>
                    <RowActions>
                      <button
                        onClick={() => {
                          update("reservations", r.id, { status: "confirmed" });
                          toast.success(t(`Reservation ${r.code} confirmed`, `تم تأكيد الحجز ${r.code}`));
                        }}
                        className="rounded-xl border border-border px-3 py-1.5 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] transition-colors hover:border-gold"
                      >
                        {t("Confirm", "تأكيد")}
                      </button>
                      <EditButton onClick={() => openEdit(r)} />
                      <DeleteButton
                        name={r.code}
                        onConfirm={() => {
                          remove("reservations", r.id);
                          toast.success(t("Reservation deleted", "تم حذف الحجز"));
                        }}
                      />
                      <ChevronRight className="size-4 text-muted-foreground rtl:rotate-180" />
                    </RowActions>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">{t("No reservations found", "لا توجد حجوزات")}</p>
        )}
      </div>

      <CrudFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? t("Edit reservation", "تعديل الحجز") : t("New reservation", "حجز جديد")}
        fields={FIELDS}
        initial={
          editing
            ? (Object.fromEntries(FIELDS.map((f) => [f.key, (editing as unknown as Record<string, string | number>)[f.key] ?? ""])) as RecordValues)
            : { code: `BCO-${Math.floor(1000 + Math.random() * 9000)}`, status: "pending", party: 2 }
        }
        onSubmit={submit}
      />
    </PanelCard>
  );
}
