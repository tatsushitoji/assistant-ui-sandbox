import type { ChatModelAdapter, ChatModelRunResult } from "@assistant-ui/react";
import { EventSourceParserStream } from "eventsource-parser/stream";

export const chatModelAdapter: ChatModelAdapter = {
  async *run({ messages, abortSignal }): AsyncGenerator<ChatModelRunResult, void> {
    let accumulated = "";

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
      signal: abortSignal,
    });

    const reader = response
      .body!.pipeThrough(new TextDecoderStream())
      .pipeThrough(new EventSourceParserStream())
      .getReader();

    try {
      while (true) {
        const { done, value: event } = await reader.read();
        if (done) break;

        if (event.event === "message") {
          const { delta } = JSON.parse(event.data) as { delta: string };
          accumulated += delta;
          yield { content: [{ type: "text", text: accumulated }] };
        } else if (event.event === "done") {
          break;
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      throw error;
    } finally {
      await reader.cancel().catch(() => {});
    }
  },
};
