type Variant = "jetzt" | "default" | "hilfe";

interface SectionDividerProps {
  label: string;
  variant?: Variant;
  count?: number;
}

export function SectionDivider({ label, variant = "default", count }: SectionDividerProps) {
  const parts = label.split(" · ");
  const firstWord = parts[0];
  const rest = parts.slice(1).join(" · ");

  const strongColor =
    variant === "jetzt" ? "var(--color-cobalt)" :
    variant === "hilfe" ? "var(--color-clay-deep)" :
    "var(--color-ink)";

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: variant === "hilfe" ? "var(--color-clay-deep)" : "var(--color-subtle)",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, margin: "36px 0 14px" }}>
      <span style={labelStyle}>
        <strong style={{ color: strongColor, fontWeight: 600 }}>{firstWord}</strong>
        {rest ? ` · ${rest}` : ""}
        {count !== undefined ? ` · ${count} Beiträge` : ""}
      </span>
      <div style={{ flex: 1, height: 1, background: "var(--color-line)" }} />
    </div>
  );
}
