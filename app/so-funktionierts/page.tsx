import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Tag } from "@/components/ui/Tag";

const POST_TYPES = [
  {
    type: "empfehlung" as const,
    headline: "Empfehlung",
    desc: "Du kennst ein gutes Familiencafé, eine tolle Hebamme oder den besten Spielplatz im Stadtteil. Teile es mit deinen Nachbarinnen.",
    example: `„DeliKate direkt am Hayns Park. Kinder willkommen, Kuchen hausgemacht."`,
  },
  {
    type: "frage" as const,
    headline: "Frage",
    desc: "Du suchst Rat, eine Meinung oder einfach jemanden der eine Antwort kennt. Ohne Google, mit echten Menschen aus deinem Stadtteil.",
    example: `„Kennt jemand einen guten Kinderarzt in Winterhude, der noch Patienten annimmt?"`,
  },
  {
    type: "treffen" as const,
    headline: "Treffen",
    desc: "Spielplatztreffen, Spaziergang, Kaffee zu zweit. Kleine, echte Begegnungen. mapa macht den ersten Schritt leichter.",
    example: `„Spielplatztreffen Sa 10:30 im Stadtpark. Wer kommt mit? 2–4 Jahre."`,
  },
  {
    type: "suche" as const,
    headline: "Suche",
    desc: "Du suchst etwas Konkretes — einen Kitaplatz, eine Babytrage, eine Fahrgemeinschaft. Direkt und unkompliziert.",
    example: `„Suche gebrauchten Buggy, gerne Babyzen oder Ähnliches."`,
  },
  {
    type: "veranstaltung" as const,
    headline: "Veranstaltung",
    desc: "Kinderflohmarkt, Lesung, Workshop. Veranstaltungen für Familien im Stadtteil — übersichtlich und lokal.",
    example: `„Familienflohmarkt in der Rindermarkthalle. Sa 9–14 Uhr, Eintritt frei."`,
  },
] as const;

export default function SoFunktionierts() {
  return (
    <div style={{ background: "var(--mapa-cream)", minHeight: "100dvh" }}>
      <Nav />

      {/* Intro */}
      <section className="section-pad">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--cobalt-500)",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
              marginBottom: 24,
            }}
          >
            So funktioniert mapa
          </div>
          <h1
            className="fs-h2"
            style={{
              fontWeight: 700,
              letterSpacing: "-0.035em",
              margin: 0,
            }}
          >
            Kein Algorithmus.
            <br />
            Kein Lärm.
            <br />
            Nur dein Stadtteil.
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--fg-muted)",
              marginTop: 28,
              maxWidth: 600,
            }}
          >
            mapa ist ein digitaler Nachbarschaftsplatz für Familien in Hamburg.
            Chronologisch, stadtteilgefiltert, moderiert von echten Menschen.
            Den Local Hosts.
          </p>
        </div>
      </section>

      {/* Für wen mapa ist */}
      <section className="section-pad">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--cobalt-500)",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
              marginBottom: 20,
            }}
          >
            Für wen
          </div>
          <h2
            style={{
              fontWeight: 700,
              fontSize: 36,
              letterSpacing: "-0.035em",
              margin: "0 0 32px",
              lineHeight: 1.15,
            }}
          >
            Für Eltern in Hamburg, die&hellip;
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              "lokale Empfehlungen suchen",
              "andere Familien kennenlernen möchten",
              "Veranstaltungen entdecken wollen",
              "ehrlichen Austausch schätzen",
              "genug von Facebook-Gruppen und WhatsApp-Chaos haben",
            ].map((point) => (
              <div
                key={point}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  padding: "14px 0",
                  borderTop: "1px solid var(--border-soft)",
                  fontSize: 17,
                  lineHeight: 1.45,
                  color: "var(--fg)",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    background: "var(--cobalt-500)",
                    marginTop: 10,
                    flexShrink: 0,
                  }}
                />
                &hellip; {point}.
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Der Feed */}
      <section className="section-pad" style={{ background: "var(--mapa-paper)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--cobalt-500)",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
              marginBottom: 20,
            }}
          >
            Der Feed
          </div>
          <h2
            style={{
              fontWeight: 700,
              fontSize: 36,
              letterSpacing: "-0.035em",
              margin: "0 0 20px",
              lineHeight: 1.15,
            }}
          >
            Was du siehst, bestimmst du.
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--fg-muted)",
              margin: 0,
              maxWidth: 580,
            }}
          >
            Der Feed zeigt Beiträge aus deinem Stadtteil — chronologisch, ohne
            Ranking, ohne bezahlte Platzierungen. Du wählst welche Stadtteile du
            siehst. Heute, diese Woche, alles: du behältst den Überblick.
          </p>

          <div
            style={{
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {[
              { label: "Chronologisch", desc: "Neueste Beiträge zuerst. Kein Algorithmus entscheidet für dich." },
              { label: "Stadtteil-Filter", desc: "Zeig nur Eppendorf, nur Winterhude — oder alles auf einmal." },
              { label: "Keine Werbung", desc: "Kein einziger bezahlter Beitrag. Nie." },
              { label: "Kein Follower-Zähler", desc: "Keine öffentlichen Likes, keine Reichweiten-Anzeige." },
            ].map(({ label, desc }) => (
              <div
                key={label}
                style={{
                  background: "var(--mapa-cream)",
                  borderRadius: 16,
                  padding: "20px 22px",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>
                  {label}
                </div>
                <div style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.55 }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Die 5 Post-Typen */}
      <section className="section-pad">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--cobalt-500)",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
              marginBottom: 20,
            }}
          >
            Die fünf Beitragstypen
          </div>
          <h2
            style={{
              fontWeight: 700,
              fontSize: 36,
              letterSpacing: "-0.035em",
              margin: "0 0 48px",
              lineHeight: 1.15,
            }}
          >
            Was du teilen kannst.
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {POST_TYPES.map(({ type, headline, desc, example }) => (
              <div
                key={type}
                style={{
                  background: "var(--mapa-paper)",
                  borderRadius: 20,
                  padding: "24px 28px",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <Tag type={type} size="m" />
                </div>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--fg-muted)",
                    margin: "0 0 14px",
                  }}
                >
                  {desc}
                </p>
                <div
                  style={{
                    background: "var(--mapa-cream)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    fontSize: 13.5,
                    color: "var(--fg)",
                    fontWeight: 500,
                    borderLeft: "3px solid var(--border)",
                  }}
                >
                  {example}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Hosts */}
      <section className="section-pad" style={{ background: "var(--surface-page-deep)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--cobalt-500)",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
              marginBottom: 20,
            }}
          >
            Local Hosts
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 36,
              letterSpacing: "-0.015em",
              color: "var(--ink)",
              margin: "0 0 20px",
              lineHeight: 1.15,
            }}
          >
            Ein Mensch pro Stadtteil.
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--ash-v2-600)",
              margin: "0 0 32px",
              maxWidth: 580,
            }}
          >
            Jeder Stadtteil hat einen Local Host — eine echte Person aus dem
            Stadtteil, die mapa lebendig hält. Sie begrüßen neue Mitglieder,
            kuratieren Tipps und halten den Ton warm. Ehrenamtlich, mit Herzblut.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[
              "Sie begrüßen jedes neue Mitglied persönlich.",
              "Sie moderieren ruhig, bevor Diskussionen kippen.",
              "Sie kennen den Stadtteil besser als jeder Algorithmus.",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  fontSize: 15,
                  color: "var(--ink)",
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: "var(--cobalt-500)",
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wie mapa wächst */}
      <section style={{ padding: "80px 48px", background: "var(--mapa-paper)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--cobalt-500)",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
              marginBottom: 20,
            }}
          >
            Wie mapa wächst
          </div>
          <h2
            style={{
              fontWeight: 700,
              fontSize: 36,
              letterSpacing: "-0.035em",
              margin: "0 0 48px",
              lineHeight: 1.15,
            }}
          >
            Langsam, lokal, von echten Familien getragen.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { n: "01", title: "Die ersten Familien zusammenbringen", tag: "Heute", active: true },
              { n: "02", title: "Die Community lebendig machen", tag: "In Arbeit", active: true },
              { n: "03", title: "Stadtteile stärken", tag: "Sommer 2026", active: false },
              { n: "04", title: "Local Hosts", tag: "Herbst 2026", active: false },
              { n: "05", title: "Ganz Hamburg", tag: "2027", active: false },
              { n: "06", title: "Die App — für alle.", tag: "Nach dem Rollout", active: false, vision: true },
            ].map(({ n, title, tag, active, vision }) => (
              <div
                key={n}
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  padding: "20px 0",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 999,
                    flexShrink: 0,
                    background: active ? "var(--cobalt-500)" : vision ? "var(--cobalt-50)" : "var(--mapa-cream)",
                    border: active ? "none" : vision ? "2px dashed var(--cobalt-500)" : "2px solid var(--border)",
                    color: active ? "#fff" : "var(--fg-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-ui)",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {n}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontWeight: 600,
                      fontSize: 16,
                      color: vision ? "var(--cobalt-500)" : "var(--fg)",
                      lineHeight: 1.3,
                    }}
                  >
                    {title}
                  </div>
                </div>
                <div
                  style={{
                    background: active || vision ? "var(--cobalt-50)" : "var(--mapa-cream)",
                    color: active || vision ? "var(--cobalt-700)" : "var(--fg-muted)",
                    border: active || vision ? "none" : "1px solid var(--border)",
                    padding: "5px 12px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                    whiteSpace: "nowrap" as const,
                    flexShrink: 0,
                  }}
                >
                  {tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mitmachen CTA */}
      <section className="section-pad">
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontWeight: 700,
              fontSize: 44,
              letterSpacing: "-0.04em",
              margin: "0 0 20px",
              lineHeight: 1.1,
            }}
          >
            Bereit für deinen Stadtteil?
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--fg-muted)",
              marginBottom: 36,
              lineHeight: 1.6,
            }}
          >
            mapa ist kostenlos, werbefrei und aktuell im Beta-Aufbau in Hamburg.
          </p>
          <a
            href="/signup"
            style={{
              display: "inline-block",
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
