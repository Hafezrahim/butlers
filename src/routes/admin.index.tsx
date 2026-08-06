import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Percent, TrendingUp, Users } from "lucide-react";
import { PanelCard, StatCard, StatusPill } from "@/components/panel/PanelShell";
import { ADMIN_RESERVATIONS } from "@/data/panel";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const OCCUPANCY = [
  { day: "Mon", dayAr: "الإثنين", pct: 46 },
  { day: "Tue", dayAr: "الثلاثاء", pct: 58 },
  { day: "Wed", dayAr: "الأربعاء", pct: 64 },
  { day: "Thu", dayAr: "الخميس", pct: 82 },
  { day: "Fri", dayAr: "الجمعة", pct: 96 },
  { day: "Sat", dayAr: "السبت", pct: 91 },
  { day: "Sun", dayAr: "الأحد", pct: 70 },
];

function AdminDashboard() {
  const { t, isAr } = useI18n();
  const latest = ADMIN_RESERVATIONS.slice(-4).reverse();

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t("Today's covers", "ضيوف اليوم")} value="248" hint={t("+12% vs last week", "+١٢٪ مقارنة بالأسبوع الماضي")} icon={Users} />
        <StatCard label={t("Reservations", "الحجوزات")} value="63" hint={t("9 pending approval", "٩ في انتظار الموافقة")} icon={CalendarCheck} />
        <StatCard label={t("Occupancy", "نسبة الإشغال")} value="87%" hint={t("Across 3 houses", "عبر ٣ فروع")} icon={Percent} />
        <StatCard label={t("Revenue (week)", "الإيرادات (الأسبوع)")} value="EGP 1.24M" hint={t("+8% vs target", "+٨٪ فوق المستهدف")} icon={TrendingUp} />
      </div>

      <PanelCard title={t("Weekly occupancy", "الإشغال الأسبوعي")}>
        <div className="flex items-end gap-3">
          {OCCUPANCY.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative h-40 w-full">
                <div className="absolute bottom-0 w-full rounded-t-xl bg-primary/80" style={{ height: `${d.pct}%` }} />
              </div>
              <span className="font-button text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground">
                {isAr ? d.dayAr : d.day}
              </span>
            </div>
          ))}
        </div>
      </PanelCard>

      <PanelCard title={t("Latest reservations", "أحدث الحجوزات")}>
        <div className="divide-y divide-border">
          {latest.map((r) => (
            <div key={r.code} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-medium">{isAr ? r.guestAr : r.guest}</p>
                <p className="text-xs text-muted-foreground">
                  {isAr ? r.brandAr : r.brand} · <span dir="ltr">{r.date}</span> · <span dir="ltr">{r.time}</span> · {r.party} {t("pax", "أفراد")}
                </p>
              </div>
              <StatusPill status={r.status} />
            </div>
          ))}
        </div>
      </PanelCard>
    </>
  );
}