const ITEMS = [
  {
    label: "Keine App.",
    desc: "Läuft im Browser. Kein Download.",
  },
  {
    label: "Keine Push-Hölle.",
    desc: "Kein Feed der nie aufhört.",
  },
  {
    label: "Keine Werbung im Feed.",
    desc: "Kein Unternehmen zahlt sich nach oben.",
  },
];

export function WarumAnders() {
  return (
    <section
      style={{
        background: "var(--mapa-cream)",
        padding: "80px 24px",
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
            marginBottom: 32,
          }}
        >
          Warum anders
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {ITEMS.map((item, i) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                gap: 24,
                alignItems: "baseline",
                padding: "20px 0",
                borderBottom: i < ITEMS.length - 1
                  ? "1px solid var(--border-soft)"
                  : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 20,
                  color: "var(--ink)",
                  lineHeight: 1.3,
                  minWidth: 220,
                  flexShrink: 0,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 15,
                  color: "var(--fg-muted)",
                  lineHeight: 1.55,
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
