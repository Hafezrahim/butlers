import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CalendarCheck, LayoutDashboard, Star, User } from "lucide-react";
import { PanelShell, type PanelNavItem } from "@/components/panel/PanelShell";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Butlers & Co Guest Panel" },
      { name: "description", content: "Manage your Butlers & Co reservations, loyalty tier and guest profile in one place." },
      { property: "og:title", content: "My Account — Butlers & Co Guest Panel" },
      { property: "og:description", content: "Manage your Butlers & Co reservations, loyalty tier and guest profile." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountLayout,
});

const NAV: PanelNavItem[] = [
  { to: "/account", label: "Overview", labelAr: "نظرة عامة", icon: LayoutDashboard },
  { to: "/account/reservations", label: "Reservations", labelAr: "حجوزاتي", icon: CalendarCheck },
  { to: "/account/loyalty", label: "Loyalty", labelAr: "الولاء", icon: Star },
  { to: "/account/profile", label: "Profile", labelAr: "الملف الشخصي", icon: User },
];

function AccountLayout() {
  const { t } = useI18n();
  return (
    <PanelShell
      subtitle={t("Guest Panel", "لوحة الضيف")}
      title={t("Welcome back, Hafez", "أهلاً بعودتك، حافظ")}
      nav={NAV}
    >
      <Outlet />
    </PanelShell>
  );
}