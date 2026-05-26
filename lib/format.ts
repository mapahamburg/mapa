/**
 * MAPA formatting helpers — date/time, meeting blocks, etc.
 * All output is German.
 */

const DAYS_SHORT   = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const MONTHS_SHORT = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
                      "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

/**
 * Human-readable relative time in German.
 * e.g. "vor 2 Min.", "vor 3 Std.", "gestern", "vor 4 Tagen"
 */
export function timeAgo(iso: string): string {
  const diffMs  = Date.now() - new Date(iso).getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHr  = Math.floor(diffMs / 3_600_000);
  const diffDay = Math.floor(diffMs / 86_400_000);

  if (diffMin < 1)  return "gerade eben";
  if (diffMin < 60) return `vor ${diffMin} Min.`;
  if (diffHr  < 24) return `vor ${diffHr} Std.`;
  if (diffDay === 1) return "gestern";
  if (diffDay <   7) return `vor ${diffDay} Tagen`;
  const diffWeek = Math.floor(diffDay / 7);
  return diffWeek === 1 ? "vor 1 Woche" : `vor ${diffWeek} Wochen`;
}

/**
 * Determine feed section from ISO timestamp.
 * "heute" = same calendar day, "woche" = earlier this week.
 */
export function feedSection(iso: string): "heute" | "woche" {
  const now       = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return new Date(iso) >= todayStart ? "heute" : "woche";
}

/**
 * Format an ISO timestamp for a meeting chip.
 * e.g. "Sa 25. Mai · 10:30"
 */
export function formatMeetingDate(iso: string): string {
  const d = new Date(iso);
  const day   = DAYS_SHORT[d.getDay()];
  const date  = d.getDate();
  const month = MONTHS_SHORT[d.getMonth()];
  const hh    = d.getHours().toString().padStart(2, "0");
  const mm    = d.getMinutes().toString().padStart(2, "0");
  return `${day} ${date}. ${month} · ${hh}:${mm}`;
}

/**
 * Format a min/max age range as a German string.
 * e.g. "2–5 Jahre", "ab 3 Jahren"
 */
export function formatAgeRange(min: number | null, max: number | null): string | undefined {
  if (min !== null && max !== null) return `${min}–${max} Jahre`;
  if (min !== null) return `ab ${min} Jahren`;
  if (max !== null) return `bis ${max} Jahren`;
  return undefined;
}
