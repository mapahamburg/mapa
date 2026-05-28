"use client";

import { useState, useTransition, useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, MapPin, Plus, LogOut } from "lucide-react";
import { SmartPost } from "@/components/app/PostCard";
import { joinKreis, leaveKreis, createKreisPost } from "@/app/actions/kreise";
import type { KreisCard, FeedPost } from "@/types";
import { useFormStatus } from "react-dom";

// ─── Inline post composer ─────────────────────────────────────────────────────

function PostSubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        background: pending ? "var(--cobalt-200)" : "var(--cobalt-500)",
        color: "#fff",
        border: "none",
        borderRadius: 999,
        padding: "10px 20px",
        fontFamily: "var(--font-ui)",
        fontSize: 14,
        fontWeight: 500,
        cursor: pending ? "default" : "pointer",
        transition: "background 160ms",
      }}
    >
      {pending ? "Wird gesendet…" : "Teilen"}
    </button>
  );
}

function KreisComposer({ kreisId }: { kreisId: string }) {
  const [state, formAction] = useActionState(createKreisPost, {});
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          width: "100%",
          background: "var(--color-ivory)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "14px 20px",
          fontFamily: "var(--font-ui)",
          fontSize: 15,
          color: "var(--fg-muted)",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Plus size={16} strokeWidth={1.5} color="var(--fg-muted)" />
        Teile etwas mit dem Kreis…
      </button>
    );
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="kreis_id" value={kreisId} />
      <div
        style={{
          background: "var(--color-ivory)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <input
          name="title"
          placeholder="Titel…"
          required
          autoFocus
          style={{
            display: "block",
            width: "100%",
            border: "none",
            borderBottom: "1px solid var(--border-soft)",
            background: "transparent",
            padding: "14px 20px",
            fontFamily: "var(--font-ui)",
            fontSize: 15,
            color: "var(--ink)",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <textarea
          name="body"
          placeholder="Mehr Details (optional)…"
          rows={3}
          style={{
            display: "block",
            width: "100%",
            border: "none",
            background: "transparent",
            padding: "12px 20px",
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            color: "var(--ink)",
            outline: "none",
            resize: "none",
            boxSizing: "border-box",
            lineHeight: 1.5,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderTop: "1px solid var(--border-soft)",
            gap: 10,
          }}
        >
          {state?.error && (
            <span style={{ fontSize: 13, color: "var(--clay-600)" }}>
              {state.error}
            </span>
          )}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: 999,
                padding: "9px 18px",
                fontFamily: "var(--font-ui)",
                fontSize: 14,
                color: "var(--fg-muted)",
                cursor: "pointer",
              }}
            >
              Abbrechen
            </button>
            <PostSubmitBtn />
          </div>
        </div>
      </div>
    </form>
  );
}

// ─── Join / Leave button ──────────────────────────────────────────────────────

function MembershipButton({
  kreisId,
  isMember,
  isFull,
}: {
  kreisId: string;
  isMember: boolean;
  isFull: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [localMember, setLocalMember] = useState(isMember);
  const [error, setError] = useState<string | null>(null);

  function handleJoin() {
    startTransition(async () => {
      const result = await joinKreis(kreisId);
      if (result.error) setError(result.error);
      else setLocalMember(true);
    });
  }

  function handleLeave() {
    startTransition(async () => {
      const result = await leaveKreis(kreisId);
      if (result.error) setError(result.error);
      else setLocalMember(false);
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
      {localMember ? (
        <button
          type="button"
          onClick={handleLeave}
          disabled={pending}
          style={{
            background: "var(--surface-card)",
            border: "1px solid var(--border)",
            borderRadius: 999,
            padding: "9px 18px",
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            color: "var(--fg-muted)",
            cursor: pending ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <LogOut size={13} strokeWidth={1.5} />
          {pending ? "…" : "Kreis verlassen"}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleJoin}
          disabled={pending || isFull}
          style={{
            background: isFull ? "var(--surface-card)" : "var(--cobalt-500)",
            color: isFull ? "var(--fg-muted)" : "#fff",
            border: isFull ? "1px solid var(--border)" : "none",
            borderRadius: 999,
            padding: "9px 18px",
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            fontWeight: 500,
            cursor: isFull || pending ? "default" : "pointer",
          }}
        >
          {pending ? "…" : isFull ? "Kreis voll" : "Beitreten"}
        </button>
      )}
      {error && (
        <span style={{ fontSize: 13, color: "var(--clay-600)" }}>{error}</span>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface KreisDetailProps {
  kreis: KreisCard & { status: string };
  posts: FeedPost[];
  isMember: boolean;
  isHost: boolean;
}

export function KreisDetail({ kreis, posts, isMember, isHost }: KreisDetailProps) {
  const isFull = kreis.member_count >= kreis.max_members;

  const heute = posts.filter((p) => p.section === "heute");
  const aelter = posts.filter((p) => p.section !== "heute");

  return (
    <main className="app-feed">
      {/* Back link */}
      <Link
        href="/kreise"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 14,
          color: "var(--fg-muted)",
          textDecoration: "none",
          marginBottom: 20,
        }}
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Alle Kreise
      </Link>

      {/* Kreis header card */}
      <div
        style={{
          background: "var(--color-ivory)",
          border: "1px solid var(--color-line-soft)",
          borderRadius: 24,
          padding: "28px 28px 24px",
          marginBottom: 24,
        }}
      >
        {/* Thema + name */}
        {kreis.thema && (
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              fontFamily: "var(--font-mono)",
              color: "var(--cobalt-500)",
              marginBottom: 8,
            }}
          >
            {kreis.thema}
          </div>
        )}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 32,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            marginBottom: 8,
          }}
        >
          {kreis.name}
        </div>

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 14,
            color: "var(--fg-muted)",
            marginBottom: kreis.beschreibung ? 16 : 20,
            flexWrap: "wrap",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <MapPin size={13} strokeWidth={1.5} />
            {kreis.stadtteil}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Users size={13} strokeWidth={1.5} />
            {kreis.member_count} / {kreis.max_members} Mitglieder
          </span>
          {isHost && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--cobalt-700)",
                background: "var(--cobalt-50)",
                borderRadius: 999,
                padding: "3px 10px",
              }}
            >
              Du bist Host
            </span>
          )}
        </div>

        {/* Description */}
        {kreis.beschreibung && (
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.55,
              color: "var(--fg-muted)",
              margin: "0 0 20px",
            }}
          >
            {kreis.beschreibung}
          </p>
        )}

        {/* Join/Leave */}
        {!isHost && (
          <MembershipButton
            kreisId={kreis.id}
            isMember={isMember}
            isFull={isFull}
          />
        )}
      </div>

      {/* Feed — members only */}
      {isMember ? (
        <>
          {/* Composer */}
          <div style={{ marginBottom: 20 }}>
            <KreisComposer kreisId={kreis.id} />
          </div>

          {/* Posts */}
          {heute.length > 0 && (
            <>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                  color: "var(--fg-muted)",
                  padding: "8px 0 12px",
                }}
              >
                Heute
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {heute.map((p) => (
                  <SmartPost key={p.id} post={p} />
                ))}
              </div>
            </>
          )}

          {aelter.length > 0 && (
            <>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                  color: "var(--fg-muted)",
                  padding: "24px 0 12px",
                }}
              >
                Diese Woche
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {aelter.map((p) => (
                  <SmartPost key={p.id} post={p} />
                ))}
              </div>
            </>
          )}

          {posts.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 20,
                  color: "var(--fg-muted)",
                  letterSpacing: "-0.01em",
                }}
              >
                Noch keine Beiträge.
              </div>
              <div
                style={{ fontSize: 14, color: "var(--fg-subtle)", marginTop: 8 }}
              >
                Fang an und teile etwas mit dem Kreis.
              </div>
            </div>
          )}
        </>
      ) : (
        /* Non-member gate */
        <div
          style={{
            background: "var(--color-sunk)",
            border: "1px solid var(--color-line)",
            borderRadius: 20,
            padding: "40px 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 22,
              color: "var(--ink)",
              letterSpacing: "-0.01em",
              marginBottom: 10,
            }}
          >
            Nur für Mitglieder.
          </div>
          <div
            style={{
              fontSize: 15,
              color: "var(--fg-muted)",
              lineHeight: 1.5,
              maxWidth: 320,
              margin: "0 auto",
            }}
          >
            Tritt dem Kreis bei, um Beiträge zu lesen und selbst zu teilen.
          </div>
        </div>
      )}
    </main>
  );
}
