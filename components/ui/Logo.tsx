interface LogoProps {
  size?: number;
  color?: string;
  dotColor?: string;
  italic?: boolean;
  /** Heavy variant: Geist 900, tight — Variante D/E */
  heavy?: boolean;
  /** Geist variant: uppercase MAPA. in Geist Bold */
  geist?: boolean;
}

export function Logo({
  size = 28,
  color = "var(--fg)",
  dotColor = "var(--mapa-clay-500)",
  italic = false,
  heavy = false,
  geist = false,
}: LogoProps) {
  if (heavy) {
    return (
      <span
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: size,
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: "-0.06em",
          color,
          display: "inline-flex",
          alignItems: "baseline",
        }}
      >
        mapa
      </span>
    );
  }

  if (geist) {
    return (
      <span
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: size,
          fontWeight: 700,
          fontStyle: "normal",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color,
          display: "inline-flex",
          alignItems: "baseline",
        }}
      >
        MAPA<span style={{ color: dotColor }}>.</span>
      </span>
    );
  }

  return (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontSize: size,
        fontStyle: italic ? "italic" : "normal",
        lineHeight: 1,
        letterSpacing: "-0.04em",
        color,
        display: "inline-flex",
        alignItems: "baseline",
      }}
    >
      mapa<span style={{ color: dotColor }}>.</span>
    </span>
  );
}
