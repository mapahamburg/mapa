import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { StartForm } from "./StartForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "mapa. Für Familien in Hamburg.",
  description:
    "mapa ist die lokale Community für Eltern in Hamburg. Empfehlungen, Treffen und ehrlicher Austausch aus deinem Stadtteil.",
  robots: { index: false, follow: false },
};

const WHY_ITEMS = [
  {
    title: "Viele Eltern suchen dasselbe.",
    body: "Empfehlungen, Veranstaltungen, Austausch mit anderen Familien in der Nähe. Doch die meisten Gruppen sind unübersichtlich, laut oder über mehrere Plattformen verteilt.",
  },
  {
    title: "mapa ist anders gedacht.",
    body: "Kein Algorithmus, keine Werbung, kein globaler Feed. Nur dein Stadtteil, chronologisch, mit einem Local Host, der die Nachbarschaft kennt.",
  },
  {
    title: "Wir starten in Winterhude und Eppendorf.",
    body: "Die ersten Nachbarschaften entstehen gerade. Wenn du dort wohnst oder regelmäßig unterwegs bist, freuen wir uns, wenn du dabei bist.",
  },
];

export default function StartPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--mapa-cream)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 480,
          margin: "0 auto",
          padding: "48px 24px 64px",
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: 36 }}>
          <Logo size={20} lockup />
        </div>

        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--cobalt-500)",
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          Winterhude & Eppendorf · Jetzt im Aufbau
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(32px, 8vw, 44px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--fg)",
            margin: "0 0 16px",
          }}
        >
          Eine ruhige Nachbarschaft für Familien in Hamburg.
        </h1>

        {/* Lede */}
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--fg-muted)",
            margin: "0 0 32px",
          }}
        >
          mapa ist die lokale Community für Eltern in Hamburg. Wir starten
          gerade in Winterhude und Eppendorf und sammeln die ersten Familien,
          Empfehlungen und Veranstaltungen.
        </p>

        {/* Form card */}
        <div
          style={{
            background: "var(--mapa-paper)",
            borderRadius: 20,
            padding: "28px 24px",
            border: "1px solid var(--border)",
            marginBottom: 48,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              fontSize: 15,
              color: "var(--fg)",
              margin: "0 0 20px",
              letterSpacing: "-0.01em",
            }}
          >
            Melde dich an und erhalte:
          </p>
          <StartForm />
        </div>

        {/* Warum mapa? */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
              fontWeight: 500,
              marginBottom: 24,
            }}
          >
            Warum mapa?
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {WHY_ITEMS.map(({ title, body }, i) => (
              <div
                key={title}
                style={{
                  paddingTop: i === 0 ? 0 : 20,
                  paddingBottom: 20,
                  borderBottom:
                    i < WHY_ITEMS.length - 1
                      ? "1px solid var(--border-soft)"
                      : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "var(--fg)",
                    marginBottom: 6,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {title}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--fg-muted)",
                    margin: 0,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Minimal footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border-soft)",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {[
          { label: "Datenschutz", href: "/datenschutz" },
          { label: "Impressum", href: "/impressum" },
          { label: "Hausregeln", href: "/hausregeln" },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 12,
              color: "var(--fg-subtle)",
              textDecoration: "none",
            }}
          >
            {label}
          </Link>
        ))}
      </footer>
    </div>
  );
}
