import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const USP_ITEMS = [
  {
    eyebrow: "Empfehlungen",
    headline: "Echter Rat aus dem Stadtteil.",
    body: "Eisdielen, Spielplätze, Hebammen, Kinderärzte. Empfohlen von Familien, die wirklich dort wohnen.",
    example: '„Kennt jemand einen Kinderarzt in Eppendorf mit kurzfristigen Terminen?“',
  },
  {
    eyebrow: "Treffen",
    headline: "Spielplatz, Café, Stadtpark.",
    body: "Spontan verabreden oder regelmäßig treffen. Kleine, echte Begegnungen im Stadtteil.",
    example: '„Spielplatztreffen Samstag 10:30 im Stadtpark. Wer kommt?“',
  },
  {
    eyebrow: "Events",
    headline: "Was diese Woche los ist.",
    body: "Kinderflohmarkt, Familienkonzert, Workshop. Lokal, übersichtlich, ohne Werbung.",
    example: '„Familienflohmarkt Eppendorf · So 14–18 Uhr · Eintritt frei“',
  },
  {
    eyebrow: "Austausch",
    headline: "Fragen stellen, Antworten bekommen.",
    body: "Ohne Social-Media-Stress. Chronologisch, ruhig, mit echten Menschen aus deiner Nähe.",
    example: '„Hat jemand Erfahrung mit Montessori-Kitas in Winterhude?“',
  },
] as const;

export async function USP() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return (
    <section className="section-pad" style={{ background: "var(--mapa-paper)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Section eyebrow */}
        <div style={{
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--cobalt-500)",
          fontWeight: 500,
          fontFamily: "var(--font-mono)",
          marginBottom: 40,
        }}>
          Was du findest
        </div>

        <div className="usp-grid">
          {USP_ITEMS.map(({ eyebrow, headline, body, example }) => (
            <div key={eyebrow} className="usp-card">
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--cobalt-500)",
                  fontWeight: 500,
                  fontFamily: "var(--font-mono)",
                  marginBottom: 12,
                }}
              >
                {eyebrow}
              </div>

              {/* Headline: Information → Geist Sans, kein Serif */}
              <div
                className="usp-headline"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 700,
                  color: "var(--ink)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  marginBottom: 10,
                }}
              >
                {headline}
              </div>

              <div
                className="usp-body"
                style={{
                  fontFamily: "var(--font-ui)",
                  color: "var(--fg-muted)",
                  lineHeight: 1.55,
                  marginBottom: 14,
                }}
              >
                {body}
              </div>

              {/* Echtes Beispiel als Mini-Card */}
              <div style={{
                background: "var(--color-sunk)",
                border: "1px solid var(--border-soft)",
                borderRadius: 10,
                padding: "9px 12px",
                fontFamily: "var(--font-ui)",
                fontSize: 12.5,
                fontStyle: "italic",
                color: "var(--fg-muted)",
                lineHeight: 1.45,
              }}>
                {example}
              </div>
            </div>
          ))}
        </div>

        {/* Mid-Page CTA — für "frühe Entscheider" */}
        {!isLoggedIn && (
          <div style={{
            marginTop: 36,
            paddingTop: 32,
            borderTop: "1px solid var(--border-soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}>
            <p style={{
              fontFamily: "var(--font-ui)",
              fontSize: 16,
              color: "var(--fg-muted)",
              margin: 0,
            }}>
              Das klingt nach deinem Stadtteil?
            </p>
            <Link
              href="/signup"
              style={{
                background: "var(--cobalt-500)",
                color: "var(--mapa-paper)",
                textDecoration: "none",
                padding: "13px 24px",
                borderRadius: 999,
                fontFamily: "var(--font-ui)",
                fontSize: 15,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              Kostenlos beitreten
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
