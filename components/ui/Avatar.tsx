// New palette — flat bg + contrasting fg
const GRADIENTS: { bg: string; fg: string }[] = [
  { bg: "#E6EBFE", fg: "#0F23A8" },  // cobalt-50 + cobalt-700
  { bg: "#DCE3DC", fg: "#08251B" },  // forest-100 + forest-700
  { bg: "#1B3CF0", fg: "#FBF8F2" },  // cobalt-500 + surface-card
  { bg: "#E3DED2", fg: "#141312" },  // ash-100 + ink
  { bg: "#E6EBFE", fg: "#0F23A8" },  // cobalt-50 + cobalt-700 (repeat)
  { bg: "#141312", fg: "#F1ECE2" },  // ink + linen
  { bg: "#DCE3DC", fg: "#08251B" },  // forest-100 + forest-700 (repeat)
  { bg: "#1B3CF0", fg: "#FBF8F2" },  // cobalt-500 + surface-card (repeat)
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
