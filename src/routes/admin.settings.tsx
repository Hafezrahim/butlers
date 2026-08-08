import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { usePanelData, type SettingsRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

const FIELD =
  "w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold";

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-border px-4 py-3 text-start text-sm"
    >
      <span>{label}</span>
      <span className={`h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors ${on ? "bg-primary" : "bg-muted"}`}>
        <span className={`block size-5 rounded-full bg-card transition-transform ${on ? "translate-x-5 rtl:-translate-x-5" : ""}`} />
      </span>
    </button>
  );
}

function AdminSettings() {
  const { t } = useI18n();
  const { data, updateSettings, resetAll } = usePanelData();
  const [form, setForm] = useState<SettingsRow>(data.settings);

  useEffect(() => {
    setForm(data.settings);
  }, [data.settings]);

  const set = <K extends keyof SettingsRow>(k: K, v: SettingsRow[K]) => setForm((cur) => ({ ...cur, [k]: v }));

  return (
    <>
      <PanelCard title={t("Business profile", "بيانات الشركة")}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateSettings(form);
            toast.success(t("Settings saved", "تم حفظ الإعدادات"));
          }}
          className="grid gap-4 md:grid-cols-2"
        >
          <label className="grid gap-1.5 text-sm">
            {t("Group name (EN)", "اسم المجموعة (EN)")}
            <input className={FIELD} value={form.company} onChange={(e) => set("company", e.target.value)} />
          </label>
          <label className="grid gap-1.5 text-sm">
            {t("Group name (AR)", "اسم المجموعة (AR)")}
            <input className={FIELD} value={form.companyAr} onChange={(e) => set("companyAr", e.target.value)} />
          </label>
          <label className="grid gap-1.5 text-sm">
            {t("Support phone", "هاتف الدعم")}
            <input className={FIELD} dir="ltr" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </label>
          <label className="grid gap-1.5 text-sm">
            {t("Email", "البريد الإلكتروني")}
            <input className={FIELD} dir="ltr" value={form.email} onChange={(e) => set("email", e.target.value)} />
          </label>
          <label className="grid gap-1.5 text-sm">
            {t("Address (EN)", "العنوان (EN)")}
            <input className={FIELD} value={form.address} onChange={(e) => set("address", e.target.value)} />
          </label>
          <label className="grid gap-1.5 text-sm">
            {t("Address (AR)", "العنوان (AR)")}
            <input className={FIELD} value={form.addressAr} onChange={(e) => set("addressAr", e.target.value)} />
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
            <input
              className={FIELD}
              type="number"
              value={form.maxParty}
              onChange={(e) => {
                set("maxParty", Number(e.target.value));
                updateSettings({ maxParty: Number(e.target.value) });
              }}
            />
          </label>
          <label className="grid gap-1.5 text-sm">
            {t("Hold time (minutes)", "مدة الاحتفاظ (دقائق)")}
            <input
              className={FIELD}
              type="number"
              value={form.holdMinutes}
              onChange={(e) => {
                set("holdMinutes", Number(e.target.value));
                updateSettings({ holdMinutes: Number(e.target.value) });
              }}
            />
          </label>
        </div>
        <div className="mt-4 grid gap-3">
          <Toggle
            label={t("Auto-confirm reservations", "تأكيد الحجوزات تلقائياً")}
            on={form.autoConfirm}
            onChange={(v) => { set("autoConfirm", v); updateSettings({ autoConfirm: v }); }}
          />
        </div>
      </PanelCard>

      <PanelCard title={t("Notifications", "الإشعارات")}>
        <div className="grid gap-3">
          <Toggle label={t("Email notifications", "إشعارات البريد")} on={form.emailAlerts} onChange={(v) => { set("emailAlerts", v); updateSettings({ emailAlerts: v }); }} />
          <Toggle label={t("SMS notifications", "إشعارات الرسائل")} on={form.smsAlerts} onChange={(v) => { set("smsAlerts", v); updateSettings({ smsAlerts: v }); }} />
          <Toggle label={t("WhatsApp notifications", "إشعارات واتساب")} on={form.whatsappAlerts} onChange={(v) => { set("whatsappAlerts", v); updateSettings({ whatsappAlerts: v }); }} />
        </div>
      </PanelCard>

      <PanelCard title={t("Data", "البيانات")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-xl text-sm text-muted-foreground">
            {t(
              "Panel records are stored locally in this browser. Resetting restores the original demo data.",
              "بيانات اللوحة محفوظة محلياً في هذا المتصفح. إعادة الضبط تستعيد البيانات التجريبية الأصلية.",
            )}
          </p>
          <button
            onClick={() => {
              resetAll();
              toast.success(t("Panel data reset", "تمت إعادة ضبط البيانات"));
            }}
            className="rounded-2xl border border-destructive px-5 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-destructive"
          >
            {t("Reset panel data", "إعادة ضبط البيانات")}
          </button>
        </div>
      </PanelCard>
    </>
  );
}
