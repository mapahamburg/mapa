import { getRecentMembers } from "@/lib/admin";

export const metadata = { title: "Nutzer · mapa Admin" };

export default async function NutzerPage() {
  const members = await getRecentMembers();

  return (
    <div
      style={{
        fontFamily: "var(--font-ui)",
        color: "var(--fg)",
        maxWidth: 1100,
      }}
    >
      {/* Page header */}
      <div style={{ marginBottom: 36 }}>
        <h1
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 32,
            fontWeight: 700,
            color: "var(--fg)",
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          Nutzer
        </h1>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            color: "var(--fg-subtle)",
            margin: "6px 0 0",
          }}
        >
          Zuletzt registrierte Mitglieder.
        </p>
      </div>

      {/* Table card */}
      <div
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--mapa-line)",
          borderRadius: "var(--radius-md, 12px)",
          boxShadow: "var(--shadow-m)",
          overflow: "hidden",
        }}
      >
        {members.length === 0 ? (
          <div
            style={{
              padding: "48px 24px",
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              color: "var(--fg-subtle)",
              textAlign: "center",
            }}
          >
            Noch keine Mitglieder registriert.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse" as const,
                minWidth: 440,
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "var(--mapa-sage-50)",
                    borderBottom: "1px solid var(--mapa-line)",
                  }}
                >
                  {["Name", "Stadtteil", "Dabei seit"].map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: "10px 16px",
                        fontFamily: "var(--font-ui)",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase" as const,
                        color: "var(--fg-subtle)",
                        textAlign: "left" as const,
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map((member, i) => (
                  <tr
                    key={member.id}
                    style={{
                      borderBottom:
                        i < members.length - 1
                          ? "1px solid var(--mapa-line-soft)"
                          : "none",
                    }}
                  >
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
                      {member.name}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontFamily: "var(--font-ui)",
                        fontSize: 14,
                        color: "var(--fg-muted)",
                        whiteSpace: "nowrap" as const,
                      }}
                    >
                      {member.stadtteil}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 13,
                        color: "var(--fg-subtle)",
                        whiteSpace: "nowrap" as const,
                      }}
                    >
                      {member.joinedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
