import { describe, expect, test } from "vite-plus/test";
import app from "./index.ts";
import { sampleMessage } from "./sample-message.ts";

type ServerSentEvent = {
  event: string;
  data: string;
};

function parseServerSentEvents(body: string): ServerSentEvent[] {
  return body
    .trim()
    .split("\n\n")
    .map((block) => {
      const fields = Object.fromEntries(
        block.split("\n").map((line) => {
          const separatorIndex = line.indexOf(":");
          return [line.slice(0, separatorIndex), line.slice(separatorIndex + 1).trimStart()];
        }),
      );

      return {
        event: fields.event ?? "message",
        data: fields.data ?? "",
      };
    });
}

describe("server", () => {
  test("GET /api/health returns the server status", async () => {
    const response = await app.request("/api/health");

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    await expect(response.json()).resolves.toEqual({ status: "ok" });
  });

  test("POST /api/chat streams the fixed message followed by a done event", async () => {
    const response = await app.request("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "ignored input" }] }),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/event-stream");

    const events = parseServerSentEvents(await response.text());
    const messageEvents = events.filter((event) => event.event === "message");
    const streamedMessage = messageEvents
      .map((event) => (JSON.parse(event.data) as { delta: string }).delta)
      .join("");

    expect(messageEvents.length).toBeGreaterThan(1);
    expect(streamedMessage).toBe(sampleMessage);
    expect(events.at(-1)).toEqual({ event: "done", data: "{}" });
  });
});
