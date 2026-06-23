import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { MetaPixel } from "@/components/analytics/MetaPixel";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});


const TITLE = "mapa — Familien-Community in Hamburg | Tipps, Treffen, Empfehlungen";
const DESCRIPTION =
  "mapa ist die lokale Community für Familien in Hamburg. Echte Empfehlungen, spontane Treffen und ehrlicher Austausch — in Winterhude, Eppendorf, Ottensen und ganz Hamburg.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s | mapa Hamburg",
  },
  description: DESCRIPTION,
  metadataBase: new URL("https://mapa.hamburg"),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://mapa.hamburg",
    siteName: "mapa",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/mapa-link-vorschau-1200x630.png",
        width: 1200,
        height: 630,
        alt: "mapa — Familien-Community in Hamburg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/mapa-link-vorschau-1200x630.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <Analytics />
        <CookieBanner />
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
