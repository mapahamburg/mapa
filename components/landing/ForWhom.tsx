const POINTS = [
  "lokale Empfehlungen suchen",
  "andere Familien kennenlernen möchten",
  "Veranstaltungen entdecken wollen",
  "ehrlichen Austausch schätzen",
  "genug von Facebook-Gruppen und WhatsApp-Chaos haben",
];

export function ForWhom() {
  return (
    <section style={{ background: "var(--mapa-cream)", padding: "96px 48px" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 96,
        }}
      >
        {/* Left: list */}
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--olive-700)",
              fontWeight: 600,
            }}
          >
            Für wen mapa ist
          </div>
          <h2
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 58,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              margin: "16px 0 32px",
              fontWeight: 600,
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
                    background: "var(--clay-v2-500)",
                    marginTop: 11,
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 26,
                    lineHeight: 1.3,
                    letterSpacing: "-0.02em",
                    fontWeight: 600,
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
          style={{
            background: "var(--sage-v2-100)",
            border: "1px solid var(--sage-v2-200)",
            borderRadius: 28,
            padding: 48,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--olive-700)",
              fontWeight: 600,
            }}
          >
            Unsere Vision
          </div>
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 46,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginTop: 16,
              color: "var(--olive-700)",
              fontWeight: 600,
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
              color: "var(--olive-700)",
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
