import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Avatar } from "@/components/ui/Avatar";

export const metadata = {
  title: "Local Host werden · mapa",
  description:
    "Gestalte mapa in deinem Stadtteil mit. Als Local Host bist du der Anker für neue Familien in deinem Stadtteil.",
};

const TASKS = [
  {
    n: "01",
    title: "Neue Familien willkommen heißen",
    body: "Du begrüßt neue Mitglieder persönlich und hilfst ihnen, in der Community anzukommen.",
  },
  {
    n: "02",
    title: "Treffen organisieren",
    body: "Du initiierst kleine Treffen: ein Spielplatznachmittag, ein Kaffee zu zweit, ein Stadtteil-Spaziergang.",
  },
  {
    n: "03",
    title: "Den Ton halten",
    body: "Du sorgst dafür, dass Diskussionen freundlich bleiben. Nicht als Polizist, sondern als Gastgeber.",
  },
  {
    n: "04",
    title: "Den Stadtteil kennen",
    body: "Du teilst dein lokales Wissen: die guten Cafés, die Hebammen mit Kapazität, die Spielplätze mit Schatten.",
  },
];

export default function LocalHostsPage() {
  return (
    <div style={{ background: "var(--surface-page)" }}>
      <Nav />

      {/* Hero */}
      <section className="section-pad">
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "var(--cobalt-500)",
              fontWeight: 500,
              marginBottom: 24,
            }}
          >
            Local Hosts
          </div>
          <h1
            className="lh-h1"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              margin: "0 0 28px",
              color: "var(--ink)",
              textWrap: "balance" as const,
            }}
          >
            Ein Mensch pro Stadtteil.
            <br />
            Vielleicht du.
          </h1>
          <p
            className="sf-p-lg"
            style={{
              fontFamily: "var(--font-ui)",
              color: "var(--ash-600)",
              maxWidth: 620,
              margin: 0,
            }}
          >
            Local Hosts sind das Herzstück von mapa. Echte Menschen aus dem
            Stadtteil, die neue Familien willkommen heißen, Treffen
            organisieren und dafür sorgen, dass die Community lebendig bleibt.
            Ehrenamtlich. Mit Haltung.
          </p>
        </div>
      </section>

      {/* Was du machst */}
      <section className="section-pad" style={{ background: "var(--surface-page-deep)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "var(--cobalt-500)",
              fontWeight: 500,
              marginBottom: 20,
            }}
          >
            Was du machst
          </div>
          <h2
            className="sf-h2-cta"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              margin: "0 0 48px",
              color: "var(--ink)",
            }}
          >
            Gastgeber. Nicht Moderator.
          </h2>

          <div className="lh-tasks-grid">
            {TASKS.map((task) => (
              <div
                key={task.n}
                style={{
                  background: "var(--surface-card)",
                  borderRadius: 20,
                  padding: 28,
                  border: "1px solid var(--ash-200)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    color: "var(--cobalt-500)",
                    fontWeight: 500,
                    marginBottom: 12,
                  }}
                >
                  {task.n}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontWeight: 600,
                    fontSize: 18,
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                    marginBottom: 10,
                  }}
                >
                  {task.title}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: "var(--ash-600)",
                    margin: 0,
                  }}
                >
                  {task.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Was wir uns wünschen */}
      <section className="section-pad">
        <div className="lh-split" style={{ maxWidth: 860, margin: "0 auto" }}>
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                color: "var(--cobalt-500)",
                fontWeight: 500,
                marginBottom: 20,
              }}
            >
              Was wir uns wünschen
            </div>
            <h2
              className="sf-h2-cta"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
                margin: "0 0 32px",
                color: "var(--ink)",
              }}
            >
              Kein CV.
              <br />
              Nur echtes Interesse.
            </h2>

            <div style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
              {[
                "Du lebst in Hamburg und kennst deinen Stadtteil.",
                "Du hast selbst Kinder oder Kontakt zur Familienwelt.",
                "Dir liegt ein freundlicher, ruhiger Umgangston am Herzen.",
                "Du hast Lust, ein- bis zweimal pro Monat ein Treffen anzustoßen.",
                "Du bist bereit, mapa in deinem Stadtteil bekannter zu machen.",
              ].map((point) => (
                <div
                  key={point}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    padding: "14px 0",
                    borderTop: "1px solid var(--ash-200)",
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 999,
                      background: "var(--cobalt-500)",
                      marginTop: 9,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: 15.5,
                      lineHeight: 1.5,
                      color: "var(--ink)",
                    }}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Example host card */}
          <div
            style={{
              background: "var(--forest-100)",
              borderRadius: 24,
              padding: 32,
              position: "sticky" as const,
              top: 96,
            }}
          >
            <Avatar letter="N" size={56} />
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontWeight: 600,
                fontSize: 22,
                letterSpacing: "-0.015em",
                marginTop: 16,
                color: "var(--ink)",
              }}
            >
              Nadine
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--color-muted)",
                marginTop: 4,
                marginBottom: 20,
              }}
            >
              Local Host · Winterhude
            </div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 19,
                lineHeight: 1.45,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              „Ich bin seit acht Jahren in Winterhude. Die Community gibt mir
              genauso viel zurück wie ich einbringe. Manchmal mehr."
            </p>
            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid rgba(14,59,46,0.12)",
                display: "flex",
                gap: 24,
                fontSize: 13,
                color: "var(--ash-600)",
              }}
            >
              <div><strong style={{ color: "var(--ink)", fontWeight: 500 }}>184</strong> Empfehlungen</div>
              <div><strong style={{ color: "var(--ink)", fontWeight: 500 }}>23</strong> Treffen</div>
              <div><strong style={{ color: "var(--ink)", fontWeight: 500 }}>312</strong> Familien</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Wir bauen das gerade auf */}
      <section className="section-pad" style={{ background: "var(--ink)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" as const }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "var(--cobalt-500)",
              fontWeight: 500,
              marginBottom: 24,
            }}
          >
            Wir suchen
          </div>
          <h2
            className="lh-h2-cta"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              margin: "0 0 20px",
              color: "var(--surface-page)",
            }}
          >
            Wir bauen das gerade auf.
            <br />
            Sei dabei.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--ash-400)",
              margin: "0 0 40px",
            }}
          >
            mapa wächst stadtteilweise, und jeder neue Stadtteil braucht
            einen Menschen, der den Anfang macht. Wenn du Lust hast,
            Local Host in deinem Stadtteil zu werden, meld dich einfach.
            Kein Formular, kein Auswahlverfahren. Eine kurze Mail reicht.
          </p>
          <a
            href="mailto:hosts@mapa.hamburg?subject=Local Host werden"
            className="cta-page-btn"
            style={{
              background: "var(--cobalt-500)",
              color: "#FBF8F2",
              textDecoration: "none",
              padding: "16px 32px",
              borderRadius: 999,
              fontFamily: "var(--font-ui)",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            hosts@mapa.hamburg schreiben
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
