const STADTTEILE = [
  "Eppendorf", "Winterhude", "Ottensen", "Eimsbüttel",
  "Sternschanze", "Altona", "Hoheluft", "St. Pauli",
  "HafenCity", "Uhlenhorst", "Barmbek", "Innenstadt",
];

const ACTIVE = new Set(["Eppendorf", "Winterhude"]);

export function Districts() {
  return (
    <section className="section-pad" style={{ background: "var(--mapa-cream)" }}>
      <div className="col2-fw">
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--cobalt-500)",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
            }}
          >
            Hamburg, lokal
          </div>
          <h2
            className="fs-h2-m"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              margin: "16px 0 0",
              fontWeight: 400,
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
          {STADTTEILE.map((d) => {
            const isActive = ACTIVE.has(d);
            return (
            <div
              key={d}
              className="district-chip"
              style={{
                background:
                  isActive ? "var(--mapa-sage-500)" : "var(--surface-card)",
                color:
                  isActive ? "var(--mapa-paper)" : "var(--fg)",
                border:
                  isActive ? "none" : "1px solid var(--border)",
                borderRadius: 999,
                fontFamily: "var(--font-ui)",
                letterSpacing: "-0.02em",
                fontWeight: 600,
              }}
            >
              {d}
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
