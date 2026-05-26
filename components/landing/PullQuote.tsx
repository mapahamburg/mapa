export function PullQuote() {
  return (
    <section style={{ background: "var(--surface-page-deep)", padding: "120px 48px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 72,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
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
