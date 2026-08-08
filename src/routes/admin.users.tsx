import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { toast } from "sonner";
import { PanelCard } from "@/components/panel/PanelShell";
import { AddButton, CrudFormDialog, DeleteButton, EditButton, ExportButton, RowActions, type CrudField, type RecordValues } from "@/components/panel/CrudDialog";
import { exportToCsv } from "@/lib/utils";
import { ROLE_MATRIX } from "@/data/panel";
import { usePanelData, type UserRow } from "@/store/panel-store";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

const FIELDS: CrudField[] = [
  { key: "name", label: "Name (EN)", labelAr: "الاسم (EN)", required: true },
  { key: "nameAr", label: "Name (AR)", labelAr: "الاسم (AR)" },
  { key: "email", label: "Email", labelAr: "البريد الإلكتروني", required: true },
  { key: "role", label: "Role (EN)", labelAr: "الدور (EN)", type: "select", options: [
    { value: "Owner", label: "Owner", labelAr: "المالك" },
    { value: "Operations Manager", label: "Operations Manager", labelAr: "مدير العمليات" },
    { value: "Reservations", label: "Reservations", labelAr: "الحجوزات" },
    { value: "Content Editor", label: "Content Editor", labelAr: "محرر المحتوى" },
  ] },
  { key: "roleAr", label: "Role (AR)", labelAr: "الدور (AR)" },
  { key: "status", label: "Status", labelAr: "الحالة", type: "select", options: [
    { value: "active", label: "Active", labelAr: "نشط" },
    { value: "invited", label: "Invited", labelAr: "مدعو" },
  ] },
];

function AdminUsers() {
  const { t, isAr } = useI18n();
  const { data, create, update, remove } = usePanelData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<UserRow | null>(null);

  const submit = (v: RecordValues) => {
    const payload = {
      name: String(v["name"]),
      nameAr: String(v["nameAr"] || v["name"]),
      email: String(v["email"]),
      role: String(v["role"]),
      roleAr: String(v["roleAr"] || v["role"]),
      status: String(v["status"]),
    };
    if (editing) {
      update("users", editing.id, payload);
      toast.success(t("User updated", "تم تحديث المستخدم"));
    } else {
      create("users", payload);
      toast.success(t("Invitation sent", "تم إرسال الدعوة"));
    }
  };

  return (
    <>
      <PanelCard
        title={t("Team members", "أعضاء الفريق")}
        action={
          <div className="flex gap-2">
            <ExportButton onClick={() => exportToCsv(data.users, "Users")} />
            <AddButton onClick={() => { setEditing(null); setOpen(true); }} label={t("Invite user", "دعوة مستخدم")} />
          </div>
        }
      >
        <div className="divide-y divide-border">
          {data.users.map((u) => (
            <div key={u.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div className="min-w-0">
                <p className="font-display text-lg">{isAr ? u.nameAr : u.name}</p>
                <p className="text-xs text-muted-foreground" dir="ltr">{u.email}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-muted px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em]">
                  {isAr ? u.roleAr : u.role}
                </span>
                <button
                  onClick={() => {
                    update("users", u.id, { status: u.status === "active" ? "invited" : "active" });
                    toast.success(t("Status updated", "تم تحديث الحالة"));
                  }}
                  className={`rounded-full px-3 py-1 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${
                    u.status === "active" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-gold/20 text-gold"
                  }`}
                >
                  {u.status === "active" ? t("Active", "نشط") : t("Invited", "مدعو")}
                </button>
                <RowActions>
                  <EditButton onClick={() => { setEditing(u); setOpen(true); }} />
                  <DeleteButton
                    name={u.name}
                    onConfirm={() => {
                      remove("users", u.id);
                      toast.success(t("User removed", "تم حذف المستخدم"));
                    }}
                  />
                </RowActions>
              </div>
            </div>
          ))}
          {data.users.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">{t("No team members yet", "لا يوجد أعضاء بعد")}</p>
          )}
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

      <CrudFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? t("Edit user", "تعديل المستخدم") : t("Invite user", "دعوة مستخدم")}
        fields={FIELDS}
        initial={editing ? (editing as unknown as RecordValues) : { status: "invited" }}
        onSubmit={submit}
      />
    </>
  );
}
