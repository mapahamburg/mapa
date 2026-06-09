import { getStadtteilStats } from "@/lib/admin";
import { StadtteilRow } from "@/components/admin/StadtteilRow";

export const metadata = { title: "Stadtteile · mapa Admin" };

export default async function StadtteileFullPage() {
  const stadtteile = await getStadtteilStats();

  const maxMembers = stadtteile.reduce(
    (acc, row) => Math.max(acc, row.members),
    1
  );

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
          Stadtteile
        </h1>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            color: "var(--fg-subtle)",
            margin: "6px 0 0",
          }}
        >
          Mitglieder und Aktivität pro Stadtteil.
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
        {stadtteile.length === 0 ? (
          <div
            style={{
              padding: "48px 24px",
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              color: "var(--fg-subtle)",
              textAlign: "center",
            }}
          >
            Noch keine Stadtteile mit Mitgliedern.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse" as const,
                minWidth: 580,
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "var(--mapa-sage-50)",
                    borderBottom: "1px solid var(--mapa-line)",
                  }}
                >
                  {[
                    "Stadtteil",
                    "Mitglieder",
                    "Beiträge",
                    "Local Host",
                    "Wachstum",
                  ].map((col, i) => (
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
                        textAlign:
                          i === 0 || i === 3 || i === 4
                            ? ("left" as const)
                            : ("right" as const),
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stadtteile.map((row) => (
                  <StadtteilRow
                    key={row.name}
                    name={row.name}
                    members={row.members}
                    posts={row.posts}
                    host={row.host}
                    maxMembers={maxMembers}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
