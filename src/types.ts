import type { CompactProps, StandardProps } from "./utils/formatCompactNumber";

export type SupportedCurrency =
  | "USD"
  | "NGN"
  | "EUR"
  | "GBP"
  | "JPY"
  | "CAD"
  | "CNY"
  | "INR";

export type SupportedLocale =
  | "en-US"
  | "en-GB"
  | "en-NG"
  | "fr-FR"
  | "ja-JP"
  | "en_CA"
  | "zh-CN"
  | "hi-IN";

export type SupportedUnit =
  | "acre"
  | "bit"
  | "byte"
  | "celsius"
  | "centimeter"
  | "day"
  | "degree"
  | "fahrenheit"
  | "fluid-ounce"
  | "foot"
  | "gallon"
  | "gigabit"
  | "gigabyte"
  | "gram"
  | "hectare"
  | "hour"
  | "inch"
  | "kilobit"
  | "kilobyte"
  | "kilogram"
  | "kilometer"
  | "liter"
  | "megabit"
  | "megabyte"
  | "meter"
  | "mile"
  | "mile-scandinavian"
  | "milliliter"
  | "millimeter"
  | "millisecond"
  | "minute"
  | "month"
  | "ounce"
  | "percent"
  | "petabyte"
  | "pound"
  | "second"
  | "stone"
  | "terabit"
  | "terabyte"
  | "week"
  | "yard"
  | "year";

export type UnitDisplay = "short" | "long" | "narrow";

export interface FormatCurrencyProps<
  C extends SupportedCurrency = "USD",
  L extends SupportedLocale = "en-US",
> {
  value: number;
  currency?: C;
  locale?: L;
}

export interface FormatNumberProps<L extends SupportedLocale> {
  value: number;
  locale?: L;
}

export interface FormatPercentageProps {
  value: number;
  fractionDigits?: number;
}

export interface FormatDecimalProps {
  value: number;
  decimals?: number;
  locale?: SupportedLocale;
}

export type FormatCompactProps = CompactProps | StandardProps;
