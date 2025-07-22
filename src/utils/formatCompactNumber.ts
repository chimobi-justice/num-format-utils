import type { FormatNumberProps, SupportedLocale } from "../types";
import { ensureNumberOrString, formatWithIntl } from "./helpers";

interface BaseProps extends FormatNumberProps<SupportedLocale> {}

/**
 * Props for compact notation (e.g. 1K, 2.3M)
 */
type CompactProps = BaseProps & {
  notation?: "compact";

  /**
   * compact display style for "compact" notation
   *
   * - "short" e.g. 1K
   * - "long" e.g. 6.5 thousand
   * @default "short"
   */
  compactDisplay?: "short" | "long";
};

/**
 * Props for standard notation (e.g. 1,000)
 * Disallow compactDisplay here
 */
type StandardProps = BaseProps & {
  notation?: "standard";
};

export type FormatCompactProps = CompactProps | StandardProps;

/**
 * Formats a number using the `Intl.NumberFormat` API with either "compact" or "standard" notation.
 *
 * - `"compact"` Formats numbers using abbreviations (e.g. 1K, 2.3M, 6.5 thousand).
 * - `"standard"` Formats numbers using regular locale-specific formatting (e.g., 1,000, 1,650,000).
 *
 * @param value - The numeric value to format.
 * @param locale - Optional BCP 47 locale string (e.g., "en-US", "en-NG").
 *                 @default "en-US"
 * @param notation - The formatting style: `"compact"` or `"standard"`.
 *                   @default "compact"
 * @param compactDisplay - Optional display style for compact notation: `"short"` or `"long"`.
 *                         Only applicable when `notation` is `"compact"`.
 *                         @default "short"
 * * @param compactDisplay - Optional display style for compact notation: `"short"` or `"long"`.
 *                         Only applicable when `notation` is `"compact"`.
 *                         @default "short"
 *
 * @example
 * formatCompactNumber({ value: 1000 });
 * // → "1K"
 *
 * formatCompactNumber({ value: 1000, notation: "standard" });
 * // → "1,000"
 *
 * formatCompactNumber({ value: 6500, locale: "en-NG", compactDisplay: "long" });
 * // → "6.5 thousand"
 *
 */
export const formatCompactNumber = ({
  value,
  locale = "en-US",
  notation = "compact",
  ...rest
}: FormatCompactProps) => {
  const options: Intl.NumberFormatOptions = {
    notation,
  };

  if (
    notation === "compact" &&
    "compactDisplay" in rest &&
    rest.compactDisplay
  ) {
    options.compactDisplay = rest.compactDisplay;
  }

  // Checks if the provided value is a valid number or numeric string.
  ensureNumberOrString(Number(value), "formatCompactNumber");

  return formatWithIntl({ value, options, locale });
};
