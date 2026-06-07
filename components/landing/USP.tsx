const USP_ITEMS = [
  {
    eyebrow: "Empfehlungen",
    headline: "Echter Rat aus dem Stadtteil.",
    body: "Eisdielen, Spielplätze, Hebammen, Kinderärzte. Empfohlen von Familien, die wirklich dort wohnen.",
  },
  {
    eyebrow: "Treffen",
    headline: "Spielplatz, Café, Stadtpark.",
    body: "Spontan verabreden oder regelmäßig treffen. Kleine, echte Begegnungen im Viertel.",
  },
  {
    eyebrow: "Events",
    headline: "Was diese Woche los ist.",
    body: "Kinderflohmarkt, Familienkonzert, Workshop. Lokal, übersichtlich, ohne Werbung.",
  },
  {
    eyebrow: "Austausch",
    headline: "Fragen stellen, Erfahrungen teilen.",
    body: "Ohne Social-Media-Stress. Chronologisch, ruhig, mit echten Menschen aus deiner Nähe.",
  },
] as const;

export function USP() {
  return (
    <section className="section-pad" style={{ background: "var(--mapa-paper)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="usp-grid">
          {USP_ITEMS.map(({ eyebrow, headline, body }) => (
            <div key={eyebrow} className="usp-card">
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--cobalt-500)",
                  fontWeight: 500,
                  fontFamily: "var(--font-mono)",
                  marginBottom: 14,
                }}
              >
                {eyebrow}
              </div>
              <div
                className="usp-headline"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--ink)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  marginBottom: 12,
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
                }}
              >
                {body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
