/**
 * Compact, dependency-free relative date ("3 days ago"). Pure and client-safe.
 * Returns `null` for empty/invalid input so callers can omit the line entirely.
 */
export function relativeDate(iso: string | null | undefined, now: Date = new Date()): string | null {
  if (!iso) return null;
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return null;

  const seconds = Math.max(0, (now.getTime() - then.getTime()) / 1000);
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;
  const years = days / 365;

  const phrase = (value: number, unit: string) => {
    const n = Math.round(value);
    return `${n} ${unit}${n === 1 ? "" : "s"} ago`;
  };

  if (seconds < 45) return "just now";
  if (minutes < 60) return phrase(minutes, "minute");
  if (hours < 24) return phrase(hours, "hour");
  if (days < 7) return phrase(days, "day");
  if (weeks < 5) return phrase(weeks, "week");
  if (months < 12) return phrase(months, "month");
  return phrase(years, "year");
}
