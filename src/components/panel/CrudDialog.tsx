import { useEffect, useState, type ReactNode } from "react";
import { Download, Pencil, Plus, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useI18n } from "@/i18n";

export type FieldType = "text" | "textarea" | "number" | "date" | "time" | "select" | "switch";

export type CrudField = {
  key: string;
  label: string;
  labelAr: string;
  type?: FieldType;
  options?: { value: string; label: string; labelAr: string }[];
  required?: boolean;
  placeholder?: string;
  full?: boolean;
};

export type RecordValues = Record<string, string | number | boolean>;

const inputClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-gold";

export function CrudFormDialog({
  open,
  onOpenChange,
  title,
  fields,
  initial,
  onSubmit,
  submitLabel,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  fields: CrudField[];
  initial?: RecordValues;
  onSubmit: (values: RecordValues) => void;
  submitLabel?: string;
}) {
  const { t, isAr } = useI18n();
  const [values, setValues] = useState<RecordValues>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!open) return;
    const base: RecordValues = {};
    for (const f of fields) {
      const v = initial?.[f.key];
      base[f.key] = v !== undefined ? v : f.type === "switch" ? false : f.type === "number" ? 0 : f.type === "select" ? (f.options?.[0]?.value ?? "") : "";
    }
    setValues(base);
    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const set = (k: string, v: string | number | boolean) => setValues((cur) => ({ ...cur, [k]: v }));

  const submit = () => {
    const next: Record<string, boolean> = {};
    for (const f of fields) {
      if (f.required && String(values[f.key] ?? "").trim() === "") next[f.key] = true;
    }
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg" dir={isAr ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
              <label className="mb-1.5 block font-button text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {isAr ? f.labelAr : f.label}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={String(values[f.key] ?? "")}
                  onChange={(e) => set(f.key, e.target.value)}
                  className={inputClass}
                />
              ) : f.type === "select" ? (
                <select value={String(values[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)} className={inputClass}>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {isAr ? o.labelAr : o.label}
                    </option>
                  ))}
                </select>
              ) : f.type === "switch" ? (
                <button
                  type="button"
                  onClick={() => set(f.key, !values[f.key])}
                  className={`h-9 w-16 rounded-full border transition-colors ${values[f.key] ? "border-primary bg-primary" : "border-border bg-muted"}`}
                >
                  <span
                    className={`block size-7 rounded-full bg-background transition-transform ${values[f.key] ? "translate-x-8 rtl:-translate-x-8" : "translate-x-1 rtl:-translate-x-1"}`}
                  />
                </button>
              ) : (
                <input
                  type={f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "time" ? "time" : "text"}
                  value={String(values[f.key] ?? "")}
                  placeholder={f.placeholder}
                  onChange={(e) => set(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)}
                  className={inputClass}
                  dir={f.type === "date" || f.type === "time" ? "ltr" : undefined}
                />
              )}
              {errors[f.key] && (
                <p className="mt-1 text-xs text-destructive">{t("This field is required", "هذا الحقل مطلوب")}</p>
              )}
            </div>
          ))}
        </div>
        <DialogFooter className="gap-2 sm:gap-2">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-2xl border border-border px-4 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.12em]"
          >
            {t("Cancel", "إلغاء")}
          </button>
          <button
            onClick={submit}
            className="rounded-2xl bg-gold px-4 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground"
          >
            {submitLabel ?? t("Save", "حفظ")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteButton({ onConfirm, name }: { onConfirm: () => void; name?: string }) {
  const { t, isAr } = useI18n();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          aria-label={t("Delete", "حذف")}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-destructive transition-colors hover:border-destructive"
        >
          <Trash2 className="size-3.5" />
          {t("Delete", "حذف")}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent dir={isAr ? "rtl" : "ltr"}>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("Delete this record?", "حذف هذا العنصر؟")}</AlertDialogTitle>
          <AlertDialogDescription>
            {name
              ? t(`"${name}" will be permanently removed.`, `سيتم حذف "${name}" نهائيًا.`)
              : t("This action cannot be undone.", "لا يمكن التراجع عن هذا الإجراء.")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("Cancel", "إلغاء")}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {t("Delete", "حذف")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function EditButton({ onClick }: { onClick: () => void }) {
  const { t } = useI18n();
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 font-button text-[0.62rem] font-semibold uppercase tracking-[0.1em] transition-colors hover:border-gold"
    >
      <Pencil className="size-3.5" />
      {t("Edit", "تعديل")}
    </button>
  );
}

export function AddButton({ onClick, label }: { onClick: () => void; label?: string }) {
  const { t } = useI18n();
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-2xl bg-gold px-4 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground transition-opacity hover:opacity-90"
    >
      <Plus className="size-4" />
      {label ?? t("Add new", "إضافة جديد")}
    </button>
  );
}

export function ExportButton({ onClick }: { onClick: () => void }) {
  const { t } = useI18n();
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2 font-button text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-gold"
    >
      <Download className="size-4" />
      {t("Export CSV", "تصدير CSV")}
    </button>
  );
}

export function RowActions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}
