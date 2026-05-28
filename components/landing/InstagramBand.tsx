"use client";

export function InstagramBand() {
  return (
    <div
      style={{
        background: "var(--mapa-paper)",
        borderTop: "1px solid var(--border-soft)",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--fg-muted)",
          margin: "0 0 10px",
        }}
      >
        Instagram
      </p>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 22,
          fontWeight: 400,
          letterSpacing: "-0.01em",
          color: "var(--ink)",
          margin: "0 0 8px",
          lineHeight: 1.25,
        }}
      >
        Familienleben in Hamburg.
      </p>
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          fontWeight: 400,
          color: "var(--fg-muted)",
          margin: "0 0 20px",
          lineHeight: 1.5,
        }}
      >
        Ruhiger. Lokaler. Menschlicher.
      </p>
      <a
        href="https://instagram.com/mapahamburg"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          fontWeight: 500,
          color: "var(--ink)",
          textDecoration: "none",
          border: "1px solid var(--border)",
          borderRadius: 999,
          padding: "11px 20px",
          background: "var(--surface-card)",
          transition: "border-color 160ms ease, background 160ms ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--ink)";
          (e.currentTarget as HTMLAnchorElement).style.background = "var(--mapa-cream)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLAnchorElement).style.background = "var(--surface-card)";
        }}
      >
        @mapahamburg folgen
      </a>
    </div>
  );
}
