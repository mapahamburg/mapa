import type { Metadata } from "next";
import { Avatar } from "@/components/ui/Avatar";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Local Hosts · mapa",
};

const WHAT_HOSTS_DO = [
  "Neue Familien im Stadtteil willkommen heißen.",
  "Treffen anstoßen — ein Spielplatznachmittag, ein Kaffee, ein Spaziergang.",
  "Den Ton halten: freundlich, ruhig, gastfreundlich.",
  "Lokales Wissen teilen: Cafés, Spielplätze, Hebammen, Kitas.",
];

export default function HostsPage() {
  return (
    <main className="app-main-pad">
      <div style={{ maxWidth: 560 }}>

        {/* Eyebrow */}
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--color-cobalt)",
          fontWeight: 600,
          marginBottom: 16,
        }}>
          Local Hosts
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "var(--font-ui)",
          fontSize: 30,
          fontWeight: 700,
          color: "var(--color-ink)",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          margin: "0 0 16px",
        }}>
          Ein Mensch pro Stadtteil.
        </h1>

        <p style={{
          fontFamily: "var(--font-ui)",
          fontSize: 15,
          lineHeight: 1.65,
          color: "var(--color-muted)",
          margin: "0 0 32px",
          maxWidth: 480,
        }}>
          Local Hosts sind das Herzstück von mapa. Echte Menschen aus dem
          Stadtteil, die neue Familien willkommen heißen und dafür sorgen,
          dass die Community lebendig bleibt. Ehrenamtlich. Mit Haltung.
        </p>

        {/* What hosts do */}
        <div style={{
          background: "var(--color-ivory)",
          border: "1px solid var(--color-line-soft)",
          borderRadius: 20,
          padding: 24,
          marginBottom: 28,
        }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            fontWeight: 600,
            marginBottom: 16,
          }}>
            Was du machst
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {WHAT_HOSTS_DO.map((point) => (
              <div key={point} style={{
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
                padding: "12px 0",
                borderBottom: "1px solid var(--color-line-soft)",
              }}
              className="last-no-border">
                <div style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--color-sage-ink)",
                  marginTop: 8,
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: "var(--color-ink)",
                }}>
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Example host */}
        <div style={{
          background: "var(--color-sage-soft)",
          border: "1px solid rgba(111,133,90,0.2)",
          borderRadius: 20,
          padding: 24,
          marginBottom: 32,
          display: "flex",
          gap: 16,
          alignItems: "flex-start",
        }}>
          <Avatar letter="N" size={48} />
          <div>
            <div style={{
              fontFamily: "var(--font-ui)",
              fontSize: 18,
              fontWeight: 600,
              color: "var(--color-ink)",
              letterSpacing: "-0.02em",
              marginBottom: 4,
            }}>
              Nadine
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "var(--font-ui)",
              fontSize: 12,
              color: "var(--color-sage-ink)",
              marginBottom: 12,
            }}>
              <MapPin size={11} strokeWidth={1.5} />
              Local Host · Winterhude
            </div>
            <p style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 15,
              lineHeight: 1.5,
              color: "var(--color-ink-2)",
              margin: 0,
            }}>
              „Ich bin seit acht Jahren in Winterhude. Die Community gibt
              mir genauso viel zurück wie ich einbringe."
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: "var(--color-sunk)",
          border: "1px solid var(--color-line-soft)",
          borderRadius: 20,
          padding: 28,
        }}>
          <h2 style={{
            fontFamily: "var(--font-ui)",
            fontSize: 22,
            fontWeight: 700,
            color: "var(--color-ink)",
            letterSpacing: "-0.02em",
            margin: "0 0 10px",
          }}>
            Lust, deinen Stadtteil zu begleiten?
          </h2>
          <p style={{
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            lineHeight: 1.65,
            color: "var(--color-muted)",
            margin: "0 0 20px",
          }}>
            Wir bauen mapa Stadtteil für Stadtteil auf. Wenn du Lust hast,
            Local Host in deinem Viertel zu werden, schreib uns kurz.
            Kein Formular, kein Auswahlverfahren.
          </p>
          <a
            href="mailto:hosts@mapa.hamburg?subject=Local Host werden"
            style={{
              display: "inline-block",
              background: "var(--color-cobalt)",
              color: "#fff",
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 999,
              padding: "10px 20px",
              textDecoration: "none",
            }}
          >
            hosts@mapa.hamburg schreiben
          </a>
        </div>

      </div>
    </main>
  );
}
