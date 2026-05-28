import { Users, FileText, MessageSquare, TrendingUp } from "lucide-react";
import { KPICard } from "@/components/admin/KPICard";
import { StadtteilRow } from "@/components/admin/StadtteilRow";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { ModerationQueue } from "@/components/admin/ModerationQueue";

export const metadata = { title: "Dashboard · mapa Admin" };

const KPI_DATA = [
  {
    label: "DAU",
    value: 47,
    trend: "+12% diese Woche",
    icon: <Users size={16} strokeWidth={1.5} />,
    accent: false,
  },
  {
    label: "Posts heute",
    value: 23,
    trend: "+5 vs. gestern",
    icon: <FileText size={16} strokeWidth={1.5} />,
    accent: false,
  },
  {
    label: "Antworten/Post",
    value: "3.4",
    trend: "Ø letzte 7 Tage",
    icon: <MessageSquare size={16} strokeWidth={1.5} />,
    accent: false,
  },
  {
    label: "Neue Familien",
    value: 8,
    trend: "diese Woche",
    icon: <TrendingUp size={16} strokeWidth={1.5} />,
    accent: true,
  },
];

const STADTTEILE_DATA = [
  { name: "Eppendorf", members: 184, posts: 312, host: "Nadine K." },
  { name: "Winterhude", members: 143, posts: 198, host: "Marc B." },
  { name: "Altona", members: 127, posts: 241, host: null },
  { name: "Eimsbüttel", members: 98, posts: 156, host: "Sarah M." },
  { name: "Ottensen", members: 87, posts: 134, host: null },
  { name: "Sternschanze", members: 76, posts: 89, host: null },
  { name: "Barmbek", members: 54, posts: 67, host: null },
  { name: "HafenCity", members: 43, posts: 51, host: null },
  { name: "Uhlenhorst", members: 38, posts: 44, host: null },
  { name: "Hoheluft", members: 31, posts: 38, host: null },
  { name: "St. Pauli", members: 28, posts: 45, host: null },
  { name: "Innenstadt", members: 19, posts: 22, host: null },
];

const MAX_MEMBERS = 200;

export default function AdminDashboardPage() {
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
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 400,
            color: "var(--fg)",
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          Dashboard
        </h1>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            color: "var(--fg-subtle)",
            margin: "6px 0 0",
          }}
        >
          Übersicht für alle Stadtteile in Hamburg.
        </p>
      </div>

      {/* KPI grid — 2 columns on narrow, 4 on wide */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 40,
        }}
      >
        {KPI_DATA.map((kpi) => (
          <KPICard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            trend={kpi.trend}
            icon={kpi.icon}
            accent={kpi.accent}
          />
        ))}
      </div>

      {/* Stadtteile table */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--fg)",
            margin: "0 0 14px",
            letterSpacing: 0,
            lineHeight: 1,
          }}
        >
          Stadtteile
        </h2>
        <div
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--mapa-line)",
            borderRadius: "var(--radius-md, 12px)",
            boxShadow: "var(--shadow-m)",
            overflow: "hidden",
          }}
        >
          <div className="admin-table-scroll">
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
                {["Stadtteil", "Mitglieder", "Beiträge", "Local Host", "Wachstum"].map(
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
                        textAlign: i === 0 || i === 3 || i === 4 ? "left" as const : "right" as const,
                      }}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {STADTTEILE_DATA.map((row) => (
                <StadtteilRow
                  key={row.name}
                  name={row.name}
                  members={row.members}
                  posts={row.posts}
                  host={row.host}
                  maxMembers={MAX_MEMBERS}
                />
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </section>

      {/* Bottom 2-column: Activity | Moderation */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
        }}
      >
        <ActivityFeed />
        <ModerationQueue />
      </div>
    </div>
  );
}
