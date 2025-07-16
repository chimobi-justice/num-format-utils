import type { CompactProps, StandardProps } from "./utils/formatCompactNumber";

export type SupportedCurrency =
  | "USD" // US Dollar
  | "NGN" // Nigerian Naira
  | "EUR" // Euro
  | "GBP" // British Pound
  | "JPY" // Japanese Yen
  | "CAD" // Canadian Dollar
  | "CNY" // Chinese Yuan
  | "INR" // Indian Rupee
  | "AUD" // Australian Dollar
  | "BRL" // Brazilian Real
  | "ZAR" // South African Rand
  | "CHF" // Swiss Franc
  | "SEK" // Swedish Krona
  | "MXN" // Mexican Peso
  | "KRW" // South Korean Won
  | "RUB" // Russian Ruble
  | "AED" // UAE Dirham
  | "SAR" // Saudi Riyal
  | "EGP"; // Egyptian Pound

export type SupportedLocale =
  | "en-US" // United States
  | "en-GB" // United Kingdom
  | "en-NG" // Nigeria
  | "fr-FR" // France
  | "ja-JP" // Japan
  | "en-CA" // Canada
  | "zh-CN" // China
  | "hi-IN" // India
  | "en-AU" // Australia
  | "pt-BR" // Brazil
  | "es-MX" // Mexico
  | "de-DE" // Germany
  | "it-IT" // Italy
  | "ru-RU" // Russia
  | "ko-KR" // South Korea
  | "ar-AE" // United Arab Emirates
  | "ar-SA" // Saudi Arabia
  | "en-ZA" // South Africa
  | "es-ES" // Spain
  | "nl-NL"; // Netherlands

export type StrictLocaleCurrencyPair =
  | { locale: "en-US"; currency: "USD" }
  | { locale: "en-GB"; currency: "GBP" }
  | { locale: "en-NG"; currency: "NGN" }
  | { locale: "fr-FR"; currency: "EUR" }
  | { locale: "ja-JP"; currency: "JPY" }
  | { locale: "en-CA"; currency: "CAD" }
  | { locale: "zh-CN"; currency: "CNY" }
  | { locale: "hi-IN"; currency: "INR" }
  | { locale: "en-AU"; currency: "AUD" }
  | { locale: "pt-BR"; currency: "BRL" }
  | { locale: "es-MX"; currency: "MXN" }
  | { locale: "de-DE"; currency: "EUR" }
  | { locale: "it-IT"; currency: "EUR" }
  | { locale: "ru-RU"; currency: "RUB" }
  | { locale: "ko-KR"; currency: "KRW" }
  | { locale: "ar-AE"; currency: "AED" }
  | { locale: "ar-SA"; currency: "SAR" }
  | { locale: "en-ZA"; currency: "ZAR" }
  | { locale: "es-ES"; currency: "EUR" }
  | { locale: "nl-NL"; currency: "EUR" };

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
  value: number | string;
  currency?: C;
  locale?: L;
}

export interface FormatNumberProps<L extends SupportedLocale> {
  value: number | string;
  locale?: L;
}

export interface FormatPercentageProps {
  value: number | string;
  fractionDigits?: number;
}

export interface FormatDecimalProps {
  value: number | string;
  decimals?: number;
  locale?: SupportedLocale;
}

export type FormatCompactProps = CompactProps | StandardProps;
