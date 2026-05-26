type Phase = {
  n: string;
  title: string;
  body: string;
  tag: string;
  active: boolean;
  vision?: boolean;
};

const PHASES: Phase[] = [
  {
    n: "01",
    title: "Die ersten Familien zusammenbringen",
    body: "Zum Start geht es nicht um Reichweite oder viele Features, sondern um eine aktive und vertrauensvolle Community in Hamburg.",
    tag: "Heute",
    active: true,
  },
  {
    n: "02",
    title: "Die Community lebendig machen",
    body: "mapa wächst durch Menschen, nicht durch Algorithmen. Aktive Nutzer:innen sammeln, lokale Gespräche fördern, Veranstaltungen sichtbar machen.",
    tag: "In Arbeit",
    active: true,
  },
  {
    n: "03",
    title: "Stadtteile stärken",
    body: "Mit wachsender Community entstehen lokale Feeds in Winterhude, Eppendorf, Eimsbüttel und Ottensen — jeder mit eigenen Treffen und Empfehlungen.",
    tag: "Sommer 2026",
    active: false,
  },
  {
    n: "04",
    title: "Local Hosts",
    body: "Aktive Mitglieder werden zu Local Hosts. Echte Menschen aus der Nachbarschaft, die neue Familien willkommen heißen und Treffen organisieren.",
    tag: "Herbst 2026",
    active: false,
  },
  {
    n: "05",
    title: "Ganz Hamburg",
    body: "Sternschanze, Altona, Hoheluft, HafenCity, Uhlenhorst — alle Hamburger Stadtteile aktiv, jeder mit eigenem Local Host. Hamburg als Heimat-Stadt von mapa.",
    tag: "2027",
    active: false,
  },
  {
    n: "06",
    title: "Die App — für alle.",
    body: "Wenn Hamburg wirklich lebt, kommen die native iOS-App und Android-App. Nicht vorher. Eine Community, die funktioniert, bevor sie skaliert.",
    tag: "Nach dem Rollout",
    active: false,
    vision: true,
  },
];

export function HowWeGrow() {
  return (
    <section style={{ background: "var(--mapa-paper)", padding: "96px 48px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ maxWidth: 760 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--olive-700)",
              fontWeight: 500,
              fontFamily: "var(--font-mono)",
            }}
          >
            Wie mapa wächst
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 62,
              lineHeight: 1.0,
              letterSpacing: "-0.015em",
              margin: "16px 0 0",
            }}
          >
            Langsam, lokal,
            <br />
            von echten Familien getragen.
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--fg-muted)",
              marginTop: 28,
              maxWidth: 620,
            }}
          >
            mapa skaliert nicht durch Marketing-Budgets. Sondern Stadtteil für
            Stadtteil — mit Local Hosts als Anker.
          </p>
        </div>

        <div style={{ marginTop: 72, position: "relative" }}>
          {/* Connector line */}
          <div
            style={{
              position: "absolute",
              left: 32,
              top: 24,
              bottom: 24,
              width: 2,
              background: "var(--border)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {PHASES.map((phase) => (
              <div
                key={phase.n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "64px 1fr",
                  gap: 32,
                  alignItems: "flex-start",
                }}
              >
                {/* Number circle */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 999,
                    background: phase.active
                      ? "var(--olive-500)"
                      : phase.vision
                      ? "var(--mapa-peach-100)"
                      : "var(--mapa-ivory)",
                    border: phase.active
                      ? "none"
                      : phase.vision
                      ? "2px dashed var(--mapa-clay-500)"
                      : "2px solid var(--border)",
                    color: phase.active
                      ? "var(--mapa-paper)"
                      : phase.vision
                      ? "var(--mapa-clay-500)"
                      : "var(--fg-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-ui)",
                    fontSize: 22,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {phase.n}
                </div>

                {/* Phase card */}
                <div
                  style={{
                    background: phase.vision
                      ? "var(--mapa-peach-50)"
                      : "var(--mapa-cream)",
                    borderRadius: 20,
                    padding: 28,
                    border: phase.vision
                      ? "1px dashed var(--mapa-peach-300)"
                      : "1px solid var(--border)",
                    display: "grid",
                    gridTemplateColumns: "1fr 160px",
                    gap: 32,
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: 28,
                        lineHeight: 1.2,
                        letterSpacing: "-0.02em",
                        fontWeight: 600,
                        color: phase.vision
                          ? "var(--mapa-clay-500)"
                          : "var(--fg)",
                      }}
                    >
                      {phase.title}
                    </div>
                    <div
                      style={{
                        fontSize: 14.5,
                        lineHeight: 1.55,
                        color: "var(--fg-muted)",
                        marginTop: 8,
                      }}
                    >
                      {phase.body}
                    </div>
                  </div>
                  <div
                    style={{
                      background: phase.active
                        ? "var(--sage-v2-100)"
                        : phase.vision
                        ? "var(--mapa-peach-100)"
                        : "var(--mapa-paper)",
                      color: phase.active
                        ? "var(--olive-700)"
                        : phase.vision
                        ? "var(--mapa-clay-600)"
                        : "var(--fg-muted)",
                      border: phase.active || phase.vision
                        ? "none"
                        : "1px solid var(--border)",
                      padding: "8px 14px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      textAlign: "center",
                      justifySelf: "end",
                    }}
                  >
                    {phase.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
