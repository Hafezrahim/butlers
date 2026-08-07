import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

const FIELD =
  "w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold";

function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-border px-4 py-3 text-start text-sm"
    >
      <span>{label}</span>
      <span className={`h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors ${on ? "bg-primary" : "bg-muted"}`}>
        <span className={`block size-5 rounded-full bg-card transition-transform ${on ? "translate-x-5" : ""}`} />
      </span>
    </button>
  );
}

function AdminSettings() {
  const { t } = useI18n();

  return (
    <>
      <PanelCard title={t("Business profile", "بيانات الشركة")}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast(t("Settings saved", "تم حفظ الإعدادات"));
          }}
          className="grid gap-4 md:grid-cols-2"
        >
          <label className="grid gap-1.5 text-sm">
            {t("Group name", "اسم المجموعة")}
            <input className={FIELD} defaultValue="Butlers & Co" />
          </label>
          <label className="grid gap-1.5 text-sm">
            {t("Support phone", "هاتف الدعم")}
            <input className={FIELD} dir="ltr" defaultValue="+20 100 741 9344" />
          </label>
          <label className="grid gap-1.5 text-sm">
            {t("Email", "البريد الإلكتروني")}
            <input className={FIELD} dir="ltr" defaultValue="hello@butlersco.com" />
          </label>
          <label className="grid gap-1.5 text-sm">
            {t("Default language", "اللغة الافتراضية")}
            <select className={FIELD} defaultValue="en">
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </label>
          <div className="md:col-span-2">
            <button className="rounded-2xl bg-primary px-6 py-2.5 font-button text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground">
              {t("Save changes", "حفظ التغييرات")}
            </button>
          </div>
        </form>
      </PanelCard>

      <PanelCard title={t("Reservation rules", "قواعد الحجز")}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-1.5 text-sm">
            {t("Max party size", "أقصى عدد أفراد")}
            <input className={FIELD} type="number" defaultValue={12} />
          </label>
          <label className="grid gap-1.5 text-sm">
            {t("Hold time (minutes)", "مدة الاحتفاظ (دقائق)")}
            <input className={FIELD} type="number" defaultValue={15} />
          </label>
        </div>
        <div className="mt-4 grid gap-3">
          <Toggle label={t("Auto-confirm reservations", "تأكيد الحجوزات تلقائياً")} defaultOn />
          <Toggle label={t("Require deposit for events", "طلب عربون للفعاليات")} defaultOn />
          <Toggle label={t("Allow same-day bookings", "السماح بالحجز في نفس اليوم")} />
        </div>
      </PanelCard>

      <PanelCard title={t("Notifications", "الإشعارات")}>
        <div className="grid gap-3">
          <Toggle label={t("Email notifications", "إشعارات البريد")} defaultOn />
          <Toggle label={t("WhatsApp notifications", "إشعارات واتساب")} defaultOn />
          <Toggle label={t("Daily operations digest", "ملخص العمليات اليومي")} />
        </div>
      </PanelCard>
    </>
  );
}
