import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";
import type { FeedPost } from "@/types";

interface CompactRowProps {
  post: FeedPost;
  isFirst?: boolean;
}

export function CompactRow({ post, isFirst }: CompactRowProps) {
  return (
    <Link
      href={`/feed/${post.id}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "28px 1fr auto auto",
          gap: 18,
          alignItems: "center",
          padding: "14px 4px",
          borderTop: isFirst ? "1px solid var(--color-line-soft)" : undefined,
          borderBottom: "1px solid var(--color-line-soft)",
          cursor: "pointer",
          transition: "opacity 120ms",
        }}
      >
        <Avatar letter={post.author[0]} size={28} />
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 17,
            color: "var(--color-ink)",
            lineHeight: 1.25,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--color-subtle)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {post.author} · {post.district}
        </div>
        <Tag type={post.type} />
      </div>
    </Link>
  );
}
