import Link from "next/link";
import type { FeedPost } from "@/types";

// ─── QuietQuestionList — "Offene Fragen" ─────────────────────────────────────
// Sans-serif titles. "Antworten →" never truncated (right-side anchor removed,
// embedded in the title row to avoid mobile overflow).

export function QuietQuestionList({ questions }: { questions: FeedPost[] }) {
  if (questions.length === 0) return null;

  const visible = questions.slice(0, 3);
  const hiddenCount = questions.length - visible.length;

  return (
    <div style={{
      background: "rgba(194,106,63,0.06)",
      border: "1px solid rgba(194,106,63,0.16)",
      borderRadius: 14,
      padding: "16px 18px",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <p style={{
          fontFamily: "var(--font-ui)",
          fontWeight: 600,
          fontSize: 13,
          color: "var(--color-clay-deep)",
          margin: "0 0 2px",
          letterSpacing: "0.01em",
          textTransform: "uppercase",
        }}>
          {questions.length === 1 ? "1 offene Frage" : `${questions.length} offene Fragen`}
        </p>
        <p style={{
          fontFamily: "var(--font-ui)",
          fontSize: 13,
          color: "var(--color-muted)",
          margin: 0,
          lineHeight: 1.4,
        }}>
          Vielleicht weißt du die Antwort.
        </p>
      </div>

      {/* Question list — max. 3 */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {visible.map((q, i) => (
          <Link
            key={q.id}
            href={`/feed/${q.id}`}
            style={{
              display: "block",
              padding: "10px 0",
              borderBottom: i < visible.length - 1
                ? "1px solid rgba(194,106,63,0.12)"
                : "none",
              textDecoration: "none",
            }}
          >
            {/* Title — 2-line clamp, sans */}
            <div style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1.35,
              color: "var(--color-ink)",
              letterSpacing: "-0.01em",
              marginBottom: 5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {q.title}
            </div>

            {/* Meta + CTA in one row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}>
              <span style={{
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                color: "var(--color-muted)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {q.district} · {q.time}
              </span>
              <span style={{
                fontFamily: "var(--font-ui)",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--color-clay-deep)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}>
                Antworten →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {hiddenCount > 0 && (
        <Link
          href="/fragen"
          style={{
            display: "block",
            marginTop: 12,
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--color-clay-deep)",
            textDecoration: "none",
          }}
        >
          Alle {questions.length} Fragen ansehen →
        </Link>
      )}
    </div>
  );
}
