"use client";

import Link from "next/link";

const POSTS = [
  {
    initial: "A",
    name: "Anna",
    district: "Eppendorf",
    tag: "Empfehlung",
    tagColor: "var(--cobalt-50)",
    tagText: "var(--cobalt-700)",
    title: "Häwelmann Café. Ruhig, kinderfreundlich, kein Gedränge.",
  },
  {
    initial: "M",
    name: "Marc",
    district: "Winterhude",
    tag: "Treffen",
    tagColor: "var(--ash-100)",
    tagText: "var(--ash-900)",
    title: "Spielplatztreffen am Samstag. Wer kommt mit?",
    meta: "Stadtpark · Sa 10:30 · 2–4 Jahre",
  },
  {
    initial: "L",
    name: "Lea",
    district: "Eimsbüttel",
    tag: "Frage",
    tagColor: "#F6E0CC",
    tagText: "#8B4220",
    title: "Kennt jemand eine gute Hebamme in Eimsbüttel?",
  },
];

const BENEFITS = [
  { label: "Echte Local Hosts.", sub: "Kein Algorithmus" },
  { label: "Dein Stadtteil zuerst.", sub: "Chronologisch, ruhig" },
  { label: "Werbefrei.", sub: "Für immer" },
];

export function MobileHeroPreview({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="mob-show" style={{ marginTop: 36 }}>

      {/* Phone frame */}
      <div style={{
        background: "var(--mapa-paper)",
        borderRadius: 28,
        border: "6px solid var(--mapa-ink)",
        boxShadow: "0 20px 48px -16px rgba(23,22,20,0.3)",
        overflow: "hidden",
        maxWidth: 340,
        margin: "0 auto",
      }}>
        {/* Notch bar */}
        <div style={{ height: 12, background: "var(--mapa-ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 48, height: 4, borderRadius: 999, background: "rgba(255,253,248,0.25)" }} />
        </div>

        {/* App shell */}
        <div style={{ padding: "16px 14px 20px" }}>

          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.04em", color: "var(--mapa-ink)" }}>
              mapa<span style={{ color: "var(--cobalt-500)" }}>.</span>
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-muted)" }}>
              Eppendorf · heute
            </span>
          </div>

          {/* Greeting */}
          <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 17, letterSpacing: "-0.01em", marginBottom: 12, color: "var(--fg)" }}>
            Hallo Anna.
          </div>

          {/* Post cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {POSTS.map((p) => (
              <div key={p.name + p.tag} style={{
                background: "var(--mapa-ivory)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "9px 11px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                  {/* Avatar */}
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: "var(--ash-100)", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-ui)", fontSize: 9, fontWeight: 600, color: "var(--fg-muted)",
                  }}>
                    {p.initial}
                  </div>
                  <span style={{ fontSize: 9.5, fontWeight: 500, color: "var(--fg)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.name} · {p.district}
                  </span>
                  {/* Tag pill */}
                  <span style={{
                    fontSize: 8.5, fontWeight: 600, fontFamily: "var(--font-ui)",
                    background: p.tagColor, color: p.tagText,
                    borderRadius: 999, padding: "2px 7px", flexShrink: 0,
                  }}>
                    {p.tag}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 12, lineHeight: 1.3, color: "var(--fg)" }}>
                  {p.title}
                </div>
                {p.meta && (
                  <div style={{ marginTop: 5, background: "var(--mapa-cream)", borderRadius: 6, padding: "3px 7px", fontSize: 9.5, color: "var(--fg-muted)" }}>
                    {p.meta}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefit pills */}
      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12, padding: "0 4px" }}>
        {BENEFITS.map(({ label, sub }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
              {label}
            </span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--fg-muted)" }}>
              {sub}
            </span>
          </div>
        ))}
      </div>

      {/* Second CTA */}
      <div style={{ marginTop: 28 }}>
        <Link
          href={isLoggedIn ? "/feed" : "/signup"}
          style={{
            display: "block",
            textAlign: "center",
            background: "var(--cobalt-500)",
            color: "var(--mapa-paper)",
            textDecoration: "none",
            padding: "15px 28px",
            borderRadius: 999,
            fontFamily: "var(--font-ui)",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          {isLoggedIn ? "Zum Feed" : "Kostenlos beitreten"}
        </Link>
        <p style={{ marginTop: 10, textAlign: "center", fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--fg-subtle)", margin: "10px 0 0" }}>
          Keine App nötig. Läuft im Browser.
        </p>
      </div>

    </div>
  );
}
