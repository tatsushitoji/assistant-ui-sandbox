import { AssistantRuntimeProvider, useLocalRuntime } from "@assistant-ui/react";
import { Thread } from "@/components/assistant-ui/thread";
import { chatModelAdapter } from "./chat-model-adapter";

export const App = () => {
  const runtime = useLocalRuntime(chatModelAdapter);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Thread />
    </AssistantRuntimeProvider>
  );
};
