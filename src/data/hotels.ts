import h1 from "@/assets/hotel-1.jpg";
import h2 from "@/assets/hotel-2.jpg";
import h3 from "@/assets/hotel-3.jpg";
import h4 from "@/assets/hotel-4.jpg";
import h5 from "@/assets/hotel-5.jpg";
import h6 from "@/assets/hotel-6.jpg";
import h7 from "@/assets/hotel-7.jpg";
import h8 from "@/assets/hotel-8.jpg";
import dParis from "@/assets/dest-paris.jpg";
import dBali from "@/assets/dest-bali.jpg";
import dTokyo from "@/assets/dest-tokyo.jpg";
import dDubai from "@/assets/dest-dubai.jpg";

export type HotelCategory =
  | "Luxury"
  | "Boutique"
  | "Resort"
  | "Villa"
  | "Apartment"
  | "Beach"
  | "Mountain"
  | "Budget";

export interface Room {
  id: string;
  name: string;
  price: number;
  capacity: number;
  beds: string;
  size: string;
  facilities: string[];
  image: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  category: HotelCategory;
  stars: number;
  rating: number;
  reviews: number;
  pricePerNight: number;
  oldPrice?: number;
  discount?: number;
  description: string;
  amenities: string[];
  images: string[];
  rooms: Room[];
  coords: { lat: number; lng: number };
  policies: string[];
  nearby: { name: string; distance: string }[];
}

const baseImages = [h1, h2, h3, h4, h5, h6, h7, h8];

const amenitiesPool = [
  "Free WiFi", "Pool", "Spa", "Parking", "Gym", "Restaurant",
  "Airport Shuttle", "Pet Friendly", "Bar", "Beachfront", "Breakfast", "Concierge",
];

const policies = [
  "Check-in from 3:00 PM • Check-out by 11:00 AM",
  "Free cancellation up to 48 hours before arrival",
  "Children of all ages are welcome",
  "Government-issued photo ID required at check-in",
];

const seed = [
  { name: "The Aurora Reserve", city: "Maldives", country: "Maldives", category: "Resort", stars: 5, price: 1280, img: 1 },
  { name: "Maison Lumière", city: "Paris", country: "France", category: "Boutique", stars: 5, price: 640, img: 0 },
  { name: "Cedar & Pine Lodge", city: "Aspen", country: "USA", category: "Mountain", stars: 5, price: 920, img: 2 },
  { name: "The Manhattan One", city: "New York", country: "USA", category: "Luxury", stars: 5, price: 780, img: 3 },
  { name: "Dunes & Mirage", city: "Marrakech", country: "Morocco", category: "Resort", stars: 5, price: 540, img: 4 },
  { name: "Villa Toscana", city: "Tuscany", country: "Italy", category: "Villa", stars: 4, price: 420, img: 5 },
  { name: "Sakura Ryokan", city: "Kyoto", country: "Japan", category: "Boutique", stars: 5, price: 590, img: 6 },
  { name: "Caldera Blue", city: "Santorini", country: "Greece", category: "Beach", stars: 5, price: 710, img: 7 },
  { name: "Marina Bay Suites", city: "Singapore", country: "Singapore", category: "Luxury", stars: 5, price: 690, img: 3 },
  { name: "Costa Verde Villa", city: "Amalfi", country: "Italy", category: "Villa", stars: 4, price: 480, img: 5 },
  { name: "The Bamboo House", city: "Ubud", country: "Indonesia", category: "Resort", stars: 4, price: 230, img: 1 },
  { name: "Northern Lights Cabin", city: "Reykjavik", country: "Iceland", category: "Mountain", stars: 4, price: 340, img: 2 },
  { name: "Le Petit Bohème", city: "Lisbon", country: "Portugal", category: "Boutique", stars: 4, price: 210, img: 0 },
  { name: "Palm Coral Resort", city: "Bora Bora", country: "French Polynesia", category: "Beach", stars: 5, price: 1450, img: 1 },
  { name: "Skyline Loft Apartments", city: "Berlin", country: "Germany", category: "Apartment", stars: 4, price: 180, img: 3 },
  { name: "Cypress Hill Estate", city: "Florence", country: "Italy", category: "Villa", stars: 5, price: 560, img: 5 },
  { name: "Atlas Sands", city: "Dubai", country: "UAE", category: "Luxury", stars: 5, price: 820, img: 4 },
  { name: "Olive Grove Stay", city: "Mykonos", country: "Greece", category: "Beach", stars: 4, price: 380, img: 7 },
  { name: "Mountain Mist Chalet", city: "Zermatt", country: "Switzerland", category: "Mountain", stars: 5, price: 880, img: 2 },
  { name: "The Bay Window", city: "Sydney", country: "Australia", category: "Apartment", stars: 4, price: 260, img: 3 },
  { name: "Heritage Place", city: "Edinburgh", country: "UK", category: "Boutique", stars: 4, price: 240, img: 0 },
  { name: "Riad Andalous", city: "Fez", country: "Morocco", category: "Boutique", stars: 4, price: 190, img: 4 },
  { name: "Crystal Cove Villas", city: "Phuket", country: "Thailand", category: "Beach", stars: 5, price: 470, img: 1 },
  { name: "Old Town Studios", city: "Prague", country: "Czechia", category: "Apartment", stars: 3, price: 120, img: 0 },
  { name: "Sakura Bloom Inn", city: "Tokyo", country: "Japan", category: "Budget", stars: 3, price: 95, img: 6 },
];

function rand(seed: number) {
  return ((seed * 9301 + 49297) % 233280) / 233280;
}

export const hotels: Hotel[] = seed.map((s, i) => {
  const r = rand(i + 7);
  const discount = i % 4 === 0 ? Math.floor(15 + r * 25) : undefined;
  const oldPrice = discount ? Math.round(s.price / (1 - discount / 100)) : undefined;
  const am = [...amenitiesPool].sort(() => rand(i + 1) - 0.5).slice(0, 6 + (i % 3));
  return {
    id: `h-${i + 1}`,
    name: s.name,
    city: s.city,
    country: s.country,
    category: s.category as HotelCategory,
    stars: s.stars,
    rating: Math.round((8.4 + r * 1.5) * 10) / 10,
    reviews: 240 + Math.floor(r * 2400),
    pricePerNight: s.price,
    oldPrice,
    discount,
    description:
      "Nestled in one of the world's most coveted destinations, this property pairs timeless architecture with thoughtful modern comfort — generous suites, curated dining, and quiet, restorative service.",
    amenities: am,
    images: [baseImages[s.img], ...baseImages.filter((_, idx) => idx !== s.img).slice(0, 4)],
    rooms: [
      { id: `${i}-r1`, name: "Deluxe King", price: s.price, capacity: 2, beds: "1 King", size: "42 m²", facilities: ["City view", "Rain shower", "Nespresso", "Smart TV"], image: baseImages[(s.img + 1) % 8] },
      { id: `${i}-r2`, name: "Junior Suite", price: Math.round(s.price * 1.4), capacity: 3, beds: "1 King + Sofa", size: "58 m²", facilities: ["Lounge", "Bathtub", "Balcony", "Minibar"], image: baseImages[(s.img + 2) % 8] },
      { id: `${i}-r3`, name: "Signature Suite", price: Math.round(s.price * 1.9), capacity: 4, beds: "1 King + 1 Twin", size: "84 m²", facilities: ["Private terrace", "Living room", "Butler", "Dining"], image: baseImages[(s.img + 3) % 8] },
    ],
    coords: { lat: 0, lng: 0 },
    policies,
    nearby: [
      { name: "Old Town Square", distance: "0.4 km" },
      { name: "Central Museum", distance: "1.2 km" },
      { name: "International Airport", distance: "18 km" },
    ],
  };
});

export const destinations = [
  { name: "Paris", country: "France", count: 248, image: dParis },
  { name: "Bali", country: "Indonesia", count: 184, image: dBali },
  { name: "Tokyo", country: "Japan", count: 312, image: dTokyo },
  { name: "Dubai", country: "UAE", count: 196, image: dDubai },
];

export const testimonials = [
  { name: "Amelia Hart", role: "Editor, Voyage Mag", quote: "StayEase turned a routine getaway into the most considered trip I've taken in years. Every detail felt curated.", avatar: "AH" },
  { name: "Daniel Cho", role: "Architect", quote: "The selection is unmatched — properties I'd actually recommend to clients. Booking took ninety seconds.", avatar: "DC" },
  { name: "Sofia Marchetti", role: "Travel Writer", quote: "From Santorini to Kyoto, StayEase consistently surfaces the places I want to come back to.", avatar: "SM" },
];
