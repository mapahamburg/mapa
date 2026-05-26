import { Logo } from "@/components/ui/Logo";

export function Nav() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(241, 236, 226, 0.90)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid var(--border-soft)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "18px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo size={22} lockup />
        </a>

        <nav
          style={{
            display: "flex",
            gap: 36,
            fontFamily: "var(--font-ui)",
            fontSize: 14.5,
          }}
        >
          {[
            { label: "Feed", href: "/feed" },
            { label: "So funktioniert’s", href: "/so-funktionierts" },
            { label: "Local Hosts", href: "/local-hosts" },
            { label: "Über uns", href: "#" },
          ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  color: "var(--fg)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </a>
          ))}
        </nav>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <a
            href="/login"
            style={{
              background: "transparent",
              border: "none",
              padding: "8px",
              fontFamily: "var(--font-ui)",
              fontSize: 14.5,
              color: "var(--fg)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Einloggen
          </a>
          <a
            href="/signup"
            style={{
              background: "var(--cobalt-500)",
              color: "var(--mapa-paper)",
              textDecoration: "none",
              padding: "10px 18px",
              borderRadius: 999,
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            mapa beitreten
          </a>
        </div>
      </div>
    </header>
  );
}
