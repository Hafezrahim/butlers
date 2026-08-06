import { createFileRoute } from "@tanstack/react-router";
import { PanelCard } from "@/components/panel/PanelShell";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/account/loyalty")({
  component: Loyalty,
});

const PERKS = [
  { en: "Priority tables at all houses", ar: "أولوية الطاولات في كل فروعنا" },
  { en: "Complimentary welcome pairing", ar: "مشروب ترحيبي مجاني" },
  { en: "Early access to event tickets", ar: "حجز مبكر لتذاكر الفعاليات" },
  { en: "Dedicated concierge line", ar: "خط كونسيرج مخصص" },
];

const HISTORY = [
  { en: "Dinner — The Butler's Table", ar: "عشاء — طاولة البتلر", date: "2026-07-02", pts: "+320" },
  { en: "Event — Rooftop Jazz Night", ar: "فعالية — ليلة الجاز", date: "2026-06-14", pts: "+180" },
  { en: "Reward — Tasting menu", ar: "مكافأة — قائمة تذوق", date: "2026-05-30", pts: "-500" },
];

function Loyalty() {
  const { t, isAr } = useI18n();

  return (
    <>
      <PanelCard>
        <p className="eyebrow">{t("Platinum member", "عضو بلاتيني")}</p>
        <p className="mt-2 font-display text-4xl">2,480 {t("pts", "نقطة")}</p>
        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-gold" style={{ width: "82%" }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {t("520 points to your next reward", "٥٢٠ نقطة تفصلك عن المكافأة التالية")}
        </p>
      </PanelCard>

      <PanelCard title={t("Your perks", "مزاياك")}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {PERKS.map((p) => (
            <li key={p.en} className="rounded-2xl border border-border p-4 text-sm">
              {isAr ? p.ar : p.en}
            </li>
          ))}
        </ul>
      </PanelCard>

      <PanelCard title={t("Points history", "سجل النقاط")}>
        <div className="divide-y divide-border">
          {HISTORY.map((h) => (
            <div key={h.en} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm">{isAr ? h.ar : h.en}</p>
                <p className="text-xs text-muted-foreground" dir="ltr">{h.date}</p>
              </div>
              <span className={`font-button text-sm ${h.pts.startsWith("+") ? "text-primary" : "text-destructive"}`} dir="ltr">
                {h.pts}
              </span>
            </div>
          ))}
        </div>
      </PanelCard>
    </>
  );
}