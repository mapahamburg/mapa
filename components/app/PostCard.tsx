"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";
import { MeetingChip } from "@/components/app/MeetingChip";
import { ContactButton } from "@/components/app/ContactButton";
import { SaveButton } from "@/components/app/SaveButton";
import type { FeedPost } from "@/types";

// Re-export so FeedColumn can import from one place
export type { FeedPost as Post };

export function PostCard({ post }: { post: FeedPost }) {
  return (
    <Link
      href={`/feed/${post.id}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <article
        className="post-card"
        style={{
          background: "var(--color-ivory)",
          border: "1px solid var(--color-line-soft)",
          cursor: "pointer",
          transition: `border-color var(--dur-base)`,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-sage)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-line-soft)")
        }
      >
        {/* Author row */}
        <header
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          <Avatar letter={post.author[0]} size={40} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>
              {post.author}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--color-muted)",
                marginTop: 2,
              }}
            >
              {post.district} · {post.time}
            </div>
          </div>
          <Tag type={post.type} />
        </header>

        {/* Title */}
        <h3
          className="post-card-title"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "var(--color-ink)",
            margin: 0,
          }}
        >
          {post.title}
        </h3>

        {/* Body */}
        {post.body && (
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.55,
              color: "var(--color-muted)",
              margin: 0,
            }}
          >
            {post.body}
          </p>
        )}

        {/* Meeting chip */}
        {post.meeting && <MeetingChip {...post.meeting} />}

        {/* Footer */}
        <footer
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            color: "var(--color-muted)",
            fontSize: 13,
            paddingTop: 16,
            borderTop: "1px solid var(--color-line-soft)",
          }}
        >
          <ContactButton
            recipientName={post.author}
            postId={post.id}
            postTitle={post.title}
          />
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <MessageCircle size={15} strokeWidth={1.5} /> {post.comments}{" "}
            {post.comments === 1 ? "Kommentar" : "Kommentare"}
          </span>
          <SaveButton postId={post.id} initialSaved={post.isSaved ?? false} />
        </footer>
      </article>
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
          background: "var(--color-ivory)",
          borderRadius: 16,
          border: "1px solid var(--color-line-soft)",
          padding: "16px 20px",
          cursor: "pointer",
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
          transition: `border-color var(--dur-base)`,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-sage)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-line-soft)")
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
            <span style={{ fontSize: 13, fontWeight: 600 }}>{post.author}</span>
            <span style={{ fontSize: 12.5, color: "var(--color-muted)" }}>
              {post.district} · {post.time}
            </span>
            <Tag type={post.type} />
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.25,
              letterSpacing: "-0.005em",
              color: "var(--color-ink)",
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
              color: "var(--color-muted)",
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
