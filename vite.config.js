import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import babel from "@rolldown/plugin-babel";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      babel({
        presets: [reactCompilerPreset()],
      }),
    ],
    server: {
      port: env.VITE_PORT ? Number(env.VITE_PORT) : 5173,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/tests/setup.js"
    }
  };
});
