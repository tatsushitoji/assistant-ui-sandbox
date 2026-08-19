import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { chunkMessage, sampleMessage } from "./sample-message.ts";

const app = new Hono();

app.get("/api/health", (c) => {
  return c.json({ status: "ok" });
});

app.post("/api/chat", async (c) => {
  // リクエストボディ (messages) は受け取るが内容は無視する。
  await c.req.json().catch(() => undefined);

  return streamSSE(c, async (stream) => {
    const chunks = chunkMessage(sampleMessage);

    for (const chunk of chunks) {
      await stream.writeSSE({
        event: "message",
        data: JSON.stringify({ delta: chunk }),
      });
      await stream.sleep(30 + Math.floor(Math.random() * 20));
    }

    await stream.writeSSE({
      event: "done",
      data: JSON.stringify({}),
    });
    await stream.close();
  });
});

export default app;
