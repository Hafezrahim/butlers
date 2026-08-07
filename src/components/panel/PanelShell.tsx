import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Bell, CalendarCheck, CircleAlert, LifeBuoy, LogOut, Search, Settings, TrendingDown, TrendingUp, UserRound } from "lucide-react";
import { useI18n } from "@/i18n";
import { STATUS_LABEL, type ResStatus } from "@/data/panel";
import { cn } from "@/lib/utils";

export type PanelNavItem = {
  to: string;
  label: string;
  labelAr: string;
  icon: LucideIcon;
  group?: string;
  groupAr?: string;
};

export function PanelShell({
  title,
  subtitle,
  nav,
  children,
}: {
  title: string;
  subtitle: string;
  nav: PanelNavItem[];
  children: ReactNode;
}) {
  const { isAr } = useI18n();
  const [openMenu, setOpenMenu] = useState<null | "bell" | "user">(null);
  const notifications = [
    { icon: CalendarCheck, en: "9 reservations awaiting approval", ar: "٩ حجوزات بانتظار الموافقة", time: isAr ? "منذ ٥ د" : "5m ago", tone: "text-gold" },
    { icon: LifeBuoy, en: "2 high-priority support tickets", ar: "تذكرتا دعم بأولوية عالية", time: isAr ? "منذ ٢٢ د" : "22m ago", tone: "text-tone-rose" },
    { icon: CircleAlert, en: "Velvet Lounge is at 96% capacity tonight", ar: "فيلفيت لاونج بنسبة إشغال ٩٦٪ الليلة", time: isAr ? "منذ ساعة" : "1h ago", tone: "text-tone-sky" },
  ];

  const groups: { key: string; labelEn: string; labelAr: string; items: PanelNavItem[] }[] = [];
  for (const item of nav) {
    const key = item.group ?? "";
    let g = groups.find((x) => x.key === key);
    if (!g) {
      g = { key, labelEn: item.group ?? "", labelAr: item.groupAr ?? item.group ?? "", items: [] };
      groups.push(g);
    }
    g.items.push(item);
  }

  return (
    <div className="bg-background">
      <div className="ink-panel border-b border-white/10">
        <div className="container-site flex flex-wrap items-center justify-between gap-4 py-6 md:py-8">
          <div className="min-w-0">
            <p className="eyebrow">{subtitle}</p>
            <h1 className="mt-2 truncate text-2xl text-warm md:text-4xl">{title}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <label className="hidden items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-warm lg:flex">
              <Search className="size-4 text-gold" />
              <input
                type="search"
                placeholder={isAr ? "بحث سريع…" : "Quick search…"}
                className="w-40 bg-transparent text-sm text-warm outline-none placeholder:text-white/45"
              />
            </label>

            <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((v) => (v === "bell" ? null : "bell"))}
              aria-label={isAr ? "الإشعارات" : "Notifications"}
              className="relative rounded-2xl border border-white/15 bg-white/5 p-2.5 text-warm transition-colors hover:border-gold hover:text-gold"
            >
              <Bell className="size-4" />
              <span className="absolute -end-1 -top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[0.55rem] font-semibold text-destructive-foreground">
                3
              </span>
            </button>
            {openMenu === "bell" && (
              <div className="absolute end-0 top-full z-30 mt-2 w-80 rounded-2xl border border-border bg-card p-2 shadow-xl">
                <p className="eyebrow px-3 py-2 text-[0.58rem]">{isAr ? "الإشعارات" : "Notifications"}</p>
                {notifications.map((n) => (
                  <div key={n.en} className="flex gap-3 rounded-xl px-3 py-2.5 hover:bg-muted">
                    <n.icon className={cn("mt-0.5 size-4 shrink-0", n.tone)} />
                    <div className="min-w-0">
                      <p className="text-sm leading-snug">{isAr ? n.ar : n.en}</p>
                      <p className="text-[0.68rem] text-muted-foreground">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </div>

            <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((v) => (v === "user" ? null : "user"))}
              className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/5 px-2.5 py-1.5 transition-colors hover:border-gold"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-gold font-button text-xs font-semibold text-foreground">
                HR
              </span>
              <div className="hidden text-start leading-tight sm:block">
                <p className="text-sm text-warm">{isAr ? "حافظ رحيم" : "Hafez Rahim"}</p>
                <p className="text-[0.68rem] text-white/55">{isAr ? "المالك" : "Owner"}</p>
              </div>
            </button>
            {openMenu === "user" && (
              <div className="absolute end-0 top-full z-30 mt-2 w-56 rounded-2xl border border-border bg-card p-2 shadow-xl">
                <Link to="/account/profile" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm hover:bg-muted">
                  <UserRound className="size-4 text-muted-foreground" />
                  {isAr ? "الملف الشخصي" : "My profile"}
                </Link>
                <Link to="/admin/settings" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm hover:bg-muted">
                  <Settings className="size-4 text-muted-foreground" />
                  {isAr ? "الإعدادات" : "Settings"}
                </Link>
                <Link to="/" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10">
                  <LogOut className="size-4" />
                  {isAr ? "تسجيل الخروج" : "Log out"}
                </Link>
              </div>
            )}
            </div>

            <Link
              to="/"
              aria-label={isAr ? "تسجيل الخروج" : "Log out"}
              className="rounded-2xl border border-white/15 bg-white/5 p-2.5 text-warm transition-colors hover:border-destructive hover:text-destructive"
            >
              <LogOut className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container-site grid gap-8 py-10 lg:grid-cols-[248px_1fr]">
        <nav className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:flex-col lg:gap-5 lg:self-start lg:overflow-visible lg:pb-0">
          {groups.map((g) => (
            <div key={g.key} className="flex shrink-0 gap-2 lg:flex-col lg:gap-1.5">
              {g.key && (
                <p className="hidden lg:block eyebrow text-[0.58rem] text-muted-foreground">
                  {isAr ? g.labelAr : g.labelEn}
                </p>
              )}
              {g.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "bg-primary text-primary-foreground border-transparent" }}
                  className="flex shrink-0 items-center gap-2 rounded-2xl border border-border px-4 py-2.5 font-button text-[0.72rem] font-semibold uppercase tracking-[0.1em] transition-colors hover:border-gold"
                >
                  <item.icon className="size-4" />
                  {isAr ? item.labelAr : item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="min-w-0 space-y-8">{children}</div>
      </div>
    </div>
  );
}

export function PanelCard({
  title,
  action,
  children,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 md:p-6">
      {(title || action) && (
        <div className="mb-5 flex items-center justify-between gap-4">
          {title && <h2 className="text-lg md:text-xl">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "gold",
  trend,
  progress,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  tone?: StatTone;
  trend?: number;
  progress?: number;
}) {
  const t = TONES[tone];
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-5 transition-shadow hover:shadow-lg",
        t.border,
        t.bg,
      )}
    >
      <div className={cn("absolute -end-8 -top-8 size-24 rounded-full blur-2xl opacity-60", t.glow)} />
      <div className="relative flex items-start justify-between gap-3">
        <p className="eyebrow text-[0.62rem]">{label}</p>
        <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl", t.iconBg)}>
          <Icon className={cn("size-4", t.text)} />
        </span>
      </div>
      <p className="relative mt-3 font-display text-3xl">{value}</p>
      <div className="relative mt-1 flex flex-wrap items-center gap-2">
        {typeof trend === "number" && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-button text-[0.6rem] font-semibold",
              trend >= 0 ? "bg-tone-emerald/15 text-tone-emerald" : "bg-destructive/15 text-destructive",
            )}
          >
            {trend >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
            <span dir="ltr">{trend > 0 ? `+${trend}` : trend}%</span>
          </span>
        )}
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      {typeof progress === "number" && (
        <div className="relative mt-4 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
          <div className={cn("h-full rounded-full", t.bar)} style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}

export type StatTone = "gold" | "emerald" | "plum" | "sky" | "rose";

const TONES: Record<StatTone, { bg: string; border: string; text: string; iconBg: string; bar: string; glow: string }> = {
  gold: { bg: "bg-gold/8", border: "border-gold/25", text: "text-gold", iconBg: "bg-gold/15", bar: "bg-gold", glow: "bg-gold/25" },
  emerald: { bg: "bg-tone-emerald/8", border: "border-tone-emerald/25", text: "text-tone-emerald", iconBg: "bg-tone-emerald/15", bar: "bg-tone-emerald", glow: "bg-tone-emerald/25" },
  plum: { bg: "bg-tone-plum/8", border: "border-tone-plum/25", text: "text-tone-plum", iconBg: "bg-tone-plum/15", bar: "bg-tone-plum", glow: "bg-tone-plum/25" },
  sky: { bg: "bg-tone-sky/8", border: "border-tone-sky/25", text: "text-tone-sky", iconBg: "bg-tone-sky/15", bar: "bg-tone-sky", glow: "bg-tone-sky/25" },
  rose: { bg: "bg-tone-rose/8", border: "border-tone-rose/25", text: "text-tone-rose", iconBg: "bg-tone-rose/15", bar: "bg-tone-rose", glow: "bg-tone-rose/25" },
};

const STATUS_CLASS: Record<ResStatus, string> = {
  confirmed: "bg-primary/15 text-primary",
  pending: "bg-gold/20 text-gold",
  seated: "bg-muted text-foreground",
  cancelled: "bg-destructive/15 text-destructive",
};

export function StatusPill({ status }: { status: ResStatus }) {
  const { isAr } = useI18n();
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 font-button text-[0.65rem] font-semibold uppercase tracking-[0.1em] ${STATUS_CLASS[status]}`}
    >
      {isAr ? STATUS_LABEL[status].ar : STATUS_LABEL[status].en}
    </span>
  );
}