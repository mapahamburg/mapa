// New palette — flat bg + contrasting fg
const GRADIENTS: { bg: string; fg: string }[] = [
  { bg: "#0E3B2E", fg: "#F1ECE2" },  // green
  { bg: "#1B3CF0", fg: "#FBF8F2" },  // cobalt
  { bg: "#141312", fg: "#F1ECE2" },  // ink
  { bg: "#BFCDB5", fg: "#0E3B2E" },  // sage
  { bg: "#E7E1D4", fg: "#141312" },  // linen-2
  { bg: "#D9E2D1", fg: "#0E3B2E" },  // sage-soft
  { bg: "#0E3B2E", fg: "#BFCDB5" },  // green + sage text
  { bg: "#1B3CF0", fg: "#F1ECE2" },  // cobalt variant
];

interface AvatarProps {
  letter: string;
  size?: number;
}

export function Avatar({ letter, size = 40 }: AvatarProps) {
  const entry = GRADIENTS[letter.charCodeAt(0) % GRADIENTS.length];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: entry.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display)",
        fontSize: size * 0.45,
        color: entry.fg,
        flexShrink: 0,
      }}
    >
      {letter}
    </div>
  );
}
