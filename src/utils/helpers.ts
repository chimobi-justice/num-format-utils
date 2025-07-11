import { 
  FormatNumberProps, 
  SupportedLocale 
} from "../types";

export interface FormatWithIntlProps extends FormatNumberProps<SupportedLocale> {
  options: Intl.NumberFormatOptions,
}

/**
 * Safely formats a number using Intl.NumberFormat.
*/
export const formatWithIntl = ({
  value,
  options,
  locale = "en-US"
}: FormatWithIntlProps): string => {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Ensures a number is finite, falls back to 0 if not.
*/
export const normalizeNumber = (value: unknown): number => {
  const num = typeof value === "number" ? value : Number(value);
  return Number.isFinite(num) ? num : 0
}