import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ADMIN_APPLICATIONS,
  ADMIN_EVENTS,
  ADMIN_GUESTS,
  ADMIN_POSTS,
  ADMIN_RESERVATIONS,
  ADMIN_TICKETS,
  ADMIN_USERS,
  type PanelReservation,
} from "@/data/panel";
import { brands as SITE_BRANDS, galleryItems as SITE_GALLERY, services as SITE_SERVICES } from "@/data/site";

export type WithId<T> = T & { id: string };

export type BrandRow = { id: string; name: string; nameAr: string; cuisine: string; cuisineAr: string; location: string; locationAr: string; image: string; tags: string; tagsAr: string; status: string };
export type ServiceRow = { id: string; slug: string; name: string; nameAr: string; desc: string; descAr: string; status: string };
export type GalleryRow = { id: string; src: string; category: string; categoryAr: string; alt: string; altAr: string };
export type EventRow = { id: string; title: string; titleAr: string; date: string; venue: string; venueAr: string; seats: number; booked: number; status: string };
export type GuestRow = { id: string; name: string; nameAr: string; phone: string; email: string; visits: number; tier: string; tierAr: string; spend: string };
export type TicketRow = { id: string; ref: string; subject: string; subjectAr: string; guest: string; guestAr: string; channel: string; channelAr: string; priority: string; status: string; updated: string };
export type UserRow = { id: string; name: string; nameAr: string; email: string; role: string; roleAr: string; status: string };
export type ApplicationRow = { id: string; name: string; nameAr: string; role: string; roleAr: string; venue: string; venueAr: string; date: string; status: string };
export type PostRow = { id: string; title: string; titleAr: string; category: string; categoryAr: string; date: string; status: string };
export type OpeningRow = { id: string; title: string; titleAr: string; dept: string; deptAr: string; type: string; typeAr: string; reqs: string; reqsAr: string; status: string };
export type InquiryRow = { id: string; name: string; email: string; phone: string; topic: string; topicAr: string; message: string; status: string; date: string };
export type TestimonialRow = { id: string; name: string; nameAr: string; text: string; textAr: string; rating: number; status: string };
export type PartnerRow = { id: string; name: string; nameAr: string; category: string; categoryAr: string; status: string };
export type StatRow = { id: string; value: string; label: string; labelAr: string };
export type NoteRow = { id: string; code: string; author: string; text: string; at: string };
export type ReservationRow = WithId<PanelReservation>;

export type SettingsRow = {
  company: string;
  companyAr: string;
  email: string;
  phone: string;
  address: string;
  addressAr: string;
  autoConfirm: boolean;
  holdMinutes: number;
  maxParty: number;
  emailAlerts: boolean;
  smsAlerts: boolean;
  whatsappAlerts: boolean;
};

export type PanelData = {
  reservations: ReservationRow[];
  brands: BrandRow[];
  services: ServiceRow[];
  gallery: GalleryRow[];
  events: EventRow[];
  guests: GuestRow[];
  tickets: TicketRow[];
  users: UserRow[];
  applications: ApplicationRow[];
  posts: PostRow[];
  openings: OpeningRow[];
  inquiries: InquiryRow[];
  testimonials: TestimonialRow[];
  partners: PartnerRow[];
  stats: StatRow[];
  notes: NoteRow[];
  settings: SettingsRow;
};

export const uid = () => Math.random().toString(36).slice(2, 10);

function seed(): PanelData {
  return {
    reservations: ADMIN_RESERVATIONS.map((r) => ({ ...r, id: r.code })),
    brands: SITE_BRANDS.map((b, i) => ({ id: `brand-${i}`, name: b.name, nameAr: b.nameAr, cuisine: b.cuisine, cuisineAr: b.cuisineAr, location: b.location, locationAr: b.locationAr, image: b.image as unknown as string, tags: b.tags.join(", "), tagsAr: b.tagsAr.join("، "), status: "live" })),
    services: SITE_SERVICES.map((s) => ({ id: s.slug, slug: s.slug, name: s.name, nameAr: s.nameAr, desc: s.desc, descAr: s.descAr, status: "live" })),
    gallery: SITE_GALLERY.map((g, i) => ({ id: `media-${i}`, src: g.src as unknown as string, category: g.category, categoryAr: g.categoryAr, alt: g.alt, altAr: g.altAr })),
    events: ADMIN_EVENTS.map((e, i) => ({ id: `event-${i}`, ...e })),
    guests: ADMIN_GUESTS.map((g, i) => ({ id: `guest-${i}`, email: `${g.name.split(" ")[0]!.toLowerCase()}@email.com`, ...g })),
    tickets: ADMIN_TICKETS.map(({ id, ...rest }) => ({ id, ref: id, ...rest })),
    users: ADMIN_USERS.map((u, i) => ({ id: `user-${i}`, ...u })),
    applications: ADMIN_APPLICATIONS.map((a, i) => ({ id: `app-${i}`, ...a })),
    posts: ADMIN_POSTS.map((p, i) => ({ id: `post-${i}`, ...p })),
    openings: SITE_OPENINGS.map((o, i) => ({ id: `opening-${i}`, ...o, status: "open" })),
    inquiries: SITE_INQUIRIES.map((q, i) => ({ id: `inq-${i}`, ...q })),
    testimonials: SITE_TESTIMONIALS.map((s, i) => ({ id: `testi-${i}`, ...s })),
    partners: SITE_PARTNERS.map((p, i) => ({ id: `partner-${i}`, ...p })),
    stats: SITE_STATS.map((s, i) => ({ id: `stat-${i}`, ...s })),
    notes: [],
    settings: {
      company: "Butlers & Co",
      companyAr: "بتلرز آند كو",
      email: "hello@butlersco.com",
      phone: "+20 100 741 9344",
      address: "Zamalek, Cairo, Egypt",
      addressAr: "الزمالك، القاهرة، مصر",
      autoConfirm: true,
      holdMinutes: 20,
      maxParty: 40,
      emailAlerts: true,
      smsAlerts: false,
      whatsappAlerts: true,
    },
  };
}

const STORAGE_KEY = "butlers-panel-data-v1";

type CollectionKey = Exclude<keyof PanelData, "settings">;

type Ctx = {
  data: PanelData;
  create: <K extends CollectionKey>(key: K, item: Omit<PanelData[K][number], "id"> & { id?: string }) => PanelData[K][number];
  update: <K extends CollectionKey>(key: K, id: string, patch: Partial<PanelData[K][number]>) => void;
  remove: (key: CollectionKey, id: string) => void;
  updateSettings: (patch: Partial<SettingsRow>) => void;
  resetAll: () => void;
};

const PanelDataContext = createContext<Ctx | null>(null);

export function PanelDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PanelData>(seed);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PanelData>;
        setData((cur) => ({ ...cur, ...parsed, settings: { ...cur.settings, ...(parsed.settings ?? {}) } }));
      }
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore quota errors */
    }
  }, [data]);

  const create = useCallback(<K extends CollectionKey>(key: K, item: Omit<PanelData[K][number], "id"> & { id?: string }) => {
    const row = { ...item, id: item.id ?? uid() } as PanelData[K][number];
    setData((cur) => ({ ...cur, [key]: [row, ...(cur[key] as PanelData[K][number][])] }) as PanelData);
    return row;
  }, []);

  const update = useCallback(<K extends CollectionKey>(key: K, id: string, patch: Partial<PanelData[K][number]>) => {
    setData((cur) => ({
      ...cur,
      [key]: (cur[key] as PanelData[K][number][]).map((r) => ((r as { id: string }).id === id ? { ...r, ...patch } : r)),
    }) as PanelData);
  }, []);

  const remove = useCallback((key: CollectionKey, id: string) => {
    setData((cur) => ({ ...cur, [key]: (cur[key] as { id: string }[]).filter((r) => r.id !== id) }) as PanelData);
  }, []);

  const updateSettings = useCallback((patch: Partial<SettingsRow>) => {
    setData((cur) => ({ ...cur, settings: { ...cur.settings, ...patch } }));
  }, []);

  const resetAll = useCallback(() => setData(seed()), []);

  const value = useMemo(() => ({ data, create, update, remove, updateSettings, resetAll }), [data, create, update, remove, updateSettings, resetAll]);

  return <PanelDataContext.Provider value={value}>{children}</PanelDataContext.Provider>;
}

export function usePanelData() {
  const ctx = useContext(PanelDataContext);
  if (!ctx) throw new Error("usePanelData must be used inside PanelDataProvider");
  return ctx;
}
