import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { USP } from "@/components/landing/USP";
import { LocalHosts } from "@/components/landing/LocalHosts";
import { NotOnMapa } from "@/components/landing/NotOnMapa";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div style={{ background: "var(--mapa-cream)" }}>
      <Nav />
      {/* 1. Was ist mapa + Conversion */}
      <Hero />
      {/* 2. Was du konkret bekommst — mit Mid-Page-CTA */}
      <USP />
      {/* 3. Echte Local Hosts statt Algorithmus */}
      <LocalHosts />
      {/* 4. Was mapa bewusst nicht ist */}
      <NotOnMapa />
      {/* 5. Conversion-Abschluss */}
      <FinalCTA />
      <Footer />
    </div>
  );
}
