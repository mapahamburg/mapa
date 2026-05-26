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
import { createComment, type CommentState } from "@/app/actions/comments";

// ─── Types ────────────────────────────────────────────────────────────────────

type Author = {
  name: string;
  stadtteil?: string;
  gradient: string;
};

type PostData = {
  id: string;
  type: string;
  title: string;
  body?: string;
  author: Author;
  stadtteil: string;
  created_at: string;
  comment_count: number;
  meeting_location?: string;
  meeting_date?: string;
  min_age?: number;
  max_age?: number;
};

type CommentData = {
  id: string;
  author: Author;
  body: string;
  created_at: string;
};

// ─── Post type pill config ────────────────────────────────────────────────────

const TYPE_CONFIG: Record<
  string,
  { label: string; bg: string; fg: string }
> = {
  empfehlung:    { label: "Empfehlung",    bg: "#EAF0E6", fg: "#4A6741" },
  frage:         { label: "Frage",         bg: "#E0EBF5", fg: "#2E6A9E" },
  treffen:       { label: "Treffen",       bg: "#F5EBE0", fg: "#A0522D" },
  suche:         { label: "Suche",         bg: "#EDE8DF", fg: "#7A6F63" },
  veranstaltung: { label: "Veranstaltung", bg: "#EAE6F0", fg: "#5B4D8A" },
};

// ─── Avatar circle ────────────────────────────────────────────────────────────

function GradientAvatar({
  gradient,
  name,
  size,
}: {
  gradient: string;
  name: string;
  size: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius-pill)",
        background: gradient,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display)",
        fontSize: size * 0.42,
        color: "var(--mapa-paper)",
      }}
    >
      {name[0]}
    </div>
  );
}

// ─── Composer ─────────────────────────────────────────────────────────────────

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

  // Clear textarea on successful submission
  useEffect(() => {
    if (state.message) {
      setBody("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "40px";
      }
    }
  }, [state.message]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderTop: "1px solid var(--mapa-line)",
        background: "rgba(242, 235, 222, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "12px 16px",
      }}
    >
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
          placeholder="Schreib eine Antwort..."
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
            background: "var(--mapa-ivory)",
            border: "1px solid var(--mapa-line)",
            borderRadius: "var(--radius-m, 8px)",
            padding: "9px 14px",
            outline: "none",
            transition: "border-color var(--dur-base)",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "var(--mapa-sage-500)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "var(--mapa-line)")
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
            background: body.trim()
              ? "var(--mapa-sage-500)"
              : "var(--mapa-sage-100)",
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
            color={body.trim() ? "var(--mapa-paper)" : "var(--mapa-stone-2)"}
          />
        </button>
      </form>
      {state.error && (
        <p
          style={{
            maxWidth: 680,
            margin: "6px auto 0",
            fontSize: 12,
            color: "var(--mapa-danger)",
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
}: {
  post: PostData;
  comments: CommentData[];
}) {
  const [reacted, setReacted] = useState(false);
  const typeConfig = TYPE_CONFIG[post.type] ?? TYPE_CONFIG.empfehlung;

  return (
    <>
      <article
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "32px 0 80px",
          fontFamily: "var(--font-ui)",
        }}
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
            fontFamily: "var(--font-ui)",
          }}
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Zurück
        </Link>

        {/* Post card */}
        <div
          style={{
            background: "var(--bg-card, var(--mapa-ivory))",
            border: "1px solid var(--mapa-line)",
            borderRadius: "var(--radius-l, 12px)",
            padding: 32,
            boxShadow: "var(--shadow-m)",
            marginTop: 16,
          }}
        >
          {/* Tag pill */}
          <span
            style={{
              display: "inline-block",
              padding: "4px 11px",
              borderRadius: "var(--radius-pill)",
              background: typeConfig.bg,
              color: typeConfig.fg,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: 0.1,
            }}
          >
            {typeConfig.label}
          </span>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 1.3,
              margin: "16px 0 0",
              color: "var(--fg)",
              letterSpacing: "-0.015em",
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
              marginTop: 14,
            }}
          >
            <GradientAvatar
              gradient={post.author.gradient}
              name={post.author.name}
              size={40}
            />
            <span
              style={{
                fontSize: 14,
                color: "var(--fg)",
                fontFamily: "var(--font-ui)",
              }}
            >
              {post.author.name}
            </span>
            <span
              style={{
                fontSize: 13,
                color: "var(--fg-subtle)",
                fontFamily: "var(--font-ui)",
              }}
            >
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
                fontFamily: "var(--font-ui)",
              }}
            >
              {post.body}
            </p>
          )}

          {/* Meeting block */}
          {(post.meeting_location || post.meeting_date) && (
            <div
              style={{
                background: "var(--mapa-peach-50)",
                border: "1px solid var(--mapa-peach-100)",
                borderRadius: "var(--radius-m, 8px)",
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
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  <MapPin
                    size={15}
                    strokeWidth={1.5}
                    color="var(--mapa-clay-500)"
                  />
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
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  <Calendar
                    size={15}
                    strokeWidth={1.5}
                    color="var(--mapa-clay-500)"
                  />
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
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  <Users
                    size={15}
                    strokeWidth={1.5}
                    color="var(--mapa-clay-500)"
                  />
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
              borderTop: "1px solid var(--mapa-line)",
            }}
          >
            <button
              type="button"
              onClick={() => setReacted((v) => !v)}
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
                fontFamily: "var(--font-ui)",
                color: reacted ? "var(--mapa-sage-500)" : "var(--fg-subtle)",
                transition: "color var(--dur-base)",
              }}
            >
              <Heart
                size={16}
                strokeWidth={1.5}
                fill={reacted ? "var(--mapa-sage-500)" : "none"}
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
              fontFamily: "var(--font-ui)",
              margin: "0 0 16px",
            }}
          >
            {comments.length}{" "}
            {comments.length === 1 ? "Antwort" : "Antworten"}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {comments.map((comment) => (
              <article key={comment.id}>
                {/* Comment author row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <GradientAvatar
                    gradient={comment.author.gradient}
                    name={comment.author.name}
                    size={32}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--fg)",
                      fontFamily: "var(--font-ui)",
                    }}
                  >
                    {comment.author.name}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--fg-subtle)",
                      fontFamily: "var(--font-ui)",
                    }}
                  >
                    {comment.created_at}
                  </span>
                </div>
                {/* Comment body */}
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--fg-muted)",
                    margin: 0,
                    paddingLeft: 40,
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  {comment.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Empty state when no comments */}
        {comments.length === 0 && (
          <div
            style={{
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--fg-subtle)",
              fontSize: 14,
              fontFamily: "var(--font-ui)",
            }}
          >
            <MessageSquare size={16} strokeWidth={1.5} />
            Noch keine Antworten. Sei die erste Person.
          </div>
        )}
      </article>

      {/* Sticky composer */}
      <StickyComposer postId={post.id} />
    </>
  );
}
