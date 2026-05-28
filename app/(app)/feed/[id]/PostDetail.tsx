"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  Send,
  Heart,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { createComment, type CommentState } from "@/app/actions/comments";
import { toggleReaction } from "@/app/actions/reactions";
import type { PostDetail as PostDetailData, CommentItem } from "@/types";

// ─── Post type pill config ────────────────────────────────────────────────────

const TYPE_CONFIG: Record<string, { label: string; bg: string; fg: string }> = {
  empfehlung:    { label: "Empfehlung",    bg: "var(--cobalt-50)",    fg: "var(--cobalt-700)" },
  frage:         { label: "Frage",         bg: "var(--surface-card)", fg: "var(--ink)" },
  treffen:       { label: "Treffen",       bg: "var(--ash-100)",      fg: "var(--ash-900)" },
  suche:         { label: "Suche",         bg: "var(--ash-100)",      fg: "var(--ash-900)" },
  veranstaltung: { label: "Veranstaltung", bg: "var(--ash-100)",      fg: "var(--ash-900)" },
};

// ─── Sticky comment composer ──────────────────────────────────────────────────

function StickyComposer({ postId }: { postId: string }) {
  const [body, setBody] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initialState: CommentState = {};
  const [state, formAction, isPending] = useActionState(
    createComment,
    initialState
  );

  function handleInput() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }

  useEffect(() => {
    if (state.message) {
      setBody("");
      if (textareaRef.current) textareaRef.current.style.height = "40px";
    }
  }, [state.message]);

  return (
    <div className="sticky-composer">
      <form
        action={formAction}
        style={{
          maxWidth: 680,
          margin: "0 auto",
          display: "flex",
          alignItems: "flex-end",
          gap: 12,
        }}
      >
        <input type="hidden" name="post_id" value={postId} />
        <textarea
          ref={textareaRef}
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onInput={handleInput}
          placeholder="Schreib eine Antwort…"
          rows={1}
          style={{
            flex: 1,
            minHeight: 40,
            maxHeight: 120,
            resize: "none",
            overflow: "hidden",
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            lineHeight: 1.5,
            color: "var(--fg)",
            background: "var(--surface-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "9px 14px",
            outline: "none",
            transition: "border-color var(--dur-base)",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "var(--cobalt-500)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "var(--border)")
          }
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending || !body.trim()}
          aria-label="Antwort senden"
          style={{
            width: 36,
            height: 36,
            borderRadius: "var(--radius-pill)",
            background: body.trim() ? "var(--cobalt-500)" : "var(--cobalt-50)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: body.trim() ? "pointer" : "not-allowed",
            flexShrink: 0,
            transition: "background var(--dur-base)",
          }}
        >
          <Send
            size={16}
            strokeWidth={1.5}
            color={body.trim() ? "#fff" : "var(--ash-400)"}
          />
        </button>
      </form>
      {state.error && (
        <p
          style={{
            maxWidth: 680,
            margin: "6px auto 0",
            fontSize: 12,
            color: "var(--danger)",
            fontFamily: "var(--font-ui)",
          }}
        >
          {state.error}
        </p>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function PostDetail({
  post,
  comments,
  userHasReacted,
}: {
  post: PostDetailData;
  comments: CommentItem[];
  userHasReacted: boolean;
}) {
  const [reacted, setReacted] = useState(userHasReacted);
  const [isPending, setIsPending] = useState(false);
  const typeConfig = TYPE_CONFIG[post.type] ?? TYPE_CONFIG.empfehlung;

  return (
    <>
      <article
        className="post-detail-article"
        style={{ fontFamily: "var(--font-ui)" }}
      >
        {/* Back link */}
        <Link
          href="/feed"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            textDecoration: "none",
            color: "var(--fg-subtle)",
            fontSize: 14,
          }}
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Zurück zum Feed
        </Link>

        {/* Post card */}
        <div
          style={{
            background: "var(--surface-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xl)",
            padding: 32,
            marginTop: 20,
          }}
        >
          {/* Type pill */}
          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "var(--radius-pill)",
              background: typeConfig.bg,
              color: typeConfig.fg,
              fontSize: 12,
              fontWeight: 500,
              fontFamily: "var(--font-ui)",
              letterSpacing: "0.01em",
            }}
          >
            {typeConfig.label}
          </span>

          {/* Title */}
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              lineHeight: 1.2,
              margin: "16px 0 0",
              color: "var(--ink)",
              letterSpacing: "-0.03em",
            }}
          >
            {post.title}
          </h1>

          {/* Author row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 16,
            }}
          >
            <Avatar letter={post.author_name[0]} size={40} />
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--fg)" }}>
              {post.author_name}
            </span>
            <span style={{ fontSize: 13, color: "var(--fg-subtle)" }}>
              · {post.stadtteil} · {post.created_at}
            </span>
          </div>

          {/* Body */}
          {post.body && (
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--fg-muted)",
                marginTop: 20,
              }}
            >
              {post.body}
            </p>
          )}

          {/* Meeting block */}
          {(post.meeting_location || post.meeting_date) && (
            <div
              style={{
                background: "var(--surface-page-deep)",
                border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-md)",
                padding: 16,
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {post.meeting_location && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    color: "var(--fg-muted)",
                  }}
                >
                  <MapPin size={15} strokeWidth={1.5} color="var(--cobalt-500)" />
                  {post.meeting_location}
                </div>
              )}
              {post.meeting_date && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    color: "var(--fg-muted)",
                  }}
                >
                  <Calendar size={15} strokeWidth={1.5} color="var(--cobalt-500)" />
                  {post.meeting_date}
                </div>
              )}
              {(post.min_age !== undefined || post.max_age !== undefined) && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    color: "var(--fg-muted)",
                  }}
                >
                  <Users size={15} strokeWidth={1.5} color="var(--cobalt-500)" />
                  {post.min_age !== undefined && post.max_age !== undefined
                    ? `Kinder von ${post.min_age} bis ${post.max_age} Jahren`
                    : post.min_age !== undefined
                    ? `Ab ${post.min_age} Jahren`
                    : `Bis ${post.max_age} Jahren`}
                </div>
              )}
            </div>
          )}

          {/* Reaction */}
          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: "1px solid var(--border)",
            }}
          >
            <button
              type="button"
              onClick={async () => {
                if (isPending) return;
                setIsPending(true);
                setReacted((v) => !v); // optimistic
                try {
                  const result = await toggleReaction(post.id);
                  setReacted(result.reacted);
                } catch {
                  setReacted((v) => !v); // revert on error
                } finally {
                  setIsPending(false);
                }
              }}
              disabled={isPending}
              aria-pressed={reacted}
              aria-label="Als hilfreich markieren"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                fontSize: 13,
                color: reacted ? "var(--cobalt-500)" : "var(--fg-subtle)",
                transition: "color var(--dur-base)",
              }}
            >
              <Heart
                size={16}
                strokeWidth={1.5}
                fill={reacted ? "var(--cobalt-500)" : "none"}
              />
              Hilfreich
            </button>
          </div>
        </div>

        {/* Comments section */}
        <section style={{ marginTop: 32 }} aria-label="Antworten">
          <p
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "var(--fg)",
              margin: "0 0 16px",
            }}
          >
            {comments.length}{" "}
            {comments.length === 1 ? "Antwort" : "Antworten"}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {comments.map((comment) => (
              <article key={comment.id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <Avatar letter={comment.author_name[0]} size={32} />
                  <span
                    style={{ fontSize: 13, fontWeight: 500, color: "var(--fg)" }}
                  >
                    {comment.author_name}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--fg-subtle)" }}>
                    {comment.created_at}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "var(--fg-muted)",
                    margin: 0,
                    paddingLeft: 40,
                  }}
                >
                  {comment.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {comments.length === 0 && (
          <div
            style={{
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--fg-subtle)",
              fontSize: 14,
            }}
          >
            <MessageSquare size={16} strokeWidth={1.5} />
            Noch keine Antworten. Sei die erste Person.
          </div>
        )}
      </article>

      <StickyComposer postId={post.id} />
    </>
  );
}
