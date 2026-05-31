const GRADIENTS = [
  "linear-gradient(135deg, #E4EBD8, #6F855A)",
  "linear-gradient(135deg, #FAF6EE, #CFDABF)",
  "linear-gradient(135deg, #F6E0CC, #C26A3F)",
  "linear-gradient(135deg, #F2F5EC, #98AD8B)",
  "linear-gradient(135deg, #FAF6EE, #BAC9A6)",
  "linear-gradient(135deg, #FBF1E8, #DDA078)",
  "linear-gradient(135deg, #E4EBD8, #586B47)",
  "linear-gradient(135deg, #F2F5EC, #6F855A)",
];

interface ActivityItem {
  id: string;
  name: string;
  action: string;
  time: string;
}

interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
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
        {items.length === 0 ? (
          <li
            style={{
              padding: "24px",
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--fg-subtle)",
              textAlign: "center",
            }}
          >
            Noch keine Aktivitäten.
          </li>
        ) : (
          items.map((item, i) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 24px",
                borderBottom:
                  i < items.length - 1
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
                  background: GRADIENTS[i % GRADIENTS.length],
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
          ))
        )}
      </ul>
    </div>
  );
}
