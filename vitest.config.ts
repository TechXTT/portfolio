import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
      // `server-only` throws when imported outside a React Server Component.
      // In unit tests we resolve it to its own no-op build.
      "server-only": resolve(__dirname, "node_modules/server-only/empty.js"),
    },
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
  },
});
