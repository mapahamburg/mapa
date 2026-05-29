import Link from "next/link";

export function FeedEndState() {
  return (
    <div
      style={{
        marginTop: 56,
        paddingTop: 48,
        paddingBottom: 8,
        borderTop: "1px solid var(--color-line)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        textAlign: "center",
      }}
    >
      <div style={{ width: 32, height: 1, background: "var(--color-line)" }} />
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 28,
          color: "var(--color-ink)",
          letterSpacing: "-0.01em",
          marginTop: 4,
        }}
      >
        Du bist auf dem Stand.
      </div>
      <div
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          color: "var(--color-muted)",
          marginBottom: 4,
        }}
      >
        Magst du selbst etwas teilen?
      </div>
      <Link
        href="/feed/new"
        style={{
          background: "var(--color-cobalt)",
          color: "var(--color-paper)",
          borderRadius: 999,
          padding: "10px 24px",
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          fontWeight: 500,
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Beitrag schreiben
      </Link>
    </div>
  );
}
