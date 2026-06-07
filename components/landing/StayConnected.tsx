import { Mail, BellOff } from "lucide-react";

const ITEMS = [
  {
    Icon: Mail,
    title: "Antwort auf deine Frage? Du bekommst eine ruhige E-Mail.",
    sub: "Sobald jemand aus deinem Stadtteil antwortet. Nicht später, nicht lauter.",
  },
  {
    Icon: BellOff,
    title: "Kein Dauer-Ping, kein Spam.",
    sub: "Du entscheidest, was dich erreicht. Jederzeit in den Einstellungen.",
  },
];

export function StayConnected() {
  return (
    <section className="section-pad" style={{ background: "var(--mapa-paper)" }}>
      <div className="col2-text" style={{ alignItems: "flex-start" }}>
        {/* Left: headline */}
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--cobalt-500)",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
            }}
          >
            Verbunden bleiben
          </div>
          <h2
            className="fs-h2-m"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              margin: "16px 0 0",
              fontWeight: 400,
            }}
          >
            Du verpasst nichts.
            <br />
            <span>Auch ohne ständig zu schauen.</span>
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--fg-muted)",
              marginTop: 24,
              maxWidth: 440,
            }}
          >
            mapa holt dich zurück, wenn es wirklich etwas gibt. Ruhig, per
            E-Mail, ohne den Drang, dich endlos festzuhalten.
          </p>
        </div>

        {/* Right: list */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {ITEMS.map(({ Icon, title, sub }) => (
            <div
              key={title}
              style={{
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
                padding: "16px 0",
                borderTop: "1px solid var(--border-soft)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  flexShrink: 0,
                  background: "var(--cobalt-50)",
                  color: "var(--cobalt-700)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={17} strokeWidth={1.5} />
              </div>
              <div>
                <div
                  className="notonmapa-item"
                  style={{
                    fontFamily: "var(--font-ui)",
                    letterSpacing: "-0.02em",
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "var(--fg-muted)",
                    marginTop: 4,
                    lineHeight: 1.5,
                  }}
                >
                  {sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
