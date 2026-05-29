"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import type { FeedPost } from "@/types";

const PLACEHOLDER_GOING = ["L", "M", "K"];

export function NowCard({ post }: { post: FeedPost }) {
  const [isGoing, setIsGoing] = useState(false);
  const [goingCount, setGoingCount] = useState(2);

  function handleRSVP() {
    if (isGoing) {
      setGoingCount((c) => c - 1);
      setIsGoing(false);
    } else {
      setGoingCount((c) => c + 1);
      setIsGoing(true);
    }
  }

  const eyebrowType = post.type === "treffen" ? "Spontanes Treffen" : "Veranstaltung";
  const eyebrowLocation = post.meeting?.where || post.district;

  return (
    <div
      style={{
        background: "var(--color-sunk)",
        borderRadius: 22,
        border: "1px solid var(--color-line)",
        padding: "30px 32px 26px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {/* Eyebrow */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--color-cobalt)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--color-cobalt)",
            fontWeight: 600,
          }}
        >
          {eyebrowType} · {eyebrowLocation}
        </span>
      </div>

      {/* Title */}
      <Link href={`/feed/${post.id}`} style={{ textDecoration: "none" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 34,
            lineHeight: 1.06,
            color: "var(--color-ink)",
            maxWidth: 520,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {post.title}
        </h2>
      </Link>

      {/* Body */}
      {post.body && (
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 14.5,
            lineHeight: 1.6,
            color: "var(--color-muted)",
            maxWidth: 540,
            margin: 0,
          }}
        >
          {post.body}
        </p>
      )}

      {/* When / Wo / Wer */}
      {(post.meeting?.when || post.meeting?.where || post.meeting?.age) && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, auto)",
            justifyContent: "start",
            gap: "0 36px",
            borderTop: "1px solid var(--color-line)",
            paddingTop: 14,
          }}
        >
          {[
            { label: "Wann", value: post.meeting.when || post.time },
            { label: "Wo", value: post.meeting.where || post.district },
            { label: "Wer", value: post.meeting.age || "Alle willkommen" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-subtle)",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 500,
                  fontSize: 14.5,
                  color: "var(--color-ink)",
                  marginTop: 3,
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer: avatar stack + sentence + buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        {/* Going cluster */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flex: 1,
            minWidth: 160,
          }}
        >
          <div style={{ display: "flex" }}>
            {PLACEHOLDER_GOING.map((letter, i) => (
              <div
                key={letter}
                style={{
                  marginLeft: i > 0 ? -9 : 0,
                  zIndex: PLACEHOLDER_GOING.length - i,
                  position: "relative",
                  outline: "2.5px solid var(--color-sunk)",
                  borderRadius: "50%",
                }}
              >
                <Avatar letter={letter} size={30} />
              </div>
            ))}
          </div>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--color-muted)",
            }}
          >
            {goingCount} {goingCount === 1 ? "Person ist" : "Personen sind"} dabei.
          </span>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <button
            type="button"
            onClick={handleRSVP}
            style={{
              background: isGoing ? "var(--color-cobalt-deep)" : "var(--color-cobalt)",
              color: "var(--color-paper)",
              border: "none",
              borderRadius: 999,
              padding: "10px 20px",
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 200ms",
            }}
          >
            {isGoing ? "Zugesagt" : "Ich komme"}
          </button>
          <button
            type="button"
            style={{
              background: "transparent",
              color: "var(--color-ink)",
              border: "1px solid var(--color-line)",
              borderRadius: 999,
              padding: "10px 20px",
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              fontWeight: 400,
              cursor: "pointer",
            }}
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}
