const ITEMS = [
  {
    eyebrow: "Empfehlungen",
    title: "Empfehlungen von Eltern aus deiner Nähe.",
    body: "Die besten Eisdielen, familienfreundliche Cafés, Spielplätze, Kurse und Orte in Hamburg. Ehrlich empfohlen von anderen Familien.",
    bg: "var(--mapa-ivory)",
    pillBg: "var(--mapa-sage-100)",
    pillFg: "var(--olive-700)",
  },
  {
    eyebrow: "Veranstaltungen",
    title: "Events für Familien.",
    body: "Kinderkonzerte, Flohmärkte, Workshops, Wochenendtipps und lokale Events in deiner Umgebung.",
    bg: "var(--mapa-peach-100)",
    pillBg: "var(--mapa-paper)",
    pillFg: "var(--mapa-clay-600)",
  },
  {
    eyebrow: "Austausch",
    title: "Reden, ohne Social Media Stress.",
    body: "Fragen stellen, Erfahrungen teilen und unkompliziert mit anderen Eltern in Kontakt kommen.",
    bg: "var(--mapa-ivory)",
    pillBg: "var(--mapa-peach-100)",
    pillFg: "var(--mapa-clay-600)",
  },
  {
    eyebrow: "Treffen & Community",
    title: "Echte Familien aus deinem Stadtteil.",
    body: "Lerne Familien aus deinem Stadtteil kennen, verabrede dich spontan und entdecke lokale Gruppen und Treffen.",
    bg: "var(--mapa-sage-100)",
    pillBg: "var(--mapa-paper)",
    pillFg: "var(--olive-700)",
  },
  {
    eyebrow: "Lokale Tipps",
    title: "Vom Yoga mit Baby bis Coworking mit Kindern.",
    body: "Praktische Empfehlungen für den Familienalltag in Hamburg, kuratiert von echten Eltern.",
    bg: "var(--mapa-ivory)",
    pillBg: "var(--mapa-mist)",
    pillFg: "var(--mapa-ink-2)",
  },
  {
    eyebrow: "Eine ruhige Community",
    title: "Kein Algorithmus. Kein Lärm.",
    body: "Keine lauten Feeds, kein endloses Scrollen. Sondern ein angenehmer Ort für ehrlichen Austausch.",
    bg: "var(--mapa-ink)",
    color: "var(--mapa-paper)",
    bodyColor: "rgba(255, 253, 248, 0.78)",
    pillBg: "var(--mapa-peach-300)",
    pillFg: "var(--mapa-paper)",
  },
];

export function WhatYouFind() {
  return (
    <section style={{ background: "var(--mapa-paper)", padding: "96px 48px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ maxWidth: 760 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--olive-700)",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
            }}
          >
            Was du auf mapa findest
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 62,
              lineHeight: 1.0,
              letterSpacing: "-0.015em",
              margin: "16px 0 0",
            }}
          >
            Alles, was lokales
            <br />
            Familienleben einfacher macht.
          </h2>
        </div>

        <div
          style={{
            marginTop: 64,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.eyebrow}
              style={{
                background: item.bg,
                borderRadius: 24,
                padding: 32,
                border:
                  item.bg === "var(--mapa-ink)"
                    ? "none"
                    : "1px solid var(--border)",
                color: item.color ?? "var(--fg)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                minHeight: 260,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  alignSelf: "flex-start",
                  background: item.pillBg,
                  color: item.pillFg,
                  padding: "5px 12px",
                  borderRadius: 999,
                  fontSize: 11.5,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {item.eyebrow}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 30,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: item.bodyColor ?? "var(--fg-muted)",
                  margin: 0,
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
