"use client";

import Link from "next/link";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";
import { MeetingChip } from "@/components/app/MeetingChip";
import type { FeedPost } from "@/types";

// Re-export so FeedColumn can import from one place
export type { FeedPost as Post };

export function PostCard({ post }: { post: FeedPost }) {
  return (
    <Link
      href={`/feed/${post.id}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
    <div
      style={{
        background: "var(--surface-card)",
        borderRadius: 20,
        border: "1px solid var(--border)",
        padding: 24,
        cursor: "pointer",
        transition: `border-color var(--dur-base)`,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "var(--cobalt-200)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border)")
      }
    >
      {/* Author row */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <Avatar letter={post.author[0]} size={40} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14.5, fontWeight: 500 }}>{post.author}</div>
          <div style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>
            {post.district} · {post.time}
          </div>
        </div>
        <Tag type={post.type} size="s" />
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 24,
          lineHeight: 1.2,
          letterSpacing: "-0.015em",
          marginBottom: post.body ? 10 : 14,
        }}
      >
        {post.title}
      </div>

      {/* Body */}
      {post.body && (
        <div
          style={{
            fontSize: 15,
            lineHeight: 1.55,
            color: "var(--fg-muted)",
            marginBottom: 16,
          }}
        >
          {post.body}
        </div>
      )}

      {/* Meeting chip */}
      {post.meeting && <MeetingChip {...post.meeting} />}

      {/* Reactions */}
      <div
        style={{
          display: "flex",
          gap: 22,
          alignItems: "center",
          color: "var(--fg-muted)",
          fontSize: 13.5,
          marginTop: post.meeting ? 16 : 0,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Heart size={16} strokeWidth={1.5} /> {post.likes}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <MessageCircle size={16} strokeWidth={1.5} /> {post.comments}{" "}
          Kommentare
        </span>
        <span
          style={{
            marginLeft: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
          }}
        >
          <Bookmark size={16} strokeWidth={1.5} /> Speichern
        </span>
      </div>
    </div>
    </Link>
  );
}

export function CompactPost({ post }: { post: FeedPost }) {
  return (
    <Link
      href={`/feed/${post.id}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
    <div
      style={{
        background: "var(--surface-card)",
        borderRadius: 16,
        border: "1px solid var(--border)",
        padding: "16px 20px",
        cursor: "pointer",
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        transition: `border-color var(--dur-base)`,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "var(--cobalt-200)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border)")
      }
    >
      <Avatar letter={post.author[0]} size={32} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginBottom: 5,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 13.5, fontWeight: 500 }}>{post.author}</span>
          <span style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>
            {post.district} · {post.time}
          </span>
          <Tag type={post.type} size="s" />
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 18,
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 10,
            fontSize: 12.5,
            color: "var(--fg-muted)",
          }}
        >
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
          >
            <MessageCircle size={13} strokeWidth={1.5} /> {post.comments}{" "}
            {post.comments === 1 ? "Antwort" : "Antworten"}
          </span>
        </div>
      </div>
    </div>
    </Link>
  );
}

export function SmartPost({ post }: { post: FeedPost }) {
  if (post.type === "frage" || post.type === "suche")
    return <CompactPost post={post} />;
  return <PostCard post={post} />;
}
