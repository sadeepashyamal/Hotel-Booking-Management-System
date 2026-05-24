import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Star, Users, Bed, Maximize, Check, Shield, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import HotelCard from "@/components/HotelCard";
import { hotels, type Hotel } from "@/data/hotels";
import { useWishlist } from "@/context/WishlistContext";

export const Route = createFileRoute("/hotels/$id")({
  component: HotelDetailPage,
  loader: ({ params }): Hotel => {
    const hotel = hotels.find((h) => h.id === params.id);
    if (!hotel) throw notFound();
    return hotel;
  },
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl">Hotel not found</h1>
        <Link to="/hotels" className="mt-6 inline-block text-gold">← Back to hotels</Link>
      </div>
    </Layout>
  ),
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.name} — StayEase` },
      { name: "description", content: loaderData.description.slice(0, 155) },
      { property: "og:image", content: loaderData.images[0] },
    ] : [],
  }),
});

function HotelDetailPage() {
  const hotel = Route.useLoaderData() as Hotel;
  const [selected, setSelected] = useState(hotel.rooms[0]);
  const [mainImg, setMainImg] = useState(0);
  const { has, toggle } = useWishlist();
  const liked = has(hotel.id);
  const similar = hotels.filter((h) => h.id !== hotel.id && h.category === hotel.category).slice(0, 3);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{hotel.city}, {hotel.country}</span>
              <span>·</span>
              <div className="flex">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
            </div>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">{hotel.name}</h1>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-card border border-border">
              <span className="h-8 w-8 rounded-full gradient-gold flex items-center justify-center text-sm font-bold text-gold-foreground">
                {hotel.rating}
              </span>
              <div className="text-sm">
                <div className="font-semibold">Exceptional</div>
                <div className="text-xs text-muted-foreground">{hotel.reviews} reviews</div>
              </div>
            </div>
            <button onClick={() => toggle(hotel.id)}
              className="h-11 w-11 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition">
              <Heart className={`h-5 w-5 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[400px] md:h-[520px] rounded-3xl overflow-hidden">
          <button onClick={() => setMainImg(0)}
            className="col-span-4 md:col-span-2 row-span-2 overflow-hidden group">
            <img src={hotel.images[mainImg]} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </button>
          {hotel.images.slice(1, 5).map((img, i) => (
            <button key={i} onClick={() => setMainImg(i + 1)}
              className="hidden md:block overflow-hidden group">
              <img src={img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          <div className="space-y-12">
            {/* Overview */}
            <div>
              <h2 className="font-display text-3xl mb-4">About this stay</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-display text-3xl mb-5">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {hotel.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2.5 p-3 rounded-2xl bg-card border border-border">
                    <Check className="h-4 w-4 text-gold shrink-0" />
                    <span className="text-sm font-medium">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div>
              <h2 className="font-display text-3xl mb-5">Choose your room</h2>
              <div className="space-y-4">
                {hotel.rooms.map((room) => {
                  const active = selected.id === room.id;
                  return (
                    <motion.div
                      key={room.id} layout
                      onClick={() => setSelected(room)}
                      className={`grid grid-cols-1 sm:grid-cols-[200px_1fr_auto] gap-5 p-4 rounded-3xl border cursor-pointer transition ${
                        active ? "border-gold bg-card shadow-soft" : "border-border bg-card/50 hover:border-foreground/40"
                      }`}
                    >
                      <img src={room.image} alt="" loading="lazy" className="h-32 sm:h-full w-full object-cover rounded-2xl" />
                      <div>
                        <h3 className="font-display text-xl">{room.name}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{room.capacity} guests</span>
                          <span className="inline-flex items-center gap-1"><Bed className="h-3 w-3" />{room.beds}</span>
                          <span className="inline-flex items-center gap-1"><Maximize className="h-3 w-3" />{room.size}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {room.facilities.map((f) => (
                            <span key={f} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{f}</span>
                          ))}
                        </div>
                      </div>
                      <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between">
                        <div>
                          <div className="font-display text-2xl font-semibold">${room.price}</div>
                          <div className="text-xs text-muted-foreground">per night</div>
                        </div>
                        <span className={`mt-2 text-xs px-3 py-1 rounded-full ${active ? "bg-gold text-gold-foreground" : "bg-muted"}`}>
                          {active ? "Selected" : "Select"}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Policies */}
            <div>
              <h2 className="font-display text-3xl mb-5">Hotel policies</h2>
              <div className="space-y-3">
                {hotel.policies.map((p) => (
                  <div key={p} className="flex items-start gap-3 text-sm">
                    <Shield className="h-4 w-4 text-gold mt-0.5 shrink-0" /> {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby */}
            <div>
              <h2 className="font-display text-3xl mb-5">Nearby</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {hotel.nearby.map((n) => (
                  <div key={n.name} className="p-4 rounded-2xl bg-card border border-border">
                    <div className="font-semibold text-sm">{n.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{n.distance} away</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky booking */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="bg-card rounded-3xl p-6 shadow-luxe border border-border">
              <div className="flex items-end justify-between">
                <div>
                  {hotel.oldPrice && <div className="text-sm text-muted-foreground line-through">${hotel.oldPrice}</div>}
                  <div className="font-display text-4xl font-semibold">${selected.price}</div>
                  <div className="text-xs text-muted-foreground">per night · {selected.name}</div>
                </div>
                {hotel.discount && <span className="gradient-gold text-gold-foreground text-xs font-semibold px-3 py-1.5 rounded-full">−{hotel.discount}%</span>}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <DateField label="Check-in" defaultValue={new Date().toISOString().slice(0,10)} />
                <DateField label="Check-out" defaultValue={new Date(Date.now()+86400000*3).toISOString().slice(0,10)} />
              </div>
              <label className="block mt-2 p-3 rounded-2xl bg-background border border-border">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Guests</span>
                <select className="block w-full bg-transparent outline-none text-sm font-medium">
                  {[1,2,3,4,5,6].map(n => <option key={n}>{n} guest{n>1?"s":""}</option>)}
                </select>
              </label>

              <div className="mt-5 space-y-2 text-sm">
                <Row label={`$${selected.price} × 3 nights`} value={`$${selected.price * 3}`} />
                <Row label="Taxes & fees" value={`$${Math.round(selected.price * 3 * 0.12)}`} />
                <div className="border-t border-border pt-3 flex justify-between font-display text-lg font-semibold">
                  <span>Total</span>
                  <span>${selected.price * 3 + Math.round(selected.price * 3 * 0.12)}</span>
                </div>
              </div>

              <button className="mt-5 w-full px-5 py-3.5 rounded-full gradient-gold text-gold-foreground font-semibold hover:opacity-90 transition">
                Reserve
              </button>
              <p className="mt-3 text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
                <Clock className="h-3 w-3" /> Free cancellation until 48h before
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 lg:px-8 mt-20">
          <h2 className="font-display text-3xl mb-6">You might also like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((h, i) => <HotelCard key={h.id} hotel={h} index={i} />)}
          </div>
        </section>
      )}
    </Layout>
  );
}

function DateField({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="p-3 rounded-2xl bg-background border border-border">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <input type="date" defaultValue={defaultValue}
        className="block w-full bg-transparent outline-none text-sm font-medium" />
    </label>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>;
}
