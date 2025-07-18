import type { SupportedLocale } from "../types";

export type DateTimePreset =
  | "short"
  | "long"
  | "dateOnly"
  | "timeOnly"
  | "full";

export interface FormatDateTimeProps {
  date: Date | string | number | null | undefined;
  locale?: SupportedLocale;
  options?: Intl.DateTimeFormatOptions | DateTimePreset;
}

const presetMap: Record<DateTimePreset, Intl.DateTimeFormatOptions> = {
  short: {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  },
  long: {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  },
  full: {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  },
  dateOnly: {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  timeOnly: {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  },
};

/**
 * Formats a date or timestamp into a localized string using Intl.DateTimeFormat.
 *
 * - Accepts common date types: `Date`, `string`, `number`, or `timestamp`.
 * - Provides friendly presets like `"short"`, `"long"`, `"dateOnly"`, `"timeOnly"`, and `"full"`.
 * - Falls back to `"en-US"` and `"full"` format by default.
 * - Returns an empty string and logs a warning if the input is invalid.
 *
 * @param date - A valid date string, number (timestamp), or Date object.
 * @param locale - Optional locale string (e.g., `"en-US"`). Defaults to `"en-US"`.
 * @param options - Either an Intl.DateTimeFormatOptions object or a preset key.
 *
 * @returns A formatted date/time string or `""` if input is invalid.
 *
 * @example
 * ```ts
 * formatDateTime({ date: "2025-07-15T08:00:00Z" })
 * // → "July 15, 2025 at 8:00:00 AM"
 *
 * formatDateTime({ date: Date.now(), options: "short" })
 * // → "07/15/25, 10:04"
 *
 * formatDateTime({
 *  date: (Date.UTC(2012, 11, 20, 3, 0, 0, 200)),
 *  locale: "en-AU",
 *  options: {
 *    timeZone: "Australia/Sydney",
 *    timeZoneName: "short"
 *  }
 * }));
 * // 20/12/2012, AEDT
 *
 * formatDateTime({ date: "abc" })
 * // → "" (and logs a warning)
 * ```
 */
export const formatDateTime = ({
  date,
  locale = "en-US",
  options = "full",
}: FormatDateTimeProps): string => {
  // if date received no value return
  if (date == null || date == undefined) {
    console.warn(`[formatDateTime] ⚠️ Receive null or undefined date`);
    return "";
  }

  const dt = new Date(date);

  if (isNaN(dt.getTime())) {
    console.warn(`[formatDateTime] ⚠️ Invalid date input: "${date}"`);

    return "";
  }

  const resolvedOptions =
    typeof options === "string" ? presetMap[options] || {} : options;

  const formatter = new Intl.DateTimeFormat(locale, resolvedOptions);

  return formatter.format(dt);
};
