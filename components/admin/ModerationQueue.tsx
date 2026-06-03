import Link from "next/link";
import { resolveReportForm } from "@/app/actions/reports";

type Severity = "HIGH" | "MED" | "LOW";

export interface QueueReport {
  id: string;
  severity: Severity;
  reason: string;
  snippet: string;
  reporter: string;
  time: string;
  postId: string | null;
}

function severityStyles(severity: Severity): { bg: string; color: string; label: string } {
  switch (severity) {
    case "HIGH":
      return { bg: "#FDECEA", color: "var(--mapa-danger, #B0533D)", label: "Hoch" };
    case "MED":
      return { bg: "var(--mapa-peach-50)", color: "var(--mapa-clay-500)", label: "Mittel" };
    case "LOW":
      return { bg: "var(--mapa-sage-50)", color: "var(--mapa-sage-700)", label: "Niedrig" };
  }
}

export function ModerationQueue({ reports = [] }: { reports?: QueueReport[] }) {
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
            color: reports.length > 0 ? "var(--mapa-clay-500)" : "var(--fg-subtle)",
            background: reports.length > 0 ? "var(--mapa-peach-50)" : "transparent",
            padding: "2px 8px",
            borderRadius: "9999px",
          }}
        >
          {reports.length} offen
        </span>
      </div>

      {reports.length === 0 ? (
        <div style={{ padding: "32px 24px", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 16,
              color: "var(--fg-muted)",
              margin: 0,
            }}
          >
            Nichts offen. Alles ruhig.
          </p>
        </div>
      ) : (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {reports.map((report, i) => {
            const sev = severityStyles(report.severity);
            return (
              <li
                key={report.id}
                style={{
                  padding: "14px 24px",
                  borderBottom: i < reports.length - 1 ? "1px solid var(--mapa-line-soft)" : "none",
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
                    <span style={{ color: "var(--fg-muted)" }}>{report.reason}:</span>{" "}
                    {report.snippet}
                  </p>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--fg-subtle)" }}>
                    Gemeldet von {report.reporter} &middot; {report.time}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  {report.postId && (
                    <Link
                      href={`/feed/${report.postId}`}
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: 12,
                        fontWeight: 500,
                        color: "var(--mapa-sage-700)",
                        background: "var(--mapa-sage-50)",
                        border: "1px solid var(--mapa-sage-100)",
                        borderRadius: 6,
                        padding: "5px 10px",
                        textDecoration: "none",
                        whiteSpace: "nowrap" as const,
                      }}
                    >
                      Ansehen
                    </Link>
                  )}
                  <form action={resolveReportForm}>
                    <input type="hidden" name="report_id" value={report.id} />
                    <button
                      type="submit"
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
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
