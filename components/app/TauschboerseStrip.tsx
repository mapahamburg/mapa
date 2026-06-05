import Link from "next/link";
import type { FeedPost } from "@/types";

const TYPE_LABEL: Record<string, string> = {
  suche:      "Gesucht",
  empfehlung: "Abzugeben",
};

export function TauschboerseStrip({ posts }: { posts: FeedPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div
      style={{
        background: "var(--color-sunk)",
        border: "1px solid var(--color-line-soft)",
        borderRadius: 18,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "18px 22px 14px",
          borderBottom: "1px solid var(--color-line-soft)",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 18,
              fontWeight: 400,
              color: "var(--color-ink)",
              margin: "0 0 4px",
              lineHeight: 1.2,
            }}
          >
            Suche &amp; Weitergeben.
          </p>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--color-muted)",
              margin: 0,
            }}
          >
            Was gesucht wird. Was abzugeben ist.
          </p>
        </div>
        <Link
          href="/feed/new"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--color-cobalt)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          + Eintrag
        </Link>
      </div>

      {/* Items */}
      <div>
        {posts.map((p, i) => {
          const isSearch = p.type === "suche";
          const badge = isSearch ? "Gesucht" : "Abzugeben";
          const badgeBg = isSearch
            ? "rgba(37,64,214,0.08)"
            : "rgba(111,133,90,0.12)";
          const badgeColor = isSearch
            ? "var(--color-cobalt)"
            : "var(--color-sage-ink)";

          return (
            <Link
              key={p.id}
              href={`/feed/${p.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "13px 22px",
                borderBottom:
                  i < posts.length - 1
                    ? "1px solid var(--color-line-soft)"
                    : "none",
                textDecoration: "none",
                color: "inherit",
                transition: "background 120ms",
              }}
            >
              {/* Badge */}
              <span
                style={{
                  flexShrink: 0,
                  fontFamily: "var(--font-ui)",
                  fontSize: 11,
                  fontWeight: 600,
                  color: badgeColor,
                  background: badgeBg,
                  borderRadius: 999,
                  padding: "3px 9px",
                  whiteSpace: "nowrap",
                }}
              >
                {badge}
              </span>

              {/* Title */}
              <span
                style={{
                  flex: 1,
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 15,
                  color: "var(--color-ink)",
                  lineHeight: 1.3,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {p.title}
              </span>

              {/* District */}
              <span
                style={{
                  flexShrink: 0,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--color-subtle)",
                  letterSpacing: "0.06em",
                }}
              >
                {p.district}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
