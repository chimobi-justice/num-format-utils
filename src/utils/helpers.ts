import { FormatNumberProps, SupportedLocale } from "../types";

export interface FormatWithIntlProps
  extends FormatNumberProps<SupportedLocale> {
  options?: Intl.NumberFormatOptions;
}

/**
 * Safely formats a number using Intl.NumberFormat.
 */
export const formatWithIntl = ({
  value,
  options,
  locale = "en-US",
}: FormatWithIntlProps): string => {
  return new Intl.NumberFormat(locale as string, options).format(Number(value));
};

/**
 * Ensures a number is finite, falls back to 0 if not.
 */
export const normalizeNumber = (value: unknown): number => {
  const num = typeof value === "number" ? value : Number(value);
  return Number.isFinite(num) ? num : 0;
};

/**
 * Checks if the provided value is a valid number or numeric string.
 * If the value is not a number, logs a warning with the context provided.
 *
 * @param {number|string} value - The value to validate, can be a number or a string.
 * @param {string} callerFunction - The name of the function or context where this check is performed.
 */
export const ensureNumberOrString = (
  value: number | string,
  callerFunction: string
) => {
  if (isNaN(Number(value))) {
    console.warn(
      `["${callerFunction}"] ⚠️ Invalid value passed: "${value}". Expected a number or numeric string.`
    );

    return;
  }
};
