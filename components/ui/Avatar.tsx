// New palette — flat bg + contrasting fg
const GRADIENTS: { bg: string; fg: string }[] = [
  { bg: "#C9D5B8", fg: "#4A6440" },  // sage-200 + olive-700
  { bg: "#F0C2A0", fg: "#A95636" },  // clay-200 + clay-600
  { bg: "#6B8459", fg: "#F2ECE0" },  // olive-500 + surface-page
  { bg: "#F6DEC6", fg: "#A95636" },  // clay-100 + clay-600
  { bg: "#DFE7D2", fg: "#4A6440" },  // sage-100 + olive-700
  { bg: "#1C1A17", fg: "#F2ECE0" },  // ink + surface-page
  { bg: "#4A6440", fg: "#F2ECE0" },  // olive-700 + surface-page
  { bg: "#DC8C66", fg: "#6B3320" },  // clay-400 + clay-900
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
