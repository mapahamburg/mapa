"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import type { FeedPost } from "@/types";

// ─── Error boundary ────────────────────────────────────────────────────────────

class MapErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          width: "100%", height: "calc(100dvh - 64px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "var(--surface-page)",
        }}>
          <div style={{
            background: "var(--surface-card)",
            border: "1px solid var(--border)",
            borderRadius: 16, padding: "24px 32px", maxWidth: 400, textAlign: "center",
          }}>
            <div style={{ fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 18, color: "var(--ink)", marginBottom: 8 }}>
              Karte konnte nicht geladen werden.
            </div>
            <code style={{ fontSize: 12, color: "var(--fg-muted)", display: "block", wordBreak: "break-all" }}>
              {(this.state.error as Error).message}
            </code>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Dynamic import ────────────────────────────────────────────────────────────

const KarteView = dynamic(
  () => import("./KarteView").then((m) => m.KarteView),
  {
    ssr: false,
    loading: () => (
      <div style={{
        width: "100%",
        height: "calc(100dvh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--surface-page)",
      }}>
        <span style={{
          fontFamily: "var(--font-ui)",
          fontWeight: 500,
          fontSize: 18,
          color: "var(--fg-muted)",
        }}>
          Karte lädt…
        </span>
      </div>
    ),
  }
);

export function KarteLoader({ posts }: { posts: FeedPost[] }) {
  return (
    <MapErrorBoundary>
      <KarteView posts={posts} />
    </MapErrorBoundary>
  );
}
