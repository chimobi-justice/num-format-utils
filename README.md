# 📊 num-format-utils

A lightweight utility library for formatting numbers, currencies, percentages, decimals and more — with full TypeScript support and locale-aware formatting via the `Intl` API.

> ✅ Ideal for dashboards, finance apps, and data display

## 🚀 Installation

```bash
npm install num-format-utils
# or
yarn add num-format-utils
```

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

```bash
formatCurrency({
  value: number,
  currency?: string, // default: "USD"
  locale?: string    // default: "en-US"
}): string
```

## Example:

```bash
formatCurrency({ value: 3000 }); // "$3,000.00"
formatCurrency({ value: 3000, currency: "NGN", locale: "en-NG" }); // "₦3,000.00"
```

### 🔹 createCurrencyFormatter

Create a reusable formatter instance for performance.

```bash
const ngnFormatter = createCurrencyFormatter("NGN", "en-NG");
ngnFormatter(45000); // "₦45,000.00"
```

### 🔹 formatDecimal

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
