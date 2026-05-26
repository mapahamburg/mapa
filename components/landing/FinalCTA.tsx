export function FinalCTA() {
  return (
    <section style={{ background: "var(--mapa-paper)", padding: "0 48px 96px" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          background: "var(--color-cobalt)",
          borderRadius: 36,
          padding: "80px 64px",
          color: "var(--mapa-paper)",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 70,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              margin: 0,
              fontWeight: 600,
              color: "var(--mapa-paper)",
            }}
          >
            Schau mal rein.
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: "rgba(255,253,248,0.85)",
              marginTop: 20,
              maxWidth: 460,
            }}
          >
            Die ersten Mitglieder sind dabei. Kostenlos. Schau einfach mal
            rein.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            type="button"
            style={{
              background: "var(--mapa-paper)",
              color: "var(--color-cobalt)",
              border: "none",
              padding: "18px 28px",
              borderRadius: 999,
              fontFamily: "var(--font-ui)",
              fontSize: 17,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            mapa.hamburg öffnen →
          </button>
          <button
            type="button"
            style={{
              background: "transparent",
              color: "var(--mapa-paper)",
              border: "1px solid rgba(255,253,248,0.4)",
              padding: "17px 28px",
              borderRadius: 999,
              fontFamily: "var(--font-ui)",
              fontSize: 17,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            App für iOS · Beta
          </button>
        </div>
      </div>
    </section>
  );
}
