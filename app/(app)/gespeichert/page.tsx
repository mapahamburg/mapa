import type { Metadata } from "next";
import { Bookmark } from "lucide-react";
import { getSavedPosts } from "@/lib/feed";
import { PostCard } from "@/components/app/PostCard";

export const metadata: Metadata = {
  title: "Gespeichert · mapa",
};

export default async function GespeichertPage() {
  const posts = await getSavedPosts();

  return (
    <main className="app-main-pad">
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--fg-subtle)",
          margin: "0 0 8px",
        }}>
          Deine Sammlung
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
          Gespeichert
        </h1>
        <p style={{
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          color: "var(--fg-muted)",
          margin: 0,
        }}>
          Beiträge, die du dir gemerkt hast.
        </p>
      </div>

      {posts.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "56px 24px",
          background: "var(--surface-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-l)",
        }}>
          <Bookmark size={28} strokeWidth={1.5} color="var(--fg-subtle)" style={{ marginBottom: 14 }} />
          <p style={{
            fontFamily: "var(--font-ui)",
            fontSize: 18,
            fontWeight: 500,
            color: "var(--fg-muted)",
            margin: "0 0 8px",
          }}>
            Noch nichts gespeichert.
          </p>
          <p style={{
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            color: "var(--fg-subtle)",
            margin: 0,
          }}>
            Klick auf „Speichern" bei einem Beitrag im Feed.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
