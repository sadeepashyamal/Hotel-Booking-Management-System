import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, Sparkles, Globe2 } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import HotelCard from "@/components/HotelCard";
import { hotels, destinations, testimonials } from "@/data/hotels";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Purnimashree - Hotels" },
      { name: "description", content: "Discover handpicked boutique, luxury, beach and mountain hotels. Book in seconds with StayEase." },
    ],
  }),
});

function HomePage() {
  const featured = hotels.slice(0, 6);
  const inspiration = hotels.slice(6, 10);

  return (
    <Layout transparentNav>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

        <div className="relative z-10 h-full mx-auto max-w-7xl px-5 lg:px-8 flex flex-col justify-end pb-12 lg:pb-20 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-dark text-xs uppercase tracking-[0.2em] font-medium">
              <Sparkles className="h-3 w-3 text-gold" /> Curated since 2019
            </span>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.02]">
              Stays worth <em className="text-gold not-italic">remembering.</em>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
              A quietly curated marketplace of boutique, luxury and beach hotels around the world — chosen for the way they make you feel.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 lg:mt-12"
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: "2,400+", l: "Curated properties" },
            { n: "120", l: "Countries" },
            { n: "4.9 ★", l: "Avg. guest score" },
            { n: "60s", l: "Average booking" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-3xl font-semibold">{s.n}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED HOTELS */}
      <Section
        eyebrow="Featured stays"
        title="Quietly extraordinary"
        subtitle="Hand-selected this season by our editors and most-trusted travellers."
        actionTo="/hotels" actionLabel="Browse all hotels"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((h, i) => <HotelCard key={h.id} hotel={h} index={i} />)}
        </div>
      </Section>

      {/* DESTINATIONS */}
      <Section
        eyebrow="Popular destinations"
        title="Cities we love this year"
        subtitle="From quiet coves to lit-up skylines."
      >
        <div className="grid gap-5 grid-cols-2 lg:grid-cols-4">
          {destinations.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-soft hover:shadow-luxe transition-all duration-500 cursor-pointer"
            >
              <img src={d.image} alt={d.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                <p className="text-xs uppercase tracking-wider text-white/70">{d.country}</p>
                <h3 className="font-display text-2xl lg:text-3xl font-semibold">{d.name}</h3>
                <p className="text-sm text-white/80 mt-1">{d.count} properties</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* LUXURY OFFER BANNER */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-10">
        <div className="relative overflow-hidden rounded-[2rem] gradient-night text-white p-8 md:p-14 shadow-luxe">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold/30 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs uppercase tracking-[0.2em]">
              <Award className="h-3 w-3 text-gold" /> Members only
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-5 leading-tight">
              Up to <span className="text-gold">35% off</span> the world's most beautiful suites.
            </h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              Join the StayEase circle and unlock private rates, room upgrades and a personal concierge for your next escape.
            </p>
            <Link to="/hotels" className="mt-7 inline-flex items-center gap-2 px-6 py-3.5 rounded-full gradient-gold text-gold-foreground font-semibold hover:opacity-90 transition">
              Explore offers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* INSPIRATION CARDS */}
      <Section
        eyebrow="Travel inspiration"
        title="Stories from the road"
        subtitle="Notes, guides and recommendations from our editors."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {inspiration.map((h, i) => (
            <motion.article
              key={h.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group rounded-3xl overflow-hidden bg-card shadow-soft hover:shadow-luxe transition-all"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={h.images[0]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wider text-gold">{h.category}</p>
                <h3 className="font-display text-xl mt-1 leading-snug">A weekend in {h.city}</h3>
                <p className="text-sm text-muted-foreground mt-2">3 min read</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section
        eyebrow="What travellers say"
        title="Loved by the well-travelled"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-3xl p-7 shadow-soft border border-border"
            >
              <Globe2 className="h-6 w-6 text-gold mb-4" />
              <p className="font-display text-lg leading-relaxed">"{t.quote}"</p>
              <footer className="mt-6 flex items-center gap-3">
                <span className="h-10 w-10 rounded-full gradient-gold flex items-center justify-center text-gold-foreground font-semibold">{t.avatar}</span>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </Section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-4xl px-5 lg:px-8 py-20 text-center">
        <h2 className="font-display text-4xl md:text-5xl">Travel notes, monthly.</h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          One thoughtful email a month — a city, a hotel and a small idea worth borrowing.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-8 mx-auto max-w-md flex gap-2 glass rounded-full p-1.5 shadow-soft">
          <input type="email" required placeholder="you@email.com"
            className="flex-1 bg-transparent px-5 outline-none text-sm" />
          <button className="px-6 py-3 rounded-full gradient-gold text-gold-foreground font-semibold text-sm">Subscribe</button>
        </form>
      </section>
    </Layout>
  );
}

function Section({ eyebrow, title, subtitle, children, actionTo, actionLabel }: {
  eyebrow: string; title: string; subtitle?: string; children: React.ReactNode;
  actionTo?: string; actionLabel?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gold font-medium">{eyebrow}</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">{title}</h2>
          {subtitle && <p className="mt-3 text-muted-foreground max-w-xl">{subtitle}</p>}
        </div>
        {actionTo && (
          <Link to={actionTo} className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-gold transition">
            {actionLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
