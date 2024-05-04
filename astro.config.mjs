import { defineConfig } from "astro/config";
import deno from "freestyle-deno-astro-adapter";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  adapter: deno(),
  integrations: [tailwind(), react(), icon()],
  output: "server",
  vite: {
    ssr: {
      external: ["freestyle-sh"]
    },
    esbuild: {
      target: "esnext",
      format: "esm",
      platform: "node"
    }
  }
});