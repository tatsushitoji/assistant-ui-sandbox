import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite-plus";

export default defineConfig(({ mode }) => {
  return {
    plugins: mode === "test" ? [] : [cloudflare()],
    server: {
      port: 8787,
      strictPort: true,
    },
    lint: {
      options: {
        typeAware: true,
        typeCheck: true,
      },
    },
    fmt: {},
  };
});
