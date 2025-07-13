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
