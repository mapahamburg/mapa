import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type StatusVariant = 'host' | 'beta' | 'now' | 'progress' | 'future';

interface StatusBadgeProps {
  variant:   StatusVariant;
  children:  ReactNode;
  className?: string;
}

const variantStyle: Record<StatusVariant, string> = {
  host:     'bg-sage-soft text-sage-ink',
  beta:     'bg-cobalt-soft text-cobalt-ink',
  now:      'bg-cobalt text-paper',
  progress: 'bg-cobalt-soft text-cobalt-ink',
  future:   'bg-paper text-muted border border-line',
};

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-pill',
      'text-micro font-semibold uppercase tracking-wider',
      variantStyle[variant],
      className,
    )}>
      {children}
    </span>
  );
}
