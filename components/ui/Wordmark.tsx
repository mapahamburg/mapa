/**
 * MAPA Wordmark · v2
 *
 * Default: M Harbor · APA Ink · . Cobalt  — "quiet confidence"
 * Full color (opt-in): M Harbor · A Clay · P Sage · A Ink · . Cobalt
 *
 * Usage:
 *   <Wordmark />                 // default: M harbor, APA ink, . cobalt
 *   <Wordmark fullColor />       // all five letters get unique brand colors
 *   <Wordmark mono />            // all ink (e.g. dark print)
 *   <Wordmark mono="cream" />    // cream on dark surfaces
 */
import { colors } from '@/lib/tokens';

type WordmarkProps = {
  size?: number;
  /** Full five-color lockup — reserved for posters/social/stickers. */
  fullColor?: boolean;
  /** Monochrome override. true = ink, 'cream' = light surfaces, 'harbor' = harbor blue. */
  mono?: boolean | 'cream' | 'harbor';
  className?: string;
};

const MONO_PRESETS = {
  true:   colors.ink,
  cream:  colors.cream,
  harbor: colors.harbor,
} as const;

export function Wordmark({
  size = 72,
  fullColor = false,
  mono,
  className,
}: WordmarkProps) {
  // Monochrome overrides everything
  if (mono) {
    const c = typeof mono === 'string' ? MONO_PRESETS[mono] : MONO_PRESETS.true;
    return (
      <span className={className} style={wrapStyle(size)} aria-label="MAPA">
        <span style={{ color: c }}>MAPA</span>
        <span style={{ color: c }}>.</span>
      </span>
    );
  }

  // Full five-color lockup (opt-in, for brand moments)
  if (fullColor) {
    return (
      <span className={className} style={wrapStyle(size)} aria-label="MAPA">
        <span style={{ color: colors.harbor }}>M</span>
        <span style={{ color: colors.clay[500] }}>A</span>
        <span style={{ color: colors.sage[500] }}>P</span>
        <span style={{ color: colors.ink }}>A</span>
        <span style={{ color: colors.cobalt }}>.</span>
      </span>
    );
  }

  // Default: M=Harbor, APA=Ink, .=Cobalt — restrained, confident
  return (
    <span className={className} style={wrapStyle(size)} aria-label="MAPA">
      <span style={{ color: colors.harbor }}>M</span>
      <span style={{ color: colors.ink }}>APA</span>
      <span style={{ color: colors.cobalt }}>.</span>
    </span>
  );
}

function wrapStyle(size: number): React.CSSProperties {
  return {
    fontFamily: `'Geist', sans-serif`,
    fontWeight: 700,
    fontSize: size,
    letterSpacing: '-0.045em',
    lineHeight: 1,
    display: 'inline-flex',
    alignItems: 'baseline',
    whiteSpace: 'nowrap',
  };
}
