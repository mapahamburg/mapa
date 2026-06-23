// v3: letter-keyed flat color pairs using v3 tokens
const PAIRS: { bg: string; fg: string }[] = [
  { bg: '#E2E6FB', fg: '#1B33B5' },  // cobalt-soft + cobalt-ink
  { bg: '#EDE6D6', fg: '#3A352D' },  // field + ink-2
  { bg: '#2540D6', fg: '#FFFDF8' },  // cobalt + paper
  { bg: '#E3DED2', fg: '#171614' },  // ash + ink
  { bg: '#F6E0CC', fg: '#8B4220' },  // clay-soft + clay-ink
  { bg: '#171614', fg: '#F5F1E8' },  // ink + cream
];

interface AvatarProps { letter: string; size?: number; }

export function Avatar({ letter, size = 40 }: AvatarProps) {
  const pair = PAIRS[letter.charCodeAt(0) % PAIRS.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: pair.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Geist', ui-sans-serif, sans-serif",
      fontWeight: 600,
      fontSize: size * 0.42,
      color: pair.fg,
      flexShrink: 0,
      lineHeight: 1,
    }}>
      {letter.toUpperCase()}
    </div>
  );
}
