import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import Layout from "@/components/Layout";
import HotelCard from "@/components/HotelCard";
import { useWishlist } from "@/context/WishlistContext";
import { hotels } from "@/data/hotels";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
  head: () => ({ meta: [{ title: "Wishlist — StayEase" }] }),
});

function WishlistPage() {
  const { ids } = useWishlist();
  const saved = hotels.filter((h) => ids.includes(h.id));

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
        <p className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Your collection</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Saved hotels</h1>
        <p className="mt-3 text-muted-foreground max-w-xl">A quiet shelf for the stays you're still thinking about.</p>

        {saved.length === 0 ? (
          <div className="mt-16 text-center py-20 bg-card rounded-3xl border border-border">
            <div className="mx-auto h-16 w-16 rounded-full gradient-gold flex items-center justify-center mb-5">
              <Heart className="h-8 w-8 text-gold-foreground" />
            </div>
            <h3 className="font-display text-2xl">Nothing saved yet</h3>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">Tap the heart on any hotel and we'll keep it here for you.</p>
            <Link to="/hotels" className="mt-7 inline-flex px-6 py-3 rounded-full gradient-gold text-gold-foreground font-semibold">
              Browse hotels
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((h, i) => <HotelCard key={h.id} hotel={h} index={i} />)}
          </div>
        )}
      </section>
    </Layout>
  );
}
