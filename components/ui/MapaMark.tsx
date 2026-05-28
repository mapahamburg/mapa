/**
 * mapa · MapaMark.tsx
 * ────────────────────────────────────────────────────────────
 * The canonical wordmark component. One source of truth for
 * every surface — never reach around it. Sizing is one prop
 * (`size`); theme is one prop (`theme`); the lockup with the
 * city name is one prop (`hamburg`).
 *
 * Requires `mapa-mark.css` to be loaded globally.
 */

import * as React from "react";

type Theme = "cream" | "paper" | "cobalt" | "ink";

export interface MapaMarkProps {
  /** Wordmark font-size. Number → px, string → any CSS length. Defaults to inherit. */
  size?: number | string;
  /** Theme variant. Picks the right dot + text colors via CSS variable. */
  theme?: Theme;
  /** Add the " hamburg" city lockup after the wordmark (Geist 400, 0.83×). */
  hamburg?: boolean;
  /** Extra class names on the outer span. */
  className?: string;
  /** Extra inline styles on the outer span. Use sparingly. */
  style?: React.CSSProperties;
}

const DOT_SVG = (
  <svg viewBox="0 0 1 1" aria-hidden="true">
    <circle cx="0.5" cy="0.5" r="0.5" />
  </svg>
);

export function MapaMark({
  size,
  theme,
  hamburg = false,
  className = "",
  style,
}: MapaMarkProps) {
  const themeClass = theme ? ` on-${theme}` : "";
  const sizedStyle: React.CSSProperties = {
    ...(size !== undefined && {
      fontSize: typeof size === "number" ? `${size}px` : size,
    }),
    ...style,
  };

  const mark = (
    <span
      className={`mapa-mark${themeClass} ${className}`.trim()}
      style={sizedStyle}
    >
      mapa
      {DOT_SVG}
    </span>
  );

  if (!hamburg) return mark;

  // City lockup — "hamburg" sits at 0.83× the wordmark size in Geist 400.
  // Wrapping span carries the font-size so the inner em-relative sizes
  // resolve consistently.
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: "0.17em",
        ...sizedStyle,
      }}
    >
      <span className={`mapa-mark${themeClass} ${className}`.trim()}>
        mapa
        {DOT_SVG}
      </span>
      <span
        style={{
          fontFamily:
            "'Geist', ui-sans-serif, system-ui, -apple-system, 'Helvetica Neue', sans-serif",
          fontWeight: 400,
          fontSize: "0.83em",
          letterSpacing: "-0.02em",
          color: themeIsDark(theme)
            ? "rgba(255,253,248,0.78)"
            : "var(--mapa-stone-1, #6B6457)",
        }}
      >
        hamburg
      </span>
    </span>
  );
}

function themeIsDark(theme?: Theme): boolean {
  return theme === "cobalt" || theme === "ink";
}

/**
 * MapaFavMark — the abbreviated "m." wordmark for favicons,
 * app icons, PWA shells. Sized via parent.
 */
export interface MapaFavMarkProps {
  /** Square edge in px. The "m" sits at 0.62 × edge. */
  edge: number;
  /** Theme — background + dot color. */
  theme?: Theme;
  /** Apply iOS squircle border-radius (22%). Default true; pass false for browser favicons. */
  squircle?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function MapaFavMark({
  edge,
  theme = "cobalt",
  squircle = true,
  className = "",
  style,
}: MapaFavMarkProps) {
  const bg = {
    cream: "var(--mapa-cream, #F5F1E8)",
    paper: "var(--mapa-paper, #FFFDF8)",
    cobalt: "var(--mapa-cobalt, #2540D6)",
    ink: "var(--mapa-ink, #171614)",
  }[theme];

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: edge,
        height: edge,
        borderRadius: squircle ? `${edge * 0.22}px` : 0,
        background: bg,
        ...style,
      }}
    >
      <span className={`fav-mark on-${theme}`} style={{ fontSize: edge * 0.62 }}>
        m
        {DOT_SVG}
      </span>
    </span>
  );
}
