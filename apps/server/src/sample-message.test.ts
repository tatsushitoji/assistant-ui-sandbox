import { describe, expect, test } from "vite-plus/test";
import { chunkMessage } from "./sample-message.ts";

describe("chunkMessage", () => {
  test("returns no chunks for an empty message", () => {
    expect(chunkMessage("")).toEqual([]);
  });

  test("preserves the message while splitting it into the requested size", () => {
    const chunks = chunkMessage("abcdefghij", 3, 3);

    expect(chunks).toEqual(["abc", "def", "ghi", "j"]);
    expect(chunks.join("")).toBe("abcdefghij");
  });

  test("keeps random chunks within the configured bounds", () => {
    const message = "a".repeat(200);
    const chunks = chunkMessage(message, 10, 20);

    expect(chunks.join("")).toBe(message);
    expect(chunks.slice(0, -1).every((chunk) => chunk.length >= 10 && chunk.length <= 20)).toBe(
      true,
    );
    expect(chunks.at(-1)?.length).toBeGreaterThan(0);
    expect(chunks.at(-1)?.length).toBeLessThanOrEqual(20);
  });
});
