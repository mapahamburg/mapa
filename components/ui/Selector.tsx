import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

interface SelectorProps {
  active:    boolean;
  children:  ReactNode;
  onClick?:  () => void;
  className?: string;
}

export function Selector({ active, children, onClick, className }: SelectorProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center px-4 py-2 rounded-pill text-meta font-medium',
        'transition-colors duration-base ease-out',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cobalt/30',
        active
          ? 'bg-ink text-paper'
          : 'bg-paper text-ink border border-line hover:bg-ivory',
        className,
      )}
    >
      {children}
    </button>
  );
}
