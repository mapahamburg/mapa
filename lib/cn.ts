type Value = string | number | boolean | undefined | null | Record<string, boolean>;
export function cn(...values: Value[]): string {
  const out: string[] = [];
  for (const v of values) {
    if (!v) continue;
    if (typeof v === 'string') out.push(v);
    else if (typeof v === 'number') out.push(String(v));
    else if (typeof v === 'object') {
      for (const [k, on] of Object.entries(v)) if (on) out.push(k);
    }
  }
  return out.join(' ');
}
