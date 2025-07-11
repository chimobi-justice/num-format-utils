import type { FormatPercentageProps } from "../types";
import { normalizeNumber } from "./helpers";

/**
 * Formats a numeric value as a percentage string.
 *
 * Multiplies the input value by 100 and appends a `%` sign, with optional control
 * over the number of decimal places.
 *
 * @param value - The numeric value to convert to percentage (e.g. `0.65` becomes `"65.00%"`).
 * @param fractionDigits - Optional. Number of decimal places to show. Defaults to `2`.
 *
 * @returns A string representing the percentage.
 *
 * @example
 * ```ts
 * formatPercentage({ value: 0.65 });          // "65.00%"
 * formatPercentage({ value: 0.1234 });        // "12.34%"
 * formatPercentage({ value: 0.1234, fractionDigits: 4 }); // "12.3400%"
 * ```
 */
export const formatPercentage = ({
  value,
  fractionDigits = 2,
}: FormatPercentageProps): string => {
  const saferValue = normalizeNumber(value * 100);
  return `${saferValue.toFixed(fractionDigits)}%`;
};
