import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Grid3x3, List, Map as MapIcon, SlidersHorizontal, X } from "lucide-react";
import Layout from "@/components/Layout";
import HotelCard from "@/components/HotelCard";
import SearchBar from "@/components/SearchBar";
import { hotels, type HotelCategory } from "@/data/hotels";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/hotels")({
  component: HotelsPage,
  validateSearch: (s: Record<string, unknown>) => ({ q: (s.q as string) ?? "" }),
  head: () => ({
    meta: [
      { title: "Hotels — StayEase" },
      { name: "description", content: "Browse our handpicked collection of boutique, luxury and beach hotels worldwide." },
    ],
  }),
});

const categories: HotelCategory[] = ["Luxury", "Boutique", "Resort", "Villa", "Apartment", "Beach", "Mountain", "Budget"];
const allAmenities = ["Free WiFi", "Pool", "Spa", "Gym", "Restaurant", "Beachfront", "Pet Friendly", "Breakfast"];
const sortOptions = [
  { v: "recommended", l: "Recommended" },
  { v: "price-asc", l: "Lowest price" },
  { v: "price-desc", l: "Highest price" },
  { v: "rating", l: "Top rated" },
  { v: "reviews", l: "Most popular" },
];

function HotelsPage() {
  const { q } = Route.useSearch();
  const [price, setPrice] = useState(2000);
  const [stars, setStars] = useState<number[]>([]);
  const [cats, setCats] = useState<HotelCategory[]>([]);
  const [ams, setAms] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("recommended");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [openFilters, setOpenFilters] = useState(false);

  const filtered = useMemo(() => {
    let arr = hotels.filter((h) => {
      if (q && !`${h.name} ${h.city} ${h.country}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (h.pricePerNight > price) return false;
      if (stars.length && !stars.includes(h.stars)) return false;
      if (cats.length && !cats.includes(h.category)) return false;
      if (ams.length && !ams.every((a) => h.amenities.includes(a))) return false;
      if (h.rating < minRating) return false;
      return true;
    });
    switch (sort) {
      case "price-asc": arr = [...arr].sort((a, b) => a.pricePerNight - b.pricePerNight); break;
      case "price-desc": arr = [...arr].sort((a, b) => b.pricePerNight - a.pricePerNight); break;
      case "rating": arr = [...arr].sort((a, b) => b.rating - a.rating); break;
      case "reviews": arr = [...arr].sort((a, b) => b.reviews - a.reviews); break;
    }
    return arr;
  }, [q, price, stars, cats, ams, minRating, sort]);

  const toggle = <T,>(arr: T[], v: T, set: (a: T[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const FilterPanel = (
    <div className="space-y-7">
      <FilterGroup title="Price per night">
        <input type="range" min={50} max={2000} step={10} value={price} onChange={(e) => setPrice(+e.target.value)}
          className="w-full accent-gold" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
          <span>$50</span><span className="font-semibold text-foreground">Up to ${price}</span><span>$2000+</span>
        </div>
      </FilterGroup>

      <FilterGroup title="Star rating">
        <div className="flex flex-wrap gap-2">
          {[5,4,3].map((s) => (
            <Chip key={s} active={stars.includes(s)} onClick={() => toggle(stars, s, setStars)}>
              {s} ★
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Property type">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Chip key={c} active={cats.includes(c)} onClick={() => toggle(cats, c, setCats)}>{c}</Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Amenities">
        <div className="space-y-2">
          {allAmenities.map((a) => (
            <label key={a} className="flex items-center gap-2.5 text-sm cursor-pointer">
              <input type="checkbox" checked={ams.includes(a)} onChange={() => toggle(ams, a, setAms)}
                className="h-4 w-4 rounded accent-gold" />
              {a}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Guest rating">
        <div className="flex flex-wrap gap-2">
          {[0, 8, 8.5, 9].map((r) => (
            <Chip key={r} active={minRating === r} onClick={() => setMinRating(r)}>
              {r === 0 ? "Any" : `${r}+`}
            </Chip>
          ))}
        </div>
      </FilterGroup>
    </div>
  );

  return (
    <Layout>
      {/* Search reposition */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-6 pb-4">
        <SearchBar compact />
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block sticky top-28 self-start bg-card rounded-3xl p-6 shadow-soft border border-border max-h-[calc(100vh-8rem)] overflow-y-auto">
            <h3 className="font-display text-xl mb-5">Filters</h3>
            {FilterPanel}
          </aside>

          <div>
            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h1 className="font-display text-3xl">
                  {filtered.length} {filtered.length === 1 ? "stay" : "stays"}
                  {q && <span className="text-muted-foreground"> for "{q}"</span>}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setOpenFilters(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-card border border-border text-sm">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>
                <select value={sort} onChange={(e) => setSort(e.target.value)}
                  className="px-4 py-2.5 rounded-full bg-card border border-border text-sm font-medium outline-none">
                  {sortOptions.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
                </select>
                <div className="hidden sm:flex bg-card border border-border rounded-full p-1">
                  <button onClick={() => setView("grid")}
                    className={`p-2 rounded-full transition ${view==="grid"?"bg-foreground text-background":""}`}>
                    <Grid3x3 className="h-4 w-4" />
                  </button>
                  <button onClick={() => setView("list")}
                    className={`p-2 rounded-full transition ${view==="list"?"bg-foreground text-background":""}`}>
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24 bg-card rounded-3xl border border-border">
                <MapIcon className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <h3 className="font-display text-2xl">No stays match your filters</h3>
                <p className="text-muted-foreground mt-2">Try widening your price range or removing a few filters.</p>
              </div>
            ) : view === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((h, i) => <HotelCard key={h.id} hotel={h} index={i} />)}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((h, i) => <HotelCard key={h.id} hotel={h} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filters drawer */}
      <AnimatePresence>
        {openFilters && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setOpenFilters(false)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28 }}
              className="absolute bottom-0 inset-x-0 max-h-[85vh] bg-background rounded-t-3xl p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-display text-2xl">Filters</h3>
                <button onClick={() => setOpenFilters(false)} className="p-2"><X className="h-5 w-5" /></button>
              </div>
              {FilterPanel}
              <button onClick={() => setOpenFilters(false)}
                className="mt-7 w-full px-5 py-3.5 rounded-full gradient-gold text-gold-foreground font-semibold">
                Show {filtered.length} stays
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-3">{title}</h4>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition ${
        active ? "bg-foreground text-background border-foreground" : "bg-transparent border-border hover:border-foreground"
      }`}>
      {children}
    </button>
  );
}
