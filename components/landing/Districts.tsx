const STADTTEILE = [
  "Eppendorf", "Winterhude", "Ottensen", "Eimsbüttel",
  "Sternschanze", "Altona", "Hoheluft", "St. Pauli",
  "HafenCity", "Uhlenhorst", "Barmbek", "Innenstadt",
];

export function Districts() {
  return (
    <section style={{ background: "var(--mapa-cream)", padding: "96px 48px" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 80,
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--mapa-sage-700)",
              fontWeight: 600,
            }}
          >
            Hamburg, lokal
          </div>
          <h2
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 62,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              margin: "16px 0 0",
              fontWeight: 600,
            }}
          >
            Dein Stadtteil{" "}
            <span>ist dabei.</span>
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--fg-muted)",
              marginTop: 24,
              maxWidth: 440,
            }}
          >
            mapa startet mit allen Hamburger Stadtteilen. Dein Feed zeigt aber,
            was wirklich in deiner Nähe los ist. Filtern, switchen, vergleichen:
            jederzeit.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {STADTTEILE.map((d, i) => (
            <div
              key={d}
              style={{
                background:
                  i % 4 === 0 ? "var(--mapa-sage-100)" : "var(--mapa-ivory)",
                color:
                  i % 4 === 0 ? "var(--mapa-sage-700)" : "var(--fg)",
                border:
                  "1px solid " +
                  (i % 4 === 0 ? "var(--mapa-sage-200)" : "var(--border)"),
                padding: "14px 22px",
                borderRadius: 999,
                fontFamily: "var(--font-ui)",
                fontSize: 22,
                letterSpacing: "-0.02em",
                fontWeight: 600,
              }}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
