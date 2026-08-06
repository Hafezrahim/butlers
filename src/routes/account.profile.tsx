import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/account/profile")({
  component: Profile,
});

function Field({ label, defaultValue, type = "text", dir }: { label: string; defaultValue: string; type?: string; dir?: string }) {
  return (
    <label className="block">
      <span className="eyebrow text-[0.62rem]">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        dir={dir}
        className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold"
      />
    </label>
  );
}

function Profile() {
  const { t } = useI18n();

  const PREFS = [
    { en: "Vegetarian options", ar: "خيارات نباتية" },
    { en: "No alcohol", ar: "بدون كحول" },
    { en: "Quiet table", ar: "طاولة هادئة" },
    { en: "Birthday decoration by default", ar: "تزيين أعياد الميلاد افتراضياً" },
  ];

  return (
    <>
      <PanelCard title={t("Guest details", "بيانات الضيف")}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast(t("Profile saved", "تم حفظ الملف الشخصي"));
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <Field label={t("Full name", "الاسم الكامل")} defaultValue="Hafez Rahim" />
          <Field label={t("Phone", "الهاتف")} defaultValue="+20 100 741 9344" dir="ltr" />
          <Field label={t("Email", "البريد الإلكتروني")} defaultValue="hafez@butlersandco.com" type="email" dir="ltr" />
          <Field label={t("Birthday", "تاريخ الميلاد")} defaultValue="1990-04-12" type="date" dir="ltr" />
          <div className="sm:col-span-2">
            <button className="rounded-2xl bg-gold px-6 py-3 font-button text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-foreground">
              {t("Save changes", "حفظ التغييرات")}
            </button>
          </div>
        </form>
      </PanelCard>

      <PanelCard title={t("Dining preferences", "تفضيلات الطعام")}>
        <div className="grid gap-3 sm:grid-cols-2">
          {PREFS.map((p, i) => (
            <label key={p.en} className="flex items-center gap-3 rounded-2xl border border-border p-4 text-sm">
              <input type="checkbox" defaultChecked={i < 2} className="size-4 accent-[var(--gold)]" />
              {t(p.en, p.ar)}
            </label>
          ))}
        </div>
      </PanelCard>
    </>
  );
}