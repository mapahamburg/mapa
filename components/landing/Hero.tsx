import Link from "next/link";
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

// ─── Mobile-only app preview ─────────────────────────────────────────────────

const MOBILE_POSTS = [
  {
    letter: "A",
    name: "Anna",
    district: "Eppendorf",
    time: "vor 12 Min.",
    type: "empfehlung" as const,
    title: "Das Häwelmann Café — ruhig, kinderfreundlich, kein Gedränge.",
  },
  {
    letter: "M",
    name: "Marc",
    district: "Winterhude",
    time: "vor 1 Std.",
    type: "treffen" as const,
    title: "Spielplatztreffen am Samstag. Wer kommt mit?",
    meta: "Stadtpark · Sa 10:30 · 2–4 Jahre",
  },
  {
    letter: "L",
    name: "Lea",
    district: "Eimsbüttel",
    time: "vor 2 Std.",
    type: "frage" as const,
    title: "Kennt jemand eine gute Hebamme in Eimsbüttel?",
  },
];

const BENEFITS = [
  { pill: "Chronologisch.", sub: "Kein Algorithmus" },
  { pill: "Dein Stadtteil.", sub: "Nur was nah ist" },
  { pill: "Keine Werbung.", sub: "Nie" },
];

function MobileHeroPreview({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="mob-show" style={{ marginTop: 36 }}>
      {/* Phone frame */}
      <div
        style={{
          background: "var(--mapa-paper)",
          borderRadius: 28,
          border: "6px solid var(--mapa-ink)",
          boxShadow: "0 20px 48px -16px rgba(23,22,20,0.3)",
          overflow: "hidden",
          maxWidth: 340,
          margin: "0 auto",
        }}
      >
        {/* Status bar */}
        <div
          style={{
            height: 12,
            background: "var(--mapa-ink)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 48, height: 4, borderRadius: 999, background: "rgba(255,253,248,0.3)" }} />
        </div>

        {/* App content */}
        <div style={{ padding: "16px 14px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <Logo size={14} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-muted)" }}>
              Eppendorf · heute
            </span>
          </div>

          <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 18, fontWeight: 400, letterSpacing: "-0.01em", marginBottom: 14, color: "var(--fg)" }}>
            Hallo Anna.
          </div>

          {/* Posts */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {MOBILE_POSTS.map((p) => (
              <div
                key={p.name + p.type}
                style={{
                  background: "var(--mapa-ivory)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "10px 12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <Avatar letter={p.letter} size={20} />
                  <span style={{ fontSize: 10, fontWeight: 500, color: "var(--fg)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.name} · {p.district}
                  </span>
                  <Tag type={p.type} size="s" />
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 12.5, lineHeight: 1.3, letterSpacing: "-0.005em", color: "var(--fg)" }}>
                  {p.title}
                </div>
                {p.meta && (
                  <div style={{ marginTop: 6, background: "var(--mapa-cream)", borderRadius: 8, padding: "4px 8px", fontSize: 10, color: "var(--fg-muted)" }}>
                    {p.meta}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 14, padding: "0 4px" }}>
        {BENEFITS.map(({ pill, sub }) => (
          <div key={pill} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              flexShrink: 0,
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 14,
              background: "var(--cobalt-50)",
              color: "var(--cobalt-700)",
              borderRadius: 999,
              padding: "4px 12px",
              whiteSpace: "nowrap",
            }}>
              {pill}
            </span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--fg-muted)" }}>
              {sub}
            </span>
          </div>
        ))}
      </div>

      {/* CTA repeat at bottom of preview */}
      <div style={{ marginTop: 32, textAlign: "center" }}>
        <Link
          href={isLoggedIn ? "/feed" : "/signup"}
          style={{
            display: "block",
            background: "var(--cobalt-500)",
            color: "var(--mapa-paper)",
            textDecoration: "none",
            padding: "16px 28px",
            borderRadius: 999,
            fontFamily: "var(--font-ui)",
            fontSize: 16,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {isLoggedIn ? "Zum Feed" : "Kostenlos beitreten"}
        </Link>
        <p style={{ marginTop: 10, fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--fg-subtle)" }}>
          Keine App nötig · läuft im Browser
        </p>
      </div>
    </div>
  );
}

export async function Hero() {
  const memberCount = await getMemberCount();
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
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--cobalt-500)",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
              marginBottom: 24,
            }}
          >
            mapa.hamburg · Beta
          </div>

          <h1
            className="fs-hero"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
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
              lineHeight: 1.55,
              letterSpacing: 0,
              color: "var(--ash-v2-600)",
              marginTop: 20,
            }}
          >
            Empfehlungen, Veranstaltungen, Treffen und ehrlicher Austausch. Chronologisch, stadtteilgefiltert, moderiert von echten Nachbarinnen und Nachbarn.
          </p>

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
              {isLoggedIn ? "Zum Feed" : "Jetzt mitmachen"}
            </a>
            <a
              href="/so-funktionierts"
              style={{
                background: "transparent",
                color: "var(--fg)",
                border: "1px solid var(--border)",
                padding: "15px 26px",
                borderRadius: 999,
                fontFamily: "var(--font-ui)",
                fontSize: 16,
                fontWeight: 500,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              So funktioniert&apos;s
            </a>
          </div>

          {/* Mobile member count — hidden on desktop (hero-social handles it there) */}
          <div
            className="mob-show"
            style={{
              marginTop: 16,
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--fg-muted)",
            }}
          >
            <MemberCount initial={memberCount} fallback="1.247" />{" "}Familien in der Beta.
          </div>

          {/* Mobile app preview */}
          <MobileHeroPreview isLoggedIn={isLoggedIn} />

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
              <MemberCount initial={memberCount} fallback="1.247" />{" "}
              in der Beta.
              <br />
              in Eppendorf, Winterhude, Ottensen, Eimsbüttel &amp; überall
              dazwischen.
            </div>
          </div>
        </div>

        {/* Right: visual */}
        <div className="mob-hide">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
