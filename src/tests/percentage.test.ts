import { describe, it, expect } from "vitest";
import { formatPercentage } from "../utils/percentage";

describe("formatPercentage", () => {
  it("format as 2-decimal by default", () => {
    expect(formatPercentage({ value: 0.1234 })).toBe("12.34%")
  });

  it("formats with custom fractionDigits", () => {
    expect(formatPercentage({ value: 0.1234, fractionDigits: 1 })).toBe("12.3%")
  });
});