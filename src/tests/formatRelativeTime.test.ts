import { describe, it, expect } from "vitest";
import { formatRelativeTime } from "../utils/formatRelativeTime";

describe("formatRelativeTime", () => {
  it("formats future time", () => {
    const result = formatRelativeTime({ value: 3, unit: "day" });
    expect(result).toMatch(/in\s+3\s+days/i);
  });

  it("formats past time with plain option", () => {
    const result = formatRelativeTime({
      value: -2,
      unit: "week",
      plain: true,
    });
    expect(result).toBe("2 weeks");
  });

  it("formats with natural language (auto)", () => {
    const result = formatRelativeTime({
      value: 1,
      unit: "day",
      numeric: "auto",
    });
    expect(["in 1 day", "tomorrow"]).toContain(result.toLowerCase());
  });

  // it("throws on non-number input", () => {
  //   expect(() =>
  //     formatRelativeTime({ value: NaN, unit: "day" })
  //   ).toThrowError();
  // });
});
