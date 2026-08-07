import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  CalendarCheck,
  CalendarPlus,
  Check,
  Clock,
  Download,
  LifeBuoy,
  Megaphone,
  Percent,
  Plus,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { PanelCard, StatCard, StatusPill } from "@/components/panel/PanelShell";
import { ADMIN_GUESTS, ADMIN_RESERVATIONS } from "@/data/panel";
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

const RANGES = [
  { key: "today", en: "Today", ar: "اليوم", covers: "248", res: "63", revenue: "EGP 186K", occ: "87%" },
  { key: "week", en: "7 days", ar: "٧ أيام", covers: "1,642", res: "402", revenue: "EGP 1.24M", occ: "81%" },
  { key: "month", en: "30 days", ar: "٣٠ يوم", covers: "6,910", res: "1,738", revenue: "EGP 5.06M", occ: "76%" },
] as const;

const REVENUE_TREND = [42, 55, 48, 63, 71, 66, 82, 78, 90, 86, 97, 104];

const RUN_SHEET = [
  { time: "12:30", en: "Lunch service — The Butler's Table", ar: "خدمة الغداء — طاولة البتلر", meta: "48 pax", tone: "bg-tone-emerald" },
  { time: "16:00", en: "Private tasting — Chef's room", ar: "تذوق خاص — غرفة الشيف", meta: "10 pax", tone: "bg-gold" },
  { time: "19:00", en: "Dinner service — all houses", ar: "خدمة العشاء — كل الفروع", meta: "132 pax", tone: "bg-tone-sky" },
  { time: "22:30", en: "Live set — Velvet Lounge", ar: "عرض حي — فيلفيت لاونج", meta: "58 pax", tone: "bg-tone-plum" },
];

const INITIAL_TASKS = [
  { id: "t1", en: "Approve 9 pending reservations", ar: "اعتماد ٩ حجوزات معلقة", done: false },
  { id: "t2", en: "Confirm florist for Saturday gala", ar: "تأكيد منسق الزهور لحفل السبت", done: false },
  { id: "t3", en: "Publish August tasting menu", ar: "نشر قائمة تذوق أغسطس", done: true },
  { id: "t4", en: "Reply to 2 high-priority tickets", ar: "الرد على تذكرتي دعم عاجلتين", done: false },
];

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${40 - (v / max) * 34}`).join(" ");
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-28 w-full">
      <polygon points={`0,40 ${pts} 100,40`} className="fill-gold/15" />
      <polyline points={pts} fill="none" className="stroke-gold" strokeWidth={1.4} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function AdminDashboard() {
  const { t, isAr } = useI18n();
  const [range, setRange] = useState<(typeof RANGES)[number]["key"]>("today");
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [handled, setHandled] = useState<Record<string, "confirmed" | "cancelled">>({});
  const active = RANGES.find((r) => r.key === range)!;
  const latest = ADMIN_RESERVATIONS.slice(-5).reverse();
  const topGuests = useMemo(
    () => [...ADMIN_GUESTS].sort((a, b) => (b as any).spend - (a as any).spend).slice(0, 4),
    [],
  );
  const doneCount = tasks.filter((x) => x.done).length;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-2xl border border-border bg-card p-1">
          {RANGES.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRange(r.key)}
              className={`rounded-xl px-4 py-2 font-button text-[0.68rem] font-semibold uppercase tracking-[0.1em] transition-colors ${
                range === r.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isAr ? r.ar : r.en}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/reservations"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 font-button text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-primary-foreground"
          >
            <Plus className="size-4" />
            {t("New reservation", "حجز جديد")}
          </Link>
          <Link
            to="/admin/events"
            className="inline-flex items-center gap-2 rounded-2xl border border-border px-4 py-2.5 font-button text-[0.68rem] font-semibold uppercase tracking-[0.1em] transition-colors hover:border-gold"
          >
            <CalendarPlus className="size-4" />
            {t("Add event", "إضافة فعالية")}
          </Link>
          <button
            type="button"
            onClick={() => toast.success(t("Broadcast sent to 312 guests", "تم إرسال الإشعار إلى ٣١٢ ضيف"))}
            className="inline-flex items-center gap-2 rounded-2xl border border-border px-4 py-2.5 font-button text-[0.68rem] font-semibold uppercase tracking-[0.1em] transition-colors hover:border-gold"
          >
            <Megaphone className="size-4" />
            {t("Broadcast", "إشعار جماعي")}
          </button>
          <button
            type="button"
            onClick={() => toast.success(t("Report export started", "بدأ تصدير التقرير"))}
            className="inline-flex items-center gap-2 rounded-2xl border border-border px-4 py-2.5 font-button text-[0.68rem] font-semibold uppercase tracking-[0.1em] transition-colors hover:border-gold"
          >
            <Download className="size-4" />
            {t("Export", "تصدير")}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard tone="emerald" trend={12} progress={72} label={t("Covers", "عدد الضيوف")} value={active.covers} hint={t("vs last period", "مقارنة بالفترة السابقة")} icon={Users} />
        <StatCard tone="gold" trend={5} progress={58} label={t("Reservations", "الحجوزات")} value={active.res} hint={t("9 pending approval", "٩ في انتظار الموافقة")} icon={CalendarCheck} />
        <StatCard tone="sky" trend={-3} progress={87} label={t("Occupancy", "نسبة الإشغال")} value={active.occ} hint={t("Across 3 houses", "عبر ٣ فروع")} icon={Percent} />
        <StatCard tone="plum" trend={8} progress={64} label={t("Revenue", "الإيرادات")} value={active.revenue} hint={t("vs target", "مقارنة بالمستهدف")} icon={TrendingUp} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard tone="rose" label={t("Open tickets", "تذاكر مفتوحة")} value="4" hint={t("2 high priority", "٢ أولوية عالية")} icon={LifeBuoy} />
        <StatCard tone="gold" label={t("Avg. guest rating", "متوسط تقييم الضيوف")} value="4.8" hint={t("From 312 reviews", "من ٣١٢ تقييم")} icon={Star} progress={96} />
        <StatCard tone="emerald" label={t("Avg. seating time", "متوسط مدة الجلوس")} value="1h 48m" hint={t("Target 2h", "المستهدف ساعتان")} icon={Clock} progress={82} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <PanelCard
          title={t("Revenue trend", "اتجاه الإيرادات")}
          action={<span className="font-button text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground">{t("Last 12 weeks", "آخر ١٢ أسبوع")}</span>}
        >
          <Sparkline data={REVENUE_TREND} />
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              { l: t("Avg. spend", "متوسط الإنفاق"), v: "EGP 1,840" },
              { l: t("No-show rate", "نسبة عدم الحضور"), v: "3.2%" },
              { l: t("Repeat guests", "ضيوف متكررون"), v: "58%" },
            ].map((k) => (
              <div key={k.l} className="rounded-2xl border border-border p-3">
                <p className="font-display text-lg" dir="ltr">{k.v}</p>
                <p className="text-[0.68rem] text-muted-foreground">{k.l}</p>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard title={t("Today's run sheet", "جدول اليوم")}>
          <ol className="space-y-4">
            {RUN_SHEET.map((s) => (
              <li key={s.time} className="flex gap-3">
                <span className="font-button text-xs text-muted-foreground" dir="ltr">{s.time}</span>
                <span className={`mt-1.5 size-2 shrink-0 rounded-full ${s.tone}`} />
                <div className="min-w-0">
                  <p className="text-sm leading-snug">{isAr ? s.ar : s.en}</p>
                  <p className="text-[0.68rem] text-muted-foreground" dir="ltr">{s.meta}</p>
                </div>
              </li>
            ))}
          </ol>
        </PanelCard>
      </div>

      <PanelCard title={t("Weekly occupancy", "الإشغال الأسبوعي")}>
        <div className="flex items-end gap-3">
          {OCCUPANCY.map((d) => (
            <div key={d.day} className="group flex flex-1 flex-col items-center gap-2">
              <span className="font-button text-[0.62rem] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" dir="ltr">
                {d.pct}%
              </span>
              <div className="relative h-40 w-full">
                <div className="absolute bottom-0 w-full rounded-t-xl bg-primary/80 transition-colors group-hover:bg-gold" style={{ height: `${d.pct}%` }} />
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

      <div className="grid gap-6 lg:grid-cols-2">
        <PanelCard
          title={t("Operations checklist", "قائمة مهام التشغيل")}
          action={
            <span className="font-button text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground" dir="ltr">
              {doneCount}/{tasks.length}
            </span>
          }
        >
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id}>
                <button
                  type="button"
                  onClick={() => setTasks((prev) => prev.map((x) => (x.id === task.id ? { ...x, done: !x.done } : x)))}
                  className="flex w-full items-center gap-3 rounded-2xl border border-border p-3 text-start transition-colors hover:border-gold"
                >
                  <span
                    className={`grid size-5 shrink-0 place-items-center rounded-md border ${
                      task.done ? "border-transparent bg-tone-emerald text-warm" : "border-border"
                    }`}
                  >
                    {task.done && <Check className="size-3.5" />}
                  </span>
                  <span className={`text-sm ${task.done ? "text-muted-foreground line-through" : ""}`}>
                    {isAr ? task.ar : task.en}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard
          title={t("Top guests", "أفضل الضيوف")}
          action={
            <Link to="/admin/guests" className="font-button text-[0.62rem] uppercase tracking-[0.1em] text-gold">
              {t("View all", "عرض الكل")}
            </Link>
          }
        >
          <div className="divide-y divide-border">
            {topGuests.map((g: any) => (
              <div key={g.name} className="flex items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-primary/10 font-button text-[0.7rem] font-semibold text-primary">
                    {(isAr ? g.nameAr ?? g.name : g.name).slice(0, 2)}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{isAr ? g.nameAr ?? g.name : g.name}</p>
                    <p className="text-xs text-muted-foreground" dir="ltr">
                      {g.visits} {t("visits", "زيارة")} · {g.tier}
                    </p>
                  </div>
                </div>
                <span className="font-display text-lg text-gold" dir="ltr">
                  EGP {Number(g.spend).toLocaleString("en-US")}
                </span>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>

      <PanelCard
        title={t("Latest reservations", "أحدث الحجوزات")}
        action={
          <Link to="/admin/reservations" className="font-button text-[0.62rem] uppercase tracking-[0.1em] text-gold">
            {t("Manage", "إدارة")}
          </Link>
        }
      >
        <div className="divide-y divide-border">
          {latest.map((r) => (
            <div key={r.code} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-medium">{isAr ? r.guestAr : r.guest}</p>
                <p className="text-xs text-muted-foreground">
                  {isAr ? r.brandAr : r.brand} · <span dir="ltr">{r.date}</span> · <span dir="ltr">{r.time}</span> · {r.party} {t("pax", "أفراد")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill status={handled[r.code] ?? r.status} />
                {(handled[r.code] ?? r.status) === "pending" && (
                  <>
                    <button
                      type="button"
                      aria-label={t("Approve", "اعتماد")}
                      onClick={() => {
                        setHandled((p) => ({ ...p, [r.code]: "confirmed" }));
                        toast.success(t("Reservation confirmed", "تم تأكيد الحجز"));
                      }}
                      className="rounded-xl border border-border p-2 text-tone-emerald transition-colors hover:border-tone-emerald"
                    >
                      <Check className="size-4" />
                    </button>
                    <button
                      type="button"
                      aria-label={t("Decline", "رفض")}
                      onClick={() => {
                        setHandled((p) => ({ ...p, [r.code]: "cancelled" }));
                        toast(t("Reservation cancelled", "تم إلغاء الحجز"));
                      }}
                      className="rounded-xl border border-border p-2 text-destructive transition-colors hover:border-destructive"
                    >
                      <X className="size-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </PanelCard>
    </>
  );
}