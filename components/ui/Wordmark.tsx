import { colors } from '@/lib/tokens';

type WordmarkProps = {
  size?: number;
  dot?: 'cobalt' | 'clay';
  variant?: 'standalone' | 'header';
  className?: string;
};

export function Wordmark({ size = 24, dot = 'cobalt', variant = 'standalone', className }: WordmarkProps) {
  const dotColor = dot === 'cobalt' ? colors.cobalt : colors.clay[500];
  const dotSize  = Math.max(4, Math.round(size * 0.18));

  const mark = (
    <span
      className={className}
      style={{
        fontFamily: "'Geist', ui-sans-serif, sans-serif",
        fontWeight: 800,
        fontSize: size,
        letterSpacing: '-0.055em',
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'flex-end',
        whiteSpace: 'nowrap',
        color: 'var(--color-ink)',
      }}
      aria-label="mapa"
    >
      mapa
      <span
        style={{
          display: 'inline-block',
          borderRadius: '50%',
          width: dotSize,
          height: dotSize,
          marginLeft: -(dotSize * 0.15),
          marginBottom: dotSize * 0.5,
          background: dotColor,
          flexShrink: 0,
        }}
      />
    </span>
  );

  if (variant === 'standalone') return mark;

  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
      {mark}
      <span style={{
        fontFamily: "'Geist', ui-sans-serif, sans-serif",
        fontWeight: 400,
        fontSize: size * 0.86,
        letterSpacing: '-0.02em',
        color: 'var(--color-muted)',
        lineHeight: 1,
      }}>
        hamburg
      </span>
    </span>
  );
}
