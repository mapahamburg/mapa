import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";
import type { FeedPost } from "@/types";

interface CompactRowProps {
  post: FeedPost;
  isFirst?: boolean;
}

// ─── CompactRow — "Diese Woche" list ─────────────────────────────────────────
// Dense list format. Sans-serif title, single-line truncate.

export function CompactRow({ post, isFirst }: CompactRowProps) {
  return (
    <Link href={`/feed/${post.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "24px 1fr auto",
        gap: 10,
        alignItems: "center",
        padding: "11px 4px",
        borderTop: isFirst ? "1px solid var(--color-line-soft)" : undefined,
        borderBottom: "1px solid var(--color-line-soft)",
        cursor: "pointer",
        transition: "opacity 120ms",
      }}>
        <Avatar letter={post.author[0]} size={24} />

        {/* Title + meta stacked */}
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily: "var(--font-ui)",
            fontWeight: 600,
            fontSize: 14,
            lineHeight: 1.3,
            color: "var(--color-ink)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            letterSpacing: "-0.01em",
          }}>
            {post.title}
          </div>
          <div style={{
            fontFamily: "var(--font-ui)",
            fontSize: 11,
            color: "var(--color-muted)",
            marginTop: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {post.author} · {post.district} · {post.time}
          </div>
        </div>

        <Tag type={post.type} />
      </div>
    </Link>
  );
}
