export function PullQuote() {
  return (
    <section
      className="section-pad-tall"
      style={{ background: "var(--mapa-cream)" }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--cobalt-500)",
            fontWeight: 500,
            fontFamily: "var(--font-mono)",
            marginBottom: 36,
          }}
        >
          Jeden Tag auf mapa
        </div>

        <div
          className="fs-pq"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "var(--ink)",
            textWrap: "balance" as const,
          }}
        >
          „Kennt jemand ein gutes Familiencafé in Ottensen?"
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 14,
            color: "var(--fg-muted)",
            fontFamily: "var(--font-ui)",
            letterSpacing: "0.01em",
          }}
        >
          Lina · Ottensen · vor 2 Std.
        </div>

        <div
          style={{
            marginTop: 20,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--mapa-paper)",
            borderRadius: 999,
            padding: "10px 20px",
            border: "1px solid var(--border)",
            fontSize: 13.5,
            fontFamily: "var(--font-ui)",
          }}
        >
          <span style={{ color: "var(--cobalt-500)", fontWeight: 500 }}>
            12 Antworten
          </span>
          <span style={{ color: "var(--fg-muted)" }}>
            — darunter Nadine, Local Host
          </span>
        </div>
      </div>
    </section>
  );
}
