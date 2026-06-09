"use client";

import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import type { FeedPost } from "@/types";

/**
 * Kompakte Chip-Leiste mit heutigen Events und Treffen.
 * Gibt null zurück wenn keine relevanten Posts vorhanden sind.
 */
export function HeuteWidget({ posts }: { posts: FeedPost[] }) {
  const events = posts.filter(
    (p) =>
      p.section === "heute" &&
      (p.type === "veranstaltung" || p.type === "treffen")
  );

  if (events.length === 0) return null;

  return (
    <div>
      {/* Eyebrow */}
      <div
        style={{
          fontSize: 11,
          fontFamily: "var(--font-mono)",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--fg-muted)",
          marginBottom: 12,
        }}
      >
        Heute im Stadtteil
      </div>

      {/* Horizontale Chip-Leiste */}
      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: 2,
        }}
      >
        {events.map((post) => {
          const isEvent = post.type === "veranstaltung";
          const Icon = isEvent ? Calendar : Users;

          return (
            <Link
              key={post.id}
              href={`/feed/${post.id}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                flexShrink: 0,
                maxWidth: 280,
                background: isEvent
                  ? "var(--color-clay-soft)"
                  : "var(--color-sage-soft)",
                border: `1px solid ${isEvent ? "rgba(194,106,63,0.25)" : "rgba(111,133,90,0.25)"}`,
                borderRadius: 999,
                padding: "7px 14px",
                textDecoration: "none",
                fontFamily: "var(--font-ui)",
                fontSize: 13.5,
                color: "var(--ink)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                transition: "border-color var(--dur-base)",
              }}
            >
              <Icon
                size={13}
                strokeWidth={1.5}
                style={{
                  flexShrink: 0,
                  color: isEvent
                    ? "var(--color-clay-deep)"
                    : "var(--color-sage-deep)",
                }}
              />
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {post.title}
              </span>
              {post.meeting?.when && (
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--fg-muted)",
                    flexShrink: 0,
                    marginLeft: 2,
                  }}
                >
                  · {post.meeting.when}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
