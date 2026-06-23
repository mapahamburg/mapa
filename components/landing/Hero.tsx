import { Logo } from "@/components/ui/Logo";
import { MobileHeroPreview } from "@/components/landing/MobileHeroPreview";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";

function HeroVisual() {
  return (
    <div style={{ position: "relative", height: 620 }}>
      {/* Warm clay gradient tile */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 24,
          width: "85%",
          height: 540,
          borderRadius: 32,
          background: "var(--cobalt-500)",
        }}
      />

      {/* Small sage tile */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: 200,
          height: 200,
          borderRadius: 24,
          background: "var(--ink)",
        }}
      />

      {/* Phone mock */}
      <div
        style={{
          position: "absolute",
          left: "14%",
          top: 70,
          width: 260,
          height: 540,
          background: "var(--mapa-paper)",
          borderRadius: 36,
          boxShadow:
            "0 30px 60px -20px rgba(60,48,28,0.35), 0 0 0 8px var(--mapa-ink-2)",
          padding: "36px 14px 20px",
          overflow: "hidden",
        }}
      >
        <Logo size={16} />
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: 600,
            fontSize: 22,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginTop: 14,
          }}
        >
          Hallo Lina.
        </div>
        <div style={{ fontSize: 11, color: "var(--fg-muted)", marginTop: 2 }}>
          Heute neu in deinem Stadtteil.
        </div>

        <div style={{ display: "flex", gap: 5, marginTop: 14 }}>
          {[
            { label: "Alle", active: true },
            { label: "Eppendorf", active: false },
            { label: "Winterhude", active: false },
          ].map(({ label, active }) => (
            <span
              key={label}
              style={{
                background: active ? "var(--surface-ink)" : "var(--surface-card)",
                color: active ? "var(--surface-page)" : "var(--ink)",
                padding: "4px 10px",
                borderRadius: 999,
                fontSize: 10,
                fontWeight: active ? 500 : 400,
                border: active ? "none" : "1px solid var(--ash-v2-200)",
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Local Host callout */}
        <div
          style={{
            marginTop: 14,
            background: "var(--color-sunk)",
            borderRadius: 14,
            padding: 12,
            border: "1px solid var(--color-line)",
          }}
        >
          <div
            style={{
              fontSize: 9,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-cobalt)",
              fontWeight: 600,
            }}
          >
            Local Host
          </div>
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              fontSize: 13,
              lineHeight: 1.25,
              color: "var(--color-ink)",
              marginTop: 4,
            }}
          >
            Nadine sammelt Tipps für regnerische Tage.
          </div>
        </div>

        {/* Post card — neue Hierarchie: Titel zuerst */}
        <div
          style={{
            marginTop: 10,
            background: "var(--mapa-ivory)",
            borderRadius: 12,
            padding: "10px 12px",
            border: "1px solid var(--border)",
          }}
        >
          {/* ROW 1 — Titel dominant */}
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              fontSize: 12.5,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              color: "var(--color-ink)",
              marginBottom: 5,
            }}
          >
            DeliKate · direkt am Hayns Park.
          </div>
          {/* ROW 2 — Meta + Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--ash-100)", flexShrink: 0 }} />
            <span style={{ fontSize: 9, color: "var(--fg-muted)", flex: 1 }}>Eppendorf · vor 2 Std</span>
            <Tag type="empfehlung" size="s" />
          </div>
        </div>
      </div>

      {/* Floating card: treffen post */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 320,
          width: 280,
          background: "var(--mapa-paper)",
          borderRadius: 20,
          padding: 18,
          border: "1px solid var(--border)",
          boxShadow: "0 16px 40px -16px rgba(60,48,28,0.25)",
        }}
      >
        {/* Treffen-Card: Titel zuerst, dann Autor-Kontext */}
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            fontSize: 17,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "var(--color-ink)",
            marginBottom: 10,
          }}
        >
          Spielplatztreffen am Samstag. Wer kommt mit?
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <Avatar letter="M" size={22} />
          <span style={{ fontSize: 11, color: "var(--fg-muted)", flex: 1 }}>Mira · Winterhude · vor 4 Std</span>
          <Tag type="treffen" size="s" />
        </div>
        <div
          style={{
            marginTop: 12,
            background: "var(--mapa-cream)",
            borderRadius: 10,
            padding: "8px 10px",
            fontSize: 11.5,
            color: "var(--fg-muted)",
          }}
        >
          Stadtpark · Sa 10:30 · 2–4 Jahre
        </div>
      </div>

      {/* Floating card: avatar group */}
      <div
        style={{
          position: "absolute",
          right: 32,
          bottom: 36,
          background: "var(--mapa-paper)",
          borderRadius: 18,
          padding: "14px 18px",
          border: "1px solid var(--border)",
          boxShadow: "0 16px 40px -16px rgba(60,48,28,0.25)",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div style={{ display: "flex" }}>
          {(["S", "T", "N"] as const).map((l, i) => (
            <div key={l} style={{ marginLeft: i === 0 ? 0 : -8 }}>
              <div
                style={{
                  border: "2px solid var(--mapa-paper)",
                  borderRadius: 999,
                  display: "inline-block",
                }}
              >
                <Avatar letter={l} size={28} />
              </div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 500 }}>+12 dabei</div>
          <div style={{ fontSize: 11, color: "var(--fg-muted)" }}>
            Café-Tour Eppendorf
          </div>
        </div>
      </div>
    </div>
  );
}

export async function Hero() {
  const avatarLetters = ["L", "M", "S", "J", "N"] as const;
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return (
    <section className="hero-section" style={{ background: "var(--mapa-cream)" }}>
      <div className="hero-grid">
        {/* Left: copy */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 13px 6px 11px",
              borderRadius: 999,
              background: "var(--cobalt-50)",
              border: "1px solid var(--cobalt-100)",
              marginBottom: 24,
            }}
          >
            <span
              className="pulse-dot"
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "var(--cobalt-500)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 11.5,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--cobalt-700)",
                fontWeight: 600,
                fontFamily: "var(--font-mono)",
              }}
            >
              Aufbau-Phase · Winterhude &amp; Eppendorf
            </span>
          </div>

          <h1
            className="fs-hero"
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "var(--fg)",
            }}
          >
            Die lokale Community für Familien in Hamburg.
          </h1>

          <p
            className="hero-lede"
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 400,
              lineHeight: 1.6,
              letterSpacing: 0,
              color: "var(--ash-v2-600)",
              marginTop: 20,
            }}
          >
            Empfehlungen, Treffen und ehrliche Antworten aus deinem Stadtteil.
          </p>

          {/* Beta-Kontext — 1 Satz, klar */}
          <div
            style={{
              marginTop: 20,
              padding: "11px 15px",
              background: "var(--cobalt-50)",
              border: "1px solid var(--cobalt-100)",
              borderRadius: 12,
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              color: "var(--cobalt-700)",
              lineHeight: 1.45,
            }}
          >
            Wir starten gerade in Winterhude und Eppendorf. Die ersten Familien prägen, wie sich der Stadtteil hier anfühlt.
          </div>

          <div className="hero-btns">
            <a
              href={isLoggedIn ? "/feed" : "/signup"}
              style={{
                background: "var(--cobalt-500)",
                color: "var(--mapa-paper)",
                textDecoration: "none",
                padding: "16px 28px",
                borderRadius: 999,
                fontFamily: "var(--font-ui)",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {isLoggedIn ? "Zum Feed" : "Kostenlos beitreten"}
            </a>
          </div>

          {/* Nach Sign-up — Unsicherheit beseitigen */}
          {!isLoggedIn && (
            <p style={{
              marginTop: 10,
              fontFamily: "var(--font-ui)",
              fontSize: 12,
              color: "var(--fg-subtle)",
              lineHeight: 1.4,
            }}>
              Sofortiger Zugang. Keine App nötig. Läuft im Browser.
            </p>
          )}

          {/* Avatar stack + social proof */}
          <div
            className="hero-social"
            style={{
              marginTop: 28,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ display: "flex" }}>
              {avatarLetters.map((l, i) => (
                <div key={l} style={{ marginLeft: i === 0 ? 0 : -10 }}>
                  <div
                    style={{
                      border: "2.5px solid var(--surface-page)",
                      borderRadius: 999,
                      display: "inline-block",
                    }}
                  >
                    <Avatar letter={l} size={32} />
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--fg-muted)",
                lineHeight: 1.45,
              }}
            >
              <strong style={{ color: "var(--fg)", fontWeight: 500 }}>
                Erste Familien
              </strong>{" "}
              aus Winterhude &amp; Eppendorf sind dabei.
            </div>
          </div>

          {/* Mobile-only app preview (client component, no hydration issues) */}
          <MobileHeroPreview isLoggedIn={isLoggedIn} />
        </div>

        {/* Right: visual */}
        <div className="mob-hide">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
