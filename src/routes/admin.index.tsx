import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Clock, LifeBuoy, Percent, Star, TrendingUp, Users } from "lucide-react";
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

const CHANNELS = [
  { en: "Website", ar: "الموقع", pct: 46, bar: "bg-gold" },
  { en: "Phone", ar: "الهاتف", pct: 24, bar: "bg-tone-emerald" },
  { en: "WhatsApp", ar: "واتساب", pct: 19, bar: "bg-tone-sky" },
  { en: "Walk-in", ar: "بدون حجز", pct: 11, bar: "bg-tone-plum" },
];

const HOUSES = [
  { en: "The Butler's Table", ar: "طاولة البتلر", pct: 92, tone: "text-tone-emerald", bar: "bg-tone-emerald" },
  { en: "Velvet Lounge", ar: "فيلفيت لاونج", pct: 78, tone: "text-gold", bar: "bg-gold" },
  { en: "Butlers Catering", ar: "بتلرز للضيافة", pct: 64, tone: "text-tone-sky", bar: "bg-tone-sky" },
];

function AdminDashboard() {
  const { t, isAr } = useI18n();
  const latest = ADMIN_RESERVATIONS.slice(-4).reverse();

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard tone="emerald" trend={12} progress={72} label={t("Today's covers", "ضيوف اليوم")} value="248" hint={t("vs last week", "مقارنة بالأسبوع الماضي")} icon={Users} />
        <StatCard tone="gold" trend={5} progress={58} label={t("Reservations", "الحجوزات")} value="63" hint={t("9 pending approval", "٩ في انتظار الموافقة")} icon={CalendarCheck} />
        <StatCard tone="sky" trend={-3} progress={87} label={t("Occupancy", "نسبة الإشغال")} value="87%" hint={t("Across 3 houses", "عبر ٣ فروع")} icon={Percent} />
        <StatCard tone="plum" trend={8} progress={64} label={t("Revenue (week)", "الإيرادات (الأسبوع)")} value="EGP 1.24M" hint={t("vs target", "مقارنة بالمستهدف")} icon={TrendingUp} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard tone="rose" label={t("Open tickets", "تذاكر مفتوحة")} value="4" hint={t("2 high priority", "٢ أولوية عالية")} icon={LifeBuoy} />
        <StatCard tone="gold" label={t("Avg. guest rating", "متوسط تقييم الضيوف")} value="4.8" hint={t("From 312 reviews", "من ٣١٢ تقييم")} icon={Star} progress={96} />
        <StatCard tone="emerald" label={t("Avg. seating time", "متوسط مدة الجلوس")} value="1h 48m" hint={t("Target 2h", "المستهدف ساعتان")} icon={Clock} progress={82} />
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

      <div className="grid gap-6 lg:grid-cols-2">
        <PanelCard title={t("Booking channels", "قنوات الحجز")}>
          <div className="space-y-4">
            {CHANNELS.map((c) => (
              <div key={c.en}>
                <div className="flex items-center justify-between text-sm">
                  <span>{isAr ? c.ar : c.en}</span>
                  <span className="font-button text-xs text-muted-foreground" dir="ltr">{c.pct}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-foreground/10">
                  <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard title={t("House performance", "أداء الفروع")}>
          <div className="space-y-4">
            {HOUSES.map((h) => (
              <div key={h.en} className="rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{isAr ? h.ar : h.en}</p>
                  <span className={`font-display text-xl ${h.tone}`} dir="ltr">{h.pct}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                  <div className={`h-full rounded-full ${h.bar}`} style={{ width: `${h.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>

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