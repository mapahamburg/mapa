/**
 * mapa.hamburg — Design tokens v3
 * Use in non-CSS contexts (charts, canvas, OG images, email, iOS bridge).
 * In React components, use Tailwind classes or CSS custom properties.
 */

export const color = {
  paper:    '#FFFDF8',
  ivory:    '#FAF6EE',
  cream:    '#F5F1E8',
  sunk:     '#EFE7DA',
  field:    '#EDE6D6',

  ink:      '#171614',
  ink2:     '#3A352D',
  muted:    '#6B6457',
  subtle:   '#948C7E',
  faint:    '#BFB7A6',

  line:     '#E0D8C6',
  lineSoft: '#EBE4D3',

  cobalt:     '#2540D6',
  cobaltDeep: '#1A2EB0',
  cobaltInk:  '#1B33B5',
  cobaltSoft: '#E2E6FB',

  sage:     '#98AD8B',
  sageDeep: '#6F855A',
  sageInk:  '#455234',
  sageSoft: '#DDE6D2',

  clay:     '#D88F68',
  clayDeep: '#C26A3F',
  clayInk:  '#8B4220',
  claySoft: '#F6E0CC',

  success: '#6F855A',
  warning: '#C58B36',
  danger:  '#B0533D',
  info:    '#1B33B5',
} as const;

/** Backward compat for components that import `colors` */
export const colors = {
  paper:   color.paper,
  ivory:   color.ivory,
  cream:   color.cream,
  ink:     color.ink,
  ink2:    color.ink2,
  harbor:  '#4F6B86',   // kept for Wordmark legacy
  cobalt:  color.cobalt,
  sage: {
    50: '#F2F7EE', 100: '#DDE6D2', 200: '#C5D8B8',
    300: '#AECA9E', 400: '#98AD8B', 500: '#98AD8B',
    600: '#6F855A', 700: '#455234', 800: '#2F3A22',
  },
  peach: {
    50: '#FBF1E8', 100: '#F6E0CC', 200: '#EFC9AA',
    300: '#E6B187', 400: '#DDA078',
  },
  clay: { 500: '#D88F68', 600: '#C26A3F', 700: '#8B4220' },
  stone1: '#6B6457', stone2: '#948C7E', stone3: '#BFB7A6',
  line:     '#E0D8C6',
  lineSoft: '#EBE4D3',
  success: '#6F855A',
  warning: '#C58B36',
  danger:  '#B0533D',
  info:    '#1B33B5',
} as const;

export type PostType = 'recommend' | 'question' | 'meet' | 'search' | 'event';

export const postTypeLabel: Record<PostType, string> = {
  recommend: 'Empfehlung',
  question:  'Frage',
  meet:      'Treffen',
  search:    'Suche',
  event:     'Veranstaltung',
};

export const radius = {
  xs: 4, sm: 8, base: 12, md: 14, lg: 20, xl: 28, xxl: 36, pill: 999,
} as const;

export const motion = {
  easeSoft: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut:  'cubic-bezier(0.16, 1, 0.3, 1)',
  fast: 120, base: 200, slow: 360,
} as const;

// Keep named exports that other files use
export const tokens = { color, colors, radius, motion } as const;
