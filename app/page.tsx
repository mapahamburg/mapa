import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Districts } from "@/components/landing/Districts";
import { LocalHosts } from "@/components/landing/LocalHosts";
import { NotOnMapa } from "@/components/landing/NotOnMapa";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { InstagramBand } from "@/components/landing/InstagramBand";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div style={{ background: "var(--mapa-cream)", minHeight: "100dvh" }}>
      <Nav />
      <Hero />
      <Districts />
      <LocalHosts />
      <NotOnMapa />
      <FinalCTA />
      <InstagramBand />
      <Footer />
    </div>
  );
}
