import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Über mapa — Familien-Community in Hamburg",
  description:
    "mapa verbindet Familien in Hamburg — ohne Algorithmus, ohne Lärm. Erfahre, wie wir Eltern in Winterhude, Eppendorf, Ottensen und anderen Stadtteilen zusammenbringen.",
  alternates: { canonical: "https://mapa.hamburg/ueber-uns" },
};

const KEINE_ITEMS = [
  "Keine öffentlichen Likes.",
  "Keine Reichweitenlogik.",
  "Keine Aufmerksamkeitsschleifen.",
];

const LOCATIONS = [
  "in Winterhude",
  "in Ottensen",
  "in Eimsbüttel",
  "auf dem Spielplatz um die Ecke",
  "beim Café mit Hochstuhl",
  "beim ehrlichen Tipp aus dem Stadtteil",
];

const EYEBROW: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--cobalt-500)",
  fontWeight: 500,
  fontFamily: "var(--font-mono)",
  marginBottom: 20,
};

export default function UeberUns() {
  return (
    <div style={{ background: "var(--mapa-cream)", minHeight: "100dvh" }}>
      <Nav />

      {/* ── 1. Hero ─────────────────────────────────────── */}
      <section className="section-pad">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ ...EYEBROW, marginBottom: 24 }}>Über mapa</div>
          <h1
            className="fs-hero"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              margin: 0,
              color: "var(--fg)",
            }}
          >
            Familienleben ist lokal.
          </h1>
          <p
            className="sf-p-lg"
            style={{
              color: "var(--fg-muted)",
              marginTop: 28,
              maxWidth: 540,
            }}
          >
            Der gute Spielplatz ist selten weit weg.
            <br />
            Die hilfreiche Empfehlung meistens auch nicht.
          </p>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--fg)",
              marginTop: 20,
              maxWidth: 540,
            }}
          >
            mapa bringt Familien in Hamburg zusammen — ruhig, lokal und ohne
            Social-Media-Lärm.
          </p>
        </div>
      </section>

      {/* ── 2. Kein / Sondern ───────────────────────────── */}
      <section className="section-pad" style={{ background: "var(--mapa-paper)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2
            className="sf-h2-cta"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              margin: "0 0 36px",
              color: "var(--ink)",
            }}
          >
            Kein endloser Feed.
          </h2>

          <div>
            {KEINE_ITEMS.map((item) => (
              <div
                key={item}
                style={{
                  padding: "18px 0",
                  borderBottom: "1px solid var(--border-soft)",
                  fontFamily: "var(--font-ui)",
                  fontSize: 18,
                  color: "var(--fg-muted)",
                  lineHeight: 1.4,
                }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Pivot */}
          <div style={{ marginTop: 56 }}>
            <div style={{ ...EYEBROW, color: "var(--fg-muted)", marginBottom: 14 }}>
              Sondern
            </div>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 17,
                lineHeight: 1.65,
                color: "var(--fg-muted)",
                margin: "0 0 32px",
                maxWidth: 500,
              }}
            >
              Empfehlungen, Fragen, Veranstaltungen und Treffen aus deinem
              Stadtteil.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Chronologisch.", "Übersichtlich.", "Menschlich."].map((val) => (
                <span
                  key={val}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 20,
                    color: "var(--cobalt-700)",
                    background: "var(--cobalt-50)",
                    borderRadius: 999,
                    padding: "8px 20px",
                    lineHeight: 1.3,
                  }}
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Hamburg zuerst ───────────────────────────── */}
      <section className="section-pad" style={{ background: "var(--surface-page-deep)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={EYEBROW}>Hamburg zuerst</div>
          <h2
            className="sf-h2-cta"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              margin: "0 0 28px",
              color: "var(--ink)",
            }}
          >
            mapa beginnt nicht global.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--fg-muted)",
              margin: "0 0 28px",
            }}
          >
            Sondern:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {LOCATIONS.map((loc) => (
              <div
                key={loc}
                style={{ display: "flex", alignItems: "center", gap: 16 }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: "var(--cobalt-500)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 20,
                    color: "var(--ink)",
                    lineHeight: 1.3,
                  }}
                >
                  {loc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Local Hosts ──────────────────────────────── */}
      <section className="section-pad">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={EYEBROW}>Local Hosts</div>
          <h2
            className="sf-h2-cta"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              margin: "0 0 20px",
              color: "var(--ink)",
            }}
          >
            Ein Mensch pro Stadtteil.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--fg-muted)",
              margin: "0 0 36px",
              maxWidth: 540,
            }}
          >
            Jeder Stadtteil hat einen Local Host. Eine echte Person, die neue
            Familien willkommen heißt, Empfehlungen sammelt und hilft, mapa
            menschlich zu halten.
          </p>
          <div
            style={{
              background: "var(--cobalt-50)",
              border: "1px solid var(--cobalt-100)",
              borderRadius: 16,
              padding: "22px 26px",
              display: "inline-block",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 19,
                color: "var(--cobalt-700)",
                lineHeight: 1.5,
              }}
            >
              Nicht algorithmisch.
              <br />
              Sondern aufmerksam.
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Ruhiger wachsen ──────────────────────────── */}
      <section className="section-pad" style={{ background: "var(--mapa-paper)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={EYEBROW}>Wachstum</div>
          <h2
            className="sf-h2-cta"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              margin: "0 0 24px",
              color: "var(--ink)",
            }}
          >
            Ruhiger wachsen.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--fg-muted)",
              margin: "0 0 24px",
            }}
          >
            mapa wächst langsam.
          </p>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 22,
              lineHeight: 1.55,
              color: "var(--ink)",
              margin: "0 0 24px",
            }}
          >
            Stadtteil für Stadtteil.
            <br />
            Familie für Familie.
          </div>
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--fg-muted)",
            }}
          >
            Nicht durch Aufmerksamkeit.
            <br />
            Sondern durch Vertrauen.
          </div>
        </div>
      </section>

      {/* ── 6. CTA ──────────────────────────────────────── */}
      <section className="section-pad" style={{ background: "var(--ink)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <h2
            className="fs-hero"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--mapa-paper)",
              margin: "0 0 32px",
            }}
          >
            Frag mal auf mapa.
          </h2>
          <a
            href="/signup"
            className="cta-page-btn"
            style={{
              background: "var(--cobalt-500)",
              color: "var(--mapa-paper)",
              textDecoration: "none",
              padding: "16px 32px",
              borderRadius: 999,
              fontFamily: "var(--font-ui)",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Jetzt mitmachen
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
