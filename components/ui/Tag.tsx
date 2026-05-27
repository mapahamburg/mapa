import { cn } from '@/lib/cn';

// DB types (German) + design-system types (English)
type DBPostType = 'empfehlung' | 'frage' | 'treffen' | 'suche' | 'veranstaltung';
type DSPostType = 'recommend' | 'question' | 'meet' | 'search' | 'event';
export type PostType = DBPostType | DSPostType;

const tagStyle: Record<PostType, string> = {
  // DB types
  empfehlung:    'bg-cobalt-soft text-cobalt-ink',
  frage:         'bg-clay-soft text-clay-ink',
  treffen:       'bg-field text-ink-2',
  suche:         'bg-sage-soft text-sage-ink',
  veranstaltung: 'bg-sunk text-ink-2',
  // Design-system types (same mapping)
  recommend: 'bg-cobalt-soft text-cobalt-ink',
  question:  'bg-clay-soft text-clay-ink',
  meet:      'bg-field text-ink-2',
  search:    'bg-sage-soft text-sage-ink',
  event:     'bg-sunk text-ink-2',
};

const tagLabel: Record<PostType, string> = {
  empfehlung:    'Empfehlung',
  frage:         'Frage',
  treffen:       'Treffen',
  suche:         'Suche',
  veranstaltung: 'Veranstaltung',
  recommend:     'Empfehlung',
  question:      'Frage',
  meet:          'Treffen',
  search:        'Suche',
  event:         'Veranstaltung',
};

interface TagProps {
  type: PostType;
  /** size prop retained for backward compat with existing callers */
  size?: 's' | 'm';
  className?: string;
}

export function Tag({ type, className }: TagProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-pill text-caption font-medium',
      tagStyle[type] ?? 'bg-sunk text-ink-2',
      className,
    )}>
      {tagLabel[type] ?? type}
    </span>
  );
}
