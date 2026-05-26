import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { WhatYouFind } from "@/components/landing/WhatYouFind";
import { Districts } from "@/components/landing/Districts";
import { StadtteilReel } from "@/components/landing/StadtteilReel";
import { ForWhom } from "@/components/landing/ForWhom";
import { LocalHosts } from "@/components/landing/LocalHosts";
import { HowWeGrow } from "@/components/landing/HowWeGrow";
import { NotOnMapa } from "@/components/landing/NotOnMapa";
import { PullQuote } from "@/components/landing/PullQuote";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div style={{ background: "var(--mapa-cream)", minHeight: "100dvh" }}>
      <Nav />
      <Hero />
      <WhatYouFind />
      <Districts />
      <StadtteilReel />
      <ForWhom />
      <LocalHosts />
      <HowWeGrow />
      <NotOnMapa />
      <PullQuote />
      <FinalCTA />
      <Footer />
    </div>
  );
}
