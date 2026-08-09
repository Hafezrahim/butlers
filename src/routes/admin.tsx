import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  Briefcase,
  CalendarCheck,
  BarChart3,
  Handshake,
  Images,
  LayoutDashboard,
  LifeBuoy,
  MessageSquare,
  Quote,
  Newspaper,
  PartyPopper,
  Settings,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
} from "lucide-react";
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
  { to: "/admin", label: "Dashboard", labelAr: "لوحة التحكم", icon: LayoutDashboard, group: "Overview", groupAr: "نظرة عامة" },
  { to: "/admin/reservations", label: "Reservations", labelAr: "الحجوزات", icon: CalendarCheck, group: "Operations", groupAr: "العمليات" },
  { to: "/admin/events", label: "Events", labelAr: "الفعاليات", icon: PartyPopper, group: "Operations", groupAr: "العمليات" },
  { to: "/admin/guests", label: "Guests", labelAr: "الضيوف", icon: Users, group: "Operations", groupAr: "العمليات" },
  { to: "/admin/support", label: "Support", labelAr: "الدعم", icon: LifeBuoy, group: "Operations", groupAr: "العمليات" },
  { to: "/admin/inquiries", label: "Inquiries", labelAr: "طلبات التواصل", icon: MessageSquare, group: "Operations", groupAr: "العمليات" },
  { to: "/admin/brands", label: "Brands", labelAr: "العلامات", icon: Store, group: "Content", groupAr: "المحتوى" },
  { to: "/admin/services", label: "Services", labelAr: "الخدمات", icon: Sparkles, group: "Content", groupAr: "المحتوى" },
  { to: "/admin/gallery", label: "Gallery", labelAr: "معرض الصور", icon: Images, group: "Content", groupAr: "المحتوى" },
  { to: "/admin/careers", label: "Careers", labelAr: "الوظائف", icon: Briefcase, group: "Content", groupAr: "المحتوى" },
  { to: "/admin/openings", label: "Job openings", labelAr: "الوظائف الشاغرة", icon: Briefcase, group: "Content", groupAr: "المحتوى" },
  { to: "/admin/news", label: "News", labelAr: "الأخبار", icon: Newspaper, group: "Content", groupAr: "المحتوى" },
  { to: "/admin/testimonials", label: "Testimonials", labelAr: "آراء الضيوف", icon: Quote, group: "Content", groupAr: "المحتوى" },
  { to: "/admin/partners", label: "Partners", labelAr: "الشركاء", icon: Handshake, group: "Content", groupAr: "المحتوى" },
  { to: "/admin/stats", label: "Homepage stats", labelAr: "إحصائيات الرئيسية", icon: BarChart3, group: "Content", groupAr: "المحتوى" },
  { to: "/admin/users", label: "Users & Roles", labelAr: "المستخدمون والصلاحيات", icon: ShieldCheck, group: "System", groupAr: "النظام" },
  { to: "/admin/settings", label: "Settings", labelAr: "الإعدادات", icon: Settings, group: "System", groupAr: "النظام" },
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