"use client";

import { useState } from "react";
import { SmartPost } from "@/components/app/PostCard";
import { HeuteWidget } from "@/components/app/HeuteWidget";
import type { FeedPost } from "@/types";

const DISTRICTS = [
  "Alle Stadtteile",
  "Eppendorf",
  "Winterhude",
  "Ottensen",
  "Eimsbüttel",
  "Sternschanze",
  "Altona",
  "Hoheluft",
];

function SectionHeader({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: string;
}) {
  return (
    <div
      style={{
        padding: "32px 0 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 600,
          fontFamily: "var(--font-mono)",
          color: "var(--fg-muted)",
        }}
      >
        {children}
      </span>
      {action && (
        <span
          style={{
            fontSize: 13,
            color: "var(--cobalt-500)",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {action}
        </span>
      )}
    </div>
  );
}

interface FeedColumnProps {
  posts: FeedPost[];
  userName?: string;
}

export function FeedColumn({ posts, userName = "Lina" }: FeedColumnProps) {
  const [district, setDistrict] = useState("Alle Stadtteile");

  const visible =
    district === "Alle Stadtteile"
      ? posts
      : posts.filter((p) => p.district === district);

  const heute = visible.filter((p) => p.section === "heute");
  const woche = visible.filter((p) => p.section === "woche");

  return (
    <main className="app-feed">
      {/* Greeting */}
      <div>
        <div
          className="feed-greeting"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            color: "var(--ink)",
          }}
        >
          Hallo {userName}.
        </div>
        <div style={{ fontSize: 15, color: "var(--fg-muted)", marginTop: 4 }}>
          Heute neu in deinem Stadtteil.
        </div>
      </div>

      {/* District filter */}
      <div className="district-filter-row">
        {DISTRICTS.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDistrict(d)}
            className="district-filter-chip"
            style={{
              background:
                district === d ? "var(--ink)" : "var(--surface-card)",
              color: district === d ? "#fff" : "var(--fg)",
              border: district === d ? "none" : "1px solid var(--border)",
              fontFamily: "var(--font-ui)",
              fontWeight: district === d ? 500 : 400,
              cursor: "pointer",
              transition: `background var(--dur-base), color var(--dur-base)`,
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Heute-Widget: zeigt heutige Events & Treffen als Chips */}
      <HeuteWidget posts={visible} />

      {/* Heute */}
      {heute.length > 0 && <SectionHeader>Heute</SectionHeader>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {heute.map((p) => (
          <SmartPost key={p.id} post={p} />
        ))}
      </div>

      {/* Diese Woche */}
      {woche.length > 0 && (
        <SectionHeader action="Älter ansehen">Diese Woche</SectionHeader>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {woche.map((p) => (
          <SmartPost key={p.id} post={p} />
        ))}
      </div>

      {/* Empty state */}
      {visible.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "64px 0",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 20,
              color: "var(--fg-muted)",
              letterSpacing: "-0.01em",
            }}
          >
            Noch nichts hier.
          </div>
          <div
            style={{
              fontSize: 14,
              color: "var(--fg-subtle)",
              marginTop: 8,
            }}
          >
            Sei die erste Person, die etwas in diesem Stadtteil teilt.
          </div>
        </div>
      )}

      {/* End of feed */}
      {visible.length > 0 && (
        <div style={{ textAlign: "center", padding: "48px 0 16px" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 18,
              color: "var(--fg-muted)",
              letterSpacing: "-0.01em",
            }}
          >
            Das war&apos;s für jetzt.
          </div>
          <div
            style={{ fontSize: 13, color: "var(--fg-subtle)", marginTop: 8 }}
          >
            Schau später wieder vorbei. Es kommen täglich neue Beiträge.
          </div>
        </div>
      )}
    </main>
  );
}
