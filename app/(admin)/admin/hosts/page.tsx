import { getLocalHosts } from "@/lib/admin";

export const metadata = { title: "Local Hosts · mapa Admin" };

export default async function HostsPage() {
  const hosts = await getLocalHosts();

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
          Local Hosts
        </h1>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            color: "var(--fg-subtle)",
            margin: "6px 0 0",
          }}
        >
          Ehrenamtliche Hosts nach Stadtteil.
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
        {hosts.length === 0 ? (
          <div
            style={{
              padding: "48px 24px",
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              color: "var(--fg-subtle)",
              textAlign: "center",
            }}
          >
            Noch keine Local Hosts eingetragen.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse" as const,
                minWidth: 560,
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "var(--mapa-sage-50)",
                    borderBottom: "1px solid var(--mapa-line)",
                  }}
                >
                  {["Name", "Stadtteil", "Bio", "Dabei seit"].map(
                    (col, i) => (
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
                          textAlign: i === 0 ? ("left" as const) : ("left" as const),
                        }}
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {hosts.map((host, i) => (
                  <tr
                    key={host.id}
                    style={{
                      borderBottom:
                        i < hosts.length - 1
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
                      {host.name}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontFamily: "var(--font-ui)",
                        fontSize: 14,
                        color: "var(--mapa-sage-700)",
                        whiteSpace: "nowrap" as const,
                      }}
                    >
                      {host.stadtteil}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontFamily: "var(--font-ui)",
                        fontSize: 13,
                        color: "var(--fg-muted)",
                        maxWidth: 360,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap" as const,
                      }}
                    >
                      {host.bio ?? "–"}
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
                      {host.joinedAt}
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
