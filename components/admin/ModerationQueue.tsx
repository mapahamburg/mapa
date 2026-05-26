type Severity = "HIGH" | "MED" | "LOW";

interface Report {
  id: string;
  severity: Severity;
  snippet: string;
  reporter: string;
  time: string;
}

const REPORTS: Report[] = [
  {
    id: "1",
    severity: "HIGH",
    snippet: "Empfehlung für Heilpraktiker ohne Zulassung...",
    reporter: "Anna K.",
    time: "vor 2 Std.",
  },
  {
    id: "2",
    severity: "MED",
    snippet: "Politische Diskussion über Schulpolitik...",
    reporter: "Max L.",
    time: "vor 4 Std.",
  },
  {
    id: "3",
    severity: "MED",
    snippet: "Selbstpromo für eigene Hebammenpraxis...",
    reporter: "Julia R.",
    time: "vor 6 Std.",
  },
  {
    id: "4",
    severity: "LOW",
    snippet: "Doppelter Beitrag: Spielplatz Stadtpark...",
    reporter: "Tom S.",
    time: "vor 8 Std.",
  },
];

function severityStyles(severity: Severity): {
  bg: string;
  color: string;
  label: string;
} {
  switch (severity) {
    case "HIGH":
      return {
        bg: "#FDECEA",
        color: "var(--mapa-danger, #B0533D)",
        label: "Hoch",
      };
    case "MED":
      return {
        bg: "var(--mapa-peach-50)",
        color: "var(--mapa-clay-500)",
        label: "Mittel",
      };
    case "LOW":
      return {
        bg: "var(--mapa-sage-50)",
        color: "var(--mapa-sage-700)",
        label: "Niedrig",
      };
  }
}

export function ModerationQueue() {
  return (
    <div
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--mapa-line)",
        borderRadius: "var(--radius-md, 12px)",
        boxShadow: "var(--shadow-m)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 24px 16px",
          borderBottom: "1px solid var(--mapa-line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--fg)",
            margin: 0,
            letterSpacing: 0,
            lineHeight: 1,
          }}
        >
          Moderations-Warteschlange
        </h3>
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 11,
            fontWeight: 600,
            color: "var(--mapa-clay-500)",
            background: "var(--mapa-peach-50)",
            padding: "2px 8px",
            borderRadius: "9999px",
          }}
        >
          {REPORTS.length} offen
        </span>
      </div>

      {/* Report rows */}
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {REPORTS.map((report, i) => {
          const sev = severityStyles(report.severity);
          return (
            <li
              key={report.id}
              style={{
                padding: "14px 24px",
                borderBottom:
                  i < REPORTS.length - 1
                    ? "1px solid var(--mapa-line-soft)"
                    : "none",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              {/* Severity badge */}
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                  color: sev.color,
                  background: sev.bg,
                  padding: "3px 7px",
                  borderRadius: 4,
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                {sev.label}
              </span>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 13,
                    color: "var(--fg)",
                    margin: "0 0 4px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  {report.snippet}
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 11,
                    color: "var(--fg-subtle)",
                  }}
                >
                  Gemeldet von {report.reporter} &middot; {report.time}
                </span>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flexShrink: 0,
                }}
              >
                <button
                  type="button"
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--mapa-sage-700)",
                    background: "var(--mapa-sage-50)",
                    border: "1px solid var(--mapa-sage-100)",
                    borderRadius: 6,
                    padding: "5px 10px",
                    cursor: "pointer",
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  Ansehen
                </button>
                <button
                  type="button"
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--fg-subtle)",
                    background: "transparent",
                    border: "1px solid var(--mapa-line)",
                    borderRadius: 6,
                    padding: "5px 10px",
                    cursor: "pointer",
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  Erledigt
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
