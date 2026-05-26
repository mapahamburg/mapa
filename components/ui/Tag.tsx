export type PostType = "empfehlung" | "frage" | "treffen" | "suche" | "veranstaltung" | "event";

const TYPE_STYLES: Record<PostType, { label: string; bg: string; fg: string; border?: string }> = {
  empfehlung:   { label: "Empfehlung",    bg: "var(--sage-v2-100)",   fg: "var(--olive-700)" },
  frage:        { label: "Frage",         bg: "var(--clay-v2-200)",   fg: "var(--clay-v2-600)" },
  treffen:      { label: "Treffen",       bg: "var(--clay-v2-100)",   fg: "var(--clay-v2-600)" },
  suche:        { label: "Suche",         bg: "var(--ash-v2-100)",    fg: "var(--ash-v2-900)",  border: "none" },
  veranstaltung:{ label: "Veranstaltung", bg: "var(--ash-v2-100)",    fg: "var(--ash-v2-900)" },
  event:        { label: "Event",         bg: "var(--ash-v2-100)",    fg: "var(--ash-v2-900)" },
};

interface TagProps {
  type: PostType;
  size?: "s" | "m";
}

export function Tag({ type, size = "m" }: TagProps) {
  const cfg = TYPE_STYLES[type];
  return (
    <span
      style={{
        display: "inline-block",
        padding: size === "s" ? "3px 9px" : "4px 11px",
        borderRadius: 6,
        background: cfg.bg,
        color: cfg.fg,
        fontSize: size === "s" ? 11 : 12,
        fontWeight: 500,
        letterSpacing: 0.1,
        border: cfg.border ?? "none",
        whiteSpace: "nowrap",
      }}
    >
      {cfg.label}
    </span>
  );
}
