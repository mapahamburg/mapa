const ITEMS = [
  ["Keine Likes-Wettbewerbe", "Du folgst Themen, nicht Menschen."],
  ["Keine Werbung im Feed", "Punkt."],
  ["Kein Algorithmus, der dich länger fesselt", "Chronologisch. Dein Stadtteil zuerst."],
  ["Keine Foto-Pflicht", "Profile sind reduziert. Du teilst, was du willst."],
  ["Keine globalen Diskussionen", "mapa ist Hamburg. Lokal heißt lokal."],
] as const;

export function NotOnMapa() {
  return (
    <section className="section-pad" style={{ background: "var(--mapa-paper)" }}>
      <div className="col2-text" style={{ alignItems: "flex-start" }}>
        {/* Left: headline */}
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--mapa-clay-600)",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
            }}
          >
            Was mapa nicht ist
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
            Nicht alles muss
            <br />
            <span>überall sein.</span>
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
            Wir bauen bewusst Dinge{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 500 }}>
              nicht
            </strong>{" "}
            ein. Damit mapa auch in drei Jahren noch ein Ort ist, an den man
            gerne zurückkehrt.
          </p>
        </div>

        {/* Right: list */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {ITEMS.map(([title, sub]) => (
            <div
              key={title}
              style={{
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
                padding: "16px 0",
                borderTop: "1px solid var(--border-soft)",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  flexShrink: 0,
                  background: "var(--mapa-peach-100)",
                  color: "var(--mapa-clay-600)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                ·
              </div>
              <div>
                <div
                  className="notonmapa-item"
                  style={{
                    fontFamily: "var(--font-ui)",
                    letterSpacing: "-0.02em",
                    fontWeight: 600,
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "var(--fg-muted)",
                    marginTop: 4,
                  }}
                >
                  {sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
