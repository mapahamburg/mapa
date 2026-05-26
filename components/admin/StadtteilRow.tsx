interface StadtteilRowProps {
  name: string;
  members: number;
  posts: number;
  host?: string | null;
  maxMembers: number;
}

export function StadtteilRow({
  name,
  members,
  posts,
  host,
  maxMembers,
}: StadtteilRowProps) {
  const pct = Math.min((members / maxMembers) * 100, 100);

  return (
    <tr
      style={{
        borderBottom: "1px solid var(--mapa-line)",
      }}
    >
      {/* Stadtteil name */}
      <td
        style={{
          padding: "12px 16px",
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          fontWeight: 500,
          color: "var(--fg)",
          whiteSpace: "nowrap" as const,
        }}
      >
        {name}
      </td>

      {/* Members */}
      <td
        style={{
          padding: "12px 16px",
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          color: "var(--fg-muted)",
          textAlign: "right" as const,
          whiteSpace: "nowrap" as const,
        }}
      >
        {members}
      </td>

      {/* Posts */}
      <td
        style={{
          padding: "12px 16px",
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          color: "var(--fg-muted)",
          textAlign: "right" as const,
          whiteSpace: "nowrap" as const,
        }}
      >
        {posts}
      </td>

      {/* Host */}
      <td
        style={{
          padding: "12px 16px",
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          color: host ? "var(--mapa-sage-700)" : "var(--fg-subtle)",
          whiteSpace: "nowrap" as const,
        }}
      >
        {host ?? "–"}
      </td>

      {/* Progress bar */}
      <td style={{ padding: "12px 16px", minWidth: 120 }}>
        <div
          style={{
            background: "var(--mapa-sage-50)",
            borderRadius: "9999px",
            height: 6,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: "var(--mapa-sage-500)",
              borderRadius: "9999px",
              transition: "width 300ms ease",
            }}
          />
        </div>
      </td>
    </tr>
  );
}
