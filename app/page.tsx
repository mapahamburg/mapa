import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { USP } from "@/components/landing/USP";
import { LocalHosts } from "@/components/landing/LocalHosts";
import { Districts } from "@/components/landing/Districts";
import { StayConnected } from "@/components/landing/StayConnected";
import { NotOnMapa } from "@/components/landing/NotOnMapa";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { InstagramBand } from "@/components/landing/InstagramBand";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div style={{ background: "var(--mapa-cream)" }}>
      <Nav />
      {/* 1. Was ist mapa + Beta-Kontext + Conversion */}
      <Hero />
      {/* 2. Was du konkret bekommst */}
      <USP />
      {/* 3. Echte Local Hosts statt Algorithmus */}
      <LocalHosts />
      {/* 4. Dein Stadtteil, im Aufbau */}
      <Districts />
      {/* 5. Retention: du verpasst nichts */}
      <StayConnected />
      {/* 6. Vertrauen: was mapa bewusst nicht ist */}
      <NotOnMapa />
      {/* 7. Conversion-Abschluss */}
      <FinalCTA />
      <InstagramBand />
      <Footer />
    </div>
  );
}
