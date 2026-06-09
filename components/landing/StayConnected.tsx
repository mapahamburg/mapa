import { Mail, BellOff, Smartphone } from "lucide-react";

const ITEMS = [
  {
    Icon: Smartphone,
    title: "Keine App nötig.",
    sub: "mapa läuft im Browser. Kein Download, kein Update, kein Speicherplatz.",
  },
  {
    Icon: Mail,
    title: "Jemand antwortet? Du bekommst eine E-Mail.",
    sub: "Sobald jemand aus deinem Stadtteil antwortet — ruhig, direkt, einmalig. Kein Thread-Chaos.",
  },
  {
    Icon: BellOff,
    title: "Kein Algorithmus, der dich festhält.",
    sub: "Wir melden uns nur wenn etwas passiert. Nicht um dich zurückzubringen.",
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
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              margin: "16px 0 0",
            }}
          >
            Keine App.
            <br />
            Keine Push-Hölle.
          </h2>
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
