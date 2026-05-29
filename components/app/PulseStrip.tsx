import React from "react";
import type { FeedPost } from "@/types";

export function PulseStrip({ posts }: { posts: FeedPost[] }) {
  const heuteTreffen = posts.filter(
    (p) => p.section === "heute" && (p.type === "treffen" || p.type === "veranstaltung")
  ).length;
  const fragenWarten = posts.filter((p) => p.type === "frage" && p.comments === 0).length;
  const neueBeitraege = posts.length;

  const stats = [
    { n: heuteTreffen, label: "Treffen heute" },
    { n: fragenWarten, label: "Fragen warten" },
    { n: neueBeitraege, label: "neue Beiträge" },
  ].filter((s) => s.n > 0);

  if (stats.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 22,
        borderTop: "1px solid var(--color-line-soft)",
        borderBottom: "1px solid var(--color-line-soft)",
        padding: "14px 0",
        flexWrap: "wrap",
      }}
    >
      {stats.map((stat, i) => (
        <React.Fragment key={stat.label}>
          {i > 0 && (
            <div
              style={{
                width: 1,
                height: 18,
                background: "var(--color-line)",
                flexShrink: 0,
              }}
            />
          )}
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 19,
                color: "var(--color-ink)",
                lineHeight: 1,
              }}
            >
              {stat.n}
            </span>
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 12,
                color: "var(--color-muted)",
              }}
            >
              {stat.label}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
