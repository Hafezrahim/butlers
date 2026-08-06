import { forwardRef } from "react";
import { useI18n } from "@/i18n";

export type ReservationData = {
  code: string;
  createdAt: string;
  brand: string;
  branch: string;
  guests: number;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  dining: string;
  drinks: string;
  extras: string[];
  notes: string;
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/70 px-4 py-3">
      <p className="font-button text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm text-foreground">{value || "—"}</p>
    </div>
  );
}

export const ReservationTicket = forwardRef<HTMLDivElement, { data: ReservationData }>(
  function ReservationTicket({ data }, ref) {
    const { t, dir } = useI18n();
    return (
      <div ref={ref} dir={dir} className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="ink-panel flex flex-wrap items-start justify-between gap-4 px-8 py-7">
          <div>
            <p className="font-button text-[10px] uppercase tracking-[0.24em] text-gold">Butlers &amp; Co</p>
            <h2 className="mt-2 text-2xl">{t("Reservation Confirmation", "تأكيد الحجز")}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{t("Issued", "تم الإصدار")} {data.createdAt}</p>
          </div>
          <div className="rounded-xl border border-gold/60 px-4 py-3 text-right">
            <p className="font-button text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t("Reservation No.", "رقم الحجز")}</p>
            <p className="mt-1 font-button text-lg tracking-[0.12em] text-gold">{data.code}</p>
          </div>
        </div>

        <div className="space-y-6 px-8 py-8">
          <div className="grid gap-3 sm:grid-cols-3">
            <Row label={t("Brand", "العلامة")} value={data.brand} />
            <Row label={t("Branch", "الفرع")} value={data.branch} />
            <Row label={t("Guests", "الضيوف")} value={String(data.guests)} />
            <Row label={t("Date", "التاريخ")} value={data.date} />
            <Row label={t("Time", "الوقت")} value={data.time} />
            <Row label={t("Status", "الحالة")} value={t("Pending confirmation", "بانتظار التأكيد")} />
          </div>

          <div>
            <p className="eyebrow">{t("Guest details", "بيانات الضيف")}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Row label={t("Name", "الاسم")} value={data.name} />
              <Row label={t("Phone", "الهاتف")} value={data.phone} />
              <Row label={t("Email", "البريد الإلكتروني")} value={data.email} />
            </div>
          </div>

          <div>
            <p className="eyebrow">{t("Experience", "التجربة")}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Row label={t("Dining", "الطعام")} value={data.dining} />
              <Row label={t("Drinks", "المشروبات")} value={data.drinks} />
              <Row label={t("Add-ons", "الإضافات")} value={data.extras.join(", ")} />
              <Row label={t("Special requests", "طلبات خاصة")} value={data.notes} />
            </div>
          </div>

          <p className="border-t border-border pt-5 text-xs text-muted-foreground">
            {t(
              `Please present this confirmation on arrival. Our team will call you on ${data.phone || "your number"} to finalise the booking. Enquiries: +20 100 741 9344.`,
              `يرجى إبراز هذا التأكيد عند الوصول. سيتصل بكم فريقنا على ${data.phone || "رقم هاتفكم"} لإتمام الحجز. للاستفسارات: ٠٠٢٠١٠٠٧٤١٩٣٤٤.`
            )}
          </p>
        </div>
      </div>
    );
  },
);
