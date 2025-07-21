# 📊 num-format-utils

A lightweight utility library for formatting numbers, currencies, percentages, decimals, and more — with full TypeScript support and locale-aware formatting via the `Intl` API.

> ✅ Ideal for dashboards, finance apps, data display, and more.

## 🚀 Installation

```bash
npm install num-format-utils
# or
yarn add num-format-utils
```

## ✨ Features

- ✅ Format currencies with locale and ISO codes
- ✅ Format numbers with separators (e.g. 1,000)
- ✅ Format decimals with fixed precision
- ✅ Format percentages (e.g., "65.00%")
- ✅ Fully typed with autocompletion for currency and locale
- ✅ Framework agnostic (React, Vue, Svelte, Angular, Node, etc.)

## 📦 Usage

```ts
import {
  formatCurrency,
  formatCurrencyMatch,
  createCurrencyFormatter,
  formatDecimal,
  formatNumber,
  formatPercentage,
  formatCompactNumber,
  formatUnit,
  formatDateTime,
  formatRelativeTime,
  formatList,
} from "num-format-utils";
```

## 📘 API Documentation

### 🔹 formatCurrency

Formats a single number as currency using the Intl.NumberFormat API.

- If only `value` is provided, defaults to `"USD"` and `"en-US"`.
- If `locale` is provided without `currency`, uses the locale's default currency.
- If both `locale` and `currency` are provided, uses them directly **only if** the pair is valid.
- currencyDisplay which is optional

If an invalid locale–currency combination is passed, the function will fallback to the default currency for that locale.

If `currency` is passed without `locale`, TypeScript will show a type error.

To change the currency signs

e.g (₦787.00 -> "narrowSymbol" by default, NGN 787.00 -> "code", 787.00 Nigerian nairas -> "name" or NGN 787.00 -> "symbol")

Simply pass the parameter "currencyDisplay" with any the of following values "narrowSymbol" | "code" | "name" | "symbol"

```ts
formatCurrency({
  value: number,
  currency?: string,
  locale?: string,
  currencyDisplay?: "narrowSymbol" | "code" | "name" | "symbol"
}): string
```

**Example:**

```ts
formatCurrency({ value: 3000 }); // "$3,000.00"

formatCurrency({ value: 3000, currency: "NGN", locale: "en-NG" }); // "₦3,000.00"

formatCurrency({
  value: 3000,
  currency: "USD",
  locale: "en-US",
  currencyDisplay: "name",
}); // "3,000.00 US dollars"
```

### 🔹 formatCurrencyMatch

Strictly formats a single number as currency using the Intl.NumberFormat API,
requiring an exact `locale`–`currency` match.

This function is stricter than `formatCurrency`:

- All three parameters — `value`, `locale`, and `currency` — are required except currencyDisplay which is optional.
- The `currency` must match the allowed list for the given `locale`.
- No fallbacks or guesses are made. If an invalid pair is passed, TypeScript will throw an error.

Useful when strict control over formatting is needed — e.g., in finance or compliance-based apps.

To change the currency signs. same as `formatCurrency`

```ts
formatCurrencyMatch({
  value: number,
  currency: string,
  locale: string,
  currencyDisplay?: "narrowSymbol" | "code" | "name" | "symbol"
}): string
```

**Example:**

```ts
formatCurrencyMatch({ value: 3000, locale: "en-NG", currency: "NGN" });
// "₦3,000.00"

formatCurrencyMatch({
  value: 3000,
  locale: "en-US",
  currency: "USD",
  currencyDisplay: "name",
}); // "3,000.00 US dollars"
```

### 🔹 createCurrencyFormatter

Create a reusable formatter instance for performance.

- Useful for formatting multiple values with the same currency and locale
- without creating a new formatter each time.

```ts
const ngnFormatter = createCurrencyFormatter("NGN", "en-NG");
ngnFormatter(45000); // "₦45,000.00"
```

### 🔹 formatDecimal

Formats a numeric value to a fixed number of decimal places.

- This function is useful when you want strict control over how many decimals are shown, regardless of locale formatting.

```ts
formatDecimal({
  value: number,
  decimals?: number // default: 2
}): string
```

**Example:**

```ts
formatDecimal({ value: 123.456 }); // "123.46"

formatDecimal({ value: 1000, decimals: 3 }); // "1000.000"
```

### 🔹 formatNumber

Formats a numeric value using locale-specific digit grouping and decimal separators.

- Useful for general number formatting without currency or percentage styling.

```ts
formatNumber({
  value: number,
  locale?: string
}): string
```

**Example:**

```ts
formatNumber({ value: 1000000 }); // "1,000,000"

formatNumber({ value: 1000000, locale: "de-DE" }); // "1.000.000"
```

### 🔹 formatPercentage

Formats a numeric value as a percentage string.

- Multiplies the input value by 100 and appends a `%` sign, with optional control over the number of decimal places.

```ts
formatPercentage({
  value: number,
  fractionDigits?: number
}): string
```

**Example:**

```ts
formatPercentage({ value: 0.65 }); // "65.00%"

formatPercentage({ value: 0.1, fractionDigits: 0 }); // "10%"
```

### 🔹 formatCompactNumber

Formats a number using the `Intl.NumberFormat` API with either "compact" or "standard" notation.

- `"compact"` Formats numbers using abbreviations (e.g. 1K, 2.3M, 6.5 thousand).
- `"standard"` Formats numbers using regular locale-specific formatting (e.g., 1,000, 1,650,000).

```ts
formatCompactNumber({
  value: number,
  locale?: string,
  notation?: "compact" | "standard",
  compactDisplay?: "short" | "long"
}): string;
```

**Example:**

```ts
formatCompactNumber({ value: 1000 }); // 1K

formatCompactNumber({ value: 1000, notation: "standard" }); // "1,000"

formatCompactNumber({ value: 6500, locale: "en-NG", compactDisplay: "long" });
("6.5 thousand");
```

### 🔹 formatUnit

format a number using the Intl unit style e.g ("day", "year", "month", "kilogram") etc.

```ts
formatUnit({
  value: number,
  unit: string,
  locale?: string,
  unitDisplay?: "long" | "short" | "narrow"
}): string;
```

**Example:**

```ts
formatUnit({ value: 150 }); by default if no other options are passed // "150 kg"

formatUnit({ value: 12, unit: "minute", unitDisplay: "short" }); // "12 min"

formatUnit({ value: 10, unit: "year", unitDisplay: "short" }); // "10 yrs"

formatUnit({ value: 120, unit: "kilobyte", unitDisplay: "short" }); // "120 kB"
```

### 🔹 formatDateTime

Formats a date or timestamp into a localized string using Intl.DateTimeFormat.

- Accepts: Date, string, number, or timestamp.
- Supports friendly presets: "short", "long", "dateOnly", "timeOnly", "full".
- Defaults to "en-US" and "full" if no options are provided.
- Returns an empty string and logs a warning for invalid inputt.

```ts
formatDateTime({
  date: Date | string | number,
  locale?: string,
  options?: "short" | "long" | "dateOnly" | "timeOnly" | "full" | Intl.DateTimeFormatOptions
}): string
```

**Example:**

```ts
formatDateTime({ date: "2025-07-15T08:00:00Z" });
// "July 15, 2025 at 8:00:00 AM"

formatDateTime({ date: Date.now(), options: "short" }); // "07/15/25, 10:04"

formatDateTime({
  date: Date.UTC(2012, 11, 20, 3, 0, 0, 200),
  locale: "en-AU",
  options: {
    timeZone: "Australia/Sydney",
    timeZoneName: "short",
  },
}); // 20/12/2012, AEDT

formatDateTime({ date: "abc" }); // (and logs a warning)
```

### 🔹 formatRelativeTime

Formats time relative to the current time (e.g. "in 3 days", "2 hours ago").

- Supports all Intl.RelativeTimeFormatUnit values ("second", "day", "month", etc).
- Optional plain flag to strip "in"/"ago" from output.
- Defaults: "en-US", "day", "long" style, and "always" numeric format.
- Logs a warning for non-numeric values.

```ts
formatRelativeTime({
  value: number,
  unit?: Intl.RelativeTimeFormatUnit,
  locale?: string,
  plain?: boolean,
  numeric?: "auto" | "always",
  style?: "short" | "long" | "narrow"
}): string
```

**Example:**

```ts
formatRelativeTime({ value: -1 }); // "1 day ago"

formatRelativeTime({ value: -5, plain: true }); // "5 days" (strips "ago"/"in")

formatRelativeTime({ value: "abc" }); // "" (with warning)
```

### 🔹 formatList

Formats an array of strings into a localized, human-readable list using Intl.ListFormat.

- Accepts a string array (items).
- Optional style ("long", "short", "narrow").
- Optional type ("conjunction" = and, "disjunction" = or).
- Logs a warning if array is empty or contains no valid strings.

[Oxford comma](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat#oxford_comma): is a comma placed immediately before the coordinating conjunction (usually "and" or "or") in a list of three or more terms. Somewhat controversially, the en-US locale uses the Oxford comma, while the en-GB locale does not.

```ts
formatList({
  items: string[],
  locale?: string,
  style?: "long" | "short" | "narrow",
  type?: "conjunction" | "disjunction"
}): string
```

**Example:**

```ts
formatList({ items: ["Apples", "Bananas", "Cherries"] });
// "Apples, Bananas, and Cherries"

formatList({ items: ["Apples", "Bananas", "Cherries"], locale: "en-US" type: "disjunction" });
// "Apples, Bananas, or Cherries" - locale = "en-US" uses the oxford comma

formatList({ items: ["Apples", "Bananas", "Cherries"], locale: "en-GB" type: "disjunction" });
// "Apples, Bananas or Cherries" - locale = "en-GB" does not use the oxford comma
```

## ✅ TypeScript Support

- All utilities are fully typed
- Auto-suggestions for supported locales and currency codes

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request with your suggestions or improvements.

## 📝 License

MIT © [Justice Chimobi](LICENSE)
