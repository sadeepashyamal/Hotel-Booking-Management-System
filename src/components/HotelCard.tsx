import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import type { Hotel } from "@/data/hotels";

export default function HotelCard({ hotel, index = 0 }: { hotel: Hotel; index?: number }) {
  const { has, toggle } = useWishlist();
  const liked = has(hotel.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      className="group bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-luxe transition-all duration-500 hover:-translate-y-1"
    >
      <Link to="/hotels/$id" params={{ id: hotel.id }} className="block relative">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {hotel.discount && (
            <span className="absolute top-4 left-4 gradient-gold text-gold-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-soft">
              −{hotel.discount}% OFF
            </span>
          )}
          <button
            onClick={(e) => { e.preventDefault(); toggle(hotel.id); }}
            className="absolute top-4 right-4 h-10 w-10 rounded-full glass flex items-center justify-center hover:scale-110 transition"
            aria-label="Save"
          >
            <Heart className={`h-4.5 w-4.5 transition ${liked ? "fill-rose-500 text-rose-500" : "text-foreground"}`} />
          </button>
          <div className="absolute bottom-4 left-4 glass-dark text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Star className="h-3 w-3 fill-gold text-gold" /> {hotel.rating}
            <span className="text-white/70 ml-1 font-normal">({hotel.reviews})</span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1.5">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{hotel.city}, {hotel.country}</span>
              </div>
              <h3 className="font-display text-lg font-semibold leading-snug truncate">{hotel.name}</h3>
            </div>
            <div className="flex shrink-0">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-gold text-gold" />
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {hotel.amenities.slice(0, 3).map((a) => (
              <span key={a} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {a}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-end justify-between pt-4 border-t border-border">
            <div>
              {hotel.oldPrice && (
                <span className="text-xs text-muted-foreground line-through mr-1.5">${hotel.oldPrice}</span>
              )}
              <span className="font-display text-2xl font-semibold">${hotel.pricePerNight}</span>
              <span className="text-xs text-muted-foreground"> /night</span>
            </div>
            <span className="text-xs font-medium text-gold group-hover:underline">View details →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
