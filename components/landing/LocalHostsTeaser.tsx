export function LocalHostsTeaser() {
  return (
    <section className="section-pad" style={{ background: "var(--surface-page-deep)" }}>
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
            margin: "0 0 24px",
            color: "var(--ink)",
          }}
        >
          Ein Mensch pro Stadtteil.
          <br />
          Echt, nicht algorithmisch.
        </h2>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.55,
            color: "var(--ash-v2-600)",
            maxWidth: 520,
            margin: "0 0 32px",
          }}
        >
          Nadine kennt Winterhude. Kemal kennt Ottensen. Jeder Stadtteil hat
          einen Local Host — eine echte Person, die Tipps kuratiert und neue
          Familien willkommen heißt.
        </p>
        <a
          href="/so-funktionierts#local-hosts"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "var(--cobalt-500)",
            fontFamily: "var(--font-ui)",
            fontSize: 15,
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Mehr über Local Hosts{" "}
          <span style={{ fontSize: 16, letterSpacing: "-0.01em" }}>→</span>
        </a>
      </div>
    </section>
  );
}
