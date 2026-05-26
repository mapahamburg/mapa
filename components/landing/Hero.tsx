import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";
import { MemberCount } from "@/components/landing/MemberCount";
import { getMemberCount } from "@/lib/queries";

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
          background: "var(--color-cobalt)",
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
          background: "var(--color-green)",
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
          Heute neu in deinem Viertel.
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
                background: active ? "var(--mapa-ink)" : "var(--color-linen-2)",
                color: active ? "var(--mapa-paper)" : "var(--fg)",
                padding: "4px 10px",
                borderRadius: 999,
                fontSize: 10,
                fontWeight: active ? 500 : 400,
                border: active ? "none" : "1px solid var(--border)",
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
            background: "var(--color-sage-soft)",
            borderRadius: 14,
            padding: 12,
            border: "1px solid var(--color-sage)",
          }}
        >
          <div
            style={{
              fontSize: 9,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-green)",
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
              color: "var(--color-green)",
              marginTop: 4,
            }}
          >
            Nadine sammelt Tipps für regnerische Tage.
          </div>
        </div>

        {/* Post card */}
        <div
          style={{
            marginTop: 10,
            background: "var(--mapa-ivory)",
            borderRadius: 14,
            padding: 12,
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              marginBottom: 6,
            }}
          >
            <Avatar letter="L" size={22} />
            <div
              style={{
                fontSize: 10,
                fontWeight: 500,
                flex: 1,
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Lina · vor 2 Std
            </div>
            <Tag type="empfehlung" size="s" />
          </div>
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              fontSize: 13,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            DeliKate · direkt am Hayns Park.
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <Avatar letter="M" size={32} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Mira</div>
            <div style={{ fontSize: 11, color: "var(--fg-muted)" }}>
              Winterhude · vor 4 Std
            </div>
          </div>
          <Tag type="treffen" size="s" />
        </div>
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: 600,
            fontSize: 18,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          Spielplatztreffen am Samstag. Wer kommt mit?
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
  const memberCount = await getMemberCount();
  const avatarLetters = ["L", "M", "S", "J", "N"] as const;

  return (
    <section style={{ background: "var(--mapa-cream)", padding: "72px 48px 80px" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        {/* Left: copy */}
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-green)",
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            mapa.hamburg · Beta
          </div>

          <h1
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 88,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              margin: 0,
              color: "var(--fg)",
              fontWeight: 600,
            }}
          >
            Die lokale
            <br />
            Community für
            <br />
            Mamas und Papas{" "}
            <span style={{ color: "var(--color-cobalt)" }}>in Hamburg.</span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 400,
              fontSize: 22,
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
              color: "var(--fg-muted)",
              marginTop: 28,
              maxWidth: 480,
            }}
          >
            Mit Empfehlungen, Veranstaltungen, Treffen und ehrlichem Austausch.
          </p>

          <div
            style={{
              marginTop: 36,
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <button
              type="button"
              style={{
                background: "var(--color-cobalt)",
                color: "var(--mapa-paper)",
                border: "none",
                padding: "16px 28px",
                borderRadius: 999,
                fontFamily: "var(--font-ui)",
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Jetzt mitmachen
            </button>
            <button
              type="button"
              style={{
                background: "transparent",
                color: "var(--fg)",
                border: "1px solid var(--border)",
                padding: "15px 26px",
                borderRadius: 999,
                fontFamily: "var(--font-ui)",
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              So funktioniert&apos;s
            </button>
          </div>

          {/* Avatar stack + social proof */}
          <div
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
                      border: "2.5px solid var(--mapa-cream)",
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
              <MemberCount initial={memberCount} fallback="1.247" />{" "}
              in der Beta.
              <br />
              in Eppendorf, Winterhude, Ottensen, Eimsbüttel &amp; überall
              dazwischen.
            </div>
          </div>
        </div>

        {/* Right: visual */}
        <HeroVisual />
      </div>
    </section>
  );
}
