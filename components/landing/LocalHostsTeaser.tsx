import Link from "next/link";

export function LocalHostsTeaser() {
  return (
    <section
      className="section-pad"
      style={{ background: "var(--surface-page-deep)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--cobalt-500)",
            fontWeight: 500,
            fontFamily: "var(--font-mono)",
            marginBottom: 20,
          }}
        >
          Local Hosts
        </div>

        <h2
          className="fs-h2-m"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            margin: "0 0 20px",
          }}
        >
          Ein Mensch pro Stadtteil.
        </h2>

        <p
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--fg-muted)",
            maxWidth: 520,
            margin: "0 0 32px",
          }}
        >
          Jeder Stadtteil hat einen Local Host — eine echte Person aus der
          Nachbarschaft, die mapa lebendig hält. Ehrenamtlich, mit Herzblut.
        </p>

        <Link
          href="/so-funktionierts#local-hosts"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "var(--font-ui)",
            color: "var(--cobalt-500)",
            textDecoration: "none",
          }}
        >
          Mehr über Local Hosts &rarr;
        </Link>
      </div>
    </section>
  );
}
