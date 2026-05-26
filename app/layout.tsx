import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "mapa — Die lokale Community für Familien in Hamburg.",
  description:
    "Empfehlungen, Veranstaltungen, Treffen und ehrlicher Austausch für Familien in Hamburg.",
  metadataBase: new URL("https://mapa.hamburg"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${instrumentSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
