"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircle, MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";
import { MeetingChip } from "@/components/app/MeetingChip";
import { ContactButton } from "@/components/app/ContactButton";
import { SaveButton } from "@/components/app/SaveButton";
import type { FeedPost } from "@/types";

export type { FeedPost as Post };

// ─── Full PostCard (detail pages, desktop sidebar) ────────────────────────────
// Marketing rule: Serif is allowed here because it's editorial/detail context.

export function PostCard({ post }: { post: FeedPost }) {
  const router = useRouter();

  function handleCardClick(e: React.MouseEvent<HTMLElement>) {
    if ((e.target as HTMLElement).closest("button, a, input, [role='button']")) return;
    router.push(`/feed/${post.id}`);
  }

  return (
    <article
      className="post-card"
      onClick={handleCardClick}
      style={{
        background: "var(--color-ivory)",
        border: "1px solid var(--color-line-soft)",
        cursor: "pointer",
        transition: `border-color var(--dur-base)`,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        overflow: "hidden",
        position: "relative",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-line)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-line-soft)")}
    >
      {(post.type === "veranstaltung" || post.type === "treffen") && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: post.type === "veranstaltung" ? "var(--color-clay)" : "var(--color-cobalt)",
          pointerEvents: "none",
        }} />
      )}

      <header style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Avatar letter={post.author[0]} size={32} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2, fontFamily: "var(--font-ui)" }}>
            {post.author}
          </div>
          <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 1, fontFamily: "var(--font-ui)" }}>
            {post.district} · {post.time}
          </div>
        </div>
        <Tag type={post.type} />
      </header>

      {/* Title — Serif OK here, this is the full/detail card */}
      <h3 className="post-card-title" style={{
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontWeight: 400,
        color: "var(--color-ink)",
        margin: 0,
      }}>
        <Link href={`/feed/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          {post.title}
        </Link>
      </h3>

      {post.body && (
        <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--color-muted)", margin: 0, fontFamily: "var(--font-ui)" }}>
          {post.body}
        </p>
      )}

      {post.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.imageUrl} alt="" loading="lazy" style={{
          width: "100%", maxHeight: 360, objectFit: "cover",
          borderRadius: 12, border: "1px solid var(--color-line-soft)", display: "block",
        }} />
      )}

      {post.meeting && <MeetingChip {...post.meeting} />}

      <footer style={{
        display: "flex", gap: 14, alignItems: "center",
        color: "var(--color-muted)", fontSize: 13,
        paddingTop: 12, borderTop: "1px solid var(--color-line-soft)",
        fontFamily: "var(--font-ui)",
      }}>
        <ContactButton recipientName={post.author} postId={post.id} postTitle={post.title} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <MessageCircle size={14} strokeWidth={1.5} />
          {post.comments} {post.comments === 1 ? "Kommentar" : "Kommentare"}
        </span>
        <SaveButton postId={post.id} initialSaved={post.isSaved ?? false} />
      </footer>
    </article>
  );
}

// ─── CompactPost — the feed card ─────────────────────────────────────────────
//
// Design rule: Produkt = Sans. Serif stays on marketing/landing pages only.
//
// Hierarchy per spec:
//   1. Titel (dominant, sans 600, max 2 Zeilen)
//   2. Stadtteil · Zeitpunkt (muted, 12px)
//   3. Badge (Tag pill)
//   4. CTA (Antworten)
//
// Target: 3–4 cards visible on iPhone 13 Mini (375×812) without scrolling.

export function CompactPost({ post }: { post: FeedPost }) {
  const isUnanswered = post.comments === 0;
  const ctaColor = isUnanswered ? "var(--color-clay-deep)" : "var(--color-cobalt)";

  return (
    <article style={{
      position: "relative",
      background: "var(--color-ivory)",
      border: "1px solid var(--color-line-soft)",
      borderRadius: 14,
      padding: "14px 16px",
      cursor: "pointer",
      transition: "border-color 150ms ease",
    }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-line)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-line-soft)")}
    >
      {/* Full-card overlay link */}
      <Link
        href={`/feed/${post.id}`}
        style={{ position: "absolute", inset: 0, zIndex: 0, borderRadius: "inherit" }}
        aria-label={post.title}
      />

      {/* Row 1: avatar · name · district · time + tag */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 7,
        position: "relative",
        zIndex: 1,
        minWidth: 0,
      }}>
        <Avatar letter={post.author[0]} size={20} />
        <span style={{
          fontFamily: "var(--font-ui)",
          fontSize: 12,
          fontWeight: 500,
          color: "var(--color-ink-2)",
          flexShrink: 0,
        }}>
          {post.author}
        </span>
        <span style={{
          fontFamily: "var(--font-ui)",
          fontSize: 12,
          color: "var(--color-muted)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          flex: 1,
          minWidth: 0,
        }}>
          · {post.district} · {post.time}
        </span>
        <div style={{ flexShrink: 0, marginLeft: 4 }}>
          <Tag type={post.type} />
        </div>
      </div>

      {/* Row 2: Title — SANS, 600, 2-line max */}
      <div style={{
        fontFamily: "var(--font-ui)",
        fontWeight: 600,
        fontSize: 15,
        lineHeight: 1.35,
        letterSpacing: "-0.01em",
        color: "var(--color-ink)",
        marginBottom: 9,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
      }}>
        {post.title}
      </div>

      {/* Row 3: CTA row */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        position: "relative",
        zIndex: 1,
        fontFamily: "var(--font-ui)",
        fontSize: 12,
      }}>
        {post.meeting?.where && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 3,
            color: "var(--color-muted)", flexShrink: 0,
          }}>
            <MapPin size={11} strokeWidth={1.5} />
            {post.meeting.where}
          </span>
        )}

        <span style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          color: "var(--color-muted)",
        }}>
          <MessageCircle size={12} strokeWidth={1.5} />
          {post.comments} {post.comments === 1 ? "Antwort" : "Antworten"}
        </span>

        <div style={{ flex: 1 }} />

        {/* CTA — elevated z-index so click registers over the overlay link */}
        <Link
          href={`/feed/${post.id}`}
          style={{
            color: ctaColor,
            fontWeight: 600,
            fontSize: 12,
            textDecoration: "none",
            whiteSpace: "nowrap",
            position: "relative",
            zIndex: 2,
          }}
        >
          {isUnanswered ? "Als erste antworten →" : "Antworten →"}
        </Link>

        <div style={{ position: "relative", zIndex: 2 }}>
          <ContactButton
            recipientName={post.author}
            postId={post.id}
            postTitle={post.title}
          />
        </div>
      </div>
    </article>
  );
}

export function SmartPost({ post }: { post: FeedPost }) {
  return <CompactPost post={post} />;
}
