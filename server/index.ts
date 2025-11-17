import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { config, logConfigStatus, services } from "./config";
import { WebSocketManager } from "./websocket";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Log configuration on startup
logConfigStatus();

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Health check endpoint (before routes)
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      ai: services.ai.claude,
      database: services.database,
      web3: services.web3.blockchain,
      realtime: services.realtime,
    },
  });
});

// Register API routes
(async () => {
  const server = registerRoutes(app);

  // Error handling
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    console.error(err);
  });

  // Setup vite or static serving
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Create HTTP server
  const httpServer = createServer(app);

  // Initialize WebSocket if enabled
  let wsManager: WebSocketManager | null = null;

  if (services.realtime) {
    wsManager = new WebSocketManager(httpServer);
    log("✅ WebSocket server initialized");

    // Make wsManager available to routes
    app.set('wsManager', wsManager);
  } else {
    log("⚠️  WebSocket disabled - real-time features unavailable");
  }

  // Start server
  const PORT = parseInt(config.PORT);
  httpServer.listen({
    port: PORT,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`Server running on port ${PORT}`);

    if (services.realtime) {
      log(`WebSocket available at ws://localhost:${PORT}`);
    }
  });
})();
