import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "mapa — Familien-Community in Hamburg | Tipps, Treffen, Empfehlungen",
  description:
    "mapa ist die lokale Community für Familien in Hamburg. Echte Empfehlungen, spontane Treffen und ehrlicher Austausch — in Winterhude, Eppendorf, Ottensen und ganz Hamburg.",
  alternates: { canonical: "https://mapa.hamburg" },
};

import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { USP } from "@/components/landing/USP";
import { LocalHosts } from "@/components/landing/LocalHosts";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://mapa.hamburg/#organization",
      name: "mapa",
      url: "https://mapa.hamburg",
      logo: "https://mapa.hamburg/icon-512.png",
      description: "Die lokale Community für Familien in Hamburg.",
      email: "hey@mapa.hamburg",
      areaServed: { "@type": "City", name: "Hamburg", "@id": "https://www.wikidata.org/wiki/Q1055" },
    },
    {
      "@type": "WebSite",
      "@id": "https://mapa.hamburg/#website",
      url: "https://mapa.hamburg",
      name: "mapa",
      publisher: { "@id": "https://mapa.hamburg/#organization" },
      inLanguage: "de-DE",
    },
  ],
};

export default function LandingPage() {
  return (
    <div style={{ background: "var(--mapa-cream)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      {/* 1. Was ist mapa + Conversion */}
      <Hero />
      {/* 2. Was du konkret bekommst — mit Mid-Page-CTA */}
      <USP />
      {/* 3. Echte Local Hosts statt Algorithmus */}
      <LocalHosts />
      {/* 4. Conversion-Abschluss */}
      <FinalCTA />
      <Footer />
    </div>
  );
}
