interface ActivityItem {
  id: string;
  name: string;
  action: string;
  time: string;
  gradient: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    name: "Nadine K.",
    action: "hat einen Beitrag gemeldet",
    time: "3 Min.",
    gradient: "linear-gradient(135deg, #E4EBD8, #6F855A)",  // sage 100 → 600
  },
  {
    id: "2",
    name: "Lars M.",
    action: "hat sich registriert, Eppendorf",
    time: "8 Min.",
    gradient: "linear-gradient(135deg, #FAF6EE, #CFDABF)",  // ivory → sage 200
  },
  {
    id: "3",
    name: "Julia S.",
    action: "hat kommentiert",
    time: "12 Min.",
    gradient: "linear-gradient(135deg, #F6E0CC, #C26A3F)",  // peach 100 → clay 600
  },
  {
    id: "4",
    name: "Neuer Beitrag",
    action: "Empfehlung in Winterhude",
    time: "18 Min.",
    gradient: "linear-gradient(135deg, #F2F5EC, #98AD8B)",  // sage 50 → sage 500
  },
  {
    id: "5",
    name: "Tobias R.",
    action: "hat sich registriert, Altona",
    time: "24 Min.",
    gradient: "linear-gradient(135deg, #FAF6EE, #BAC9A6)",  // ivory → sage 300
  },
  {
    id: "6",
    name: "Beitrag",
    action: "in Eimsbüttel gelöscht",
    time: "31 Min.",
    gradient: "linear-gradient(135deg, #FBF1E8, #DDA078)",  // peach 50 → peach 400
  },
  {
    id: "7",
    name: "Sarah M.",
    action: "hat sich als Local Host beworben",
    time: "1 Std.",
    gradient: "linear-gradient(135deg, #E4EBD8, #586B47)",  // sage 100 → sage 700
  },
  {
    id: "8",
    name: "Maria K.",
    action: "hat kommentiert",
    time: "1 Std.",
    gradient: "linear-gradient(135deg, #F2F5EC, #6F855A)",  // sage 50 → sage 600
  },
];

export function ActivityFeed() {
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
          Aktivitäten
        </h3>
      </div>

      {/* List */}
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {ACTIVITIES.map((item, i) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 24px",
              borderBottom:
                i < ACTIVITIES.length - 1
                  ? "1px solid var(--mapa-line-soft)"
                  : "none",
            }}
          >
            {/* Avatar circle */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: item.gradient,
                flexShrink: 0,
              }}
            />

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--fg)",
                }}
              >
                {item.name}
              </span>{" "}
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 13,
                  color: "var(--fg-muted)",
                }}
              >
                {item.action}
              </span>
            </div>

            {/* Time */}
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                color: "var(--fg-subtle)",
                whiteSpace: "nowrap" as const,
                flexShrink: 0,
              }}
            >
              {item.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
