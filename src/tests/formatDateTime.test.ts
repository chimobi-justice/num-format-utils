import { describe, it, expect } from "vitest";
import { formatDateTime } from "../utils/formatDateTime";

describe("formatDateTime", () => {
  it("formats a valid date using default preset", () => {
    const result = formatDateTime({ date: "2025-07-18T12:34:56Z" });
    expect(result).toMatch(/\d{4}/); // includes year
  });

  it("formats with 'short' preset", () => {
    const result = formatDateTime({
      date: "2025-01-01",
      options: "short",
    });
    expect(result).toMatch(/\d{2}\/\d{2}\/\d{2}/); // 2-digit year/month/day
  });
});
