import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/hotels", search: { q: destination } as never });
  }

  const wrap = compact
    ? "glass rounded-2xl p-2 shadow-soft"
    : "glass rounded-3xl p-3 shadow-luxe";

  return (
    <form onSubmit={handleSubmit} className={wrap}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        <Field icon={<MapPin className="h-4 w-4" />} label="Destination" className="md:col-span-4">
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where to?"
            className="w-full bg-transparent outline-none text-sm font-medium placeholder:text-muted-foreground"
          />
        </Field>
        <Field icon={<CalendarDays className="h-4 w-4" />} label="Check-in" className="md:col-span-2">
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-transparent outline-none text-sm font-medium" />
        </Field>
        <Field icon={<CalendarDays className="h-4 w-4" />} label="Check-out" className="md:col-span-2">
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-transparent outline-none text-sm font-medium" />
        </Field>
        <Field icon={<Users className="h-4 w-4" />} label="Guests · Rooms" className="md:col-span-2">
          <div className="flex items-center gap-1 text-sm font-medium">
            <select value={guests} onChange={(e) => setGuests(+e.target.value)} className="bg-transparent outline-none">
              {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} guest{n>1?"s":""}</option>)}
            </select>
            <span className="text-muted-foreground">·</span>
            <select value={rooms} onChange={(e) => setRooms(+e.target.value)} className="bg-transparent outline-none">
              {[1,2,3,4].map(n => <option key={n} value={n}>{n} room{n>1?"s":""}</option>)}
            </select>
          </div>
        </Field>
        <button
          type="submit"
          className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl gradient-gold text-gold-foreground font-semibold px-5 py-3.5 hover:opacity-90 transition shadow-soft"
        >
          <Search className="h-4 w-4" /> Search
        </button>
      </div>
    </form>
  );
}

function Field({ icon, label, children, className = "" }: { icon: React.ReactNode; label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`bg-background/60 hover:bg-background transition rounded-2xl px-4 py-2.5 flex flex-col cursor-text ${className}`}>
      <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
        {icon}{label}
      </span>
      <div className="mt-0.5">{children}</div>
    </label>
  );
}
