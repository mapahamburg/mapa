import { cn } from '@/lib/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'sage';
type ButtonSize    = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?:    ButtonSize;
  children: ReactNode;
}

const variantStyle: Record<ButtonVariant, string> = {
  primary:   'bg-cobalt text-paper hover:bg-cobalt-deep',
  secondary: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper',
  ghost:     'bg-transparent text-ink hover:bg-sunk',
  sage:      'bg-sage-deep text-paper hover:bg-sage-ink',
};

const sizeStyle: Record<ButtonSize, string> = {
  sm: 'px-4 py-2.5 text-meta',
  md: 'px-6 py-3.5 text-body',
};

export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-pill font-medium tracking-[-0.005em]',
        'transition-all duration-base ease-out active:scale-[0.98]',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cobalt/30',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variantStyle[variant],
        sizeStyle[size],
        className,
      )}
    >
      {children}
    </button>
  );
}
