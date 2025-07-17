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
