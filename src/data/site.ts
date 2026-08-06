import cocktails from "@/assets/cocktails.jpg";
import events from "@/assets/events.jpg";
import food from "@/assets/food.jpg";
import nightlife from "@/assets/nightlife.jpg";
import staff from "@/assets/staff.jpg";
import hero from "@/assets/hero-restaurant.jpg";

export const images = { cocktails, events, food, nightlife, staff, hero };

export const services = [
  { slug: "restaurant-management", name: "Restaurant Management", icon: "UtensilsCrossed", desc: "End-to-end operations, service standards and profitability for full-service venues." },
  { slug: "nightlife", name: "Nightlife Operations", icon: "Disc3", desc: "Programming, door strategy and floor management for late-night destinations." },
  { slug: "mixology", name: "Mixology", icon: "Martini", desc: "Signature cocktail menus, bar builds and beverage cost engineering." },
  { slug: "catering", name: "Catering", icon: "ChefHat", desc: "Corporate and private catering delivered with fine-dining precision." },
  { slug: "consultancy", name: "Consultancy", icon: "LineChart", desc: "Feasibility, concept design and turnaround for owners and investors." },
  { slug: "events", name: "Events", icon: "PartyPopper", desc: "Weddings, launches and VIP experiences produced end to end." },
  { slug: "training", name: "Training", icon: "GraduationCap", desc: "Academy-grade programmes for service, bar and management teams." },
  { slug: "brand-development", name: "Brand Development", icon: "Sparkles", desc: "Naming, identity and guest journey design for new hospitality brands." },
];

export const brands = [
  { name: "The Butler Room", cuisine: "Modern European", location: "Downtown", image: hero },
  { name: "Velour", cuisine: "Cocktail Lounge", location: "Riverside", image: cocktails },
  { name: "Noir Club", cuisine: "Nightlife", location: "Marina Walk", image: nightlife },
  { name: "Maison Verte", cuisine: "Contemporary Levantine", location: "Garden City", image: food },
];

export const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "20+", label: "Hospitality Brands" },
  { value: "500+", label: "Employees" },
  { value: "1000+", label: "Events Delivered" },
  { value: "3M+", label: "Guests Served" },
];

export const upcomingEvents = [
  { title: "Golden Hour Tasting Menu", date: "12 Sep", venue: "The Butler Room", desc: "A seven-course seasonal journey paired with rare vintages.", image: food },
  { title: "Velour Sessions: Live Jazz", date: "20 Sep", venue: "Velour", desc: "Late-night jazz with a limited-edition cocktail flight.", image: cocktails },
  { title: "Noir Anniversary Night", date: "04 Oct", venue: "Noir Club", desc: "International guest DJs and an all-night bottle experience.", image: nightlife },
];

export const galleryItems = [
  { src: food, category: "Food", alt: "Plated fine dining dish" },
  { src: cocktails, category: "Cocktails", alt: "Cocktail being poured" },
  { src: hero, category: "Restaurants", alt: "Luxury restaurant interior" },
  { src: nightlife, category: "Nightlife", alt: "Nightlife lounge" },
  { src: events, category: "Events", alt: "Private event table setting" },
  { src: staff, category: "Staff", alt: "Hospitality team" },
];