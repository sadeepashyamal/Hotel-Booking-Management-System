import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Layout from "@/components/Layout";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Sign in — StayEase" }] }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("hello@stayease.com");
  const [password, setPassword] = useState("demo1234");

  const handleToggleMode = () => {
    setIsSignUp((prev) => {
      const next = !prev;
      if (next) {
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setName("");
        setEmail("hello@stayease.com");
        setPassword("demo1234");
      }
      return next;
    });
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (isSignUp) {
        localStorage.setItem("stayease.user", name || "New User");
      } else {
        localStorage.setItem("stayease.user", "demo");
      }
      navigate({ to: "/" });
    }, 700);
  }

  return (
    <Layout transparentNav>
      <section className="min-h-[100svh] grid lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/70" />
          <div className="relative h-full flex flex-col justify-end p-12 text-white">
            <p className="text-xs uppercase tracking-[0.25em] text-gold font-medium">StayEase</p>
            <h2 className="mt-3 font-display text-5xl leading-tight max-w-md">
              Welcome back. Your next stay is waiting.
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 lg:p-12 pt-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="w-full max-w-md">
            <h1 className="font-display text-4xl">{isSignUp ? "Create an account" : "Sign in"}</h1>
            <p className="mt-2 text-muted-foreground">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={handleToggleMode}
                    className="text-gold underline-offset-4 hover:underline bg-transparent border-0 cursor-pointer p-0 font-medium font-sans inline-block"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  New here?{" "}
                  <button
                    type="button"
                    onClick={handleToggleMode}
                    className="text-gold underline-offset-4 hover:underline bg-transparent border-0 cursor-pointer p-0 font-medium font-sans inline-block"
                  >
                    Create an account
                  </button>
                </>
              )}
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button type="button" className="px-4 py-2.5 rounded-full bg-card border border-border text-sm font-medium hover:bg-muted cursor-pointer">Google</button>
              <button type="button" className="px-4 py-2.5 rounded-full bg-card border border-border text-sm font-medium hover:bg-muted cursor-pointer">Apple</button>
            </div>

            <div className="flex items-center gap-3 my-6 text-xs text-muted-foreground">
              <span className="flex-1 h-px bg-border" /> or with email <span className="flex-1 h-px bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {isSignUp && (
                <label className="block p-3.5 rounded-2xl bg-card border border-border">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Full Name</span>
                  <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe"
                    className="block w-full bg-transparent outline-none text-sm font-medium mt-0.5 placeholder:text-muted-foreground/40" />
                </label>
              )}
              <label className="block p-3.5 rounded-2xl bg-card border border-border">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Email</span>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@stayease.com"
                  className="block w-full bg-transparent outline-none text-sm font-medium mt-0.5 placeholder:text-muted-foreground/40" />
              </label>
              <label className="relative block p-3.5 rounded-2xl bg-card border border-border">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Password</span>
                <input required type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="block w-full bg-transparent outline-none text-sm font-medium mt-0.5 pr-8 placeholder:text-muted-foreground/40" />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground cursor-pointer">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </label>

              <button disabled={loading}
                className="mt-2 w-full px-5 py-3.5 rounded-full gradient-gold text-gold-foreground font-semibold hover:opacity-90 transition disabled:opacity-60 cursor-pointer">
                {loading ? (isSignUp ? "Creating account…" : "Signing in…") : (isSignUp ? "Create account" : "Sign in")}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
