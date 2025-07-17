import type { SupportedCurrency, SupportedLocale } from "../types";
import {
  ensureNumberOrString,
  formatWithIntl,
  normalizeNumber,
} from "../utils/helpers";

export const localeCurrencyPairs = {
  "en-US": ["USD"],
  "en-GB": ["GBP"],
  "en-NG": ["NGN"],
  "fr-FR": ["EUR"],
  "ja-JP": ["JPY"],
  "en-CA": ["CAD"],
  "zh-CN": ["CNY"],
  "hi-IN": ["INR"],
  "en-AU": ["AUD"],
  "pt-BR": ["BRL"],
  "es-MX": ["MXN"],
  "de-DE": ["EUR", "CHF"], // Example if multiple currencies per locale
  "it-IT": ["EUR"],
  "ru-RU": ["RUB"],
  "ko-KR": ["KRW"],
  "ar-AE": ["AED"],
  "ar-SA": ["SAR"],
  "en-ZA": ["ZAR"],
  "es-ES": ["EUR"],
  "nl-NL": ["EUR"],
} as const;

type LocaleCurrencyMap = typeof localeCurrencyPairs;

type GetLocale = keyof LocaleCurrencyMap;

export type FormatCurrencyStrictProps<L extends keyof LocaleCurrencyMap> = {
  value: number | string;
  locale: L;
  currency: LocaleCurrencyMap[L][number];
};

export type FormatCurrencyProps<L extends GetLocale = "en-US"> =
  | { value: number | string }
  | { value: number | string; locale: L }
  | {
      value: number | string;
      locale: L;
      currency: LocaleCurrencyMap[L][number];
    };

export interface CurrencyDisplayTypes {
  currencyDisplay?: "code" | "name" | "symbol" | "narrowSymbol";
}

/**
 * Formats a single number as currency using the Intl.NumberFormat API.
 *
 * - If only `value` is provided, defaults to `"USD"` and `"en-US"`.
 * - If `locale` is provided without `currency`, uses the locale's default currency.
 * - If both `locale` and `currency` are provided, uses them directly **only if** the pair is valid.
 *
 * ❗ If an invalid locale–currency combination is passed, the function will fallback to the default currency for that locale.
 * ❗ If `currency` is passed without `locale`, TypeScript will show a type error.
 *
 *  @template To change the currency signs
 *  e.g (₦787.00 -> "narrowSymbol" by default, NGN 787.00 -> "code", 787.00 Nigerian nairas -> "name" or  NGN 787.00 -> "symbol")
 *  @template To change the currency signs, simply pass the parameter "currencyDisplay" with any the of following values "narrowSymbol" | "code" | "name" | "symbol"
 *
 * @template L - A supported BCP 47 locale string (e.g. "en-US", "fr-FR"). Defaults to "en-US".
 *
 * @param props - An object containing:
 *   - `value`: The numeric value to format.
 *   - `locale` (optional): The desired locale for formatting.
 *   - `currency` (optional): A valid ISO 4217 currency for the specified locale.
 *   - `currencyDisplay` (optional): To change the currency display style.
 *
 * @returns A string representing the formatted currency (e.g. "$1,500.00").
 *
 * @example
 * ```ts
 * formatCurrency({ value: 1500 });
 * // "$1,500.00"
 *
 * formatCurrency({ value: 2000, locale: "en-NG" });
 * // "₦2,000.00"
 *
 * formatCurrency({ value: 1000, locale: "fr-FR", currency: "EUR" });
 * // "1 000,00 €"
 * ```
 */
export const formatCurrency = <L extends GetLocale>(
  props: FormatCurrencyProps<L> & CurrencyDisplayTypes
): string => {
  const value = normalizeNumber(props.value);

  if (!("locale" in props)) {
    return formatWithIntl({
      value,
      options: {
        style: "currency",
        currency: "USD",
        currencyDisplay: props.currencyDisplay ?? "symbol",
      },
      locale: "en-US",
    });
  }

  const locale = props.locale;
  const currencies = localeCurrencyPairs[locale];
  const currency = "currency" in props ? props.currency : currencies[0];

  return formatWithIntl({
    value,
    options: {
      style: "currency",
      currency,
      currencyDisplay: props.currencyDisplay ?? "symbol",
    },
    locale,
  });
};

/**
 * Strictly formats a single number as currency using the Intl.NumberFormat API,
 * requiring an exact `locale`–`currency` match.
 *
 * This function is stricter than `formatCurrency`:
 * - All three parameters — `value`, `locale`, and `currency` — are required except currencyDisplay which is optional.
 * - The `currency` must match the allowed list for the given `locale`.
 * - No fallbacks or guesses are made. If an invalid pair is passed, TypeScript will throw an error.
 *
 * Useful when strict control over formatting is needed — e.g., in finance or compliance-based apps.
 *
 * @template To change the currency signs
 * e.g (₦787.00 -> "narrowSymbol" by default, NGN 787.00 -> "code", 787.00 Nigerian nairas -> "name" or  NGN 787.00 -> "symbol")
 * @template To change the currency signs, simply pass the parameter "currencyDisplay" with any the of following values "narrowSymbol" | "code" | "name" | "symbol"
 *
 * @template L - A supported BCP 47 locale string (e.g. "de-DE", "ja-JP").
 *
 * @param props - An object containing:
 *   - `value`: The number or string to format.
 *   - `locale`: A locale key from `localeCurrencyPairs`.
 *   - `currency`: A valid currency for the given locale.
 *   - `currencyDisplay` (optional): To change the currency display style.
 *
 * @returns A string representing the formatted currency.
 *
 * @example
 * ```ts
 * formatCurrencyMatch({ value: 5000, locale: "ja-JP", currency: "JPY" });
 * // "￥5,000"
 *
 * formatCurrencyMatch({ value: 1000, locale: "en-GB", currency: "GBP" });
 * // "£1,000.00"
 * ```
 */
export const formatCurrencyMatch = <L extends keyof LocaleCurrencyMap>({
  value,
  currency,
  locale,
  currencyDisplay,
}: FormatCurrencyStrictProps<L> & CurrencyDisplayTypes): string => {
  return formatWithIntl({
    value: normalizeNumber(value),
    options: {
      style: "currency",
      currency,
      currencyDisplay: currencyDisplay ?? "symbol",
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
