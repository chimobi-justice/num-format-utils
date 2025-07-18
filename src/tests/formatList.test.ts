import { describe, it, expect } from "vitest";
import { formatList } from "../utils/formatList";

describe("formatList", () => {
  it("formats list with default options", () => {
    const result = formatList({ items: ["apples", "bananas", "oranges"] });
    expect(result).toMatch(/apples.*bananas.*oranges/i);
  });
});
