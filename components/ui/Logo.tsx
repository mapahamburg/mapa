interface LogoProps {
  size?: number;
  color?: string;
  dotColor?: string;
}

export function Logo({
  size = 28,
  color = "var(--color-ink)",
  dotColor = "var(--color-cobalt)",
}: LogoProps) {
  return (
    <span
      className="mapa-wordmark"
      style={{
        display: "inline-flex",
        alignItems: "flex-end",
        fontFamily: "var(--font-ui)",
        fontWeight: 800,
        fontSize: size,
        letterSpacing: "-0.06em",
        lineHeight: 0.82,
        color,
      }}
    >
      mapa
      <span
        className="mapa-tittle"
        style={{
          display: "inline-block",
          borderRadius: "50%",
          width: size * 0.11,
          height: size * 0.11,
          marginLeft: -(size * 0.04),
          marginBottom: size * 0.06,
          background: dotColor,
          flexShrink: 0,
        }}
      />
    </span>
  );
}
