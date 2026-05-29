"use client";

import Link from "next/link";
import { MessageCircle, MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";
import { MeetingChip } from "@/components/app/MeetingChip";
import { ContactButton } from "@/components/app/ContactButton";
import { SaveButton } from "@/components/app/SaveButton";
import type { FeedPost } from "@/types";

export type { FeedPost as Post };

export function PostCard({ post }: { post: FeedPost }) {
  return (
    <article
      className="post-card"
      style={{
        position: "relative",
        background: "var(--color-ivory)",
        border: "1px solid var(--color-line-soft)",
        cursor: "pointer",
        transition: `border-color var(--dur-base)`,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        overflow: "hidden",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "var(--color-line)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--color-line-soft)")
      }
    >
      {/* Color accent bar for events and meetings */}
      {(post.type === "veranstaltung" || post.type === "treffen") && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background:
              post.type === "veranstaltung"
                ? "var(--color-clay)"
                : "var(--color-cobalt)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Overlay link — sits under interactive elements */}
      <Link
        href={`/feed/${post.id}`}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          borderRadius: "inherit",
        }}
        aria-label={post.title}
      />

      {/* Author row */}
      <header
        style={{
          position: "relative",
          zIndex: 1,
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
          position: "relative",
          zIndex: 1,
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
            position: "relative",
            zIndex: 1,
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
      {post.meeting && (
        <div style={{ position: "relative", zIndex: 1 }}>
          <MeetingChip {...post.meeting} />
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
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
  );
}

/** Compact card for the "Heute" feed section. */
export function CompactPost({ post }: { post: FeedPost }) {
  const isUnanswered = post.comments === 0;
  const actionColor = isUnanswered ? "var(--color-clay-deep)" : "var(--color-cobalt)";

  return (
    <article
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "40px 1fr auto",
        gap: 18,
        alignItems: "start",
        background: "var(--color-paper)",
        border: "1px solid var(--color-line-soft)",
        borderRadius: 18,
        padding: "22px 24px",
        cursor: "pointer",
        transition: "border-color var(--dur-base)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "var(--color-line)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--color-line-soft)")
      }
    >
      {/* Overlay link */}
      <Link
        href={`/feed/${post.id}`}
        style={{ position: "absolute", inset: 0, zIndex: 0, borderRadius: "inherit" }}
        aria-label={post.title}
      />

      {/* Avatar */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Avatar letter={post.author[0]} size={40} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, minWidth: 0 }}>
        {/* Meta line */}
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 12,
            color: "var(--color-muted)",
            lineHeight: 1.3,
          }}
        >
          <strong style={{ color: "var(--color-ink-2)", fontWeight: 600 }}>
            {post.author}
          </strong>
          {" · "}
          {post.district}
          {" · "}
          {post.time}
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 22,
            lineHeight: 1.25,
            letterSpacing: "-0.005em",
            color: "var(--color-ink)",
            margin: "6px 0 4px",
          }}
        >
          {post.title}
        </div>

        {/* Teaser — 1-line clamp */}
        {post.body && (
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              color: "var(--color-muted)",
              lineHeight: 1.5,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              maxWidth: 560,
            }}
          >
            {post.body}
          </div>
        )}

        {/* Action line */}
        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            marginTop: 12,
            fontSize: 12.5,
            position: "relative",
            zIndex: 2,
          }}
        >
          {post.meeting?.where && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                color: "var(--color-muted)",
              }}
            >
              <MapPin size={12} strokeWidth={1.5} />
              {post.meeting.where}
            </span>
          )}
          <Link
            href={`/feed/${post.id}`}
            style={{
              color: actionColor,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            {post.comments} {post.comments === 1 ? "Antwort" : "Antworten"}
          </Link>
          <ContactButton
            recipientName={post.author}
            postId={post.id}
            postTitle={post.title}
          />
        </div>
      </div>

      {/* Tag — top-aligned right column */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Tag type={post.type} />
      </div>
    </article>
  );
}

export function SmartPost({ post }: { post: FeedPost }) {
  return <CompactPost post={post} />;
}
