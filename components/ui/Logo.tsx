interface LogoProps {
  size?: number;
  color?: string;
  dotColor?: string;
  /** Show "· hamburg" lockup after the dot (with slot-reel animation) */
  lockup?: boolean;
}

export function Logo({
  size = 28,
  color = "var(--color-ink)",
  dotColor = "var(--cobalt-500)",
  lockup = false,
}: LogoProps) {
  return (
    <span
      className="mapa-wordmark"
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-ui)",
        fontWeight: 800,
        fontSize: size,
        letterSpacing: "-0.06em",
        lineHeight: 1,
        color,
        gap: 0,
      }}
    >
      {/* "mapa" */}
      <span style={{ display: "inline-block", lineHeight: 1 }}>mapa</span>

      {/* dot */}
      <span
        className="mapa-tittle"
        style={{
          display: "inline-block",
          borderRadius: "50%",
          width: size * 0.11,
          height: size * 0.11,
          marginLeft: -(size * 0.04),
          background: dotColor,
          flexShrink: 0,
        }}
      />

      {/* "hamburg" — only in lockup variant */}
      {lockup && (
        <span
          className="slot-clip"
          style={{
            marginLeft: size * 0.32,
            lineHeight: 1,
          }}
        >
          <span
            className="slot-reel"
            style={{
              fontWeight: 400,
              fontSize: size * 0.82,
              letterSpacing: "-0.01em",
              color: "var(--ash-600)",
              display: "inline-block",
              lineHeight: 1,
            }}
          >
            hamburg
          </span>
        </span>
      )}
    </span>
  );
}
