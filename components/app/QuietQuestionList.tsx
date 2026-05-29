import Link from "next/link";
import type { FeedPost } from "@/types";

export function QuietQuestionList({ questions }: { questions: FeedPost[] }) {
  if (questions.length === 0) return null;

  const intro =
    questions.length === 1
      ? "Eine Frage wartet gerade auf eine Antwort. Vielleicht weißt du etwas dazu."
      : `${questions.length} Eltern warten gerade auf eine Antwort. Vielleicht ist eine dabei, zu der du etwas weißt.`;

  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--color-muted)",
          maxWidth: 520,
          margin: "0 0 20px",
        }}
      >
        {intro}
      </p>
      <div style={{ borderTop: "1px solid var(--color-line)" }}>
        {questions.map((q) => (
          <div
            key={q.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              gap: 24,
              alignItems: "center",
              padding: "16px 4px",
              borderBottom: "1px solid var(--color-line-soft)",
            }}
          >
            <Link href={`/feed/${q.id}`} style={{ textDecoration: "none" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 18,
                  color: "var(--color-ink)",
                  lineHeight: 1.35,
                }}
              >
                {q.title}
              </div>
            </Link>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--color-subtle)",
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
              }}
            >
              {q.author} · {q.district} · {q.time}
            </div>
            <Link
              href={`/feed/${q.id}`}
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 13,
                color: "var(--color-cobalt)",
                fontWeight: 500,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Antworten →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
