import { Avatar } from "@/components/ui/Avatar";

export function LocalHosts() {
  return (
    <section
      style={{
        background: "var(--mapa-paper)",
        padding: "80px 24px",
        borderTop: "1px solid var(--border-soft)",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Eyebrow */}
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--cobalt-500)",
            fontWeight: 500,
            fontFamily: "var(--font-mono)",
            marginBottom: 12,
          }}
        >
          Local Hosts
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            fontSize: 26,
            color: "var(--ink)",
            margin: "0 0 16px",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          Aus deinem Stadtteil. Nicht aus einem Büro.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 15,
            color: "var(--fg-muted)",
            lineHeight: 1.6,
            margin: "0 0 32px",
            maxWidth: 520,
          }}
        >
          Jede Nachbarschaft hat einen Local Host.
        </p>

        {/* Nadine card — compact */}
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            background: "var(--color-sunk)",
            border: "1px solid var(--border-soft)",
            borderRadius: 20,
            padding: "20px 24px",
            maxWidth: 480,
          }}
        >
          <Avatar letter="N" size={44} />
          <div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontWeight: 600,
                fontSize: 15,
                color: "var(--ink)",
                marginBottom: 2,
              }}
            >
              Nadine
            </div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 12,
                color: "var(--fg-muted)",
                marginBottom: 10,
              }}
            >
              Local Host · Winterhude
            </div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 15,
                lineHeight: 1.5,
                color: "var(--ink)",
                letterSpacing: "-0.005em",
              }}
            >
              „Ich bin seit acht Jahren in Winterhude. Schreib mir gerne."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
