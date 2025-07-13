import type {
  FormatDecimalProps,
  FormatNumberProps,
  SupportedLocale,
} from "../types";
import { formatWithIntl } from "./helpers";

/**
 * Formats a numeric value using locale-specific digit grouping and decimal separators.
 *
 * Useful for general number formatting without currency or percentage styling.
 *
 * @template L - The BCP 47 locale string (e.g. "en-US", "fr-FR"). Defaults to "en-US".
 *
 * @param value - The numeric value to format.
 * @param locale - Optional. The locale used to format the number.
 *
 * @returns A locale-formatted number string (e.g. "1,000" or "1.000" depending on locale).
 *
 * @example
 * ```ts
 * formatNumber({ value: 1000000 }); // "1,000,000" (in "en-US")
 * formatNumber({ value: 1000000, locale: "en-NG" }); // "1.000.000"
 * ```
 */
export const formatNumber = <L extends SupportedLocale>({
  value,
  locale = "en-US" as L,
}: FormatNumberProps<L>) => {
  return formatWithIntl({ value, locale });
};

/**
 * Formats a numeric value to a fixed number of decimal places.
 *
 * This function is useful when you want strict control over how many decimals
 * are shown, regardless of locale formatting.
 *
 * @param value - The numeric value to format (e.g. `1000` becomes `"1000.00"`).
 * @param decimals - Optional. The number of decimal places to keep. Defaults to `2`.
 * @param locale - Optional locale string. Defaults to `"en-US"`.
 *
 * @returns A string representing the number with the specified fixed decimals.
 *
 * @example
 * ```ts
 * formatDecimal({ value: 123.456 }); // "123.46"
 * formatDecimal({ value: 123456, decimals: 2 }); // "123,456.00"
 * formatDecimal({ value: 1000, locale: "en-NG"  }); // "1000.00"
 * ```
 */
export const formatDecimal = ({
  value,
  decimals = 2,
  locale = "en-US",
}: FormatDecimalProps): string => {
  return formatWithIntl({
    value,
    options: {
      style: "decimal",
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    },
    locale,
  });
};
