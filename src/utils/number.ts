import type { 
  FormatDecimalProps,
  FormatNumberProps, 
  SupportedLocale 
} from "../types";

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
 * formatNumber({ value: 1000000, locale: "de-DE" }); // "1.000.000"
 * ```
 */
export const formatNumber = <L extends SupportedLocale>({
  value,
  locale = "en-US" as L
}: FormatNumberProps<L>) => {
  return new Intl.NumberFormat(locale).format(value);
}

// const number = formatNumber({ value: 1000, locale: "en-NG" });
// console.log(number);


/**
 * Formats a numeric value to a fixed number of decimal places.
 *
 * This function is useful when you want strict control over how many decimals
 * are shown, regardless of locale formatting.
 *
 * @param value - The numeric value to format (e.g. `1000` becomes `"1000.00"`).
 * @param decimals - Optional. The number of decimal places to keep. Defaults to `2`.
 *
 * @returns A string representing the number with the specified fixed decimals.
 *
 * @example
 * ```ts
 * formatDecimal({ value: 123.456 }); // "123.46"
 * formatDecimal({ value: 123.4, decimals: 3 }); // "123.400"
 * formatDecimal({ value: 1000 }); // "1000.00"
 * ```
 */
export const formatDecimal = ({
  value,
  decimals = 2
}: FormatDecimalProps
): string => {

  return value.toFixed(decimals)
}

// const decimals = formatDecimal({ value: 1000 });
// console.log(decimals);