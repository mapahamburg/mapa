import Link from "next/link";
import type { FeedPost } from "@/types";

export function QuietQuestionList({ questions }: { questions: FeedPost[] }) {
  if (questions.length === 0) return null;

  return (
    <div
      style={{
        background: "rgba(194,106,63,0.07)",
        border: "1px solid rgba(194,106,63,0.18)",
        borderRadius: 18,
        padding: "22px 24px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 20,
            lineHeight: 1.3,
            color: "var(--color-ink)",
            margin: "0 0 6px",
          }}
        >
          {questions.length === 1
            ? "Eine offene Frage aus deinem Stadtteil."
            : `${questions.length} offene Fragen aus deinem Stadtteil.`}
        </p>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            color: "var(--color-muted)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Vielleicht weißt du die Antwort.
        </p>
      </div>

      {/* Question list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {questions.map((q, i) => (
          <Link
            key={q.id}
            href={`/feed/${q.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 0",
              borderBottom:
                i < questions.length - 1
                  ? "1px solid rgba(194,106,63,0.12)"
                  : "none",
              textDecoration: "none",
            }}
          >
            {/* Dot */}
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--color-clay-deep)",
                flexShrink: 0,
                marginTop: 2,
              }}
            />

            {/* Title */}
            <div
              style={{
                flex: 1,
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 17,
                color: "var(--color-ink)",
                lineHeight: 1.3,
              }}
            >
              {q.title}
            </div>

            {/* Meta */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-subtle)",
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {q.district} · {q.time}
            </div>

            {/* CTA */}
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--color-clay-deep)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Antworten →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
