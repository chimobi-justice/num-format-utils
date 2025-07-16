import type {
  FormatCurrencyProps,
  StrictLocaleCurrencyPair,
  SupportedCurrency,
  SupportedLocale,
} from "../types";
import {
  ensureNumberOrString,
  formatWithIntl,
  normalizeNumber,
} from "../utils/helpers";

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
 * Strictly formats a single number as currency using the Intl.NumberFormat API,
 * requiring a valid locale–currency pair.
 *
 * This is a stricter alternative to `formatCurrency` where the `locale` and `currency`
 * must be explicitly matched as a valid pair defined in `StrictLocaleCurrencyPair`.
 *
 * Unlike `formatCurrency`, this function does not fall back to defaults and
 * ensures only correct combinations (e.g., "de-DE" + "EUR") are passed.
 *
 * @param params - An object containing:
 *   - `value`: The numeric value to format.
 *   - `locale`: A strict BCP 47 locale string (e.g. "ja-JP") from a valid pair.
 *   - `currency`: A strict ISO 4217 currency code (e.g. "JPY") from a valid pair.
 *
 * @returns A string representing the formatted currency (e.g. "¥1,500").
 *
 * @example
 * ```ts
 * formatCurrencyLockedPair({ value: 1500, locale: "ja-JP", currency: "JPY" });
 * // "￥1,500"
 *
 * formatCurrencyLockedPair({ value: 1000, locale: "en-GB", currency: "GBP" });
 * // "£1,000.00"
 * ```
 */
export const formatCurrencyMatch = ({
  value,
  currency,
  locale,
}: {
  value: number | string;
} & StrictLocaleCurrencyPair): string => {
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

  return (value: number | string) => {
    const numericValue = Number(value);

    // Checks if the provided value is a valid number or numeric string.
    ensureNumberOrString(numericValue, "createCurrencyFormatter");

    return formatter.format(Number(numericValue));
  };
};
