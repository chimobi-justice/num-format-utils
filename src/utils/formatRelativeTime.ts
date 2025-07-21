import type { SupportedLocale } from "../types";
import { ensureNumber } from "../utils/helpers";

interface FormatRelativeTimeIntlProps {
  value: number;
  unit?: Intl.RelativeTimeFormatUnit;
  locale?: SupportedLocale;
  plain?: boolean;
  numeric?: "auto" | "always";
  style?: "short" | "long" | "narrow";
}

/**
 * Formats a time offset (relative difference) into a human-readable string using `Intl.RelativeTimeFormat`.
 *
 * - Supports units like `"minute"`, `"hour"`, `"day"`, `"week"`, etc.
 * - Can return plain output (e.g., remove "in" or "ago") using `plain: true`.
 * - Falls back to `"en-US"`, `"day"`, and `"long"` style by default.
 *
 * @param value - The numeric offset (positive for future, negative for past).
 * @param unit - The time unit to format with. Defaults to `"day"`.
 * @param locale - Optional locale (e.g., `"en-US"`). Defaults to `"en-US"`.
 * @param plain - If true, removes direction words like "in"/"ago". Defaults to `false`.
 * @param numeric - `"always"` for strict (e.g. "in 1 day"), `"auto"` for natural (e.g. "tomorrow"). Defaults to `"always"`.
 * @param style - Display style: `"long"`, `"short"`, or `"narrow"`. Defaults to `"long"`.
 *
 * @returns A formatted relative time string (e.g., `"in 3 days"` or `"3 days ago"`).
 *
 * @example
 * ```ts
 * formatRelativeTime({ value: -2 });
 * // → "2 days ago"
 *
 * formatRelativeTime({ value: 5, unit: "minute", plain: true });
 * // → "5 minutes"
 *
 * formatRelativeTime({ value: 1, unit: "day", numeric: "auto" });
 * // → "tomorrow"
 * ```
 */
export const formatRelativeTime = ({
  value,
  unit = "day",
  locale = "en-US",
  plain = false,
  numeric = "always",
  style = "long",
}: FormatRelativeTimeIntlProps): string => {
  // Checks if the provided value is a valid number.
  ensureNumber(value, "formatRelativeTime");

  const formatter = new Intl.RelativeTimeFormat(locale, {
    numeric,
    style,
  });

  let formatted = formatter.format(value, unit);

  if (plain) {
    formatted = formatted
      .replace(/^in\s+/i, "") // "remove "in "
      .replace(/\s+ago$/i, "") // "remove ago "
      .replace(/\u00a0/g, " ") // replace non-breaking space
      .trim();
  }

  return formatted;
};
