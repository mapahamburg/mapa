import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { BetaStatus } from "@/components/landing/BetaStatus";
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
      {/* 1. Was ist mapa + Conversion */}
      <Hero />
      {/* 2. Beta-Status — ehrlich, konkret, frühe Mitglieder gesucht */}
      <BetaStatus />
      {/* 3. Stärkster Differentiator: keine App, E-Mail statt Push */}
      <StayConnected />
      {/* 4. Was du konkret bekommst — mit Mid-Page-CTA */}
      <USP />
      {/* 5. Echte Local Hosts statt Algorithmus */}
      <LocalHosts />
      {/* 6. Was mapa bewusst nicht ist */}
      <NotOnMapa />
      {/* 7. Conversion-Abschluss */}
      <FinalCTA />
      <Footer />
    </div>
  );
}
