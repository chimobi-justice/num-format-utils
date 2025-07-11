# 📊 num-format-utils

A lightweight utility library for formatting numbers, currencies, percentages, and decimals — with full TypeScript support and locale-aware formatting via the `Intl` API.

> ✅ Ideal for dashboards, finance apps, and data display

---

## 🚀 Installation

```bash
npm install num-format-utils
# or
yarn add num-format-utils


✨ Features
✅ Format currencies with locale and ISO codes

✅ Format numbers with separators (1,000)

✅ Format decimals with fixed precision

✅ Format percentages (e.g., "65.00%")

✅ Fully typed with autocompletion for currency and locale

✅ Framework agnostic (React, Vue, Svelte, Angular, Node, etc.)

📦 Usage

import {
  formatCurrency,
  createCurrencyFormatter,
  formatDecimal,
  formatNumber,
  formatPercentage
} from 'num-format-utils';

📘 API Documentation

🔹 formatCurrency

formatCurrency({
  value: number,
  currency?: string, // default: "USD"
  locale?: string    // default: "en-US"
}): string

Example:

formatCurrency({ value: 3000 }); // "$3,000.00"
formatCurrency({ value: 3000, currency: "NGN", locale: "en-NG" }); // "₦3,000.00"

🔹 createCurrencyFormatter
Create a reusable formatter instance for performance.

const ngnFormatter = createCurrencyFormatter("NGN", "en-NG");
ngnFormatter(45000); // "₦45,000.00"

🔹 formatDecimal

formatDecimal({
  value: number,
  decimals?: number // default: 2
}): string

Example:

formatDecimal({ value: 123.456 }); // "123.46"
formatDecimal({ value: 1000, decimals: 3 }); // "1000.000"

🔹 formatNumber

formatNumber({
  value: number,
  locale?: string // default: "en-US"
}): string

Example:

formatNumber({ value: 1000000 }); // "1,000,000"
formatNumber({ value: 1000000, locale: "de-DE" }); // "1.000.000"

🔹 formatPercentage

formatPercentage({
  value: number, // e.g. 0.65
  fractionDigits?: number // default: 2
}): string

Example:

formatPercentage({ value: 0.65 }); // "65.00%"
formatPercentage({ value: 0.1, fractionDigits: 0 }); // "10%"

✅ TypeScript Support
All utilities are strongly typed

Auto-suggestions for locales and currency codes

Custom types (FormatCurrencyProps, SupportedLocale, etc.) exposed

🧪 Run Tests

npm run test

🛠 Local Development

If you're contributing or testing locally:

git clone https://github.com/your-username/num-format-utils.git
cd num-format-utils
npm install
npm run build

📄 License
MIT