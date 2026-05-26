export type PostType = "empfehlung" | "frage" | "treffen" | "suche" | "veranstaltung" | "event";

const TYPE_STYLES: Record<PostType, { label: string; bg: string; fg: string; border?: string }> = {
  empfehlung:   { label: "Empfehlung",   bg: "var(--mapa-sage-100)",  fg: "var(--mapa-sage-700)" },
  frage:        { label: "Frage",        bg: "var(--mapa-peach-100)", fg: "var(--mapa-clay-600)" },
  treffen:      { label: "Treffen",      bg: "var(--mapa-mist)",      fg: "var(--mapa-ink-2)" },
  suche:        { label: "Suche",        bg: "var(--mapa-paper)",     fg: "var(--mapa-stone-1)", border: "1px solid var(--border)" },
  veranstaltung:{ label: "Veranstaltung",bg: "var(--mapa-peach-100)", fg: "var(--mapa-clay-600)" },
  event:        { label: "Event",        bg: "var(--mapa-paper)",     fg: "var(--mapa-stone-1)", border: "1px solid var(--border)" },
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
        borderRadius: 999,
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
