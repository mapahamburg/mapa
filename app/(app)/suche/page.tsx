import type { Metadata } from "next";
import { getSearchResults } from "@/lib/feed";
import { PostCard } from "@/components/app/PostCard";
import { SearchBar } from "@/components/app/SearchBar";

export const metadata: Metadata = { title: "Suche · mapa" };

export default async function SuchePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? await getSearchResults(query) : [];

  return (
    <main className="app-main-pad">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{
          fontFamily: "var(--font-ui)",
          fontSize: 28,
          fontWeight: 700,
          color: "var(--ink)",
          margin: "0 0 16px",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
        }}>
          {query ? `„${query}"` : "Suche"}
        </h1>

        {/* Suchfeld auf der Ergebnisseite (mobil + Re-Suche) */}
        <SearchBar initialQuery={query} />
      </div>

      {/* Ergebnisse */}
      {!query ? (
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--fg-muted)" }}>
          Gib einen Begriff ein, um Beiträge zu finden.
        </p>
      ) : results.length === 0 ? (
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
            fontWeight: 600,
            color: "var(--fg-muted)",
            margin: "0 0 8px",
          }}>
            Keine Ergebnisse für „{query}".
          </p>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--fg-subtle)", margin: 0 }}>
            Versuch einen anderen Begriff oder stell selbst eine Frage im Feed.
          </p>
        </div>
      ) : (
        <>
          <p style={{
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            color: "var(--fg-muted)",
            margin: "0 0 16px",
          }}>
            {results.length} {results.length === 1 ? "Ergebnis" : "Ergebnisse"}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {results.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
