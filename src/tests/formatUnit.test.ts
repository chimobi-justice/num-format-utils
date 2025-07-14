import { describe, it, expect } from "vitest";
import { formatUnit } from "../utils/formatUnit";

describe("formatUnits", () => {
  it("formats minute unit", () => {
    const result = formatUnit({
      value: 12,
      unit: "minute",
      unitDisplay: "long",
    });
    expect(result).toBe("12 minutes");
  });

  it("formats kilogram unit", () => {
    const result = formatUnit({
      value: 12,
      unit: "kilogram",
      unitDisplay: "short",
    });
    expect(result).toBe("12 kg");
  });

  it("formats year unit", () => {
    const result = formatUnit({
      value: 12,
      unit: "year",
      unitDisplay: "short",
    });
    expect(result).toBe("12 yrs");
  });
});
