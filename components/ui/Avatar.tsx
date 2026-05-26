// v2 palette — softer sage, warmer clay
const GRADIENTS: Record<string, string> = {
  L: "linear-gradient(135deg, #E4EBD8, #A9BC95)",  // sage 100 → 400
  M: "linear-gradient(135deg, #F6E0CC, #E6B187)",  // peach 100 → 300
  S: "linear-gradient(135deg, #EFC9AA, #C26A3F)",  // peach 200 → clay 600
  J: "linear-gradient(135deg, #CFDABF, #6F855A)",  // sage 200 → sage 600
  N: "linear-gradient(135deg, #E4EBD8, #98AD8B)",  // sage 100 → sage 500
  T: "linear-gradient(135deg, #F6E0CC, #D88F68)",  // peach 100 → clay 500
  A: "linear-gradient(135deg, #EDE6D6, #BFB7A6)",  // mist → stone 3
};

interface AvatarProps {
  letter: string;
  size?: number;
}

export function Avatar({ letter, size = 40 }: AvatarProps) {
  const bg = GRADIENTS[letter] ?? GRADIENTS.A;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display)",
        fontSize: size * 0.45,
        color: "var(--mapa-paper)",
        flexShrink: 0,
      }}
    >
      {letter}
    </div>
  );
}
