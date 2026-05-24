import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="gradient-night text-white/80 mt-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-gold" />
            <span className="font-display text-2xl text-white font-semibold">StayEase</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            A quietly curated marketplace for hotels worth remembering. We've gathered properties around the world that put craft, place, and people first.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex bg-white/10 border border-white/15 rounded-full p-1 max-w-sm"
          >
            <input
              type="email" required placeholder="Your email"
              className="flex-1 bg-transparent px-4 text-sm placeholder:text-white/50 outline-none"
            />
            <button className="px-5 py-2 rounded-full gradient-gold text-gold-foreground font-medium text-sm">
              Subscribe
            </button>
          </form>
        </div>

        {[
          { title: "Explore", links: ["Hotels", "Destinations", "Offers", "Travel Guide"] },
          { title: "Company", links: ["About", "Careers", "Press", "Sustainability"] },
          { title: "Support", links: ["Help Center", "Contact", "Terms", "Privacy"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-white text-lg mb-4">{col.title}</h4>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l}>
                  <Link to="/" className="hover:text-gold transition">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <span>© {new Date().getFullYear()} StayEase. Crafted for travellers.</span>
          <div className="flex items-center gap-4">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-full hover:bg-white/10 transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
