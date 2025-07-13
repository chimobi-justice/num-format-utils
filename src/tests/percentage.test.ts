import { describe, it, expect } from "vitest";
import { formatPercentage } from "../utils/percentage";

describe("formatPercentage", () => {
  it("format as 2-decimal by default", () => {
    expect(formatPercentage({ value: 0.1234 })).toBe("12%");
  });

  it("formats with custom 1-decimal fractionDigit", () => {
    expect(formatPercentage({ value: 0.037, fractionDigits: 1 })).toBe("3.7%");
  });
});
