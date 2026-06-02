import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";

interface InFeedHostCardProps {
  id: string;
  name: string;
  stadtteil: string;
  bio?: string | null;
}

export function InFeedHostCard({ id, name, stadtteil, bio }: InFeedHostCardProps) {
  return (
    <div
      style={{
        background: "var(--color-sage-soft)",
        border: "1px solid rgba(111,133,90,0.2)",
        borderRadius: 16,
        padding: "16px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Avatar letter={name[0]} size={40} />
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 17,
              color: "var(--color-ink)",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-sage-ink)",
              marginTop: 2,
            }}
          >
            Local Host · {stadtteil}
          </div>
        </div>
      </div>

      {bio && (
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 14.5,
            lineHeight: 1.45,
            color: "var(--color-ink-2)",
            margin: 0,
          }}
        >
          „{bio}"
        </p>
      )}

      <Link
        href={`/host/${id}`}
        style={{
          background: "transparent",
          border: "1px solid rgba(69,82,52,0.28)",
          borderRadius: 999,
          padding: "7px 14px",
          fontFamily: "var(--font-ui)",
          fontSize: 13,
          fontWeight: 500,
          color: "var(--color-sage-ink)",
          cursor: "pointer",
          alignSelf: "flex-start",
          textDecoration: "none",
          transition: "border-color 150ms, background 150ms",
        }}
      >
        Hallo schreiben
      </Link>
    </div>
  );
}
