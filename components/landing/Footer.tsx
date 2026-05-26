import { Logo } from "@/components/ui/Logo";

const LINKS = [
  [
    "Produkt",
    [
      { label: "So funktioniert's", href: "/so-funktionierts" },
      { label: "Viertel", href: "#" },
      { label: "Local Hosts", href: "#" },
      { label: "App laden", href: "#" },
    ],
  ],
  [
    "Unternehmen",
    [
      { label: "Über uns", href: "#" },
      { label: "Karriere", href: "#" },
      { label: "Presse", href: "#" },
      { label: "Kontakt", href: "mailto:hallo@mapa.hamburg" },
    ],
  ],
  [
    "Rechtliches",
    [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "Hausregeln", href: "/hausregeln" },
      { label: "Cookies", href: "/datenschutz#cookies" },
    ],
  ],
] as const;

export function Footer() {
  return (
    <footer style={{ background: "var(--mapa-paper)", padding: "0 48px 56px" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "40px 0 0",
          borderTop: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
        }}
      >
        {/* Brand */}
        <div>
          <Logo size={18} />
          <p
            style={{
              fontSize: 13,
              color: "var(--fg-muted)",
              marginTop: 14,
              lineHeight: 1.55,
              maxWidth: 280,
            }}
          >
            Die lokale Community für Mamas und Papas in Hamburg.
            <br />
            Aus Hamburg, für Hamburg.
          </p>
        </div>

        {/* Link columns */}
        {LINKS.map(([title, items]) => (
          <div key={title}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
                fontWeight: 600,
                marginBottom: 14,
              }}
            >
              {title}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    color: "var(--fg)",
                    textDecoration: "none",
                    fontSize: 14,
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div
        style={{
          maxWidth: 1280,
          margin: "40px auto 0",
          paddingTop: 24,
          borderTop: "1px solid var(--border-soft)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "var(--fg-muted)",
        }}
      >
        <span>© mapa.hamburg · 2026</span>
        <span>Made in Hamburg.</span>
      </div>
    </footer>
  );
}
