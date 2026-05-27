export function PullQuote() {
  return (
    <section className="section-pad-tall" style={{ background: "var(--surface-page-deep)" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
        <div
          className="fs-pq"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          „Frag mal auf mapa."
        </div>
        <p
          style={{
            fontSize: 16,
            color: "var(--fg-muted)",
            lineHeight: 1.55,
            maxWidth: 560,
            margin: "32px auto 0",
          }}
        >
          Wenn das ein Satz wird, den man in Hamburg hört — am Spielplatz, im
          Café, beim Elternabend — sind wir am Ziel.
        </p>
      </div>
    </section>
  );
}
