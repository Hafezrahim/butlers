import cocktails from "@/assets/cocktails.jpg";
import events from "@/assets/events.jpg";
import food from "@/assets/food.jpg";
import nightlife from "@/assets/nightlife.jpg";
import staff from "@/assets/staff.jpg";
import hero from "@/assets/hero-restaurant.jpg";

export const images = { cocktails, events, food, nightlife, staff, hero };

export const services = [
  { slug: "restaurant-management", name: "Restaurant Management", nameAr: "إدارة المطاعم", icon: "UtensilsCrossed", desc: "End-to-end operations, service standards and profitability for full-service venues.", descAr: "تشغيل متكامل ومعايير خدمة وربحية للمطاعم بكامل خدماتها." },
  { slug: "nightlife", name: "Nightlife Operations", nameAr: "تشغيل الحياة الليلية", icon: "Disc3", desc: "Programming, door strategy and floor management for late-night destinations.", descAr: "برمجة الفعاليات واستراتيجية الاستقبال وإدارة الصالة لوجهات السهر." },
  { slug: "mixology", name: "Mixology", nameAr: "فن المشروبات", icon: "Martini", desc: "Signature cocktail menus, bar builds and beverage cost engineering.", descAr: "قوائم مشروبات مميزة وتصميم البارات وهندسة تكلفة المشروبات." },
  { slug: "catering", name: "Catering", nameAr: "خدمات الضيافة", icon: "ChefHat", desc: "Corporate and private catering delivered with fine-dining precision.", descAr: "ضيافة للشركات والمناسبات الخاصة بدقة مطاعم الطهي الراقي." },
  { slug: "consultancy", name: "Consultancy", nameAr: "الاستشارات", icon: "LineChart", desc: "Feasibility, concept design and turnaround for owners and investors.", descAr: "دراسات جدوى وتصميم مفاهيم وإعادة هيكلة للملاك والمستثمرين." },
  { slug: "events", name: "Events", nameAr: "الفعاليات", icon: "PartyPopper", desc: "Weddings, launches and VIP experiences produced end to end.", descAr: "أفراح وحفلات إطلاق وتجارب كبار الشخصيات بتنفيذ متكامل." },
  { slug: "training", name: "Training", nameAr: "التدريب", icon: "GraduationCap", desc: "Academy-grade programmes for service, bar and management teams.", descAr: "برامج أكاديمية لفرق الخدمة والبار والإدارة." },
  { slug: "brand-development", name: "Brand Development", nameAr: "تطوير العلامات", icon: "Sparkles", desc: "Naming, identity and guest journey design for new hospitality brands.", descAr: "تسمية وهوية وتصميم رحلة الضيف للعلامات الجديدة." },
];

export const brands = [
  { name: "The Butler Room", nameAr: "ذا باتلر روم", cuisine: "Modern European", cuisineAr: "أوروبي معاصر", location: "Downtown", locationAr: "وسط البلد", image: hero, tags: ["Fine Dining", "Tasting Menu", "Wine Cellar", "Valet"], tagsAr: ["طعام راقٍ", "قائمة تذوق", "قبو نبيذ", "خدمة صف السيارات"] },
  { name: "Velour", nameAr: "فيلور", cuisine: "Cocktail Lounge", cuisineAr: "صالة مشروبات", location: "Riverside", locationAr: "كورنيش النيل", image: cocktails, tags: ["Mixology", "Live Jazz", "Rooftop", "Late Night"], tagsAr: ["فن المشروبات", "جاز حي", "سطح مفتوح", "سهر متأخر"] },
  { name: "Noir Club", nameAr: "نوار كلوب", cuisine: "Nightlife", cuisineAr: "حياة ليلية", location: "Marina Walk", locationAr: "ممشى المارينا", image: nightlife, tags: ["Nightlife", "Guest DJs", "Bottle Service", "VIP Tables"], tagsAr: ["حياة ليلية", "منسقو أغانٍ", "خدمة الزجاجات", "طاولات كبار الزوار"] },
  { name: "Maison Verte", nameAr: "ميزون فيرت", cuisine: "Contemporary Levantine", cuisineAr: "شامي معاصر", location: "Garden City", locationAr: "جاردن سيتي", image: food, tags: ["Levantine", "Garden Terrace", "Family Friendly", "Brunch"], tagsAr: ["مطبخ شامي", "تراس حديقة", "مناسب للعائلات", "برانش"] },
  { name: "Ember & Oak", nameAr: "إمبر آند أوك", cuisine: "Charcoal Grill & Steak", cuisineAr: "مشويات وستيك", location: "Sheikh Zayed", locationAr: "الشيخ زايد", image: food, tags: ["Steakhouse", "Open Fire", "Dry-Aged Beef", "Private Room"], tagsAr: ["ستيك هاوس", "شواء مكشوف", "لحوم معتقة", "غرفة خاصة"] },
  { name: "Aria Rooftop", nameAr: "أريا روفتوب", cuisine: "Mediterranean Rooftop", cuisineAr: "متوسطي على السطح", location: "New Cairo", locationAr: "القاهرة الجديدة", image: nightlife, tags: ["Skyline Views", "Sunset Hour", "Shisha", "Live Sets"], tagsAr: ["إطلالة بانورامية", "ساعة الغروب", "شيشة", "عروض حية"] },
  { name: "Butlers Garden", nameAr: "حديقة بتلرز", cuisine: "All-Day Dining & Events", cuisineAr: "مطعم يومي وفعاليات", location: "Zamalek", locationAr: "الزمالك", image: events, tags: ["Events Venue", "Weddings", "Catering", "Outdoor"], tagsAr: ["قاعة فعاليات", "أفراح", "ضيافة", "في الهواء الطلق"] },
  { name: "Cellar 27", nameAr: "سيلار ٢٧", cuisine: "Wine Bar & Small Plates", cuisineAr: "بار نبيذ وأطباق صغيرة", location: "Maadi", locationAr: "المعادي", image: cocktails, tags: ["Wine Bar", "Small Plates", "Cheese Board", "Intimate"], tagsAr: ["بار نبيذ", "أطباق صغيرة", "أطباق أجبان", "أجواء حميمة"] },
];

export const stats = [
  { value: "15+", label: "Years Experience", labelAr: "سنة خبرة" },
  { value: "20+", label: "Hospitality Brands", labelAr: "علامة ضيافة" },
  { value: "500+", label: "Employees", labelAr: "موظف" },
  { value: "1000+", label: "Events Delivered", labelAr: "فعالية منفذة" },
  { value: "3M+", label: "Guests Served", labelAr: "ضيف تمت خدمته" },
];

export const upcomingEvents = [
  { title: "Golden Hour Tasting Menu", titleAr: "قائمة تذوق الساعة الذهبية", date: "12 Sep", dateAr: "١٢ سبتمبر", venue: "The Butler Room", venueAr: "ذا باتلر روم", desc: "A seven-course seasonal journey paired with rare vintages.", descAr: "رحلة موسمية من سبعة أطباق مع نخبة من المشروبات النادرة.", image: food },
  { title: "Velour Sessions: Live Jazz", titleAr: "أمسيات فيلور: جاز حي", date: "20 Sep", dateAr: "٢٠ سبتمبر", venue: "Velour", venueAr: "فيلور", desc: "Late-night jazz with a limited-edition cocktail flight.", descAr: "جاز حتى وقت متأخر مع تشكيلة مشروبات بإصدار محدود.", image: cocktails },
  { title: "Noir Anniversary Night", titleAr: "ليلة ذكرى نوار", date: "04 Oct", dateAr: "٤ أكتوبر", venue: "Noir Club", venueAr: "نوار كلوب", desc: "International guest DJs and an all-night bottle experience.", descAr: "منسقو أغانٍ عالميون وتجربة تمتد طوال الليل.", image: nightlife },
];

export const galleryItems = [
  { src: food, category: "Food", categoryAr: "الأطباق", alt: "Plated fine dining dish", altAr: "طبق من المطبخ الراقي" },
  { src: cocktails, category: "Cocktails", categoryAr: "المشروبات", alt: "Cocktail being poured", altAr: "تحضير كوكتيل" },
  { src: hero, category: "Restaurants", categoryAr: "المطاعم", alt: "Luxury restaurant interior", altAr: "تصميم داخلي لمطعم فاخر" },
  { src: nightlife, category: "Nightlife", categoryAr: "الحياة الليلية", alt: "Nightlife lounge", altAr: "صالة سهر" },
  { src: events, category: "Events", categoryAr: "الفعاليات", alt: "Private event table setting", altAr: "تجهيز طاولة مناسبة خاصة" },
  { src: staff, category: "Staff", categoryAr: "الفريق", alt: "Hospitality team", altAr: "فريق الضيافة" },
];
