import { Logo } from "@/components/ui/Logo";
import { createClient } from "@/lib/supabase/server";

export async function Nav() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

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
      <div className="nav-inner-pad">
        <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo size={22} lockup />
        </a>

        <nav className="nav-links">
          {[
            { label: "Feed", href: "/feed" },
            { label: "So funktioniert's", href: "/so-funktionierts" },
            { label: "Local Hosts", href: "/local-hosts" },
            { label: "Über uns", href: "/ueber-uns" },
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
          {isLoggedIn ? (
            <a
              href="/feed"
              className="nav-cta"
              style={{
                background: "var(--cobalt-500)",
                color: "var(--mapa-paper)",
                fontFamily: "var(--font-ui)",
              }}
            >
              Zum Feed
            </a>
          ) : (
            <>
              <a href="/login" className="nav-login">
                Einloggen
              </a>
              <a
                href="/signup"
                className="nav-cta"
                style={{
                  background: "var(--cobalt-500)",
                  color: "var(--mapa-paper)",
                  fontFamily: "var(--font-ui)",
                }}
              >
                Kostenlos beitreten
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
