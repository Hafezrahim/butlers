import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/i18n";
import { STATUS_LABEL, type ResStatus } from "@/data/panel";

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
        <div className="container-site py-10">
          <p className="eyebrow">{subtitle}</p>
          <h1 className="mt-2 text-3xl text-warm md:text-4xl">{title}</h1>
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
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="eyebrow text-[0.62rem]">{label}</p>
        <Icon className="size-4 text-gold" />
      </div>
      <p className="mt-3 font-display text-3xl">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

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