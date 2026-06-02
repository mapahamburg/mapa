import Link from "next/link";
import { MapaMark } from "@/components/ui/MapaMark";

export const metadata = {
  title: "Seite nicht gefunden · mapa",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--color-cream)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        fontFamily: "var(--font-ui)",
        textAlign: "center",
      }}
    >
      <MapaMark size={28} style={{ marginBottom: 40 }} />

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--color-subtle)",
          fontWeight: 600,
          marginBottom: 16,
        }}
      >
        404
      </p>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 28,
          fontWeight: 400,
          color: "var(--color-ink)",
          letterSpacing: "-0.015em",
          lineHeight: 1.2,
          margin: "0 0 12px",
        }}
      >
        Diese Seite gibt es nicht.
      </h1>

      <p
        style={{
          fontSize: 15,
          color: "var(--color-muted)",
          lineHeight: 1.6,
          maxWidth: 320,
          margin: "0 0 36px",
        }}
      >
        Vielleicht wurde der Link geändert oder der Beitrag gelöscht.
      </p>

      <Link
        href="/feed"
        style={{
          display: "inline-block",
          background: "var(--color-cobalt)",
          color: "#fff",
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          fontWeight: 500,
          borderRadius: 999,
          padding: "10px 24px",
          textDecoration: "none",
        }}
      >
        Zurück zum Feed
      </Link>
    </div>
  );
}
