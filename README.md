# 📊 num-format-utils

A lightweight utility library for formatting numbers, currencies, percentages, decimals and more — with full TypeScript support and locale-aware formatting via the `Intl` API.

> ✅ Ideal for dashboards, finance apps, and data display

## 🚀 Installation

[![npm version](https://img.shields.io/npm/v/num-format-utils.svg)](https://www.npmjs.com/package/num-format-utils)
[![npm downloads](https://img.shields.io/npm/dt/num-format-utils.svg)](https://www.npmjs.com/package/num-format-utils)

[View all versions on npm](https://www.npmjs.com/package/num-format-utils?activeTab=versions)

````bash
npm install num-format-utils
# or
yarn add num-format-utils

## 🚀 Installation

```bash
npm install num-format-utils
# or
yarn add num-format-utils
````

## ✨ Features

✅ Format currencies with locale and ISO codes

✅ Format numbers with separators (1,000)

✅ Format decimals with fixed precision

✅ Format percentages (e.g., "65.00%")

✅ Fully typed with autocompletion for currency and locale

✅ Framework agnostic (React, Vue, Svelte, Angular, Node, etc.)

## 📦 Usage

```bash
import {
  formatCurrency,
  formatCurrencyMatch
  createCurrencyFormatter,
  formatDecimal,
  formatNumber,
  formatPercentage,
  formatCompactNumber,
  formatUnit,
} from 'num-format-utils';
```

## 📘 API Documentation

### 🔹 formatCurrency

Formats a single number as currency using the Intl.NumberFormat API.

- If only `value` is provided, defaults to `"USD"` and `"en-US"`.
- If `locale` is provided without `currency`, uses the locale's default currency.
- If both `locale` and `currency` are provided, uses them directly **only if** the pair is valid.
- currencyDisplay which is optional

❗ If an invalid locale–currency combination is passed, the function will fallback to the default currency for that locale.

❗ If `currency` is passed without `locale`, TypeScript will show a type error.

To change the currency signs

e.g (₦787.00 -> "narrowSymbol" by default, NGN 787.00 -> "code", 787.00 Nigerian nairas -> "name" or NGN 787.00 -> "symbol")

Simply pass the parameter "currencyDisplay" with any the of following values "narrowSymbol" | "code" | "name" | "symbol"

```bash
formatCurrency({
  value: number,
  currency?: string, // default: "USD"
  locale?: string    // default: "en-US"
  currencyDisplay?: string // "narrowSymbol" | "code" | "name" | "symbol"
}): string
```

## Example:

```bash
formatCurrency({ value: 3000 }); // "$3,000.00"
formatCurrency({ value: 3000, currency: "NGN", locale: "en-NG" }); // "₦3,000.00"
formatCurrency({ value: 3000, currency: "USD", locale: "en-US", currencyDisplay: "name" }); // "3,000.00 US dollars"
```

### 🔹 formatCurrencyMatch

Strictly formats a single number as currency using the Intl.NumberFormat API,
requiring an exact `locale`–`currency` match.

This function is stricter than `formatCurrency`:

- All three parameters — `value`, `locale`, and `currency` — are required except currencyDisplay which is optional.
- The `currency` must match the allowed list for the given `locale`.
- No fallbacks or guesses are made. If an invalid pair is passed, TypeScript will throw an error.

Useful when strict control over formatting is needed — e.g., in finance or compliance-based apps.

To change the currency signs.

e.g (₦787.00 -> "narrowSymbol" by default, NGN 787.00 -> "code", 787.00 Nigerian nairas -> "name" or NGN 787.00 -> "symbol")

Simply pass the parameter "currencyDisplay" with any the of following values "narrowSymbol" | "code" | "name" | "symbol"

```bash
formatCurrencyMatch({
  value: number,
  currency?: string, // default: "USD"
  locale?: string    // default: "en-US"
  currencyDisplay?: string // "narrowSymbol" | "code" | "name" | "symbol"
}): string
```

## Example:

```bash
formatCurrencyMatch({ value: 3000 }); // "$3,000.00"
formatCurrencyMatch({ value: 3000, locale: "en-NG", currency: "NGN", }); // "₦3,000.00"
formatCurrencyMatch({ value: 3000, locale: "en-US", currency: "NGN", currencyDisplay: "name" }); // "3,000.00 US dollars"
```

### 🔹 createCurrencyFormatter

Create a reusable formatter instance for performance.

- Useful for formatting multiple values with the same currency and locale
- without creating a new formatter each time.

```bash
const ngnFormatter = createCurrencyFormatter("NGN", "en-NG");
ngnFormatter(45000); // "₦45,000.00"
```

### 🔹 formatDecimal

Formats a numeric value to a fixed number of decimal places.

- This function is useful when you want strict control over how many decimals are shown, regardless of locale formatting.

```bash
formatDecimal({
  value: number,
  decimals?: number // default: 2
}): string
```

## Example:

```bash
formatDecimal({ value: 123.456 }); // "123.46"
formatDecimal({ value: 1000, decimals: 3 }); // "1000.000"
```

### 🔹 formatNumber

Formats a numeric value using locale-specific digit grouping and decimal separators.

- Useful for general number formatting without currency or percentage styling.

```bash
formatNumber({
  value: number,
  locale?: string // default: "en-US"
}): string
```

## Example:

```bash
formatNumber({ value: 1000000 }); // "1,000,000"
formatNumber({ value: 1000000, locale: "de-DE" }); // "1.000.000"
```

## 🔹 formatPercentage

Formats a numeric value as a percentage string.

- Multiplies the input value by 100 and appends a `%` sign, with optional control over the number of decimal places.

```bash
formatPercentage({
  value: number, // e.g. 0.65
  fractionDigits?: number // default: 2
}): string
```

## Example:

```bash
formatPercentage({ value: 0.65 }); // "65.00%"
formatPercentage({ value: 0.1, fractionDigits: 0 }); // "10%"
```

## 🔹 formatCompactNumber

Formats a number using the `Intl.NumberFormat` API with either "compact" or "standard" notation.

- `"compact"` Formats numbers using abbreviations (e.g. 1K, 2.3M, 6.5 thousand).
- `"standard"` Formats numbers using regular locale-specific formatting (e.g., 1,000, 1,650,000).

```bash
formatCompactNumber({
  value: number, // 6500
  locale: string, // default: en-NG
  notation: string, // default: "compact",  "compact" | "standard",
  compactDisplay: string, // default: "short",  "short" | "long" -> only availabel when notation is - compact
}): string;
```

## Example:

```bash
formatCompactNumber({ value: 1000 }); // 1K
formatCompactNumber({ value: 1000, notation "standard" }); // "1,000"
formatCompactNumber({ value: 6500, locale: "en-NG", compactDisplay: "long" });  "6.5 thousand"
```

## 🔹 formatUnit

format a number using the Intl unit style

```bash
formatUnit({
  value: number, // 6500
  locale: string // en-NG
  notation: string,  "compact" | "standard",
  compactDisplay: string,  "long" | "long"
}): string;
```

## Example:

```bash
 formatUnit({ value: 150 }); by default if no other options are pass // "150 kg"
 formatUnit({ value: 12, unit: "minute", unitDisplay: "short" }); // "12 min"
 formatUnit({ value: 10, unit: "year", unitDisplay: "short" }); // "12 yrs"
 formatUnit({ value: 120, unit: "kilobyte", unitDisplay: "short" }); // "120 kB"
```

## ✅ TypeScript Support

All utilities are strongly typed

Auto-suggestions for locales and currency codes

Custom types (FormatCurrencyProps, SupportedLocale, etc.) exposed

## 🤝 How to Contribute

### Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch:

```bash
 git checkout -b feature/your-feature
```

3. Make your changes
4. Commit your changes:

```bash
 git commit -m "Add your message here"
```

5. Push to your fork:

```bash
 git push origin feature/your-feature
```

6. Open a pull request

## 🧑‍🤝‍🧑 Collaborators

This project was developed and maintained by:

- [Justice Chimobi](https://justice-chimobi.vercel.app/)

Special thanks to all contributors and community members who have helped improve this library.

<a href="https://buymeacoffee.com/chimobijusi" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" style="height: 60px;"/>
</a>

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
