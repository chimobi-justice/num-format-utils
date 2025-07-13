import { describe, it, expect } from "vitest";
import { formatCompactNumber } from "../utils/formatCompactNumber";

describe("formatCompactNumber", () => {
  it("formats thousands (e.g. 1000) as '1K'", () => {
    const result = formatCompactNumber({ value: 1000, locale: "en-NG" });
    expect(result).toBe("1K");
  });

  it("formats thousands (e.g. 1000) as '1,000'", () => {
    const result = formatCompactNumber({
      value: 1000,
      locale: "en-NG",
      notation: "standard",
    });
    expect(result).toBe("1,000");
  });

  it("formats decimal number (2500) as '2.5K'", () => {
    const result = formatCompactNumber({ value: 2500, locale: "en-US" });
    expect(result).toBe("2.5K");
  });

  it("formats millions (e.g. 1000000) as '1M'", () => {
    const result = formatCompactNumber({ value: 1000000 });
    expect(result).toBe("1M");
  });

  it("formats billions (e.g. 1000000000) as '1B'", () => {
    const result = formatCompactNumber({ value: 1_000_000_000 });
    expect(result).toBe("1B");
  });
});
