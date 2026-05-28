/**
 * Logo.tsx — backward-compatible wrapper around MapaMark.
 * All new code should use <MapaMark> directly.
 */
import { MapaMark } from "./MapaMark";
import type { MapaMarkProps } from "./MapaMark";

interface LogoProps {
  size?: number | string;
  /** Show "hamburg" city lockup after the wordmark. */
  lockup?: boolean;
  theme?: MapaMarkProps["theme"];
  className?: string;
}

export function Logo({ size, lockup = false, theme, className }: LogoProps) {
  return (
    <MapaMark
      size={size}
      hamburg={lockup}
      theme={theme}
      className={className}
    />
  );
}
