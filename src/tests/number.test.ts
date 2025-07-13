import { describe, it, expect } from "vitest";
import { formatDecimal, formatNumber } from "../utils/number";

describe("formatNumbers", () => {
  it("format number by default", () => {
    expect(formatNumber({ value: 1000 })).toBe("1,000");
  });

  it("format number to be decimal", () => {
    expect(formatDecimal({ value: 1000 })).toBe("1,000.00");
  });
});
