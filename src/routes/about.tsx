import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — StayEase" },
      { name: "description", content: "StayEase is a quietly curated marketplace for hotels worth remembering." },
    ],
  }),
});

function AboutPage() {
  return (
    <Layout>
      <section className="relative h-[60svh] min-h-[420px] -mt-20 lg:-mt-24 overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background" />
        <div className="relative z-10 h-full mx-auto max-w-5xl px-5 flex items-end pb-16 pt-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-white max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-gold font-medium">About StayEase</p>
            <h1 className="mt-3 font-display text-5xl md:text-6xl">A quieter way to travel.</h1>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-20 prose-lg">
        <p className="font-display text-2xl leading-snug">
          We started StayEase because choosing where to sleep on a trip had quietly become exhausting. Endless tabs, identical listings, hotels that all looked the same.
        </p>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Today, we work with a small team of editors and locals across 120 countries to surface stays that have a point of view — boutique town houses, family-run riads, mountain cabins with a wood stove, and the kind of resorts that don't need to shout. We don't list every hotel. We list the ones we'd send a friend to.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 grid md:grid-cols-3 gap-6 pb-20">
        {[
          { title: "Craft", body: "We choose properties where someone clearly cared. Architecture, food, service, sound." },
          { title: "Place", body: "A hotel belongs to its city. Our editors live in theirs and write what they actually know." },
          { title: "People", body: "Independent owners and small groups, paid fairly. No opaque fees, ever." },
        ].map((v) => (
          <div key={v.title} className="bg-card rounded-3xl p-7 border border-border shadow-soft">
            <h3 className="font-display text-2xl text-gold">{v.title}</h3>
            <p className="mt-3 text-muted-foreground">{v.body}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
}
