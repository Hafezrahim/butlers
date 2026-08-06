import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CalendarCheck, LayoutDashboard, PartyPopper, Users } from "lucide-react";
import { PanelShell, type PanelNavItem } from "@/components/panel/PanelShell";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Butlers & Co Operations" },
      { name: "description", content: "Operations console for Butlers & Co: reservations, events, guests and venue performance." },
      { property: "og:title", content: "Admin Panel — Butlers & Co Operations" },
      { property: "og:description", content: "Operations console for reservations, events and guests." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const NAV: PanelNavItem[] = [
  { to: "/admin", label: "Dashboard", labelAr: "لوحة التحكم", icon: LayoutDashboard },
  { to: "/admin/reservations", label: "Reservations", labelAr: "الحجوزات", icon: CalendarCheck },
  { to: "/admin/events", label: "Events", labelAr: "الفعاليات", icon: PartyPopper },
  { to: "/admin/guests", label: "Guests", labelAr: "الضيوف", icon: Users },
];

function AdminLayout() {
  const { t } = useI18n();
  return (
    <PanelShell
      subtitle={t("Operations Console", "لوحة العمليات")}
      title={t("Butlers & Co Admin", "إدارة بتلرز آند كو")}
      nav={NAV}
    >
      <Outlet />
    </PanelShell>
  );
}