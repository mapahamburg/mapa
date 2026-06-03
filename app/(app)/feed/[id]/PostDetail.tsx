"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Users, MessageSquare, Send, Heart } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";
import { ReportButton } from "@/components/app/ReportButton";
import { createComment, type CommentState } from "@/app/actions/comments";
import { toggleReaction } from "@/app/actions/reactions";
import type { PostDetail as PostDetailData, CommentItem, PostType } from "@/types";

// Accent bar color per post type — matches feed card treatment
const ACCENT_COLOR: Partial<Record<PostType, string>> = {
  veranstaltung: "var(--color-clay)",
  treffen:       "var(--color-cobalt)",
};

function StickyComposer({ postId }: { postId: string }) {
  const [body, setBody] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initialState: CommentState = {};
  const [state, formAction, isPending] = useActionState(createComment, initialState);

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
            color: "var(--color-ink)",
            background: "var(--color-ivory)",
            border: "1px solid var(--color-line)",
            borderRadius: 12,
            padding: "9px 14px",
            outline: "none",
            transition: "border-color var(--dur-base)",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-cobalt)")}
          onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--color-line)")}
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending || !body.trim()}
          aria-label="Antwort senden"
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            background: body.trim() ? "var(--color-cobalt)" : "var(--color-cobalt-soft)",
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
            color={body.trim() ? "#fff" : "var(--color-muted)"}
          />
        </button>
      </form>
      {state.error && (
        <p
          style={{
            maxWidth: 680,
            margin: "6px auto 0",
            fontSize: 12,
            color: "var(--color-danger)",
            fontFamily: "var(--font-ui)",
          }}
        >
          {state.error}
        </p>
      )}
    </div>
  );
}

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
  const accentColor = ACCENT_COLOR[post.type as PostType];

  return (
    <>
      <article className="post-detail-article" style={{ fontFamily: "var(--font-ui)" }}>
        {/* Back */}
        <Link
          href="/feed"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            textDecoration: "none",
            color: "var(--color-subtle)",
            fontSize: 14,
          }}
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Zurück zum Feed
        </Link>

        {/* Post card */}
        <div
          style={{
            background: "var(--color-ivory)",
            border: "1px solid var(--color-line-soft)",
            borderRadius: 20,
            marginTop: 20,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Accent bar — matches feed card */}
          {accentColor && (
            <div
              style={{
                height: 3,
                background: accentColor,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
              }}
            />
          )}

          <div style={{ padding: 32, paddingTop: accentColor ? 36 : 32 }}>
            {/* Type pill — uses the same Tag component as the feed */}
            <Tag type={post.type as PostType} />

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 30,
                fontWeight: 400,
                lineHeight: 1.2,
                margin: "16px 0 0",
                color: "var(--color-ink)",
                letterSpacing: "-0.02em",
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
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-ink)" }}>
                  {post.author_name}
                </div>
                <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 1 }}>
                  {post.stadtteil} · {post.created_at}
                </div>
              </div>
            </div>

            {/* Body */}
            {post.body && (
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "var(--color-muted)",
                  marginTop: 20,
                  marginBottom: 0,
                }}
              >
                {post.body}
              </p>
            )}

            {/* Photo */}
            {post.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.image_url}
                alt=""
                style={{
                  width: "100%",
                  maxHeight: 480,
                  objectFit: "cover",
                  borderRadius: 14,
                  border: "1px solid var(--color-line-soft)",
                  marginTop: 20,
                  display: "block",
                }}
              />
            )}

            {/* Meeting block */}
            {(post.meeting_location || post.meeting_date) && (
              <div
                style={{
                  background: "var(--color-sunk)",
                  border: "1px solid var(--color-line-soft)",
                  borderRadius: 12,
                  padding: 16,
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {post.meeting_location && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--color-muted)" }}>
                    <MapPin size={15} strokeWidth={1.5} color="var(--color-cobalt)" />
                    {post.meeting_location}
                  </div>
                )}
                {post.meeting_date && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--color-muted)" }}>
                    <Calendar size={15} strokeWidth={1.5} color="var(--color-cobalt)" />
                    {post.meeting_date}
                  </div>
                )}
                {(post.min_age !== undefined || post.max_age !== undefined) && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--color-muted)" }}>
                    <Users size={15} strokeWidth={1.5} color="var(--color-cobalt)" />
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
                borderTop: "1px solid var(--color-line-soft)",
              }}
            >
              <button
                type="button"
                onClick={async () => {
                  if (isPending) return;
                  setIsPending(true);
                  setReacted((v) => !v);
                  try {
                    const result = await toggleReaction(post.id);
                    setReacted(result.reacted);
                  } catch {
                    setReacted((v) => !v);
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
                  color: reacted ? "var(--color-cobalt)" : "var(--color-subtle)",
                  transition: "color var(--dur-base)",
                }}
              >
                <Heart size={16} strokeWidth={1.5} fill={reacted ? "var(--color-cobalt)" : "none"} />
                Hilfreich
              </button>
            </div>
          </div>
        </div>

        {/* Comments */}
        <section style={{ marginTop: 32 }} aria-label="Antworten">
          <p
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--color-muted)",
              margin: "0 0 16px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {comments.length} {comments.length === 1 ? "Antwort" : "Antworten"}
          </p>

          {comments.length === 0 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "var(--color-subtle)",
                fontSize: 14,
                padding: "8px 0",
              }}
            >
              <MessageSquare size={16} strokeWidth={1.5} />
              Noch keine Antworten. Sei die erste Person.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {comments.map((comment) => (
                <article
                  key={comment.id}
                  style={{
                    paddingBottom: 20,
                    borderBottom: "1px solid var(--color-line-soft)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <Avatar letter={comment.author_name[0]} size={32} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-ink)" }}>
                      {comment.author_name}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--color-subtle)" }}>
                      {comment.created_at}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: "var(--color-muted)",
                      margin: 0,
                      paddingLeft: 40,
                    }}
                  >
                    {comment.body}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Report */}
        <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--color-line-soft)" }}>
          <ReportButton postId={post.id} />
        </div>
      </article>

      <StickyComposer postId={post.id} />
    </>
  );
}
