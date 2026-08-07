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
  email: string;
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
    email: "hafez.rahim@email.com",
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
    email: "hafez.rahim@email.com",
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
    email: "hafez.rahim@email.com",
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
    email: "nour.adel@email.com",
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
    email: "karim.fouad@email.com",
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
    email: "layla.mostafa@email.com",
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
export const ADMIN_TICKETS = [
  { id: "TCK-1042", subject: "Late seating at Zamalek", subjectAr: "تأخير الجلوس في الزمالك", guest: "Nour Adel", guestAr: "نور عادل", channel: "WhatsApp", channelAr: "واتساب", priority: "high", status: "open", updated: "2026-08-06" },
  { id: "TCK-1039", subject: "Invoice copy request", subjectAr: "طلب نسخة فاتورة", guest: "Karim Fouad", guestAr: "كريم فؤاد", channel: "Email", channelAr: "بريد إلكتروني", priority: "low", status: "pending", updated: "2026-08-05" },
  { id: "TCK-1035", subject: "Allergy note not applied", subjectAr: "لم يتم تطبيق ملاحظة الحساسية", guest: "Layla Mostafa", guestAr: "ليلى مصطفى", channel: "Phone", channelAr: "هاتف", priority: "high", status: "resolved", updated: "2026-08-03" },
  { id: "TCK-1028", subject: "Event deposit refund", subjectAr: "استرداد عربون فعالية", guest: "Hafez Rahim", guestAr: "حافظ رحيم", channel: "Web form", channelAr: "نموذج الموقع", priority: "medium", status: "open", updated: "2026-08-02" },
];

export const ADMIN_USERS = [
  { name: "Hafez Rahim", nameAr: "حافظ رحيم", email: "hafez@butlersco.com", role: "Owner", roleAr: "المالك", status: "active" },
  { name: "Sara Kamal", nameAr: "سارة كمال", email: "sara@butlersco.com", role: "Operations Manager", roleAr: "مدير العمليات", status: "active" },
  { name: "Omar Tarek", nameAr: "عمر طارق", email: "omar@butlersco.com", role: "Reservations", roleAr: "الحجوزات", status: "active" },
  { name: "Mona Saleh", nameAr: "منى صالح", email: "mona@butlersco.com", role: "Content Editor", roleAr: "محرر المحتوى", status: "invited" },
];

export const ROLE_MATRIX = [
  { area: "Reservations", areaAr: "الحجوزات", owner: true, manager: true, reservations: true, editor: false },
  { area: "Brands & Services", areaAr: "العلامات والخدمات", owner: true, manager: true, reservations: false, editor: true },
  { area: "Events & Gallery", areaAr: "الفعاليات والمعرض", owner: true, manager: true, reservations: false, editor: true },
  { area: "Careers & News", areaAr: "الوظائف والأخبار", owner: true, manager: false, reservations: false, editor: true },
  { area: "Users & Settings", areaAr: "المستخدمون والإعدادات", owner: true, manager: false, reservations: false, editor: false },
];

export const ADMIN_APPLICATIONS = [
  { name: "Ahmed Sabry", nameAr: "أحمد صبري", role: "Head Bartender", roleAr: "رئيس بار", venue: "Velvet Lounge", venueAr: "فيلفيت لاونج", date: "2026-08-04", status: "review" },
  { name: "Mariam Adel", nameAr: "مريم عادل", role: "Sous Chef", roleAr: "مساعد شيف", venue: "The Butler's Table", venueAr: "طاولة البتلر", date: "2026-08-02", status: "interview" },
  { name: "Youssef Hany", nameAr: "يوسف هاني", role: "Guest Relations", roleAr: "علاقات الضيوف", venue: "Butlers Catering", venueAr: "بتلرز للضيافة", date: "2026-07-29", status: "hired" },
];

export const ADMIN_POSTS = [
  { title: "Butlers & Co opens Maison Verte", titleAr: "بتلرز آند كو تفتتح ميزون فيرت", category: "Openings", categoryAr: "افتتاحات", date: "2026-08-01", status: "published" },
  { title: "Our 2026 sustainability pledge", titleAr: "تعهد الاستدامة ٢٠٢٦", category: "Company", categoryAr: "الشركة", date: "2026-07-18", status: "published" },
  { title: "Autumn menu preview", titleAr: "معاينة قائمة الخريف", category: "Culinary", categoryAr: "الطهي", date: "2026-08-06", status: "draft" },
];
