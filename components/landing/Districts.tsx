const STADTTEILE = [
  "Eppendorf", "Winterhude", "Ottensen", "Eimsbüttel",
  "Sternschanze", "Altona", "Hoheluft", "St. Pauli",
  "HafenCity", "Uhlenhorst", "Barmbek", "Innenstadt",
];

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
              fontWeight: 700,
              letterSpacing: "-0.035em",
              margin: "16px 0 0",
            }}
          >
            Dein Stadtteil{" "}
            <span>ist dabei.</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {STADTTEILE.map((d, i) => (
            <div
              key={d}
              className="district-chip"
              style={{
                background:
                  i % 4 === 0 ? "var(--color-ink)" : "var(--surface-card)",
                color:
                  i % 4 === 0 ? "var(--color-cream)" : "var(--fg)",
                border:
                  "1px solid " +
                  (i % 4 === 0 ? "transparent" : "var(--border)"),
                borderRadius: 999,
                fontFamily: "var(--font-ui)",
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
