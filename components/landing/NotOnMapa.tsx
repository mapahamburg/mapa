const ITEMS = [
  "Kein Algorithmus.",
  "Keine Likes.",
  "Keine Werbung.",
  "Kein globaler Lärm.",
] as const;

export function NotOnMapa() {
  return (
    <section
      className="section-pad"
      style={{ background: "var(--ink)", color: "var(--mapa-cream)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(245,241,232,0.38)",
            fontWeight: 500,
            fontFamily: "var(--font-mono)",
            marginBottom: 52,
          }}
        >
          Was mapa nicht ist
        </div>

        <div className="manifesto-list">
          {ITEMS.map((item, i) => (
            <div
              key={item}
              className="manifesto-item"
              style={{
                fontWeight: 800,
                color: "var(--mapa-cream)",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                paddingTop: i === 0 ? 0 : 28,
                marginTop: i === 0 ? 0 : 28,
                borderTop:
                  i === 0 ? "none" : "1px solid rgba(245,241,232,0.1)",
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <p
          style={{
            marginTop: 56,
            fontSize: 15,
            lineHeight: 1.65,
            color: "rgba(245,241,232,0.45)",
            maxWidth: 440,
          }}
        >
          Wir bauen bewusst Dinge nicht ein — damit mapa auch in drei Jahren
          noch ein Ort ist, an den man gerne zurückkehrt.
        </p>
      </div>
    </section>
  );
}
