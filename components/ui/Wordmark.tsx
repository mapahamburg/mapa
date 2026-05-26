/**
 * MAPA Wordmark · v2
 * The locked color lockup: M Harbor · A Clay · P Sage · A Ink · . Cobalt
 *
 * Usage:
 *   <Wordmark />                // default 72px color version (posters/social/stickers)
 *   <Wordmark size={120} />
 *   <Wordmark mono />           // monochrome ink (product UI default)
 *   <Wordmark mono="cream" />   // cream on dark surfaces
 *   <Wordmark mono="harbor" />  // harbor blue
 *
 * Note: the color variant is reserved for brand moments (posters, landing hero,
 * stickers). Product UI (nav, feed headers) always uses mono={true}.
 */
import { colors } from '@/lib/tokens';

type WordmarkProps = {
  size?: number;
  /** Monochrome mode. Pass true for ink, or 'cream' / 'harbor' for alternate surfaces. */
  mono?: boolean | 'cream' | 'harbor';
  dotColor?: string;
  className?: string;
};

const MONO_PRESETS = {
  true:   colors.ink,
  cream:  colors.cream,
  harbor: colors.harbor,
} as const;

export function Wordmark({
  size = 72,
  mono,
  dotColor,
  className,
}: WordmarkProps) {
  const c = mono
    ? (typeof mono === 'string' ? MONO_PRESETS[mono] : MONO_PRESETS.true)
    : null;

  const letters = c
    ? [c, c, c, c]
    : [colors.harbor, colors.clay[500], colors.sage[500], colors.ink];

  const dot = dotColor ?? (c ?? colors.cobalt);

  return (
    <span
      className={className}
      style={{
        fontFamily: `'Geist', sans-serif`,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: '-0.045em',
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'baseline',
        whiteSpace: 'nowrap',
      }}
      aria-label="MAPA"
    >
      <span style={{ color: letters[0] }}>M</span>
      <span style={{ color: letters[1] }}>A</span>
      <span style={{ color: letters[2] }}>P</span>
      <span style={{ color: letters[3] }}>A</span>
      <span style={{ color: dot }}>.</span>
    </span>
  );
}
