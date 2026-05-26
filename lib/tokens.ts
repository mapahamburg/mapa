/**
 * MAPA Design Tokens · v2
 * Source of truth: /export/system_v2/colors_and_type.css
 *
 * Use these in non-CSS contexts (charts, canvas, animations, React Native).
 * For component styling prefer CSS custom properties (var(--mapa-sage-500))
 * or the Tailwind theme keys.
 */

export const colors = {
  // Surfaces — warm cream stepping
  paper:      '#FFFDF8',
  ivory:      '#FAF6EE',
  cream:      '#F5F1E8',   // ★ primary background
  creamDeep:  '#EFE7DA',   // sunk surfaces
  mist:       '#EDE6D6',   // form fields
  sand:       '#DCCFBF',   // warm neutral accent

  // Sage — brand (v2: lighter, more nordic)
  sage: {
    50:  '#F2F5EC',
    100: '#E4EBD8',
    200: '#CFDABF',
    300: '#BAC9A6',
    400: '#A9BC95',
    500: '#98AD8B',  // ★ primary brand
    600: '#6F855A',  // hover / active
    700: '#586B47',
    800: '#435238',
  },

  // Peach / Clay — accent (v2: softer 500)
  peach: {
    50:  '#FBF1E8',
    100: '#F6E0CC',
    200: '#EFC9AA',
    300: '#E6B187',
    400: '#DDA078',
  },
  clay: {
    500: '#D88F68',  // ★ accent
    600: '#C26A3F',  // pressed
    700: '#A5552F',
  },

  // Wordmark accents (logo lockup: posters/social/stickers only)
  harbor:  '#4F6B86',  // M
  cobalt:  '#2F4A8F',  // .

  // Ink — text (v2: deeper)
  ink:     '#171614',  // ★ primary text
  ink2:    '#3A352D',
  stone1:  '#6B6457',
  stone2:  '#948C7E',
  stone3:  '#BFB7A6',

  // Lines
  line:     '#E0D8C6',
  lineSoft: '#EBE4D3',

  // Semantic
  success: '#98AD8B',
  warning: '#C58B36',
  danger:  '#B0533D',
  info:    '#4F6B86',
} as const;

export const fonts = {
  display: `'Instrument Serif', 'Georgia', serif`,  // editorial only
  ui:      `'Geist', ui-sans-serif, system-ui, -apple-system, sans-serif`,
} as const;

export const fontSize = {
  displayXl:  '72px',
  displayL:   '56px',
  displayM:   '40px',
  displayS:   '32px',
  displayXs:  '26px',
  h1:         '28px',
  h2:         '22px',
  h3:         '18px',
  body:       '16px',
  meta:       '14px',
  caption:    '12px',
  micro:      '11px',
} as const;

export const fontWeight = {
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
} as const;

export const lineHeight = {
  display: 1.05,
  tight:   1.15,
  snug:    1.3,
  body:    1.55,
  loose:   1.65,
} as const;

export const tracking = {
  display:   '-0.02em',
  tight:     '-0.01em',
  normal:    '0',
  meta:      '0.02em',
  monoCaps:  '0.08em',
  wordmark:  '-0.045em',
} as const;

export const radius = {
  xs:   '4px',
  s:    '8px',
  m:    '12px',
  l:    '16px',
  xl:   '20px',
  '2xl':'28px',
  pill: '999px',
} as const;

export const space = {
  1:  '4px',
  2:  '8px',
  3:  '12px',
  4:  '16px',
  5:  '20px',
  6:  '24px',
  7:  '32px',
  8:  '40px',
  9:  '56px',
  10: '72px',
} as const;

export const shadow = {
  xs: '0 1px 2px rgba(60, 48, 28, 0.05)',
  s:  '0 2px 6px rgba(60, 48, 28, 0.06), 0 1px 2px rgba(60, 48, 28, 0.04)',
  m:  '0 8px 20px -8px rgba(60, 48, 28, 0.12), 0 2px 6px rgba(60, 48, 28, 0.05)',
  l:  '0 20px 40px -18px rgba(60, 48, 28, 0.18), 0 4px 10px rgba(60, 48, 28, 0.06)',
} as const;

export const motion = {
  easeSoft: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  easeOut:  'cubic-bezier(0.16, 1, 0.3, 1)',
  durFast:  '120ms',
  durBase:  '200ms',
  durSlow:  '360ms',
} as const;

export const tokens = {
  colors, fonts, fontSize, fontWeight, lineHeight,
  tracking, radius, space, shadow, motion,
} as const;

export type MapaTokens = typeof tokens;

// Avatar gradient presets — updated to v2 palette
export const avatarGradients: Record<string, string> = {
  L: `linear-gradient(135deg, ${colors.sage[100]}, ${colors.sage[400]})`,
  M: `linear-gradient(135deg, ${colors.peach[100]}, ${colors.peach[300]})`,
  S: `linear-gradient(135deg, ${colors.peach[200]}, ${colors.clay[600]})`,
  J: `linear-gradient(135deg, ${colors.sage[200]}, ${colors.sage[600]})`,
  N: `linear-gradient(135deg, ${colors.sage[100]}, ${colors.sage[500]})`,
  T: `linear-gradient(135deg, ${colors.peach[100]}, ${colors.clay[500]})`,
  A: `linear-gradient(135deg, ${colors.mist}, ${colors.stone3})`,
  _default: `linear-gradient(135deg, ${colors.sage[100]}, ${colors.sage[400]})`,
};
