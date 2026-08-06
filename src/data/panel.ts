export type ResStatus = "confirmed" | "pending" | "seated" | "cancelled";

export const STATUS_LABEL: Record<ResStatus, { en: string; ar: string }> = {
  confirmed: { en: "Confirmed", ar: "مؤكد" },
  pending: { en: "Pending", ar: "قيد المراجعة" },
  seated: { en: "Seated", ar: "تم الجلوس" },
  cancelled: { en: "Cancelled", ar: "ملغي" },
};

export type PanelReservation = {
  code: string;
  guest: string;
  guestAr: string;
  phone: string;
  brand: string;
  brandAr: string;
  branch: string;
  branchAr: string;
  date: string;
  time: string;
  party: number;
  status: ResStatus;
  addons: { en: string; ar: string }[];
};

export const MY_RESERVATIONS: PanelReservation[] = [
  {
    code: "BCO-8412",
    guest: "Hafez Rahim",
    guestAr: "حافظ رحيم",
    phone: "+20 100 741 9344",
    brand: "The Butler's Table",
    brandAr: "طاولة البتلر",
    branch: "Zamalek",
    branchAr: "الزمالك",
    date: "2026-08-14",
    time: "21:00",
    party: 4,
    status: "confirmed",
    addons: [
      { en: "Table decoration", ar: "تزيين الطاولة" },
      { en: "Video recording", ar: "تصوير فيديو" },
    ],
  },
  {
    code: "BCO-8377",
    guest: "Hafez Rahim",
    guestAr: "حافظ رحيم",
    phone: "+20 100 741 9344",
    brand: "Velvet Lounge",
    brandAr: "فيلفيت لاونج",
    branch: "New Cairo",
    branchAr: "القاهرة الجديدة",
    date: "2026-07-02",
    time: "22:30",
    party: 2,
    status: "seated",
    addons: [{ en: "Signature cocktails", ar: "كوكتيلات مميزة" }],
  },
  {
    code: "BCO-8290",
    guest: "Hafez Rahim",
    guestAr: "حافظ رحيم",
    phone: "+20 100 741 9344",
    brand: "Butlers Catering",
    brandAr: "بتلرز للضيافة",
    branch: "Sheikh Zayed",
    branchAr: "الشيخ زايد",
    date: "2026-05-19",
    time: "19:00",
    party: 12,
    status: "cancelled",
    addons: [],
  },
];

export const ADMIN_RESERVATIONS: PanelReservation[] = [
  ...MY_RESERVATIONS,
  {
    code: "BCO-8455",
    guest: "Nour Adel",
    guestAr: "نور عادل",
    phone: "+20 111 220 5566",
    brand: "The Butler's Table",
    brandAr: "طاولة البتلر",
    branch: "Zamalek",
    branchAr: "الزمالك",
    date: "2026-08-15",
    time: "20:00",
    party: 6,
    status: "pending",
    addons: [{ en: "Live music", ar: "موسيقى حية" }],
  },
  {
    code: "BCO-8461",
    guest: "Karim Fouad",
    guestAr: "كريم فؤاد",
    phone: "+20 122 887 3311",
    brand: "Velvet Lounge",
    brandAr: "فيلفيت لاونج",
    branch: "New Cairo",
    branchAr: "القاهرة الجديدة",
    date: "2026-08-16",
    time: "23:00",
    party: 8,
    status: "confirmed",
    addons: [{ en: "Photography", ar: "تصوير فوتوغرافي" }],
  },
  {
    code: "BCO-8470",
    guest: "Layla Mostafa",
    guestAr: "ليلى مصطفى",
    phone: "+20 106 334 9090",
    brand: "Butlers Catering",
    brandAr: "بتلرز للضيافة",
    branch: "Sheikh Zayed",
    branchAr: "الشيخ زايد",
    date: "2026-08-18",
    time: "18:30",
    party: 40,
    status: "pending",
    addons: [
      { en: "Full decoration", ar: "تزيين كامل" },
      { en: "Video recording", ar: "تصوير فيديو" },
    ],
  },
];

export const ADMIN_GUESTS = [
  { name: "Hafez Rahim", nameAr: "حافظ رحيم", phone: "+20 100 741 9344", visits: 14, tier: "Platinum", tierAr: "بلاتيني", spend: "EGP 128,400" },
  { name: "Nour Adel", nameAr: "نور عادل", phone: "+20 111 220 5566", visits: 6, tier: "Gold", tierAr: "ذهبي", spend: "EGP 44,900" },
  { name: "Karim Fouad", nameAr: "كريم فؤاد", phone: "+20 122 887 3311", visits: 3, tier: "Silver", tierAr: "فضي", spend: "EGP 18,200" },
  { name: "Layla Mostafa", nameAr: "ليلى مصطفى", phone: "+20 106 334 9090", visits: 9, tier: "Gold", tierAr: "ذهبي", spend: "EGP 71,650" },
];

export const ADMIN_EVENTS = [
  { title: "Rooftop Jazz Night", titleAr: "ليلة الجاز على السطح", date: "2026-08-20", venue: "Velvet Lounge", venueAr: "فيلفيت لاونج", seats: 120, booked: 86, status: "published" },
  { title: "Chef's Tasting Menu", titleAr: "قائمة تذوق الشيف", date: "2026-08-27", venue: "The Butler's Table", venueAr: "طاولة البتلر", seats: 40, booked: 40, status: "sold out" },
  { title: "Autumn Garden Brunch", titleAr: "برانش حديقة الخريف", date: "2026-09-05", venue: "Butlers Garden", venueAr: "حديقة بتلرز", seats: 90, booked: 21, status: "draft" },
];