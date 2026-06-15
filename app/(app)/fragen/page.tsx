import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { getFragenPosts } from "@/lib/feed";
import { PostCard } from "@/components/app/PostCard";

export const metadata: Metadata = {
  title: "Offene Fragen · mapa",
};

export default async function FragenPage() {
  const fragen = await getFragenPosts();

  return (
    <main className="app-main-pad">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--fg-subtle)",
          margin: "0 0 8px",
        }}>
          Im Stadtteil
        </p>
        <h1 style={{
          fontFamily: "var(--font-ui)",
          fontSize: 32,
          fontWeight: 700,
          color: "var(--ink)",
          margin: "0 0 6px",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
        }}>
          Offene Fragen
        </h1>
        <p style={{
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          color: "var(--fg-muted)",
          margin: 0,
        }}>
          Vielleicht weißt du die Antwort.
        </p>
      </div>

      {/* Frage stellen CTA */}
      <Link
        href="/feed/new"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "var(--surface-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-l)",
          padding: "14px 20px",
          marginBottom: 32,
          textDecoration: "none",
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          color: "var(--fg-muted)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <HelpCircle size={16} strokeWidth={1.5} color="var(--color-clay-deep)" />
        <span>Frage stellen…</span>
      </Link>

      {/* Liste */}
      {fragen.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "48px 24px",
          background: "var(--surface-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-l)",
        }}>
          <p style={{
            fontFamily: "var(--font-ui)",
            fontSize: 18,
            fontWeight: 500,
            color: "var(--fg-muted)",
            margin: 0,
          }}>
            Noch keine offenen Fragen in den letzten 30 Tagen.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {fragen.map((f) => (
            <PostCard key={f.id} post={f} />
          ))}
        </div>
      )}
    </main>
  );
}
