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
    <section className="warum-section">
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
              className="warum-row"
              style={{
                borderBottom: i < ITEMS.length - 1
                  ? "1px solid var(--border-soft)"
                  : "none",
              }}
            >
              <div className="warum-label">
                {item.label}
              </div>
              <div className="warum-desc">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
