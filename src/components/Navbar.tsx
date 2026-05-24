import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, Moon, Sun, X, Globe } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/hotels", label: "Hotels" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { ids } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });
  const onHome = path === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !onHome;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        solid ? "glass shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className={`inline-block h-2.5 w-2.5 rounded-full bg-gold`} />
          <span className={`font-display text-2xl font-semibold tracking-tight ${solid ? "text-foreground" : "text-white"}`}>
            StayEase
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                solid ? "text-foreground/80" : "text-white/85"
              }`}
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            className={`hidden sm:flex items-center gap-1.5 text-sm px-3 py-2 rounded-full transition ${
              solid ? "hover:bg-muted text-foreground/80" : "text-white/85 hover:bg-white/10"
            }`}
          >
            <Globe className="h-4 w-4" /> EN · USD
          </button>
          <Link
            to="/wishlist"
            className={`relative p-2 rounded-full transition ${
              solid ? "hover:bg-muted text-foreground" : "text-white hover:bg-white/10"
            }`}
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {ids.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-gold text-[10px] font-semibold flex items-center justify-center text-gold-foreground">
                {ids.length}
              </span>
            )}
          </Link>
          <button
            onClick={toggle}
            className={`p-2 rounded-full transition ${
              solid ? "hover:bg-muted text-foreground" : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium gradient-gold text-gold-foreground hover:opacity-90 transition shadow-soft"
          >
            Sign in
          </Link>
          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2 rounded-full ${solid ? "text-foreground" : "text-white"}`}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-background p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-display text-xl font-semibold">StayEase</span>
                <button onClick={() => setOpen(false)} className="p-2"><X className="h-5 w-5" /></button>
              </div>
              <nav className="flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.to} to={l.to} onClick={() => setOpen(false)}
                    className="px-3 py-3 rounded-lg text-base font-medium hover:bg-muted"
                    activeProps={{ className: "text-gold bg-muted" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <Link
                to="/login" onClick={() => setOpen(false)}
                className="mt-6 inline-flex justify-center px-4 py-3 rounded-full font-medium gradient-gold text-gold-foreground"
              >
                Sign in
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
