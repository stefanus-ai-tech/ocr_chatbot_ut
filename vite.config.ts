import { defineConfig, ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { POST as chatFunction } from "./src/functions/chat";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: "chat-middleware",
      configureServer(server: ViteDevServer) {
        server.middlewares.use("/api/chat", async (req, res, next) => {
          try {
            const body = await new Promise<string>((resolve, reject) => {
              let data = "";
              req.on("data", (chunk) => {
                data += chunk;
              });
              req.on("end", () => resolve(data));
              req.on("error", reject);
            });

            // Convert node request headers to Headers object
            const headers = new Headers();
            Object.entries(req.headers).forEach(([key, value]) => {
              if (value)
                headers.set(key, Array.isArray(value) ? value[0] : value);
            });

            const chatResponse = await chatFunction(
              new Request("http://localhost/api/chat", {
                method: req.method,
                headers,
                body: body || undefined,
              })
            );
            res.statusCode = chatResponse.status;
            chatResponse.headers.forEach((value, key) => {
              res.setHeader(key, value);
            });
            const responseBody = await chatResponse.text();
            res.end(responseBody);
          } catch (error) {
            console.error("Chat middleware error:", error);
            next(error);
          }
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
