interface LogoProps {
  size?: number;
  color?: string;
  dotColor?: string;
  italic?: boolean;
  /** Heavy variant: Geist 900, tight */
  heavy?: boolean;
  /** Geist variant: uppercase MAPA. in Geist Bold, monochromatic */
  geist?: boolean;
  /** Optional city suffix rendered in Geist Regular after the mark, e.g. "Hamburg" */
  city?: string;
}

export function Logo({
  size = 28,
  color = "var(--fg)",
  dotColor = "var(--mapa-cobalt-500)",
  italic = false,
  heavy = false,
  geist = false,
  city,
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
          fontStyle: "normal",
          lineHeight: 1,
          display: "inline-flex",
          alignItems: "baseline",
          gap: 0,
        }}
      >
        <span
          style={{
            fontSize: size,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color,
          }}
        >
          MAPA
        </span>
        <span
          style={{
            fontSize: size,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: dotColor,
          }}
        >
          .
        </span>
        {city && (
          <span
            className="slot-clip"
            style={{
              fontSize: size,
              marginLeft: "0.35em",
              height: "1.15em",
            }}
          >
            <span
              className="slot-reel"
              style={{
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color,
              }}
            >
              {city}
            </span>
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      style={{
        fontFamily: "var(--font-ui)",
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
