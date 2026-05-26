export function PullQuote() {
  return (
    <section style={{ background: "var(--mapa-cream)", padding: "120px 48px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: 600,
            fontSize: 72,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          „Frag mal auf MAPA."
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
