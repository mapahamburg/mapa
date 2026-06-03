import { ModerationQueue } from "@/components/admin/ModerationQueue";
import { getOpenReports } from "@/lib/admin";

export const metadata = { title: "Berichte · mapa Admin" };

export default async function BerichtePage() {
  const reports = await getOpenReports();

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
          Berichte
        </h1>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            color: "var(--fg-subtle)",
            margin: "6px 0 0",
          }}
        >
          Gemeldete Inhalte und Moderations-Warteschlange.
        </p>
      </div>

      <ModerationQueue reports={reports} />
    </div>
  );
}
