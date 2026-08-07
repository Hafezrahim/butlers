import { createFileRoute } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { ADMIN_USERS, ROLE_MATRIX } from "@/data/panel";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

function AdminUsers() {
  const { t, isAr } = useI18n();

  return (
    <>
      <PanelCard
        title={t("Team members", "أعضاء الفريق")}
        action={
          <button
            onClick={() => toast(t("Invitation sent", "تم إرسال الدعوة"))}
            className="rounded-2xl bg-gold px-4 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground"
          >
            {t("Invite user", "دعوة مستخدم")}
          </button>
        }
      >
        <div className="divide-y divide-border">
          {ADMIN_USERS.map((u) => (
            <div key={u.email} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div className="min-w-0">
                <p className="font-display text-lg">{isAr ? u.nameAr : u.name}</p>
                <p className="text-xs text-muted-foreground" dir="ltr">{u.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-muted px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em]">
                  {isAr ? u.roleAr : u.role}
                </span>
                <span
                  className={`rounded-full px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${
                    u.status === "active" ? "bg-primary/15 text-primary" : "bg-gold/20 text-gold"
                  }`}
                >
                  {u.status === "active" ? t("Active", "نشط") : t("Invited", "مدعو")}
                </span>
                <button
                  onClick={() => toast(t("Permissions updated", "تم تحديث الصلاحيات"))}
                  className="rounded-xl border border-border px-3 py-1.5 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em]"
                >
                  {t("Manage", "إدارة")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </PanelCard>

      <PanelCard title={t("Permissions matrix", "مصفوفة الصلاحيات")}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-start text-sm">
            <thead>
              <tr className="border-b border-border">
                {[
                  t("Area", "المجال"),
                  t("Owner", "المالك"),
                  t("Manager", "المدير"),
                  t("Reservations", "الحجوزات"),
                  t("Editor", "المحرر"),
                ].map((h) => (
                  <th key={h} className="py-3 text-start font-button text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ROLE_MATRIX.map((r) => (
                <tr key={r.area}>
                  <td className="py-3">{isAr ? r.areaAr : r.area}</td>
                  {[r.owner, r.manager, r.reservations, r.editor].map((v, i) => (
                    <td key={i} className="py-3">
                      {v ? <Check className="size-4 text-primary" /> : <Minus className="size-4 text-muted-foreground" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelCard>
    </>
  );
}
