"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Users, MessageSquare, Send, Heart, Pencil, X } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";
import { ReportButton } from "@/components/app/ReportButton";
import { ImageUpload } from "@/components/app/ImageUpload";
import { createComment, type CommentState } from "@/app/actions/comments";
import { toggleReaction } from "@/app/actions/reactions";
import { updatePost } from "@/app/actions/posts";
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

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--color-paper)",
  border: "1px solid var(--color-line)",
  borderRadius: 10,
  padding: "11px 14px",
  fontFamily: "var(--font-ui)",
  fontSize: 15,
  color: "var(--color-ink)",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 200ms",
};

function EditForm({ post, onCancel }: { post: PostDetailData; onCancel: () => void }) {
  const [state, formAction, isPending] = useActionState(updatePost, {});

  if (state.error === undefined && !isPending && state !== null) {
    // success if no error and has been submitted (state is mutated)
  }

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <input type="hidden" name="post_id" value={post.id} />

      {/* Title */}
      <div>
        <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          Titel
        </label>
        <input name="title" type="text" defaultValue={post.title} required maxLength={200} style={inputStyle} />
      </div>

      {/* Body */}
      <div>
        <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          Text <span style={{ fontWeight: 400, letterSpacing: 0 }}>(wenn du magst)</span>
        </label>
        <textarea
          name="body"
          rows={5}
          maxLength={2000}
          defaultValue={post.body ?? ""}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
        />
      </div>

      {/* Photo */}
      <ImageUpload
        labelStyle={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "var(--color-muted)", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: 8, display: "block" }}
        initialUrl={post.image_url ?? undefined}
      />

      {state.error && (
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--color-danger)", margin: 0 }}>
          {state.error}
        </p>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <button
          type="submit"
          disabled={isPending}
          style={{
            background: isPending ? "var(--color-cobalt-soft)" : "var(--color-cobalt)",
            color: isPending ? "var(--color-muted)" : "#fff",
            border: "none",
            borderRadius: 999,
            padding: "10px 22px",
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            fontWeight: 500,
            cursor: isPending ? "default" : "pointer",
          }}
        >
          {isPending ? "Wird gespeichert…" : "Speichern"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: "none",
            border: "1px solid var(--color-line)",
            borderRadius: 999,
            padding: "10px 18px",
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            color: "var(--color-muted)",
            cursor: "pointer",
          }}
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}

export function PostDetail({
  post,
  comments,
  userHasReacted,
  isOwner = false,
}: {
  post: PostDetailData;
  comments: CommentItem[];
  userHasReacted: boolean;
  isOwner?: boolean;
}) {
  const [reacted, setReacted] = useState(userHasReacted);
  const [isPending, setIsPending] = useState(false);
  const [editing, setEditing] = useState(false);
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
            {/* Type pill + owner edit button */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Tag type={post.type as PostType} />
              {isOwner && !editing && (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  aria-label="Beitrag bearbeiten"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "none",
                    border: "1px solid var(--color-line)",
                    borderRadius: 999,
                    padding: "6px 14px",
                    fontFamily: "var(--font-ui)",
                    fontSize: 13,
                    color: "var(--color-muted)",
                    cursor: "pointer",
                  }}
                >
                  <Pencil size={13} strokeWidth={1.5} />
                  Bearbeiten
                </button>
              )}
              {isOwner && editing && (
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  aria-label="Bearbeitung abbrechen"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontFamily: "var(--font-ui)",
                    fontSize: 13,
                    color: "var(--color-subtle)",
                    cursor: "pointer",
                  }}
                >
                  <X size={14} strokeWidth={1.5} />
                  Abbrechen
                </button>
              )}
            </div>

            {/* Edit form — replaces title/body/photo when active */}
            {editing ? (
              <div style={{ marginTop: 20 }}>
                <EditForm post={post} onCancel={() => setEditing(false)} />
              </div>
            ) : (
              <>
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
              </>
            )}
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
