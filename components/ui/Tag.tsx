export type PostType = "empfehlung" | "frage" | "treffen" | "suche" | "veranstaltung" | "event";

const TYPE_STYLES: Record<PostType, { label: string; bg: string; fg: string; border?: string }> = {
  empfehlung:   { label: "Empfehlung",    bg: "var(--cobalt-50)",    fg: "var(--cobalt-700)" },
  frage:        { label: "Frage",         bg: "var(--surface-card)", fg: "var(--ink)",        border: "1px solid var(--ash-200)" },
  treffen:      { label: "Treffen",       bg: "var(--ash-100)",      fg: "var(--ash-900)" },
  suche:        { label: "Suche",         bg: "var(--ash-100)",      fg: "var(--ash-900)" },
  veranstaltung:{ label: "Veranstaltung", bg: "var(--ash-100)",      fg: "var(--ash-900)" },
  event:        { label: "Event",         bg: "var(--ash-100)",      fg: "var(--ash-900)" },
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
