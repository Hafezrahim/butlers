import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { PanelCard } from "@/components/panel/PanelShell";
import { ADMIN_GUESTS } from "@/data/panel";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/guests")({
  component: AdminGuests,
});

function AdminGuests() {
  const { t, isAr } = useI18n();
  const [q, setQ] = useState("");
  const rows = ADMIN_GUESTS.filter((g) =>
    `${g.name} ${g.nameAr} ${g.phone}`.toLowerCase().includes(q.trim().toLowerCase()),
  );

  return (
    <PanelCard title={t("Guest directory", "دليل الضيوف")}>
      <div className="mb-5 flex items-center gap-2 rounded-2xl border border-border px-4 py-2">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("Search guests", "ابحث عن ضيف")}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {rows.map((g) => (
          <div key={g.phone} className="flex items-center justify-between gap-4 rounded-2xl border border-border p-4">
            <div className="min-w-0">
              <p className="truncate font-display text-lg">{isAr ? g.nameAr : g.name}</p>
              <p className="text-xs text-muted-foreground" dir="ltr">{g.phone}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {g.visits} {t("visits", "زيارة")} · {g.spend}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-gold/20 px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-gold">
              {isAr ? g.tierAr : g.tier}
            </span>
          </div>
        ))}
      </div>
      {rows.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">{t("No guests found", "لا يوجد ضيوف")}</p>
      )}
    </PanelCard>
  );
}