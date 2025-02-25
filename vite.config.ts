import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { POST as chatFunction } from "./src/functions/chat"; // Import the chatHandler

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    {
      name: 'chat-middleware',
      configureServer(server) {
        server.middlewares.use('/api/chat', async (req, res, next) => {
          try {
            const chatResponse = await chatFunction(req);
            res.statusCode = chatResponse.status;
            chatResponse.headers.forEach((value, key) => {
              res.setHeader(key, value);
            });
            const body = await chatResponse.text();
            res.end(body);
          } catch (error) {
            next(error);
          }
        });
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
