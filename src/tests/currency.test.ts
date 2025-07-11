import { describe, it, expect } from "vitest";
import { formatCurrency, createCurrencyFormatter } from "../utils/currency";

describe("formatCurrency", () => {
  it("formats USD correctly", () => {
    const result = formatCurrency({ value: 1500, currency: "USD", locale: "en-US"});
    expect(result).toBe('$1,500.00')
  });

  it("format NGN correctly with custom locale", () => {
    const result = formatCurrency({ value: 1500, currency: "NGN", locale: "en-NG" });
    expect(result).toMatch(/₦1,500\.00/)
  });

  it("format naira currency correctly", () => {
    const formatNaira = createCurrencyFormatter("NGN", "en-NG");
    expect(formatNaira(1000000)).toBe('₦1,000,000.00')
  });
})
