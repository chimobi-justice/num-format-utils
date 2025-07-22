import type { FormatNumberProps, SupportedLocale } from "../types";
import { formatWithIntl, normalizeNumber } from "./helpers";

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

export interface FormatUnitProps extends FormatNumberProps<SupportedLocale> {
  /**
   * Unit to format with (must be a valid unit recognized by Intl API)
   * e.g. "kilogram", "liter", "celsius", "meter", "inch", etc.
   *
   */
  unit?: SupportedUnit;

  /**
   * Format to display the unit
   * - "short" -> 1 min
   * - "long" -> 1 minute
   * - "narrow" -> 1m
   */
  unitDisplay?: UnitDisplay;
}

/**
 * format a number using the Intl unit style
 *
 * @example
 * formatUnit({ value: 12, unit: "kilogram" }) // "12 kg"
 *
 */
export const formatUnit = ({
  value,
  unit = "kilogram",
  unitDisplay = "short",
  locale = "en-US",
}: FormatUnitProps): string => {
  const saferValue = normalizeNumber(value);

  return formatWithIntl({
    value: saferValue,
    options: {
      style: "unit",
      unit,
      unitDisplay,
    },
    locale,
  });
};
