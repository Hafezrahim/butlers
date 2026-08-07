import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { toast } from "sonner";
import { PanelCard, StatusPill } from "@/components/panel/PanelShell";
import { ADMIN_RESERVATIONS, STATUS_LABEL, type ResStatus } from "@/data/panel";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/reservations/")({
  component: AdminReservations,
});

const FILTERS: (ResStatus | "all")[] = ["all", "pending", "confirmed", "seated", "cancelled"];

function AdminReservations() {
  const { t, isAr } = useI18n();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<ResStatus | "all">("all");
  const [q, setQ] = useState("");

  const rows = useMemo(
    () =>
      ADMIN_RESERVATIONS.filter(
        (r) =>
          (filter === "all" || r.status === filter) &&
          (q.trim() === "" ||
            `${r.guest} ${r.guestAr} ${r.code} ${r.phone}`.toLowerCase().includes(q.trim().toLowerCase())),
      ),
    [filter, q],
  );

  return (
    <PanelCard title={t("Reservations", "الحجوزات")}>
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
        <table className="w-full min-w-[720px] text-start text-sm">
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
              ].map((h) => (
                <th key={h} className="py-3 text-start font-button text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr
                key={r.code}
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
                <td className="py-3">{r.party}</td>
                <td className="py-3"><StatusPill status={r.status} /></td>
                <td className="py-3">
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toast(t(`Reservation ${r.code} confirmed`, `تم تأكيد الحجز ${r.code}`))}
                      className="rounded-xl border border-border px-3 py-1.5 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em]"
                    >
                      {t("Confirm", "تأكيد")}
                    </button>
                    <button
                      onClick={() => toast(t(`Reservation ${r.code} cancelled`, `تم إلغاء الحجز ${r.code}`))}
                      className="rounded-xl border border-border px-3 py-1.5 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-destructive"
                    >
                      {t("Cancel", "إلغاء")}
                    </button>
                    <ChevronRight className="size-4 text-muted-foreground rtl:rotate-180" />
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
    </PanelCard>
  );
}
