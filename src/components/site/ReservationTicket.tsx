import { forwardRef } from "react";

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
    return (
      <div ref={ref} className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="ink-panel flex flex-wrap items-start justify-between gap-4 px-8 py-7">
          <div>
            <p className="font-button text-[10px] uppercase tracking-[0.24em] text-gold">Butlers &amp; Co</p>
            <h2 className="mt-2 text-2xl">Reservation Confirmation</h2>
            <p className="mt-1 text-xs text-muted-foreground">Issued {data.createdAt}</p>
          </div>
          <div className="rounded-xl border border-gold/60 px-4 py-3 text-right">
            <p className="font-button text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Reservation No.</p>
            <p className="mt-1 font-button text-lg tracking-[0.12em] text-gold">{data.code}</p>
          </div>
        </div>

        <div className="space-y-6 px-8 py-8">
          <div className="grid gap-3 sm:grid-cols-3">
            <Row label="Brand" value={data.brand} />
            <Row label="Branch" value={data.branch} />
            <Row label="Guests" value={String(data.guests)} />
            <Row label="Date" value={data.date} />
            <Row label="Time" value={data.time} />
            <Row label="Status" value="Pending confirmation" />
          </div>

          <div>
            <p className="eyebrow">Guest details</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Row label="Name" value={data.name} />
              <Row label="Phone" value={data.phone} />
              <Row label="Email" value={data.email} />
            </div>
          </div>

          <div>
            <p className="eyebrow">Experience</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Row label="Dining" value={data.dining} />
              <Row label="Drinks" value={data.drinks} />
              <Row label="Add-ons" value={data.extras.join(", ")} />
              <Row label="Special requests" value={data.notes} />
            </div>
          </div>

          <p className="border-t border-border pt-5 text-xs text-muted-foreground">
            Please present this confirmation on arrival. Our team will call you on {data.phone || "your number"} to
            finalise the booking. Enquiries: +20 100 741 9344.
          </p>
        </div>
      </div>
    );
  },
);