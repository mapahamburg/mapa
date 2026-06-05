import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
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

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
});

const TITLE = "mapa. Die lokale Community für Familien in Hamburg";
const DESCRIPTION =
  "Empfehlungen, Veranstaltungen, Treffen und ehrlicher Austausch für Familien in Hamburg.";

export const metadata: Metadata = {
  title: TITLE,
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
        alt: TITLE,
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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <CookieBanner />
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
