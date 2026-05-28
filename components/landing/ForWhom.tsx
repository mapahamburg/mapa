const POINTS = [
  "lokale Empfehlungen suchen",
  "andere Familien kennenlernen möchten",
  "Veranstaltungen entdecken wollen",
  "ehrlichen Austausch schätzen",
  "genug von Facebook-Gruppen und WhatsApp-Chaos haben",
];

export function ForWhom() {
  return (
    <section className="section-pad" style={{ background: "var(--mapa-paper)" }}>
      <div className="col2-text">
        {/* Left: list */}
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--cobalt-500)",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
            }}
          >
            Für wen mapa ist
          </div>
          <h2
            className="fs-h2-m"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              margin: "16px 0 32px",
            }}
          >
            Für Eltern in Hamburg,
            <br />
            die&hellip;
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {POINTS.map((point) => (
              <div
                key={point}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  padding: "14px 0",
                  borderTop: "1px solid var(--border-soft)",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "var(--cobalt-500)",
                    marginTop: 11,
                    flexShrink: 0,
                  }}
                />
                <div
                  className="for-whom-item"
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontWeight: 400,
                    color: "var(--fg)",
                  }}
                >
                  &hellip; {point}.
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: vision card */}
        <div
          className="vision-pad"
          style={{
            background: "var(--color-sunk)",
            border: "1px solid var(--color-line)",
            borderRadius: 28,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--cobalt-500)",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
            }}
          >
            Unsere Vision
          </div>
          <div
            className="fs-vision"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              marginTop: 16,
              color: "var(--color-ink)",
            }}
          >
            Familien brauchen wieder
            <br />
            mehr lokale Verbindung.
          </div>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--color-muted)",
              marginTop: 24,
              maxWidth: 440,
            }}
          >
            mapa bringt Eltern in Hamburg zusammen — digital, lokal und
            unkompliziert. Kein lautes Social Network. Sondern ein moderner Ort
            für Familien, der sich wie Nachbarschaft anfühlt.
          </p>
        </div>
      </div>
    </section>
  );
}
