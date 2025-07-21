import type { SupportedLocale } from "../types";

type FormatListStyleProps = "short" | "long" | "narrow";

type FormatListTypeProps = "conjunction" | "disjunction";

interface FormatListProps {
  items: string[];
  locale?: SupportedLocale;
  style?: FormatListStyleProps;
  type?: FormatListTypeProps;
}

/**
 * Formats an array of strings into a human-readable, localized list using Intl.ListFormat.
 *
 * @param items - The list of strings to format.
 * @param locale - Optional locale (e.g., "en-US"). Defaults to "en-US".
 * @param style - Optional formatting style: "long", "short", or "narrow". Defaults to "long".
 * @param type - Optional list type: "conjunction" (and), "disjunction" (or). Defaults to "conjunction".
 *
 * @returns A localized list string, or an empty string if input is invalid.
 *
 * @example
 * formatList({ items: ["Apples", "Bananas", "Cherries"] })
 * // "Apples, Bananas, and Cherries"
 *
 * formatList({
 *  items: ["Design", "Code", "Deploy"],
 *  locale: "en-GB",
 *  style: "short",
 *  type: "disjunction",
 * })
 * // "Design, Code or Deploy"
 *
 */
export const formatList = ({
  items,
  locale = "en-US",
  style = "long",
  type = "conjunction",
}: FormatListProps): string => {
  if (!Array.isArray(items)) {
    console.warn(`[formatList] ⚠️ "items" must be an array of strings.`);
    return "";
  }

  // check if "items",  eg [""], [] or [" "]
  const hasValuesInArray = items.some(
    (item) => typeof item === "string" && item.trim() !== ""
  );

  if (!hasValuesInArray) {
    console.warn(
      `[formatList] ⚠️ "items" array must contain atleast one non-empty array.`
    );
    return "";
  }

  const formatter = new Intl.ListFormat(locale, { style, type });

  return formatter.format(items);
};
