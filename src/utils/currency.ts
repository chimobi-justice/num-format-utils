import type {
  FormatCurrencyProps,
  SupportedCurrency,
  SupportedLocale,
} from "../types";
import { formatWithIntl, normalizeNumber } from "../utils/helpers";

/**
 * Formats a single number as currency using the Intl.NumberFormat API.
 *
 * Unlike `createCurrencyFormatter`, this is a one-time formatter for individual values.
 * Automatically defaults to `"USD"` and `"en-US"` if currency or locale is not provided.
 *
 * @template C - The ISO 4217 currency code (e.g. "USD", "NGN"). Defaults to "USD".
 * @template L - The BCP 47 locale string (e.g. "en-US", "fr-FR"). Defaults to "en-US".
 *
 * @param params - An object containing:
 * @param value - The numeric value to format.
 * @param currency - Optional currency code. Defaults to `"USD"`.
 * @param locale - Optional locale string. Defaults to `"en-US"`.
 *
 * @returns A string representing the formatted currency (e.g. "$1,500.00").
 *
 * @example
 * ```ts
 * formatCurrency({ value: 1500 });
 * // "$1,500.00"
 *
 * formatCurrency({ value: 1299.99, currency: "EUR", locale: "de-DE" });
 * // "1.299,99 €"
 * ```
 */
export const formatCurrency = <
  C extends SupportedCurrency,
  L extends SupportedLocale,
>({
  value,
  currency = "USD" as C,
  locale = "en-US" as L,
}: FormatCurrencyProps<C, L>): string => {
  const saferValue = normalizeNumber(value);

  return formatWithIntl({
    value: saferValue,
    options: {
      style: "currency",
      currency,
    },
    locale,
  });
};

/**
 * Creates a reusable currency formatter function using the Intl.NumberFormat API.
 *
 * Useful for formatting multiple values with the same currency and locale
 * without creating a new formatter each time.
 *
 * @template C - The ISO 4217 currency code (e.g. "USD", "NGN"). Defaults to "USD".
 * @template L - The BCP 47 locale string (e.g. "en-US", "fr-FR"). Defaults to "en-US".
 *
 * @param currency - The currency code to format values with.
 * @param locale - The locale string that determines number formatting style.
 *
 * @returns A function that formats a number as currency using the specified currency and locale.
 *
 * @example
 * ```ts
 * const formatUSD = createCurrencyFormatter("USD", "en-US");
 * formatUSD(1500); // "$1,500.00"
 *
 * const formatEUR = createCurrencyFormatter("EUR", "de-DE");
 * formatEUR(1299.99); // "1.299,99 €"
 * ```
 */
export const createCurrencyFormatter = <
  C extends SupportedCurrency = "USD",
  L extends SupportedLocale = "en-US",
>(
  currency: C,
  locale: L
) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });

  return (value: number) => formatter.format(value);
};
