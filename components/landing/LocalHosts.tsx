import { Avatar } from "@/components/ui/Avatar";

export function LocalHosts() {
  return (
    <section
      style={{
        background: "var(--surface-page-deep)",
        padding: "96px 48px",
        color: "var(--ink)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 80,
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
              color: "var(--olive-700)",
              fontWeight: 600,
            }}
          >
            Local Hosts
          </div>
          <h2
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 62,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              margin: "16px 0 0",
              fontWeight: 600,
              color: "var(--ink)",
            }}
          >
            Ein Mensch pro Viertel.
            <br />
            echt, nicht algorithmisch.
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--ash-v2-600)",
              marginTop: 24,
              maxWidth: 480,
            }}
          >
            In jedem Stadtteil gibt es einen Local Host: eine engagierte Person,
            die das Viertel kennt, Treffen kuratiert und neue Familien willkommen
            heißt. Ehrenamtlich, mit Haltung.
          </p>
          <button
            type="button"
            style={{
              marginTop: 28,
              background: "var(--olive-500)",
              color: "var(--surface-page)",
              border: "none",
              padding: "14px 24px",
              borderRadius: 999,
              fontFamily: "var(--font-ui)",
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Local Host werden →
          </button>
        </div>

        {/* Right: host card */}
        <div
          style={{
            background: "var(--mapa-paper)",
            borderRadius: 28,
            padding: 32,
            color: "var(--fg)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginBottom: 24,
            }}
          >
            <Avatar letter="N" size={72} />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 32,
                  letterSpacing: "-0.02em",
                  fontWeight: 600,
                }}
              >
                Nadine
              </div>
              <div style={{ fontSize: 14, color: "var(--fg-muted)" }}>
                Local Host · Winterhude
              </div>
            </div>
          </div>

          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              fontSize: 22,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: "var(--fg)",
            }}
          >
            „Ich bin seit acht Jahren in Winterhude. Kenne die guten
            Spielplätze, die kinderfreundlichen Cafés, die Hebammen mit echtem
            Wartelistentipp. Schreib mir gerne."
          </div>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              gap: 24,
              fontSize: 13,
              color: "var(--fg-muted)",
              paddingTop: 20,
              borderTop: "1px solid var(--border-soft)",
            }}
          >
            <div>
              <strong style={{ color: "var(--fg)", fontWeight: 500 }}>
                184
              </strong>{" "}
              Empfehlungen
            </div>
            <div>
              <strong style={{ color: "var(--fg)", fontWeight: 500 }}>
                23
              </strong>{" "}
              Treffen kuratiert
            </div>
            <div>
              <strong style={{ color: "var(--fg)", fontWeight: 500 }}>
                312
              </strong>{" "}
              Familien begleitet
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
