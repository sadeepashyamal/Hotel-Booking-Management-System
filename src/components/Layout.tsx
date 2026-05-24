import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children, transparentNav = false }: { children: ReactNode; transparentNav?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={transparentNav ? "" : "pt-20 lg:pt-24"}>{children}</main>
      <Footer />
    </div>
  );
}
