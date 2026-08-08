import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, Gift, Star, Wallet } from "lucide-react";
import { PanelCard, StatCard, StatusPill } from "@/components/panel/PanelShell";
import { usePanelData } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/account/")({
  component: AccountOverview,
});

function AccountOverview() {
  const { t, isAr } = useI18n();
  const { data } = usePanelData();
  const upcoming = data.reservations.filter((r) => r.guest === "Hafez Rahim" && r.status !== "cancelled").slice(0, 2);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t("Upcoming", "قادمة")} value="1" hint={t("Next: 14 Aug, 21:00", "التالي: ١٤ أغسطس، ٢١:٠٠")} icon={CalendarCheck} />
        <StatCard label={t("Total visits", "إجمالي الزيارات")} value="14" hint={t("Since 2024", "منذ ٢٠٢٤")} icon={Star} />
        <StatCard label={t("Loyalty points", "نقاط الولاء")} value="2,480" hint={t("Platinum tier", "الفئة البلاتينية")} icon={Gift} />
        <StatCard label={t("Lifetime spend", "إجمالي الإنفاق")} value="EGP 128,400" icon={Wallet} />
      </div>

      <PanelCard
        title={t("Upcoming reservations", "الحجوزات القادمة")}
        action={
          <Link to="/account/reservations" className="font-button text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-gold">
            {t("View all", "عرض الكل")}
          </Link>
        }
      >
        <div className="space-y-3">
          {upcoming.map((r) => (
            <div key={r.code} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border p-4">
              <div>
                <p className="font-display text-lg">{isAr ? r.brandAr : r.brand}</p>
                <p className="text-xs text-muted-foreground">
                  {isAr ? r.branchAr : r.branch} · <span dir="ltr">{r.date}</span> · <span dir="ltr">{r.time}</span> ·{" "}
                  {r.party} {t("guests", "ضيوف")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-button text-xs tracking-[0.1em] text-muted-foreground" dir="ltr">{r.code}</span>
                <StatusPill status={r.status} />
              </div>
            </div>
          ))}
        </div>
      </PanelCard>

      <PanelCard title={t("Quick actions", "إجراءات سريعة")}>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link to="/reservation" className="rounded-2xl bg-gold px-4 py-3 text-center font-button text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-foreground">
            {t("New reservation", "حجز جديد")}
          </Link>
          <Link to="/events" className="rounded-2xl border border-border px-4 py-3 text-center font-button text-[0.75rem] font-semibold uppercase tracking-[0.12em]">
            {t("Browse events", "تصفح الفعاليات")}
          </Link>
          <Link to="/contact" className="rounded-2xl border border-border px-4 py-3 text-center font-button text-[0.75rem] font-semibold uppercase tracking-[0.12em]">
            {t("Contact concierge", "تواصل مع الكونسيرج")}
          </Link>
        </div>
      </PanelCard>
    </>
  );
}