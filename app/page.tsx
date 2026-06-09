import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { StayConnected } from "@/components/landing/StayConnected";
import { USP } from "@/components/landing/USP";
import { LocalHosts } from "@/components/landing/LocalHosts";
import { NotOnMapa } from "@/components/landing/NotOnMapa";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div style={{ background: "var(--mapa-cream)" }}>
      <Nav />
      {/* 1. Was ist mapa + Beta-Kontext + Conversion */}
      <Hero />
      {/* 2. Stärkster Differentiator: keine App, E-Mail-Benachrichtigung */}
      <StayConnected />
      {/* 3. Was du konkret bekommst — mit Mid-Page-CTA */}
      <USP />
      {/* 4. Echte Local Hosts statt Algorithmus */}
      <LocalHosts />
      {/* 5. Was mapa bewusst nicht ist — 3 Items */}
      <NotOnMapa />
      {/* 6. Conversion-Abschluss */}
      <FinalCTA />
      <Footer />
    </div>
  );
}
