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
  /* Dot sizing / positioning — spec:
     radius = 11% of cap-height (≈ 72% of em), so ~8% of em.
     Center sits at 80% of cap-height above baseline ≈ 58% of em.
     We use flex-end so everything bottoms-out together, then
     marginBottom lifts the dot to the right optical height.         */
  const dotSize   = size * 0.13;          // diameter
  const dotLift   = size * 0.18;          // marginBottom — raises dot to mid-cap
  const dotInset  = -(size * 0.04);       // marginLeft — tucks into last "a"

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
        lineHeight: 0.88,
        color,
      }}
    >
      {/* "mapa" */}
      mapa

      {/* dot */}
      <span
        className="mapa-tittle"
        style={{
          display:      "inline-block",
          borderRadius: "50%",
          width:        dotSize,
          height:       dotSize,
          marginLeft:   dotInset,
          marginBottom: dotLift,
          background:   dotColor,
          flexShrink:   0,
        }}
      />

      {/* "hamburg" — animated, lighter weight, ash-600 */}
      {lockup && (
        <span
          className="slot-clip"
          style={{
            marginLeft:   size * 0.28,
            marginBottom: size * 0.005,   /* optical micro-nudge to match baseline */
            lineHeight:   0.88,
          }}
        >
          <span
            className="slot-reel"
            style={{
              fontWeight:    400,
              fontSize:      size * 0.84,
              letterSpacing: "0em",
              color:         "var(--ash-600)",
              display:       "inline-block",
              lineHeight:    0.88,
            }}
          >
            hamburg
          </span>
        </span>
      )}
    </span>
  );
}
