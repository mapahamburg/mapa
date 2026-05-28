"use client";

import dynamic from "next/dynamic";
import type { FeedPost } from "@/types";

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
        background: "var(--mapa-cream)",
      }}>
        <span style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
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
  return <KarteView posts={posts} />;
}
